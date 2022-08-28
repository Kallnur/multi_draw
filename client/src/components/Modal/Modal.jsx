import { useRef } from 'react';
import canvasState from '../../store/canvasState';
import classes from '../Canvas/Canvas.module.css'

function Modal({setIsModal}) {

    const nameInput = useRef(null);

    const hundleSubmit = () => {
        if(nameInput.current.value.length > 2){
            canvasState.setUsername(nameInput.current.value)
            setIsModal(false)
        }
    }

    return (
        <div className={classes.modal}>
            <div className={classes.modalBody}>
                <input ref={nameInput} type="text" placeholder='Enter your name'/>
                <button onClick={hundleSubmit}>
                    Connect
                </button>
            </div>
        </div>
    )
}

export default Modal