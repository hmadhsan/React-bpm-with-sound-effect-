import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
  constructor(){
    super()
    this.state = {
      bpm: 100,
      playing: false,
      count: 0,
      beatsPerMesure: 4
    }
    this.click1 = new Audio (click1);  //like we are importing sound which we have downloaded
    this.click2 = new Audio (click2);
  }

  handleBpm = (event) => {
    const {bpm} = event.target.value //mean when user will click on slider it will be trigger and will change 
    //stop old timer and start new one 
    if(this.state.playing){
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
      
    }
    else {
      this.setState({
        count: 0,
        bpm
      })
    }
    this.setState({bpm})
    
  }
/////////////
  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };
/////////
  playClick = () =>{
    const {count, beatsPerMesure} = this.state;
    //changing the sound means 1st sound one will run then sound 2
    if( count % beatsPerMesure === 0 ){
      this.click2.play()
    } else {
      this.click1.play()
    }
    //keep the track which beat we are on
    this.setState({
      count: (this.state.count + 1 ) % this.state.beatsPerMesure //mean count +1 ho to agli beat ya sound ajae in simple words

    });
  };


render() {
const {bpm, playing} = this.state
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpm} /> 
        </div>
        <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
  }
}

export default Metronome;