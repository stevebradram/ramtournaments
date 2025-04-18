import React, { Component } from 'react'
import styles from "@/styles/Home.module.scss";
import Reel from '../components/Home/Reel'
import Exp from '../components/Home/Exp'
import Testimonials from '../components/Home/Testimonials'
import HowToPlay from '../components/Home/HowToPlay'
import About from '../components/Home/About'
import Results from '../components/Home/Results'
import TheEvents from '../components/Home/UFCEvent'
import Meta from '../components/Meta'
class index extends Component {
  render() {
    return (
      <><Meta/>
      <div className={styles.container}>
      <Reel/>
      <TheEvents/>
      <HowToPlay/>
      <About/>
      <Testimonials/>
      <Exp/>
      </div>
      </>
    )
  }
}

export default index
