import getAPI from './method/DrawUtil.js';

export function bar(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || colors?.[1] || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x + 0.5 * pxWidth, y + 0.5 * pxWidth);
        let drawItem = function (x, y, width, height) {
            context.beginPath();
            context.arc(x * pxWidth, y * pxWidth, 0.4 * pxWidth, 1 * Math.PI, 1.5 * Math.PI);
            context.arc((x + width - 1) * pxWidth, y * pxWidth, 0.4 * pxWidth, 1.5 * Math.PI, 0 * Math.PI);
            context.arc((x + width - 1) * pxWidth, (y + height - 1) * pxWidth, 0.4 * pxWidth, 0 * Math.PI, 0.5 * Math.PI);
            context.arc(x * pxWidth, (y + height - 1) * pxWidth, 0.4 * pxWidth, 0.5 * Math.PI, 1 * Math.PI);
            context.closePath();
            context.fill();
            api.setRangeDisabled(x, y, width, height);
        };
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                    } else {
                        let fillColor = colors[(i + j) % colors.length];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                    }
                    if (api.isPositionPoint(i, j)) {
                        context.beginPath();
                        context.arc((i + 3) * pxWidth, (j + 3) * pxWidth, 3.5 * pxWidth, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        context.fillStyle = backgroundImage;
                        context.beginPath();
                        context.arc((i + 3) * pxWidth, (j + 3) * pxWidth, 2.5 * pxWidth, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        context.fillStyle = innerColor;
                        context.beginPath();
                        context.arc((i + 3) * pxWidth, (j + 3) * pxWidth, 1.5 * pxWidth, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        api.setRangeDisabled(i, j, 7, 7);
                    } else {
                        [[4, 4], [4, 3], [4, 3], [4, 1], [3, 4], [3, 3], [3, 2], [3, 1], [2, 4], [2, 3], [2, 2], [2, 1], [1, 4], [1, 3], [1, 2], [1, 1]].forEach(function (coord) {
                            if (api.getRangeTrue(i, j, coord[0], coord[1])) {
                                drawItem(i, j, coord[0], coord[1]);
                            }
                        });
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
}


export function normaler(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        if (colors.length > 1) {
            let gradient = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height);
            let length = colors.length - 1;
            colors.forEach(function (value, index) {
                gradient.addColorStop(index / length, value);
            });
            foregroundImage = gradient;
        }
        let innerColor = options.innerColor || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = context.drawImage(resources.backgroundImage, 0, 0, context.canvas.width, context.canvas.height);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j)) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                    } else {
                        context.fillStyle = foregroundImage;
                    }
                    context.fillRect(Math.ceil(i * pxWidth) - 0.5, Math.ceil(j * pxWidth) - 0.5, Math.ceil(pxWidth) + 1, Math.ceil(pxWidth) + 1);
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};


export function fusion(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        let innerColor = options.innerColor || colors[0];
        let outerColor = options.outerColor || colors[0];
        if (resources.backgroundImage) {
            foregroundColor = colors[0].replace(/#([0-9a-fA-F]{6}).*/, '#$188');
            foregroundImage = foregroundColor;
            backgroundColor = backgroundColor.replace(/#([0-9a-fA-F]{6}).*/, '#$188');
            innerColor = innerColor.replace(/#([0-9a-fA-F]{6}).*/, '#$188');
            outerColor = outerColor.replace(/#([0-9a-fA-F]{6}).*/, '#$188');
        }
        let innerImage = innerColor || foregroundImage;
        let outerImage = outerColor || foregroundImage;
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        if (colors.length > 1) {
            let gradient = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height);
            let length = colors.length - 1;
            colors.forEach(function (value, index) {
                gradient.addColorStop(index / length, value);
            });
            foregroundImage = gradient;
        }
        let backgroundImage = resources.backgroundImage ? api.getImageBrush(resources.backgroundImage) : backgroundColor;
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.isPositionPoint(i, j)) {
                    if (api.getValue(i, j) == 1) {
                        context.fillStyle = outerImage;
                        context.fillRect(i * pxWidth, j * pxWidth, 7 * pxWidth, 7 * pxWidth);
                        context.fillStyle = backgroundImage;
                        context.fillRect((i + 1) * pxWidth, (j + 1) * pxWidth, 5 * pxWidth, 5 * pxWidth);
                        context.fillStyle = backgroundColor;
                        context.fillRect((i + 1) * pxWidth, (j + 1) * pxWidth, 5 * pxWidth, 5 * pxWidth);
                        context.fillStyle = backgroundImage;
                        context.fillRect((i + 2) * pxWidth, (j + 2) * pxWidth, 3 * pxWidth, 3 * pxWidth);
                        context.fillStyle = innerImage;
                        context.fillRect((i + 2) * pxWidth, (j + 2) * pxWidth, 3 * pxWidth, 3 * pxWidth);
                        api.setRangeDisabled(i, j, 7, 7);
                    }
                } else {
                    let fillColor = api.getValue(i, j) == 1 ? foregroundImage : backgroundColor;
                    context.fillStyle = fillColor;
                    context.beginPath();
                    context.arc(i * pxWidth, j * pxWidth, 0.5 * pxWidth, 0, 0.5 * Math.PI);
                    context.arc(i * pxWidth + pxWidth, j * pxWidth, 0.5 * pxWidth, 0.5 * Math.PI, Math.PI);
                    context.arc(i * pxWidth + pxWidth, j * pxWidth + pxWidth, 0.5 * pxWidth, Math.PI, 1.5 * Math.PI);
                    context.arc(i * pxWidth, j * pxWidth + pxWidth, 0.5 * pxWidth, 1.5 * Math.PI, 2 * Math.PI);
                    context.closePath();
                    context.fill();
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};



export function glitter(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || colors?.[1] || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        context.fillStyle = colors[0];
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.isPositionPoint(i, j) == 1) {
                    context.fillStyle = innerColor;
                } else if (api.isPositionPoint(i, j) == 2) {
                    context.fillStyle = outerColor;
                } else {
                    let fillColor = colors[(i + j) % colors.length];
                    if (!options.foregroundColor && resources.foregroundImage) {
                        fillColor = foregroundImage;
                    }
                    context.fillStyle = fillColor;
                }
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j)) {
                        context.beginPath();
                        context.arc((i + 3.5) * pxWidth, (j + 3.5) * pxWidth, 3.75 * pxWidth, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        context.fillStyle = backgroundImage;
                        context.beginPath();
                        context.arc((i + 3.5) * pxWidth, (j + 3.5) * pxWidth, 2.8 * pxWidth, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        context.fillStyle = innerColor;
                        context.beginPath();
                        context.arc((i + 1) * pxWidth, (j + 1) * pxWidth, 2.5 * pxWidth, 0, 0.5 * Math.PI);
                        context.arc((i + 6) * pxWidth, (j + 1) * pxWidth, 2.5 * pxWidth, 0.5 * Math.PI, Math.PI);
                        context.arc((i + 6) * pxWidth, (j + 5) * pxWidth + pxWidth, 2.5 * pxWidth, Math.PI, 1.5 * Math.PI);
                        context.arc((i + 1) * pxWidth, (j + 5) * pxWidth + pxWidth, 2.5 * pxWidth, 1.5 * Math.PI, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        api.setRangeDisabled(i, j, 7, 7);
                    } else {
                        if ((i + j) % 2) {
                            context.beginPath();
                            context.arc(i * pxWidth, j * pxWidth, 0.5 * pxWidth, 0, 0.5 * Math.PI);
                            context.arc(i * pxWidth + pxWidth, j * pxWidth, 0.5 * pxWidth, 0.5 * Math.PI, Math.PI);
                            context.arc(i * pxWidth + pxWidth, j * pxWidth + pxWidth, 0.5 * pxWidth, Math.PI, 1.5 * Math.PI);
                            context.arc(i * pxWidth, j * pxWidth + pxWidth, 0.5 * pxWidth, 1.5 * Math.PI, 2 * Math.PI);
                            context.closePath();
                            context.fill();
                        } else {
                            context.beginPath();
                            context.arc((i + 0.5) * pxWidth, (j + 0.5) * pxWidth, 0.5 * pxWidth, 0, 2 * Math.PI);
                            context.closePath();
                            context.fill();
                        }
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};

export function heart(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || colors?.[1] || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        let unit = pxWidth;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    context.save();
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                    } else {
                        let fillColor = colors[(i + j) % colors.length];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                    }
                    if (api.getRangeTrue(i, j, 3, 3)) {
                        unit = 0.92 * pxWidth;
                        context.translate(x + (i + 1.45) * pxWidth, y + (j + 0.95) * pxWidth);
                        context.beginPath();
                        context.arc(-unit, 0, unit, Math.PI, 0, false);
                        context.arc(unit, 0, unit, Math.PI, 0, false); //貝塞尔曲线画心
                        context.bezierCurveTo(1.9 * unit, 1.2 * unit, 0.6 * unit, 1.6 * unit, 0, 3.0 * unit);
                        context.bezierCurveTo(-0.6 * unit, 1.6 * unit, -1.9 * unit, 1.2 * unit, -2 * unit, 0);
                        context.closePath();
                        context.fill();
                        api.setRangeDisabled(i, j, 3, 3);
                    } else if (api.getRangeTrue(i, j, 2, 2)) {
                        unit = 0.5 * pxWidth;
                        context.translate(x + (i + 1) * pxWidth, y + (j + 0.9) * pxWidth);
                        context.beginPath();
                        context.arc(-unit, 0, unit, Math.PI, 0, false);
                        context.arc(unit, 0, unit, Math.PI, 0, false); //貝塞尔曲线画心
                        context.bezierCurveTo(1.9 * unit, 1.2 * unit, 0.6 * unit, 1.6 * unit, 0, 3.0 * unit);
                        context.bezierCurveTo(-0.6 * unit, 1.6 * unit, -1.9 * unit, 1.2 * unit, -2 * unit, 0);
                        context.closePath();
                        context.fill();
                        api.setRangeDisabled(i, j, 2, 2);
                    } else {
                        unit = 0.25 * pxWidth;
                        context.translate(x + (i + 0.5) * pxWidth, y + (j + 0.5) * pxWidth);
                        context.beginPath();
                        context.arc(-unit, 0, unit, Math.PI, 0, false);
                        context.arc(unit, 0, unit, Math.PI, 0, false); //貝塞尔曲线画心
                        context.bezierCurveTo(1.9 * unit, 1.2 * unit, 0.6 * unit, 1.6 * unit, 0, 3.0 * unit);
                        context.bezierCurveTo(-0.6 * unit, 1.6 * unit, -1.9 * unit, 1.2 * unit, -2 * unit, 0);
                        context.closePath();
                        context.fill();
                    }
                    context.restore();
                }
            }
        }
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
}



export function hexagon(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || colors?.[1] || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x + pxWidth / 2, y + pxWidth / 2);
        let sqrt3 = 1.5;//Math.sqrt(3);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                        context.strokeStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                        context.strokeStyle = outerColor;
                    } else {
                        let fillColor = colors[(i + j) % colors.length];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                        context.strokeStyle = fillColor;
                    }
                    if (api.isPositionPoint(i, j)) {
                        context.beginPath();
                        context.moveTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth + 1 * pxWidth);
                        context.lineTo(i * pxWidth + 3 * pxWidth, j * pxWidth - 0.5 * pxWidth);
                        context.lineTo(i * pxWidth + 6.5 * pxWidth, j * pxWidth + 1 * pxWidth);
                        context.lineTo(i * pxWidth + 6.5 * pxWidth, j * pxWidth + 5 * pxWidth);
                        context.lineTo(i * pxWidth + 3 * pxWidth, j * pxWidth + 6.5 * pxWidth);
                        context.lineTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth + 5 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                        context.fillStyle = backgroundImage;
                        context.strokeStyle = backgroundImage;
                        context.beginPath();
                        context.moveTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth + 1.5 * pxWidth + 1 / 14 * pxWidth);
                        context.lineTo(i * pxWidth + 3 * pxWidth, j * pxWidth + 0.5 * pxWidth);
                        context.lineTo(i * pxWidth + 5.5 * pxWidth, j * pxWidth + 1.5 * pxWidth + 1 / 14 * pxWidth);
                        context.lineTo(i * pxWidth + 5.5 * pxWidth, j * pxWidth + 4.5 * pxWidth - 1 / 14 * pxWidth);
                        context.lineTo(i * pxWidth + 3 * pxWidth, j * pxWidth + 5.5 * pxWidth);
                        context.lineTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth + 4.5 * pxWidth - 1 / 14 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                        context.fillStyle = innerColor;
                        context.strokeStyle = innerColor;
                        context.beginPath();
                        context.moveTo(i * pxWidth + 1.5 * pxWidth, j * pxWidth + 2.5 * pxWidth - 5 / 14 * pxWidth);
                        context.lineTo(i * pxWidth + 3 * pxWidth, j * pxWidth + 1.5 * pxWidth);
                        context.lineTo(i * pxWidth + 4.5 * pxWidth, j * pxWidth + 2.5 * pxWidth - 5 / 14 * pxWidth);
                        context.lineTo(i * pxWidth + 4.5 * pxWidth, j * pxWidth + 3.5 * pxWidth + 5 / 14 * pxWidth);
                        context.lineTo(i * pxWidth + 3 * pxWidth, j * pxWidth + 4.5 * pxWidth);
                        context.lineTo(i * pxWidth + 1.5 * pxWidth, j * pxWidth + 3.5 * pxWidth + 5 / 14 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                        api.setRangeDisabled(i, j, 7, 7);
                        context.fillRect(i * pxWidth - 0.25 * pxWidth, j * pxWidth - 0.25 * pxWidth, 0.5 * pxWidth, 0.5 * pxWidth);
                        context.fillRect(i * pxWidth + 5.75 * pxWidth, j * pxWidth - 0.25 * pxWidth, 0.5 * pxWidth, 0.5 * pxWidth);
                        context.fillRect(i * pxWidth - 0.25 * pxWidth, j * pxWidth + 5.75 * pxWidth, 0.5 * pxWidth, 0.5 * pxWidth);
                        context.fillRect(i * pxWidth + 5.75 * pxWidth, j * pxWidth + 5.75 * pxWidth, 0.5 * pxWidth, 0.5 * pxWidth);
                    } else {
                        context.beginPath();
                        if (i % 2) {
                            context.moveTo(i * pxWidth - pxWidth / sqrt3, j * pxWidth - 0.25 * pxWidth);
                            context.lineTo(i * pxWidth - pxWidth / sqrt3 / 2, j * pxWidth - 0.75 * pxWidth);
                            context.lineTo(i * pxWidth + pxWidth / sqrt3 / 2, j * pxWidth - 0.75 * pxWidth);
                            context.lineTo(i * pxWidth + pxWidth / sqrt3, j * pxWidth - 0.25 * pxWidth);
                            context.lineTo(i * pxWidth + pxWidth / sqrt3 / 2, j * pxWidth + 0.25 * pxWidth);
                            context.lineTo(i * pxWidth - pxWidth / sqrt3 / 2, j * pxWidth + 0.25 * pxWidth);
                        } else {
                            context.moveTo(i * pxWidth - pxWidth / sqrt3, j * pxWidth + 0.25 * pxWidth);
                            context.lineTo(i * pxWidth - pxWidth / sqrt3 / 2, j * pxWidth - 0.25 * pxWidth);
                            context.lineTo(i * pxWidth + pxWidth / sqrt3 / 2, j * pxWidth - 0.25 * pxWidth);
                            context.lineTo(i * pxWidth + pxWidth / sqrt3, j * pxWidth + 0.25 * pxWidth);
                            context.lineTo(i * pxWidth + pxWidth / sqrt3 / 2, j * pxWidth + 0.75 * pxWidth);
                            context.lineTo(i * pxWidth - pxWidth / sqrt3 / 2, j * pxWidth + 0.75 * pxWidth);
                        }
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
}



export function rect(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || colors?.[1] || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                    } else {
                        let fillColor = colors[(i + j) % colors.length];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                    }
                    if (api.isPositionPoint(i, j)) {
                        context.fillRect(i * pxWidth, j * pxWidth, 7 * pxWidth, 7 * pxWidth);
                        context.fillStyle = backgroundImage;
                        context.fillRect(i * pxWidth + pxWidth, j * pxWidth + pxWidth, 5 * pxWidth, 5 * pxWidth);
                        context.fillStyle = innerColor;
                        context.beginPath();
                        context.moveTo((i + 3.5) * pxWidth, (j + 1) * pxWidth);
                        context.lineTo((i + 6) * pxWidth, (j + 3.5) * pxWidth);
                        context.lineTo((i + 3.5) * pxWidth, (j + 6) * pxWidth);
                        context.lineTo((i + 1) * pxWidth, (j + 3.5) * pxWidth);
                        context.closePath();
                        context.fill();
                        api.setRangeDisabled(i, j, 7, 7);
                    } else if (api.getRangeTrue(i, j, 1, 1) && api.getRangeTrue(i - 1, j + 1, 3, 1) && api.getRangeTrue(i, j + 2, 1, 1)) {
                        context.beginPath();
                        context.moveTo((i + 0.5) * pxWidth, j * pxWidth);
                        context.lineTo((i + 2) * pxWidth, (j + 1.5) * pxWidth);
                        context.lineTo((i + 0.5) * pxWidth, (j + 3) * pxWidth);
                        context.lineTo((i - 1) * pxWidth, (j + 1.5) * pxWidth);
                        context.closePath();
                        context.fill();
                        api.setRangeDisabled(i, j, 1, 1);
                        api.setRangeDisabled(i - 1, j + 1, 3, 1);
                        api.setRangeDisabled(i, j + 2, 1, 1);
                    } else if (api.getRangeTrue(i, j, 3, 2)) {
                        context.fillRect(i * pxWidth, j * pxWidth, 3 * pxWidth, 2 * pxWidth);
                        api.setRangeDisabled(i, j, 3, 2);
                    } else if (api.getRangeTrue(i, j, 2, 3)) {
                        context.fillRect(i * pxWidth, j * pxWidth, 2 * pxWidth, 3 * pxWidth);
                        api.setRangeDisabled(i, j, 2, 3);
                    } else if (api.getRangeTrue(i, j, 2, 2)) {
                        context.fillRect(i * pxWidth, j * pxWidth, 2 * pxWidth, 2 * pxWidth);
                        api.setRangeDisabled(i, j, 2, 2);
                    }
                }
            }
        }
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                    } else {
                        let fillColor = colors[(i + j) % colors.length];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                    }
                    if (api.getValue(i - 1, j) != 2 && api.getValue(i, j - 1) != 2 && api.getValue(i + 1, j) != 2 && api.getValue(i, j + 1) != 2) {
                        if ((i + j) % 2) {
                            context.beginPath();
                            context.moveTo((i + 0.5) * pxWidth, j * pxWidth);
                            context.lineTo((i + 1) * pxWidth, (j + 0.5) * pxWidth);
                            context.lineTo((i + 0.5) * pxWidth, (j + 1) * pxWidth);
                            context.lineTo(i * pxWidth, (j + 0.5) * pxWidth);
                            context.closePath();
                            context.fill();
                        } else {
                            context.fillRect(i * pxWidth, j * pxWidth, pxWidth, pxWidth);
                            api.setRangeDisabled(i, j, 1, 1);
                        }
                    } else {
                        context.beginPath();
                        context.moveTo((i + 0.5) * pxWidth, j * pxWidth);
                        context.lineTo((i + 1) * pxWidth, (j + 0.5) * pxWidth);
                        context.lineTo((i + 0.5) * pxWidth, (j + 1) * pxWidth);
                        context.lineTo(i * pxWidth, (j + 0.5) * pxWidth);
                        context.closePath();
                        context.fill();
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};



export function star(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || colors?.[1] || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        let drawItem = function (x, y, pxWidth) {
            let unit = pxWidth * 0.6;
            let unit_p = pxWidth * 0.55;
            context.beginPath();
            for (let n = 0; n < 5; n++) {
                context.lineTo(x + Math.cos((18 + n * 72) / 180 * Math.PI) * unit + unit_p, y - Math.sin((18 + n * 72) / 180 * Math.PI) * unit + unit_p);
                context.lineTo(x + Math.cos((54 + n * 72) / 180 * Math.PI) * 0.4 * unit + unit_p, y - Math.sin((54 + n * 72) / 180 * Math.PI) * 0.4 * unit + unit_p);
            }
            context.closePath();
            context.fill();
        };
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        let color = colors[(i + j) % colors.length];
                        let outerColor = options.outerColor || color;
                        context.fillStyle = outerColor;
                    } else {
                        let fillColor = colors[(i + j) % colors.length];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                    }
                    if (api.getRangeTrue(i, j, 3, 3)) {
                        drawItem(i * pxWidth - 0.55 * pxWidth, j * pxWidth - 0.45 * pxWidth, 3.8 * pxWidth);
                        api.setRangeDisabled(i, j, 3, 3);
                    } else if (api.getRangeTrue(i, j, 2, 2)) {
                        drawItem(i * pxWidth - 0.15 * pxWidth, j * pxWidth - 0.12 * pxWidth, 2 * pxWidth);
                        api.setRangeDisabled(i, j, 2, 2);
                    } else {
                        drawItem(i * pxWidth, j * pxWidth, pxWidth);
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};



export function stroke(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        let innerColor = options.innerColor || foregroundImage;
        let outerColor = options.outerColor || colors?.[1] || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        context.fillStyle = colors[0];
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if ((i + j) % 2 && !api.getValue(i - 1, j) && !api.getValue(i + 1, j) && !api.getValue(i, j - 1) && !api.getValue(i, j + 1)) {
                        context.beginPath();
                        context.arc((i + 0.5) * pxWidth, (j + 0.5) * pxWidth, 0.25 * pxWidth, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                    } else {
                        for (let m = 9; m; m--) {
                            for (let n = 9; n; n--) {
                                if (api.getRangeTrue(i, j, m, n)) {
                                    context.fillRect((i + 0.05) * pxWidth, (j + 0.05) * pxWidth, (m - 0.1) * pxWidth, (n - 0.1) * pxWidth);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        let map = JSON.parse(JSON.stringify(data));
        let render = function (i, j) {
            if (api.getValue(i, j) && map[i][j] == 1) {
                if ((i + j) % 2 && !api.getValue(i - 1, j) && !api.getValue(i + 1, j) && !api.getValue(i, j - 1) && !api.getValue(i, j + 1)) {
                } else {
                    for (let m = 9; m; m--) {
                        for (let n = 9; n; n--) {
                            if (api.getRangeTrue(i, j, m, n)) {
                                context.fillRect((i + 0.15) * pxWidth, (j + 0.15) * pxWidth, (m - 0.3) * pxWidth, (n - 0.3) * pxWidth);
                                break;
                            }
                        }
                    }
                }
                //寻找附近
                map[i][j] = 2;
                render(i - 1, j);
                render(i + 1, j);
                render(i, j - 1);
                render(i, j + 1);
            }
        };
        context.lineWidth = 1;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.getValue(i, j) == 1) {
                    if (api.isPositionPoint(i, j) == 1) {
                        context.fillStyle = innerColor;
                    } else if (api.isPositionPoint(i, j) == 2) {
                        context.fillStyle = outerColor;
                    } else {
                        let fillColor = colors[1 + (i * j) % (colors.length - 1)];
                        if (!options.foregroundColor && resources.foregroundImage) {
                            fillColor = foregroundImage;
                        }
                        context.fillStyle = fillColor;
                    }
                    render(i, j);
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};




export function water(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        if (colors.length > 1) {
            let gradient = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height);
            let length = colors.length - 1;
            colors.forEach(function (value, index) {
                gradient.addColorStop(index / length, value);
            });
            foregroundImage = gradient;
        }
        let innerColor = options.innerColor || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x, y);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.isPositionPoint(i, j) == 1) {
                    context.fillStyle = innerColor;
                    context.strokeStyle = innerColor;
                } else if (api.isPositionPoint(i, j) == 2) {
                    context.fillStyle = outerColor;
                    context.strokeStyle = outerColor;
                } else {
                    context.fillStyle = foregroundImage;
                    context.strokeStyle = foregroundImage;
                }
                if (api.getValue(i, j)) {
                    let cx = i * pxWidth;
                    let cy = j * pxWidth + pxWidth / 2;
                    context.beginPath();
                    context.moveTo(cx, cy);
                    if ((api.getValue(i - 1, j) || api.getValue(i, j - 1)) || (api.getValue(i - 1, j - 1))) {
                        api.drawRightAngle(i, j, 0, pxWidth);
                    } else {
                        api.drawRoundBrick(i, j, 0, pxWidth);
                    }
                    if ((api.getValue(i, j - 1) || api.getValue(i + 1, j)) || (api.getValue(i + 1, j - 1))) {
                        api.drawRightAngle(i, j, 1, pxWidth);
                    } else {
                        api.drawRoundBrick(i, j, 1, pxWidth);
                    }
                    if ((api.getValue(i, j + 1) || api.getValue(i + 1, j)) || (api.getValue(i + 1, j + 1))) {
                        api.drawRightAngle(i, j, 2, pxWidth);
                    } else {
                        api.drawRoundBrick(i, j, 2, pxWidth);
                    }
                    if ((api.getValue(i, j + 1) || api.getValue(i - 1, j)) || (api.getValue(i - 1, j + 1))) {
                        api.drawRightAngle(i, j, 3, pxWidth);
                    } else {
                        api.drawRoundBrick(i, j, 3, pxWidth);
                    }
                    context.closePath();
                    context.fill();
                    context.stroke();
                } else if (!api.isPositionPoint(i, j, len)) {
                    if (api.getValue(i, j - 1) && api.getValue(i - 1, j)) {
                        api.fillRound(i, j, 0, pxWidth);
                    }
                    if (api.getValue(i, j + 1) && api.getValue(i - 1, j)) {
                        api.fillRound(i, j, 3, pxWidth);
                    }
                    if (api.getValue(i, j + 1) && api.getValue(i + 1, j)) {
                        api.fillRound(i, j, 2, pxWidth);
                    }
                    if (api.getValue(i, j - 1) && api.getValue(i + 1, j)) {
                        api.fillRound(i, j, 1, pxWidth);
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
};



export function diamond(context, data, options) {
    let len = data.length;
    let margin = context.canvas.width * 0.05;
    let pxWidth = (context.canvas.width - 2 * margin) / len;
    let x = margin;
    let y = margin;
    let api = getAPI(context, data, options);
    let resourcesMap = {};
    if (options.foregroundImage) {
        resourcesMap['foregroundImage'] = options.foregroundImage;
    }
    if (options.backgroundImage) {
        resourcesMap['backgroundImage'] = options.backgroundImage;
    }
    if (options.logo) {
        resourcesMap['logo'] = options.logo;
    }
    api.imageReady(resourcesMap).then(function (resources) {
        let backgroundColor = options.backgroundColor || '#ffffff';
        let foregroundColor = options.foregroundColor || '#000000';
        let colors = foregroundColor.split(',');
        let foregroundImage = colors[0];
        if (!options.foregroundColor && resources.foregroundImage) {
            foregroundImage = api.getImageBrush(resources.foregroundImage);
        }
        if (colors.length > 1) {
            let gradient = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height);
            let length = colors.length - 1;
            colors.forEach(function (value, index) {
                gradient.addColorStop(index / length, value);
            });
            foregroundImage = gradient;
        }
        let innerColor = options.innerColor || foregroundImage;
        let outerColor = options.outerColor || foregroundImage;
        let backgroundImage = backgroundColor;
        if (!options.backgroundColor && resources.backgroundImage) {
            backgroundImage = api.getImageBrush(resources.backgroundImage);
        }
        context.save();
        context.fillStyle = backgroundImage;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.restore();
        context.save();
        context.translate(x + pxWidth / 2, y + pxWidth / 2);
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (api.isPositionPoint(i, j) == 1) {
                    context.fillStyle = innerColor;
                    context.strokeStyle = innerColor;
                } else if (api.isPositionPoint(i, j) == 2) {
                    context.fillStyle = outerColor;
                    context.strokeStyle = outerColor;
                } else {
                    context.fillStyle = foregroundImage;
                    context.strokeStyle = foregroundImage;
                }
                if (api.getValue(i, j)) {
                    context.beginPath();
                    context.moveTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth);
                    if (api.getValue(i - 1, j) || api.getValue(i, j - 1)) {
                        context.lineTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth - 0.5 * pxWidth);
                    }
                    context.lineTo(i * pxWidth, j * pxWidth - 0.5 * pxWidth);
                    if (api.getValue(i + 1, j) || api.getValue(i, j - 1)) {
                        context.lineTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth - 0.5 * pxWidth);
                    }
                    context.lineTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth);
                    if (api.getValue(i + 1, j) || api.getValue(i, j + 1)) {
                        context.lineTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth + 0.5 * pxWidth);
                    }
                    context.lineTo(i * pxWidth, j * pxWidth + 0.5 * pxWidth);
                    if (api.getValue(i - 1, j) || api.getValue(i, j + 1)) {
                        context.lineTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth + 0.5 * pxWidth);
                    }
                    context.closePath();
                    context.fill();
                    context.stroke();
                } else {
                    if (api.getValue(i - 1, j) && api.getValue(i, j - 1) && api.getValue(i - 1, j - 1)) {
                        context.beginPath();
                        context.moveTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth - 0.5 * pxWidth);
                        context.lineTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth);
                        context.lineTo(i * pxWidth, j * pxWidth - 0.5 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                    if (api.getValue(i + 1, j) && api.getValue(i, j - 1) && api.getValue(i + 1, j - 1)) {
                        context.beginPath();
                        context.moveTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth - 0.5 * pxWidth);
                        context.lineTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth);
                        context.lineTo(i * pxWidth, j * pxWidth - 0.5 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                    if (api.getValue(i - 1, j) && api.getValue(i, j + 1) && api.getValue(i - 1, j + 1)) {
                        context.beginPath();
                        context.moveTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth + 0.5 * pxWidth);
                        context.lineTo(i * pxWidth - 0.5 * pxWidth, j * pxWidth);
                        context.lineTo(i * pxWidth, j * pxWidth + 0.5 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                    if (api.getValue(i + 1, j) && api.getValue(i, j + 1) && api.getValue(i + 1, j + 1)) {
                        context.beginPath();
                        context.moveTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth + 0.5 * pxWidth);
                        context.lineTo(i * pxWidth + 0.5 * pxWidth, j * pxWidth);
                        context.lineTo(i * pxWidth, j * pxWidth + 0.5 * pxWidth);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    }
                }
            }
        }
        context.restore();
        context.save();
        api.setText();
        if (resources.logo) {
            api.setLogo(resources.logo);
        }
        context.restore();
    });
}