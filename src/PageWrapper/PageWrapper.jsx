import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class PageWrapper extends Component {
  static contextTypes = {
    prefix: PropTypes.string,
  };

  render() {
    const prefix = this.context.prefix;

    return (
      <div className="page-wrapper">
        <div className="header">
          {
            location.pathname.replace(/\/$/, '') === prefix ? null : (
              <Link className="button" to={prefix}>{'<-'} Назад</Link>
            )
          }
        </div>
        {
          this.props.children
        }
      </div>
    );
  }
}