import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ConfigurationButton.css';

class ConfigurationButton extends Component {
  render() {
    return (
      <Link to="/configuration" data-testid="config-button" className="config-button">
        ● CONFIGURAÇÔES
      </Link>
    );
  }
}

export default ConfigurationButton;
