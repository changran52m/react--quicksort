import React, { Component } from 'react';
import './App.css';
import Quicksort from './quicksort'
import _ from 'lodash'

class App extends Component {
  constructor() {
    super();

    this.state = this.initializeArray(100);
  }

  initializeArray(N) {
    if (N >= 0) {
      let array = Array.from(new Array(N),(val ,index) => index);

      this.renderQueue = [];
      this.running = false;

      return {
        MAX: N,
        array: _.shuffle(array)
      }
    } else {
      return this.initializeArray(0);
    }
  }

  onStart() {
    Quicksort.sort(this.state.array, null, null, array => {
      let cloned = _.clone(array);

      // console.log(`Push: ${cloned}`);

      this.renderQueue.push(cloned);

      if (!this.running) {
        this.processRenderQueue()
      }
    });
  }

  processRenderQueue() {
    if (this.renderQueue.length) {
      let array = this.renderQueue.shift();

      // console.log(`Shift: ${array}`);
      this.setState({
        array: array
      })

      this.running = true;
    } else {
      this.running = false;
    }
  }

  componentDidUpdate() {
    _.delay(this.processRenderQueue.bind(this), 0);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Quicksort</h2>
          <input type='number' value={this.state.MAX} onChange={e => this.setState(this.initializeArray(parseInt(e.target.value, 10)))}/>
          <button onClick={this.onStart.bind(this)}>Sort</button>
        </div>
        <ul className='App-body'>
          {
            _.map(this.state.array, item => {
              let style = {
                height: `${item / this.state.MAX * 100}%`
              }
              return (
                <li key={item} style={style}></li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
