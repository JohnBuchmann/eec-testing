import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, makeStyles, Modal } from '@material-ui/core';

const useStyles = makeStyles({
  spinner: {
    position: 'absolute',
    outline: 0,
    top: '50%',
    left: '50%',
  },
});

const Loader = ({ open = false }) => {
  const classStyle = useStyles();
  const disableAutoFocus = true;

  return (
    <Modal open={open} disableAutoFocus={disableAutoFocus}>
      <Box className={classStyle.spinner} data-testid="container-modalProgress">
        <CircularProgress />
      </Box>
    </Modal>
  );
};

Loader.propTypes = {
  open: PropTypes.bool,
};

export default Loader;
