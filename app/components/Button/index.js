/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Button, Link } from '@material-ui/core';

/**
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 * @param {Object} props Properties for the controller
 */
function ButtonComponent(props) {
  // Render an anchor tag
  let button = (
    <Link
      component="button"
      href={props.href}
      onClick={props.onClick}
      {...props}
      className={props.className}
    >
      {Children.toArray(props.children)}
    </Link>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    if (!props.secondary) {
      button = (
        <Button
          variant="contained"
          color={props.color || 'primary'}
          onClick={props.handleRoute}
          disabled={props.disabled}
          component={props.component}
          className={props.className}
        >
          {Children.toArray(props.children)}
        </Button>
      );
    } else {
      button = (
        <Button
          variant="outlined"
          color={props.color || 'primary'}
          onClick={props.handleRoute}
          disabled={props.disabled}
          component={props.component}
          className={props.className}
        >
          {Children.toArray(props.children)}
        </Button>
      );
    }
  }

  return button;
}

ButtonComponent.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  component: PropTypes.string,
  className: PropTypes.string,
};

export default ButtonComponent;
