import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import Pen from '../../tools/Pen';
import Rect from '../../tools/Rect';
import Modal from '../Modal/Modal';
import classes from './Canvas.module.css'

const Canvas = observer(() => {

    const [isModal, setIsModal] = useState(true);
    const canvasRef = useRef(null);

    const mouseDown = () => {
        canvasState.addUndo(canvasRef.current.toDataURL())
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Pen(canvasRef.current))
    }, [])

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8008')
    }, [])

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