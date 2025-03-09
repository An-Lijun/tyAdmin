class TailElement {
    constructor(character, x, y, color) {
        this.character = character;
        this.lifeSpan = 150;
        this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 };
        this.position = { x: x - 10, y: y - 20 };
        this.color = color;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
    }
}

export default class RenderTail {
    constructor(colors, characters) {
        // document.body
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          z-index: 8888;
          pointer-events: none;
        `;
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.colors = colors || ["#F8F8FF", "#FFFFFF", "#ADD8E6", "#7BF2EA", "#C0C0C0", "#E0E0E0"];
        this.characters = characters || ["✺", "❆", "❄", "❄", "❄", "✺", "❉", "✹", "✵", "❁", "❆"];
        this.elementGroup = [];
        this.canvas = canvas;
        console.log(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.reqAF = null;
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.render();
    }

    createElement(x, y, color) {
        const num = Math.floor(Math.random() * this.characters.length);
        const e = new TailElement(this.characters[num], x, y, color);
        this.elementGroup.push(e);
    }

    onMouseMove(t) {
        const num = Math.floor(Math.random() * this.colors.length);
        this.createElement(t.clientX, t.clientY, this.colors[num]);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.elementGroup.length; i++) {
            const element = this.elementGroup[i];
            element.update();
            if (element.lifeSpan < 0) {
                this.elementGroup.splice(i, 1);
                i--;
            } else {
                const scale = element.lifeSpan / 120;
                this.ctx.save();
                this.ctx.font = `${25 * scale}px Arial`;
                this.ctx.fillStyle = element.color;
                this.ctx.globalAlpha = scale;
                this.ctx.translate(element.position.x, element.position.y);
                this.ctx.fillText(element.character, 0, 0);
                this.ctx.restore();
            }
        }
        this.reqAF = requestAnimationFrame(this.render.bind(this));
    }

    stopRender() {
        cancelAnimationFrame(this.reqAF);
    }
}