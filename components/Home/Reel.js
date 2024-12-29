import React, { Component } from 'react'
import style from './Reel.module.scss';
import { TypeAnimation } from 'react-type-animation';
import Router,{useRouter,withRouter} from 'next/router'
class Reel extends Component {
    render() {
        return (
            <div className={style.container}>
              <div className={style.imgCont}>
               <img src='ram10.png'/>
               </div>
               <div className={style.detCont}>
                 {/*<h2>Typical Bracket Contests Alternative</h2>*/}
                 <h2>RAM Fantasy Tournaments</h2>
                 <div className={style.typeDiv}>
             <TypeAnimation
      sequence={[
        'March Madness',
        1000,
        'UFC',
        1000,
        'FIFA MAJORS',
        1000,
        'NFL PLAYOFFS',
        1000
      ]}
      wrapper="span"
      speed={50}
      className={style.typeP}
      repeat={Infinity}
    /></div>
                 <p>RAM allows people from all circles to enjoy every round of major sports events with newfound excitement as you'll never have so much fun rooting for the underdogs.</p>
                 {/*<button>CLICK TO ENTER GAME</button>*/}
                 <button  onClick={()=>Router.push('/events')}>MAKE OR VIEW MY PICKS</button>
               </div>
            </div>
        )
    }
}
export default Reel
