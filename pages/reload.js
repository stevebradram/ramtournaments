import React, { Component } from 'react'
import Router from 'next/router';

class reload extends Component {
    componentDidMount=()=>{
        //Router.back()
        Router.push('/events')
    }
  render() {
    return (
      <div>reload</div>
    )
  }
}

export default reload