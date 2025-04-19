import { parse } from '@vue/compiler-sfc';
import fs from 'fs/promises';
import path from 'path';
import parser from '@babel/parser';
import traverse from '@babel/traverse';

// 解析 Vue 组件文件
async function parseVueComponent(filePath) {
    try {
        const source = await fs.readFile(filePath, 'utf8');
        const { descriptor } = parse(source);
        return descriptor;
    } catch (error) {
        console.error('解析文件时出错:', error);
        throw error;
    }
}

// 分析 AST 中的子组件、数据和事件
function analyzeComponent(descriptor) {
    const components = [];
    const interactions = [];

    // 分析 <script> 中的组件定义
    if (descriptor.script || descriptor.scriptSetup) {
        const scriptContent = (descriptor.script?.content || '') + (descriptor.scriptSetup?.content || '');
        const ast = parser.parse(scriptContent, { sourceType: 'module', plugins: ['vue'] });

        traverse.default(ast, {
            ImportDeclaration(path) {
                path.node.specifiers.forEach(specifier => {
                    if (specifier.type === 'ImportSpecifier' || specifier.type === 'ImportDefaultSpecifier') {
                        components.push(specifier.local.name);
                    }
                });
            },
            VariableDeclarator(path) {
                if (path.node.id.type === 'Identifier' && path.node.init?.type === 'CallExpression' && path.node.init.callee.name === 'defineComponent') {
                    const props = path.node.init.arguments[0];
                    if (props.type === 'ObjectExpression') {
                        props.properties.forEach(prop => {
                            if (prop.key.name === 'components' && prop.value.type === 'ObjectExpression') {
                                prop.value.properties.forEach(componentProp => {
                                    if (componentProp.type === 'ObjectProperty') {
                                        components.push(componentProp.key.name);
                                    }
                                });
                            }
                        });
                    }
                }
            },
            ExportDefaultDeclaration(path) {
                const declaration = path.node.declaration;
                if (declaration.type === 'ObjectExpression') {
                    declaration.properties.forEach(property => {
                        if (property.key.name === 'components' && property.value.type === 'ObjectExpression') {
                            property.value.properties.forEach(componentProp => {
                                if (componentProp.type === 'ObjectProperty') {
                                    components.push(componentProp.key.name);
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    // 分析模板中的数据和事件传递
    if (descriptor.template) {
        const templateContent = descriptor.template.content;
        components.forEach((component) => {
            const componentRegex = new RegExp(`<${component}\\s+([^>]*)>`, 'g');
            let match;
            while ((match = componentRegex.exec(templateContent))!== null) {
                const attributes = match[1].split(' ');
                attributes.forEach((attr) => {
                    if (attr.startsWith(':')) {
                        const data = attr.slice(1).split('=')[0];
                        interactions.push({
                            from: '父组件',
                            to: component,
                            type: '数据传递',
                            data
                        });
                    } else if (attr.startsWith('@')) {
                        const event = attr.slice(1).split('=')[0];
                        interactions.push({
                            from: component,
                            to: '父组件',
                            type: '事件传递',
                            event
                        });
                    }
                });
            }
        });
    }

    return { components, interactions };
}

// 生成 SVG 流程图
function generateFlowchart(components, interactions) {
    const viewBoxWidth = 800;
    const viewBoxHeight = 600;
    const componentWidth = 200;
    const componentHeight = 100;
    const margin = 50;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">`;

    // 绘制父组件
    svg += `<rect x="${margin}" y="${margin}" width="${componentWidth}" height="${componentHeight}" fill="#e0f7fa" stroke="#0097a7" stroke-width="2"/>`;
    svg += `<text x="${margin + componentWidth / 2}" y="${margin + componentHeight / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="16">父组件</text>`;

    // 绘制子组件
    components.forEach((component, index) => {
        const x = margin + index * (componentWidth + margin);
        const y = margin + componentHeight + margin;
        svg += `<rect x="${x}" y="${y}" width="${componentWidth}" height="${componentHeight}" fill="#e0f7fa" stroke="#0097a7" stroke-width="2"/>`;
        svg += `<text x="${x + componentWidth / 2}" y="${y + componentHeight / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="16">${component}</text>`;
    });

    // 绘制交互线
    interactions.forEach((interaction) => {
        let fromX, fromY, toX, toY;
        if (interaction.from === '父组件') {
            fromX = margin + componentWidth;
            fromY = margin + componentHeight / 2;
        } else {
            fromX = margin + components.indexOf(interaction.from) * (componentWidth + margin) + componentWidth;
            fromY = margin + componentHeight + margin + componentHeight / 2;
        }

        if (interaction.to === '父组件') {
            toX = margin;
            toY = margin + componentHeight / 2;
        } else {
            toX = margin + components.indexOf(interaction.to) * (componentWidth + margin);
            toY = margin + componentHeight + margin + componentHeight / 2;
        }

        const controlX1 = fromX + (toX - fromX) / 3;
        const controlY1 = fromY;
        const controlX2 = toX - (toX - fromX) / 3;
        const controlY2 = toY;

        const color = interaction.type === '数据传递'? '#0097a7' : '#f44336';
        svg += `<path d="M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}" stroke="${color}" stroke-width="2" marker-end="url(#arrow)"/>`;

        const textY = interaction.type === '数据传递'? (fromY + toY) / 2 - 10 : (fromY + toY) / 2 + 10;
        svg += `<text x="${(fromX + toX) / 2}" y="${textY}" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="12">${interaction.type} ${interaction.data || interaction.event}</text>`;
    });

    // 箭头标记
    svg += `<defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5"
                markerWidth="6" markerHeight="6"
                orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0097a7"/>
        </marker>
    </defs>`;

    svg += `</svg>`;

    return svg;
}

// 主函数
async function main() {
    try {
        const filePath = "./src/views/viewer/chartsZoom/index.vue";
        const descriptor = await parseVueComponent(filePath);
        console.log(descriptor);

        const { components, interactions } = analyzeComponent(descriptor);

        const flowchart = generateFlowchart(components, interactions);

        await fs.writeFile('flowchart.svg', flowchart);
        console.log('流程图已生成：flowchart.svg');
    } catch (error) {
        console.error('生成流程图时出错:', error);
    }
}

main();