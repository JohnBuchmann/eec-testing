/*
 * Panel Component
 *
 * This creates a generic panel with header and content view
 *
 */
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
  },
  separator: {
    borderTop: `solid 2px ${Colors.mercury}`,
  },
  headerOvewView: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 16px',
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  content: {
    padding: '24px 16px',
  },
  titleOverView: {
    color: Colors.lunarGreen,
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: '1.75 !important',
    letterSpacing: 'normal !important',
  },
});

/**
 * Panel Creates a panel with header and content view
 * @param {string} title Text to be displyed on the top of the panel
 * @param {node} actions React Node view to display actions on the right side of the title space
 * @param {node} content React Node view to display on the panel body
 * @param {node} headerContent React Node to display instead of conventional header.
 * @param {classes} headerStyle Make Style to override header styling.
 * @param {classes} contentStyle Make Style to override content styling.
 */
export const Panel = ({
  title = '',
  actions,
  headerContent,
  content,
  headerStyle,
  contentStyle,
}) => {
  const classes = useStyles();
  const applyHeaderStyle = headerStyle || classes.headerOvewView;
  const applyContentStyle = contentStyle || classes.content;
  return (
    <div className={classes.wrapper}>
      {(title || actions) && (
        <div className={applyHeaderStyle}>
          <Typography variant="subtitle1" className={classes.headerOvewView}>
            {title}
          </Typography>
          <div>{actions}</div>
        </div>
      )}
      {headerContent && <div>{headerContent}</div>}
      <div className={classes.separator} />
      <div className={applyContentStyle}>{content}</div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.node,
  content: PropTypes.node,
  headerContent: PropTypes.node,
  headerStyle: PropTypes.string,
  contentStyle: PropTypes.string,
};

export default Panel;
