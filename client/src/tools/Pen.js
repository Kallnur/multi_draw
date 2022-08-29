import Tool from "./Tool";

export default class Pen extends Tool{
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
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseUp(e){
        this.isMouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'DRAW',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
    }
    mouseMove(e){
        if(this.isMouseDown){
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'DRAW',
                id: this.id,
                figure: {
                    type: 'pen',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop
                }
            }))
        }
    }

    static draw(ctx, x, y){
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}