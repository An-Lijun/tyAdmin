import { pinyin } from "pinyin-pro";
type bindingType = {
    value: {
        toneType: string
        value: string
    }
}

/**
 * pnpm i pinyin-pro
 * 一个拼音指令
 * @param el
 * @param binding
 * 
 * @example
 * v-pinyin="{value: 'admin', toneType: 'none'}"
 * https://www.npmjs.com/package/pinyin-pro
 */


export default {
    mounted(el: Element, binding: bindingType) {
        const { value,toneType='none' } = binding.value
        const valueList = value.split('')

        const pyList = pinyin(value, {
            type: "array",
            toneType
        })
        el.innerHTML = `
            <style>
                .pinyin-item {
                    display: inline-block;
                    text-align: center;
                }
                .pinyin {
                    font-size: 12px;
                    color: var(--toyar-gray-8);
                    text-align: center;
                }
               .pinyin-origin {
                    text-align: center;
                    font-size: 18px;
                    color: var(--toyar-gray-10);
                }
            </style>
            ${pyList.map((item: string, index: number) => {
            return `<span class="pinyin-item">
                        <div class="pinyin">${item}</div>
                        <div class="pinyin-origin">${valueList[index]}</div>
                    </span>`
        }).join('')
            }
        `
    }
}
