/**
 *
 * Modal
 * This modal supports any amount of children. Last child within props.children
 * will always be added to the bottom section alocated for the  action buttons.
 * The buttons should change the modal's `open` property on their click event
 * to false to close it that way. Pressing Esc key will also close the modal.
 *
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import Loader from 'Components/Loader';

const useStyles = makeStyles({
  title: {
    '& .MuiTypography-h6': {
      fontWeight: '600',
    },
  },
});

/**
 * ModalConfiguration
 * @param {string} title Title to show
 * @param {function} onClose Event to execute when close modal, click outside or press esc
 * @param {boolean} open Define if this is open
 * @param {node} children supports any amount of children. Last child within props.children
 * will always be added to the bottom
 * @param {Object} paperPropsStyle Add any style to the dialog
 */

function ModalComponent(props) {
  const {
    onClose,
    onBackdropClick,
    open,
    title,
    children,
    paperPropsStyle,
    showLoading,
  } = props;

  const classStyle = useStyles();
  const modalContent = Children.toArray(children);
  const childrenAmount = modalContent.length - 1;

  return (
    <div>
      <Dialog
        onBackdropClick={onBackdropClick}
        onClose={onClose}
        open={open}
        PaperProps={{
          // NOTE: We add this styles in here because we want to target only the
          // paper element that it's created when the modal is rendered, so it
          // doesnt affect other components that might use the Paper element
          style: {
            borderRadius: 0,
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
            ...paperPropsStyle,
            fontFamily: 'Inter !important',
          },
        }}
      >
        <Loader open={showLoading} />
        <DialogTitle className={classStyle.title}>{title}</DialogTitle>
        <DialogContent>{modalContent.slice(0, childrenAmount)}</DialogContent>
        <DialogActions>{modalContent[`${childrenAmount}`]}</DialogActions>
      </Dialog>
    </div>
  );
}

ModalComponent.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
  onBackdropClick: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.node.isRequired,
  paperPropsStyle: PropTypes.object,
  showLoading: PropTypes.bool,
};

export default ModalComponent;
