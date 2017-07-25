import React, { PureComponent } from 'react';

export default class Flashlight extends PureComponent {
  intensity = 1;

  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      isTurnedOn: false,
    }
  }

  componentWillMount() {
    window.plugins.flashlight.available((isAvailable) => {
      this.setState({ isAvailable });

      if (isAvailable) {
        this.switchOn();
      } else {
        console.log('not available');
      }
    });
  }

  componentWillUnmount() {
    if (this.state.isTurnedOn) {
      this.switchOff();
    }
  }

  switchOn = () => {
    window.plugins.flashlight.switchOn(
      this.handleSwitchOnSuccess,
      this.handleSwitchOnError,
      { intensity: this.intensity },
    );
  };

  switchOff = () => {
    window.plugins.flashlight.switchOff();
    this.setState({
      isTurnedOn: false,
    })
  };

  handleSwitchOnSuccess = () => {
    this.setState({
      isAvailable: true,
      isTurnedOn: true,
    });
  };

  handleSwitchOnError = () => {
    this.setState({
      isAvailable: false,
      isTurnedOn: false,
    });
  };

  handleSwitch = () => {
    this.state.isTurnedOn ? this.switchOff() : this.switchOn();
  };

  render() {
    const { isAvailable, isTurnedOn } = this.state;

    return (
      <div className="content">
        {
          isAvailable ?
            <div className="button" onClick={this.handleSwitch}>
              {isTurnedOn ? 'Выключить' : 'Включить'}
            </div> :
            <div>Фонарик недоступен :(</div>
        }
      </div>
    );
  }
}