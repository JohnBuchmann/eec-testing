/*
 * Pginator Component
 *
 * This create a paginator with customs names, it will return current id position.
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Colors } from 'Theme';
import useCounter from '../../utils/hooks/useCounter';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    '& > button': {
      backgroundColor: Colors.white,
      border: 'none',
      outline: 'none',
      padding: '0px',
    },
  },
  enabled: {
    color: Colors.mountainMeadow,
    cursor: 'pointer',
    height: '50px',
  },
  content: {
    padding: '15px',
  },
  labelAction: {
    color: Colors.mountainMeadow,
    border: `solid 2px ${Colors.mountainMeadow}`,
    borderRadius: '20%',
    padding: '5px 10px 5px 10px',
    textDecoration: 'none',
    fontSize: 16,
  },
  previousButtonMargin: {
    marginRight: '5px',
  },
  nextButtonMargin: {
    marginLeft: '5px',
  },
});

/**
 * Paginator creates a Previous and Next Options avoiding going out of the limits
 * @param {number} startPosition Position to start
 * @param {number} minPosition Minimum available position on the left side
 * @param {number} maxPosition Maximum available position on the right side
 * @param {string} leftLabel Label to display on the Previous, Default Previous Device
 * @param {string} rightLabel Label to display on the Next, Default Next Device
 * @param {function} onPositionClick Function to execute when changing value, it will send current position
 */
export const Paginator = ({
  startPosition,
  minPosition = 0,
  maxPosition = 5,
  leftLabel = 'Previous Device',
  rightLabel = 'Next Device',
  onPositionClick,
}) => {
  const classes = useStyles();

  const { counter, increment, decrement, resetCounter } = useCounter(
    startPosition
  );

  useEffect(() => {
    onPositionClick(counter);
  }, [counter]);

  useEffect(() => {
    resetCounter(startPosition);
  }, [startPosition]);

  const nextButtonClick = () => {
    if (counter >= maxPosition) {
      onPositionClick(minPosition);
      resetCounter(minPosition);
    } else {
      increment();
    }
  };

  const backButtonClick = () => {
    if (counter <= minPosition) {
      onPositionClick(maxPosition);
      resetCounter(maxPosition);
    } else {
      decrement();
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <button
          type="button"
          className={classes.enabled}
          onClick={backButtonClick}
        >
          <span
            className={`${classes.labelAction} ${classes.previousButtonMargin}`}
          >
            ❮
          </span>
          {leftLabel}
        </button>
        <button
          type="button"
          className={classes.enabled}
          onClick={nextButtonClick}
        >
          {rightLabel}
          <span
            className={`${classes.labelAction} ${classes.nextButtonMargin}`}
          >
            ❯
          </span>
        </button>
      </div>
    </>
  );
};

Paginator.propTypes = {
  startPosition: PropTypes.number,
  minPosition: PropTypes.number,
  maxPosition: PropTypes.number,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  onPositionClick: PropTypes.func,
};

export default Paginator;
