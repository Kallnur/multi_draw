import Tool from "./Tool";

export default class Pen extends Tool{
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
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseUp(e){
        this.isMouseDown = false;
    }
    mouseMove(e){
        if(this.isMouseDown){
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    draw(x, y){
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        console.log('Draw pen');
    }
}