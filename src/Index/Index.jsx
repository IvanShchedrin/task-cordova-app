import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class Index extends Component {
  static contextTypes = {
    prefix: PropTypes.string,
  };

  render() {
    return (
      <div className="content">
        <h2>Инструменты:</h2>
        <div className="links-wrapper">
          <Link className="button" to={this.context.prefix + '/flashlight'}>Фонарик</Link>
          <Link className="button" to={this.context.prefix + '/level-meter'}>Уровень</Link>
          <Link className="button" to={this.context.prefix + '/ruler'}>Линейка</Link>
        </div>
      </div>
    );
  }
}