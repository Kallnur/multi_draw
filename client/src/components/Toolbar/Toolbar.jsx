import React from 'react'
import classes from '../Settings/Settings.module.css'
import pencil from '../../assets/icons/pencil.png'
import circle from '../../assets/icons/circle.png'
import eraser from '../../assets/icons/eraser.png'
import line from '../../assets/icons/line.png'
import rect from '../../assets/icons/rect.png'
import save from '../../assets/icons/save.png'
import undo from '../../assets/icons/undo.png'
import redo from '../../assets/icons/undo.png'
import Button from '../UI/Button'
import toolState from '../../store/toolState'
import Pen from '../../tools/Pen'
import canvasState from '../../store/canvasState'
import Rect from '../../tools/Rect'
import Eraser from '../../tools/Eraser'

const Toolbar = () => {

    const changeColors = (e) =>{
        toolState.setFillColor(e.target.value);
        toolState.setStrokeColor(e.target.value);
    }

  return (
    <div className={classes.Bar}>
        <Button 
            className={[classes.btn, classes.pencil].join(' ')} 
            icon={pencil} 
            alt='pen'
            onClick={() => toolState.setTool(new Pen(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
        />
        <Button 
            className={[classes.btn, classes.circle].join(' ')} 
            icon={circle} 
            alt='pen'
        />
        <Button 
            className={[classes.btn, classes.rect].join(' ')} 
            icon={rect} 
            alt='pen'
            onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
        />
        <Button className={[classes.btn, classes.line].join(' ')} icon={line} alt='pen'/>
        <Button 
            className={[classes.btn, classes.eraser].join(' ')} 
            icon={eraser} 
            alt='pen'
            onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
        />
        <input className={classes.color} type="color" onChange={changeColors} />
        <Button 
            className={[classes.btn, classes.undo].join(' ')} 
            icon={undo} 
            alt='pen'
            onClick={() => canvasState.undo()}
        />
        <Button 
            className={[classes.btn, classes.redo].join(' ')} 
            icon={redo} 
            alt='pen'
            onClick={() => canvasState.redo()}
        />
        <Button className={[classes.btn, classes.save].join(' ')} icon={save} alt='pen'/>
    </div>
  )
}

export default Toolbar