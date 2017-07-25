import React, { PureComponent } from 'react';

export default class Flashlight extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
      showInput: false, // todo
      pxPerMM: 0,
      width: 0,
      height: 0,
    }
  }

  componentWillMount() {
    window.screen.orientation.lock('portrait');

    window.plugins.screensize.get(
      this.handleSuccess,
      () => this.setState({ isAvailable: false }),
    );
  }

  handleSuccess = (result) => {
    if (!result.width || !result.height) {
      this.setState({ isAvailable: false });
      return;
    }

    if (!result.diameter && result.scale && result.width && result.height) {
      this.setState({
        width: result.width,
        height: result.height,
        density: result.scale,
        isAvailable: true,
        showInput: true,
      });
      return;
    }

    this.calculateSizes(
      result.width,
      result.height,
      result.diameter,
      result.densityValue,
    );
  };

  calculateSizes = (width, height, diameter, density) => {
    const pxDiameter = Math.sqrt(width * width + height * height) ;
    const ratio = height / pxDiameter;
    const pxPerMM = height / (diameter * ratio * 25.4 * density);

    this.setState({
      pxPerMM, width, height,
      isAvailable: true
    });
  };

  handleInputChange = (event) => {
    this.calculateSizes(
      this.state.width,
      this.state.height,
      event.target.value.replace(/[^\d.-]/g, ''),
      this.state.density,
    );
  };

  render() {
    const { pxPerMM, height, isAvailable, showInput } = this.state;
    let pointsComponents = [];

    if (pxPerMM > 0) {
      const points = height / pxPerMM;

      for (let index = 0; index < points; index++) {
        pointsComponents.push(
          <div
            className="ruler__point"
            style={{ top: `${pxPerMM * index}px` }}
            key={index}
          >
            { index % 10 === 0 ? <span>{index}</span> : '' }
          </div>
        );
      }
    }

    return (
      <div className="content">
        {
          isAvailable ? (
            <div className="ruler">
              { pointsComponents }
              {
                showInput ?
                  <div className="input-wrapper">
                    <h3>Введи диагональ экрана:</h3>
                    <input onChange={this.handleInputChange} />
                  </div> : null
              }
            </div>
          ) : 'Линейка не работает :('
        }
      </div>
    );
  }
}
