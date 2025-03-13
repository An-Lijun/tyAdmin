// @ts-ignore
type TexOption = {
  body: Array<any>,
  mouse_pos_x: number,
  mouse_pos_y: number,
  step: number,
  loop: number,
  line: number,
  time: number,
  op: number,
  colorArr: Array<any>
}
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
  private tailType;
  private animate: boolean;
  private maxWidth: number;
  private minWidth: number;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private exOption: TexOption;
  private showTime: 20;
  private reqAF: number;
  private elementGroup: Array<any>;
  private characters: Array<number | string>;
  private colors: Array<string>;
  private color: string;
  private dotColor: string;
  private lineColor: string;
  private number: number;
  private multi: number;

  constructor(colors, characters, tailType) {

    this.tailType = tailType || 3; //尾拖类型
    this.maxWidth = 20; //尾拖最大宽度
    this.minWidth = 5; //尾拖最小宽度


    this.showTime = 20; //尾拖显示时间
    this.color = ""; //尾拖颜色
    this.dotColor = ''; //点颜色
    this.lineColor = ''; //线颜色
    this.number = 0;  //点数量
    this.colors = colors || ["#F8F8FF", "#FFFFFF", "#ADD8E6", "#7BF2EA", "#C0C0C0", "#E0E0E0"];
    this.multi = 1.5; //点大小
    this.multiDom = null;  //点大小dom
    this.border = null //线宽度
    this.animate = false //是否动画

    this.reqAF = 0
    this.exOption = {
      body: [],
      mouse_pos_x: 0,
      mouse_pos_y: 0,
      step: 0,
      loop: 0,
      line: 0,
      time: 0,
      op: 0,
      colorArr: []
    }
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
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.characters = characters || ["✺", "❆", "❄", "❄", "❄", "✺", "❉", "✹", "✵", "❁", "❆"];
    this.elementGroup = [];

    document.body.appendChild(canvas);
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));

  }
  hexToRgb(hex) {
    return 'rgb(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ')';
  }
  hexToRgba(hex, opacity) {
    return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
  }
  changeType(type) {
    this.stopTail()
    this.tailType = type || 1
    this.init()
  }
  init() {
    const canvas = this.canvas;
    const ctx = this.ctx
    const cwidth = canvas.width, cheight = canvas.height;

    switch (this.tailType) {
      case 1:
        this.exOption = {
          body: [],
          mouse_pos_x: cwidth / 2,
          mouse_pos_y: cheight / 2,
          step: 0,
          loop: 0,
          line: 0,
          // TWO_PI:,
          time: 0,
          op: 1,
          colorArr: [[], [], []]
        }
        for (let s = 0; s < this.showTime; s++) {
          this.exOption.colorArr.forEach((item, index) => {
            item[s] = Math.round(Math.sin(0.3 * s + (index - 1) * 2) * 127 + 128);
          })
        }

        let size = Math.min(cwidth, cheight) / 50;
        let startX = cwidth / 2 + size * (16 * Math.sin(0) * Math.sin(0) * Math.sin(0));
        let startY = cheight - (cheight / 2 + (size * (13 * Math.cos(0) - 5 * Math.cos(0) - 2 * Math.cos(0) - Math.cos(0))));
        for (let i = 0; i < this.showTime; i++) {
          let b = {
            x: startX,
            y: startY
          };
          this.exOption.body.push(b);
        }

        const render1 = () => {
          if (this.animate) {
            this.exOption.time += 0.08;
            this.exOption.time %= 2 * Math.PI;
            let xc = 0, yc = 0;

            if (this.exOption.line <= this.minWidth) {
              this.exOption.op = 1;
              this.exOption.line = this.minWidth + 1;
            }
            if (this.exOption.line >= this.maxWidth) {
              this.exOption.op = -1;
              this.exOption.line = this.maxWidth - 1;
            }


            this.exOption.loop++;
            if (this.exOption.loop == 5) {
              this.exOption.step = (this.exOption.step + 1) % this.showTime;
              this.exOption.loop = 0;
            }

            this.exOption.line = this.exOption.op + this.exOption.line;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            for (let i = (this.exOption.body.length - 1); i > 0; i--) {
              this.exOption.body[i].x = this.exOption.body[i - 1].x;
              this.exOption.body[i].y = this.exOption.body[i - 1].y;
            }
            this.exOption.body[0].x = this.exOption.mouse_pos_x;
            this.exOption.body[0].y = this.exOption.mouse_pos_y;
            ctx.lineWidth = this.exOption.line;
            const rgb = `rgb(${this.exOption.colorArr[0][this.exOption.step]}, ${this.exOption.colorArr[1][this.exOption.step]}, ${this.exOption.colorArr[2][this.exOption.step]})`
            ctx.strokeStyle = rgb;
            ctx.fillStyle = rgb;
            ctx.beginPath();
            ctx.arc((this.exOption.body[0].x), (this.exOption.body[0].y), this.exOption.line / 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(this.exOption.body[0].x, this.exOption.body[0].y);
            for (let s = 0; s < this.exOption.body.length - 2; s++) {
              xc = (this.exOption.body[s].x + this.exOption.body[s + 1].x) / 2;
              yc = (this.exOption.body[s].y + this.exOption.body[s + 1].y) / 2;
              ctx.quadraticCurveTo(this.exOption.body[s].x, this.exOption.body[s].y, xc, yc);
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(xc, yc, this.exOption.line / 2, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          }
          this.reqAF = requestAnimationFrame(this.render.bind(this));
        }
        this.onMouseLeave = () => {
          this.animate = false;
        }
        this.onMouseMove = (event) => {
          this.animate = true;
          if ((Math.abs(this.exOption.mouse_pos_x - event.clientX) > 1) || (Math.abs(this.exOption.mouse_pos_y - event.clientY) > 1)) {
            this.exOption.mouse_pos_x = event.clientX;
            this.exOption.mouse_pos_y = event.clientY;
          }
        }
        this.render = render1
        break;
      case 2:
        const render2 = () => {
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
              this.ctx.translate(element.position.x, element.position.y + 25);
              this.ctx.fillText(element.character, 0, 0);
              this.ctx.restore();
            }
          }
          this.reqAF = requestAnimationFrame(this.render.bind(this));
        }
        this.onMouseMove = (t) => {
          const num = Math.floor(Math.random() * this.colors.length);
          this.createElement(t.clientX, t.clientY, this.colors[num]);
        }
        this.render = render2
        break
      case 3:
        let RAF = (() => {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
        })();
        let warea = {
          x: null,
          y: null,
          max: 20000
        };
        window.onmousemove = function (e) {
          e = e || window.event;
          warea.x = e.clientX;
          warea.y = e.clientY;
        };
        window.onmouseout = function (e) {
          warea.x = null;
          warea.y = null;
        };
        let dots = [];
        for (let i = 0; i < 300; i++) {
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          let xa = Math.random() * 2 - 1;
          let ya = Math.random() * 2 - 1;
          dots.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 8000
            // this.options.number ||
          })
        }
        setTimeout(function () {
          animate5();
        }, 1000);
        const hexToRgba = (hex, opacity) => {
          return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
        }
        const animate5 = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          let ndots = [warea].concat(dots);
          dots.forEach(function (dot) {
            dot.x += dot.xa;
            dot.y += dot.ya;
            dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
            dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
            for (let i = 0; i < ndots.length; i++) {
              let d2 = ndots[i];
              if (dot === d2 || d2.x === null || d2.y === null) continue;
              let xc = dot.x - d2.x;
              let yc = dot.y - d2.y;
              let dis = xc * xc + yc * yc;
              let ratio;
              if (dis < d2.max) {
                if (d2 === warea && dis > (d2.max / 2)) {
                  dot.x -= xc * 0.03;
                  dot.y -= yc * 0.03;
                }
                ratio = (d2.max - dis) / d2.max;
                ctx.beginPath();
                ctx.lineWidth = ratio / 2;
                ctx.strokeStyle = hexToRgba('#A5FBFF', ratio + 0.2);
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(d2.x, d2.y);
                ctx.stroke();
              }
            }
            ndots.splice(ndots.indexOf(dot), 1);
          });
          RAF(animate5);
        }
        break
      case 4:
        window.requestAnimFrame = (function () {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
        })();
        let mouse = {
          x: canvas.width / 2,
          y: canvas.height / 2
        };
        let flames = [];
        let Flame = function () {
          function flame() {
            this.radius = 10;
            this.delete = false;
            this.position = {
              x: mouse.x + ((Math.random() > 0 ? 1 : -1) * Math.random() * 5),
              y: mouse.y
            };
          }
          flame.prototype.Draw = function (ctx) {
            if (this.radius > 0) {
              ctx.beginPath();
              ctx.fillStyle = "rgb(256," + (250 - this.radius * 12) + ",0)";
              ctx.arc(this.position.x, this.position.y - 3 - 30 + this.radius * 3, this.radius, 0, Math.PI * 2, true);
              ctx.closePath();
              ctx.fill();
              this.radius--;
            } else {
              this.delete = true;
            }
          };
          return new flame();
        };
        document.addEventListener('mousemove', function (event) {
          mouse.x = event.clientX;
          mouse.y = event.clientY;
        });

        function Update() {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.beginPath();
          ctx.fillStyle = "rgba(0,0,0,0)";
          ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.closePath();
          ctx.fill();
          let grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
          grad.addColorStop(0, "rgba(255,163,0,0.5)");
          grad.addColorStop(1, "rgba(255,216,148,0)");
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2, true);
          ctx.fillStyle = grad;
          ctx.closePath();
          ctx.fill();
          for (let i = 0; i < flames.length; i++) {
            if (flames[i].delete) {
              flames.splice(i, 1);
              flames.push(new Flame());
            } else {
              flames[i].Draw(ctx);
            }
          }
          window.requestAnimFrame(Update);
        }
        for (let i = 0; i < 10; i++) {
          flames[i] = new Flame();
        }
        Update();
        break;
      case 5:
        let Stage = function () {
          function t(t, n, i) {
            let e = this;
            this.renderList = [], this.needClear = !0, canvas.width = n || document.documentElement.clientWidth, canvas.height = i || document.documentElement.clientHeight, window.onresize = function () {
              canvas.width = n || document.documentElement.clientWidth, canvas.height = i || document.documentElement.clientHeight
            }
          }
          return window.requestAnimationFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
              window.setTimeout(t, 1e3 / 60)
            }
          }(), t.prototype.update = function () {
            let t = this;
            t.needClear && ctx.clearRect(0, 0, canvas.width, canvas.height), t.renderList.forEach(function (n) {
              n(ctx, canvas)
            }), requestAnimationFrame(function () {
              t.update()
            })
          }, t.prototype.onUpdate = function (t) {
            this.renderList.push(t)
          }, t
        }();;
        let Twinkle = function () {
          function t(t, e, a) {
            this.initSymbols(t, e, a), this.particles = [], this._pool = [], this.mouse = new s
          }

          function s(t, s) {
            this.x = t || 0, this.y = s || 0
          }

          function e(t, s, e) {
            this.color = n(t), this.size = 2 * (s + e);
            for (let a = 0, i = o.length; i > a; a++) this.push(this._createSymbol(o[a], s, e))
          }

          function a(t, s, e, a, i, o) {
            this.init(t, s, e, a, i, o)
          }

          function i(t, s, e, a, i) {
            return "rgba" === t ? "rgba(" + s + "," + e + "," + a + "," + i + ")" : "hsla" === t ? "hsla(" + s + "," + e + "%," + a + "%," + i + ")" : ""
          }
          if (!ctx) return $.noop;
          let o = [4, 6, 8, 10, 12],
            h = 2500;
          t.prototype = {
            mouse: null,
            gravity: .035,
            initSymbols: function (t, s, a) {
              this._symbols = new e(t, s, a)
            },
            render: function (t) {
              let s, e, a, i, o, n, r, l, p, c, d, m, u, y, g, f = this.particles,
                v = this.mouse,
                b = this.gravity,
                M = this._symbols,
                x = this._symbols.length,
                _ = this._symbols.size,
                w = .5 * this._symbols.size,
                I = t.canvas.width,
                $ = t.canvas.height;
              if (s = Math.min(.005 * (v.speedX * v.speedX + v.speedY * v.speedY), 1), f.length < h)
                for (e = .5 + 4.5 * s, a = .1 + .5 * s, i = .5 + .5 * s, y = (3 * Math.random() | 0) + (20 * s | 0), u = 0; y > u; u++) this._createParticle(a, e, i);
              for (p = .5 * -I, c = 1.5 * I, d = .5 * -$, m = 1.5 * $, u = 0, y = f.length; y > u; u++) g = f[u], g.vx += .03 * v.speedX * s, g.vy += .03 * v.speedY * s + b, g.x += g.vx + v.speedX, g.y += g.vy + v.speedY, g.scale -= .005, g.angle += Math.random(), g.x + w < p || g.x - w > c || g.y + w < d || g.y - w > m || g.scale <= 0 ? (this._pool.push(g), f.splice(u, 1), y--, u--) : (l = g.scale, o = M[x * Math.random() | 0], Math.random() < .7 && (l *= .2), n = _ * l, r = .5 * n, t.save(), t.globalCompositeOperation = "lighter", t.translate(g.x, g.y), t.rotate(g.angle), t.drawImage(o, 0, 0, _, _, -r, -r, n, n), t.restore());
              t.fill(), v.speedX = v.speedY = 0
            },
            _createParticle: function (t, s, e) {
              let i = t + (s - t) * Math.random(),
                o = 2 * Math.PI * Math.random(),
                h = this._pool.length ? this._pool.shift() : new a;
              h.init(this.mouse.x, this.mouse.y, i * Math.cos(o), i * Math.sin(o), e * Math.random(), 2 * Math.PI * Math.random()), this.particles.push(h)
            }
          }, s.prototype = {
            x: 0,
            y: 0,
            speedX: 0,
            speedY: 0,
            update: function (t, s) {
              this.speedX = .7 * (this.x - t), this.speedY = .7 * (this.y -
                s), this.x = t, this.y = s
            }
          }, e.prototype = [], e.prototype._createSymbol = function (t, s, e) {
            let a, o, h = this.size,
              n = this.size / 2,
              r = this.color;
            a = document.createElement("canvas"), a.width = a.height = h, o = a.getContext("2d"), o.fillStyle = i(r[0], r[1], r[2], r[3], r[4]), o.shadowBlur = e, o.shadowColor = i(r[0], r[1], r[2], r[3], .75 * r[4]);
            let l, p, c, d;
            for (o.beginPath(), l = 1, p = 2 * t; p >= l; l++) c = l % 2 ? .1 * s : s, d = 2 * Math.PI * l / p, o[1 === l ? "moveTo" : "lineTo"](n + c * Math.cos(d), n + c * Math.sin(d));
            return o.fill(), a
          }, a.prototype.init = function (t, s, e, a, i, o) {
            this.x = t || 0, this.y = s || 0, this.vx = e || 0, this.vy = a || 0, this.scale = i || 0, this.angle = o || 0
          };
          let n = function () {
            let t = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
              s = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)$/,
              e = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)$/,
              a = /^hsla\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)\s*\)$/,
              i = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
            return function (o) {
              o = o.replace(/^\s*#|\s*$/g, ""), o = o.toLowerCase();
              let h;
              return (h = o.match(t) || o.match(s)) ? ["rgba", parseInt(h[1], 10), parseInt(h[2], 10), parseInt(h[3], 10), parseFloat(4 === h.length ? 1 : h[4])] : (h = o.match(e) || o.match(a)) ? ["hsla", parseFloat(h[1]), parseFloat(h[2]), parseFloat(h[3]), parseFloat(4 === h.length ? 1 : h[4])] : (3 === o.length && (o = o.replace(/(.)/g, "$1$1")), (h = o.match(i)) ? ["rgba", parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16), 1] : null)
            }
          }();
          return t
        }();;
        let Index = function () {
          let v = new Stage("mouser"),
            m = new Twinkle("#F8EC85", 14, 1);
          m.mouse.update(0, 0), document.body.addEventListener('mousemove', function (e) {
            m.mouse.update(e.clientX, e.clientY)
          }), v.onUpdate(function (e) {
            m.render(e)
          }), v.update();
        }();
        break;
    }
    this.render();
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }
  createElement(x, y, color) {
    const num = Math.floor(Math.random() * this.characters.length);
    const e = new TailElement(this.characters[num], x, y, color);
    this.elementGroup.push(e);
  }
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  render() {
  }
  onMouseLeave(e) {
  }
  onMouseMove(e) {
  }
  stopTail() {
    cancelAnimationFrame(this.reqAF)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseleave", this.onMouseLeave);

  }
}