import React from 'react';
import images from 'Assets/images';
import { makeStyles, Tooltip, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  infoIcon: {
    height: '16px',
    paddingLeft: '10px',
  },
});
/**
 * ToolTipText Component
 */
const ToolTipText = (props) => {
  const { title = '', placement = 'right' } = props;
  const classes = useStyles();
  return (
    <Tooltip
      data-testid="tooltip-component"
      title={<Typography variant="body1">{title}</Typography>}
      placement={placement}
    >
      <img
        data-testid="tooltip-icon-image"
        className={classes.infoIcon}
        src={images.iconInfo}
        alt="information"
      />
    </Tooltip>
  );
};

ToolTipText.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.string,
};

export default ToolTipText;
