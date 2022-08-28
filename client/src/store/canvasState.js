import { makeAutoObservable } from "mobx";

class CanvasState{
    canvas = null
    undoList = []
    redoList = []
    username = ''

    constructor(){
        makeAutoObservable(this)
    }

    setCanvas(canvas){
        this.canvas = canvas;
    }

    setUsername(username) {
        this.username = username;
    }

    addUndo(data){
        this.undoList.push(data)
    }

    addRedo(data){
        this.redoList.push(data)
    }

    undo(){
        const ctx = this.canvas.getContext('2d')
        if(this.undoList.length > 0){
            let lastData = this.undoList.pop();
            let img = new Image();

            this.redoList.push(this.canvas.toDataURL())

            img.src = lastData
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo(){
        const ctx = this.canvas.getContext('2d')
        if(this.redoList.length > 0){
            let lastData = this.redoList.pop();
            let img = new Image();

            this.undoList.push(this.canvas.toDataURL())

            img.src = lastData
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new CanvasState()