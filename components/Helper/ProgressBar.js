import React from 'react'
import style from './ProgressBar.module.scss'
function ProgressBar({message,opacity}) {
    return (
        <div className={style.cont} style={{backgroundColor:'#00000022'}}>
        <div className={style.spinner2}></div>
         <p>{message}</p>
        </div>
    )
}

export default ProgressBar
