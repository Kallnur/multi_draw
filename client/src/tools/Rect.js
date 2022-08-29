import Tool from "./Tool";

export default class Rect extends Tool{
    constructor(canvas, socket, id){
        super(canvas, socket, id);
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
        this.socket.send(JSON.stringify({
            method: 'DRAW',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.ctx.fillStyle
            }
        }))
    }
    mouseMove(e){
        if(this.isMouseDown){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height)
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

    static staticDraw(ctx, x, y, w, h, color){
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.rect(x, y, w, h,);
        ctx.fill();
        ctx.stroke();
    }
}