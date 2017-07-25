import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import PropTypes from 'prop-types';

import PageWrapper from './PageWrapper/PageWrapper.jsx';
import Index from './Index/Index.jsx';
import Flashlight from './Flashlight/Flashlight.jsx';
import LevelMeter from './LevelMeter/LevelMeter.jsx';
import Ruler from './Ruler/Ruler.jsx';

export default class App extends Component {
  static childContextTypes = {
    prefix: PropTypes.string,
  };

  componentWillMount() {
    this.prefix = location.pathname.replace(/\/$/, '');
  }

  getChildContext() {
    return {
      prefix: this.prefix,
    };
  }

  render() {
    const prefix = this.prefix;

    return (
      <Router history={browserHistory}>
        <Route path={prefix} component={PageWrapper}>
          <IndexRoute component={Index} />
          <Route path="flashlight" component={Flashlight} />
          <Route path="level-meter" component={LevelMeter} />
          <Route path="ruler" component={Ruler} />
        </Route>
      </Router>
    );
  }
}