import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayGameButton from '../components/PlayGameButton';
import InputInitial from '../components/Input';
import ConfigurationButton from '../components/ConfigurationButton';

class Start extends Component {
  componentDidMount() {
    localStorage.removeItem('state');
  }

  render() {
    return (
      <div>
        <div>
          <ConfigurationButton />
        </div>
        <div>
          <InputInitial />
        </div>
        <div>
          <PlayGameButton />
        </div>
      </div>
    );
  }
}

export default connect()(Start);
