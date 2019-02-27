import React, { Component } from 'react'
import photo from '../images/gym.jpg'

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <img alt="gym" src={photo} / >
      </div>
    )
  }
}
