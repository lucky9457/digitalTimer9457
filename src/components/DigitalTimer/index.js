// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isclickedStart: false, settimer: 25, minutes: 25, seconds: 0}

  tick = () => {
    const {minutes, seconds} = this.state
    console.log('a')
    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerID)
    } else if (minutes >= 0) {
      if (seconds === 0) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: 59,
        }))
      } else if (seconds > 0) {
        this.setState(prevState => ({
          seconds: prevState.seconds - 1,
        }))
      }
    } else {
      clearInterval(this.timerID)
    }
  }

  SubSetTimer = () => {
    const {minutes, isclickedStart} = this.state
    if (!isclickedStart) {
      if (minutes > 0) {
        this.setState(prevState => ({
          settimer: prevState.settimer - 1,
          minutes: prevState.settimer - 1,
        }))
      }
    }
  }

  AddsetTimer = () => {
    const {isclickedStart} = this.state
    if (!isclickedStart) {
      this.setState(prevState => ({
        settimer: prevState.settimer + 1,
        minutes: prevState.settimer + 1,
      }))
    }
  }

  playPauseButton = () => {
    const {minutes, seconds} = this.state
    const {isclickedStart} = this.state
    console.log(isclickedStart)
    if (isclickedStart) {
      this.componentWillUnmount()
    } else {
      this.componentidMount()
    }
    if (minutes === 0 && seconds === 0) {
      clearInterval(this.timerID)
    } else {
      this.setState(prevState => ({
        isclickedStart: !prevState.isclickedStart,
      }))
    }
  }

  componentidMount = () => {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount = () => {
    this.clear()
  }

  clear = () => {
    console.log('clear')
    clearInterval(this.timerID)
  }

  reset = () => {
    this.componentWillUnmount()
    const {isclickedStart} = this.state
    if (isclickedStart) {
      this.setState(prevState => ({
        minutes: prevState.settimer,
        seconds: 0,
        isclickedStart: !prevState.isclickedStart,
      }))
    } else {
      this.setState(prevState => ({
        minutes: prevState.settimer,
        seconds: 0,
      }))
    }
  }

  render() {
    const {isclickedStart, settimer, minutes, seconds} = this.state
    const pauseOrStart = isclickedStart ? 'Pause' : 'Start'

    const PauseOrRunning = isclickedStart ? 'Running' : 'Paused'
    const altTextImage = isclickedStart ? 'pause icon' : 'play icon'
    const pauseOrStartImage = isclickedStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    let minutess
    if (minutes < 10) {
      minutess = `0${minutes}`
    } else {
      minutess = minutes
    }
    let finalsec
    if (seconds < 10) {
      finalsec = `0${seconds}`
    } else {
      finalsec = seconds
    }

    return (
      <div className="main">
        <h1 className="digital">Digital Timer</h1>

        <div className="horizontal_sec_container">
          <div className="backgroundimageTimer">
            <div className="timeWhiteBac">
              <h1 className="time">{`${minutess}:${finalsec}`}</h1>
              <p className="pause-resume">{PauseOrRunning}</p>
            </div>
          </div>

          <div className="sec_horizontal_cont">
            <div className="start-reset-cont">
              <div className="play-btn-cont">
                <img
                  onClick={this.playPauseButton}
                  alt={altTextImage}
                  className="playbtn"
                  src={pauseOrStartImage}
                />
                <button
                  onClick={this.playPauseButton}
                  type="button"
                  className="start"
                >
                  {pauseOrStart}
                </button>
              </div>
              <div className="play-btn-cont">
                <img
                  onClick={this.reset}
                  alt="reset icon"
                  className="resetbtn"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />

                <button onClick={this.reset} type="button" className="start">
                  Reset
                </button>
              </div>
            </div>

            <p className="setlimit">Set Timer limit</p>
            <div className="btns-cont">
              <button onClick={this.SubSetTimer} type="button" className="btn">
                -
              </button>
              <p className="timer-count">{settimer}</p>
              <button onClick={this.AddsetTimer} type="button" className="btn">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
