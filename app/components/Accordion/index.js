/**
 *
 * Accordion.js
 *
 * A common accordion, send title, icon, clases to use and body content to display
 */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getValueIfExists } from 'Utils/propertyValidation';
import messages from './messages';

/**
 * AccordionComponent
 * @param {string} title Title to show
 * @param {string} icon Icon path to display
 * @param {node} accordionBodyContent content React Node view to display on Accordion Deatils (Body)
 * @param {boolean} isAccordionOpen Flag to display Accordion Open or Collapse
 * @param {object{container,icon,titleContainer}} Classes apply to the container
 */
class AccordionComponent extends Component {
  constructor() {
    super();

    this.state = {
      isAccordionOpen: false,
    };
  }

  componentDidMount() {
    this.setState({ isAccordionOpen: this.props.isAccordionOpen });
  }

  handleToggleAccordion = () => {
    const isAccordionOpen = getValueIfExists(
      () => this.state.isAccordionOpen,
      false
    );
    this.setState({
      isAccordionOpen: !isAccordionOpen,
    });
  };

  render() {
    const isAccordionOpen = getValueIfExists(
      () => this.state.isAccordionOpen,
      false
    );
    const toggleText = isAccordionOpen ? messages.hide : messages.view;
    const { classes, title, icon } = this.props;

    return (
      <Accordion square expanded={isAccordionOpen}>
        <AccordionSummary
          id="panel1a-header"
          onClick={this.handleToggleAccordion}
        >
          <Box className={classes.container}>
            <Box className={classes.titleContainer}>
              {icon && <img src={icon} className={classes.icon} alt={icon} />}
              <Typography variant="caption">{title}</Typography>
            </Box>
            <Typography color="primary" variant="caption">
              <FormattedMessage {...toggleText} />
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>{this.props.accordionBodyContent}</AccordionDetails>
      </Accordion>
    );
  }
}

AccordionComponent.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  accordionBodyContent: PropTypes.node,
  isAccordionOpen: PropTypes.bool,
  classes: PropTypes.object,
};

const useStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: '1.5rem',
    height: '1.5rem',
    marginRight: '0.75rem',
  },
});

export default withStyles(useStyles)(AccordionComponent);
