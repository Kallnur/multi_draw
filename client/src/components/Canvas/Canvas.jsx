import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import Pen from '../../tools/Pen';
import Rect from '../../tools/Rect';
import Modal from '../Modal/Modal';
import classes from './Canvas.module.css'
import axios from 'axios';

const Canvas = observer(() => {

    const [isModal, setIsModal] = useState(true);
    const canvasRef = useRef(null);
    const { id } = useParams();

    const mouseDown = () => {
        canvasState.addUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:8008/image?id=${id}`, {img: canvasRef.current.toDataURL()})
        .then(data => {console.log(data);})
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current) 
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:8008/image?id=${id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if(canvasState.username){
            console.log(canvasState.username);
            const socket = new WebSocket('ws://localhost:8008')
            canvasState.setSocket(socket)
            canvasState.setSessionId(id)
            toolState.setTool(new Pen(canvasRef.current, socket, id))
            socket.onopen = () => {
                console.log('connect succes');
                socket.send(JSON.stringify({
                    id: id,
                    username: canvasState.username,
                    method: 'CONNECTION'
                }))
            }
            socket.onmessage = (e) => {
                let msg = JSON.parse(e.data)
                switch(msg.method){
                    case 'CONNECTION': {
                        console.log(`User ${msg.username} connected`);
                        break
                    }
                    case 'DRAW': {
                        drawHundler(msg)
                        break
                    }
                }
            }
        }
    }, [canvasState.username])

    const drawHundler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d')
        switch(figure.type){
            case 'pen': {
                Pen.draw(ctx, figure.x, figure.y)
                break
            }
            case 'rect': {
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            }
            case 'finish': {
                ctx.beginPath()
                break
            }
        }
    }

    return (
        <div className={classes.Canvas}>
            {
                isModal ? <Modal setIsModal={setIsModal}/> : null
            }
            <canvas 
                ref={canvasRef} 
                id='canvas' 
                width={'1100px'} 
                height={'550px'} 
                onMouseDown={() => mouseDown()}
            ></canvas>
        </div>
    )
})

export default Canvas