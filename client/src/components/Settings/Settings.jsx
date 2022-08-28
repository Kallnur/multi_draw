import React from 'react'
import toolState from '../../store/toolState'
import classes from './Settings.module.css'

const Settings = () => {
  return (
    <div className={classes.setBar}>
        <label htmlFor="lineWidth">Width</label>
        <input id='lineWidth' type="number" defaultValue={1} min={1} max={15} 
            onChange={(e) => toolState.setLineWidth(e.target.value)}
            onKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="colorBorder">Border</label>
        <input id='colorBorder' type="color" 
            onChange={(e) => toolState.setStrokeColor(e.target.value)}
        />
    </div>
  )
}

export default Settings