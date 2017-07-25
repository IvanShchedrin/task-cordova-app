import React, { PureComponent } from 'react';

export default class Flashlight extends PureComponent {
  watchOptions = {
    frequency: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      watchId: null,
      isAvailable: true,
      position: {
        x: 0, y: 0,
      },
    }
  }

  componentWillMount() {
    window.screen.orientation.lock('portrait');

    const watchId = navigator.accelerometer.watchAcceleration(
      this.handleMove,
      () => this.setState({ isAvailable: false }),
      this.watchOptions,
    );

    this.setState({ watchId });
  }

  componentWillUnmount() {
    window.screen.orientation.unlock();
    navigator.accelerometer.clearWatch(this.state.watchId);
  }

  handleMove = ({ x, y }) => {
    this.setState({
      position: { x, y },
    })
  };

  render() {
    const { isAvailable, position: { x, y } } = this.state;

    return (
      <div className="content">
        {
          isAvailable ?
            <div className="level-meter">
              <div className="level-meter__center-x" />
              <div className="level-meter__center-y" />
              <div
                className="level-meter__point"
                style={{ left: `${90 + x * 10}px`, top: `${90 - (y * 10)}px` }}
              />
            </div> :
            <div>Акселерометр не поддерживается :(</div>
        }
      </div>
    );
  }
}