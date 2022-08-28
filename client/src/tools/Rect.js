import Tool from "./Tool";

export default class Rect extends Tool{
    constructor(canvas){
        super(canvas);
        this.eventler()
    }

    eventler() {
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        this.canvas.onmousedown = this.mouseDown.bind(this);
    }

    mouseDown(e){
        this.isMouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }
    mouseUp(e){
        this.isMouseDown = false;
    }
    mouseMove(e){
        if(this.isMouseDown){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x, y, w, h){
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h,);
            this.ctx.fill();
            this.ctx.stroke();
        }
    }
}