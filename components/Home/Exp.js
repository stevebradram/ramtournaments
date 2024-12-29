import React, { Component } from 'react'
import style from './Exp.module.scss';
import Router,{useRouter,withRouter} from 'next/router'
class Exp extends Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.cont1}>
                <img className={style.img0} src='ram14.png'/>
                </div>
                <div className={style.cont2}>
                <img className={style.img1} src='ram12.png'/>
                <img className={style.img2} src='ram13.png'/>
                </div>
                <div className={style.cont3}>
                    <h2>Experience the future of fantasy sports</h2>
                    <p>You will never have so much fun rooting for the underdogs.</p>
                    <button onClick={()=>Router.push('/events')}>MAKE OR VIEW MY PICKS</button>
                </div>
            </div>
        )
    }
}

export default Exp
