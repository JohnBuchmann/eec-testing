/*
 * Tariff Structure
 *
 * This is the component for the tariff structure panel
 *
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, makeStyles, Typography, Grid } from '@material-ui/core';
import InputComponent from 'Components/Input';
import Panel from 'Components/Panel';
import { Colors } from 'Theme';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getTariffStructure } from 'Store/Sites/actions';
import { getValueIfExists } from 'Utils/propertyValidation';
import TariffStructureEditModal from './modals/TariffStructureEditModal';
import messages from './messages';

const useStyles = makeStyles({
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
  },
  title: {
    fontWeight: 600,
  },
  capitalize: {
    textTransform: 'uppercase',
  },
  saveTariffStructureButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
    marginLeft: '24px',
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      border: `1px solid ${Colors.silverSand} !important`,
    },
  },
  editTariffStructureButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      border: `1px solid ${Colors.silverSand} !important`,
      cursor: 'not-allowed',
    },
  },
  tariffFormLabel: {
    lineHeight: '40px',
  },
  root: {
    flexGrow: 1,
    height: '225px',
  },
  listValue: {
    textAlign: 'right',
    lineHeight: '40px',
    whiteSpace: 'nowrap',
  },
  noWrapText: {
    whiteSpace: 'pre-wrap',
  },
  labelUtility: {
    whiteSpace: 'pre-wrap',
    display: 'block',
    lineHeight: '20px',
    marginTop: '10px',
  },
});

/**
 * Tariff Structure creates a panel
 * of the tariffs structure data
 */
const TariffStructure = (props) => {
  const {
    data: tariffDataInitial = {
      utility: '',
      tariffStructure: '',
      gasUtilityId: '',
      gasUtilityTariff: '',
      electricUtilityId: '',
      electricUtilityTariff: '',
    },
    isEditing,
    tariffStructure,
    fetchTariffStructure,
    siteId,
  } = props || {};
  const tariffFormInvalidDefault = {
    utility: false,
    tariffStructure: false,
    gasUtilityId: false,
    gasUtilityTariff: false,
    electricUtilityId: false,
    electricUtilityTariff: false,
  };
  const classStyle = useStyles();
  const { tariffStructure: tariffStructureMessages } = messages;
  const [openModal] = React.useState(null);
  const [tariffData, setTariffData] = React.useState(tariffDataInitial);
  const [tariffFormInvalid] = React.useState(tariffFormInvalidDefault);
  const maximumCharacters = 300;
  const helper = `Maximum ${maximumCharacters} characters.`;

  useEffect(() => {
    fetchTariffStructure(siteId);
  }, []);

  useEffect(() => {
    if (Object.keys(tariffStructure).length === 0) {
      tariffStructure.gasUtilityId = 'Not Available';
      tariffStructure.gasUtilityTariff = 'Not Available';
      tariffStructure.electricUtilityId = 'Not Available';
      tariffStructure.electricUtilityTariff = 'Not Available';
      setTariffData(tariffStructure);
    } else {
      setTariffData(tariffStructure);
    }
  }, [tariffStructure]);

  /**
   * @method isModalOpen
   * Validates if a specific modal is open
   * or not to display or hide it.
   * @param {String} modal The name of the modal to validate
   * @return {void}
   */
  const isModalOpen = (modal) =>
    openModal && openModal.modal === modal && openModal.isOpen;

  const headerContent = (
    <div
      className={classStyle.headerWrapper}
      data-testid="content-headerContent"
    >
      <FormattedMessage {...tariffStructureMessages.title}>
        {(title) => (
          <Typography
            variant="caption"
            className={`${classStyle.title} ${classStyle.capitalize}`}
          >
            {title}
          </Typography>
        )}
      </FormattedMessage>
    </div>
  );
  const contentBody = (
    <Box data-testid="content-bodyContent">
      <div className={classStyle.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classStyle.tariffFormLabel}>
            <span>
              {' '}
              <FormattedMessage {...tariffStructureMessages.gasutilityLabel}>
                {(gasutilityLabel) => (
                  <Typography variant="caption">{gasutilityLabel}</Typography>
                )}
              </FormattedMessage>
            </span>
          </Grid>
          <Grid item xs={6} className={classStyle.listValue}>
            {!isEditing && (
              <span
                data-testid="content-label-tariffUtility"
                className={classStyle.labelUtility}
              >
                {tariffData.gasUtilityId}
              </span>
            )}
            {isEditing && (
              <InputComponent
                name="utility"
                value={tariffData.utility}
                data-testid="content-input-tariffUtility"
                invalid={tariffFormInvalid.utility}
                helperText={helper}
              />
            )}
          </Grid>
          <Grid item xs={6} className={classStyle.tariffFormLabel}>
            <span>
              <FormattedMessage
                {...tariffStructureMessages.gastariffStructureLabel}
              >
                {(gastariffStructureLabel) => (
                  <Typography variant="caption">
                    {gastariffStructureLabel}
                  </Typography>
                )}
              </FormattedMessage>
            </span>
          </Grid>
          <Grid item xs={6} className={classStyle.listValue}>
            {!isEditing && (
              <span className={classStyle.labelUtility}>
                {tariffData.gasUtilityTariff}
              </span>
            )}
            {isEditing && (
              <InputComponent
                name="tariffStructure"
                value={tariffData.tariffStructure}
                data-testid="content-input-tariffStructure"
                invalid={tariffFormInvalid.tariffStructure}
                helperText={helper}
              />
            )}
          </Grid>
          <Grid item xs={6} className={classStyle.tariffFormLabel}>
            <span>
              {' '}
              <FormattedMessage
                {...tariffStructureMessages.electricutilityLabel}
              >
                {(electricutilityLabel) => (
                  <Typography variant="caption">
                    {electricutilityLabel}
                  </Typography>
                )}
              </FormattedMessage>
            </span>
          </Grid>
          <Grid item xs={6} className={classStyle.listValue}>
            {!isEditing && (
              <span
                data-testid="content-label-tariffUtility"
                className={classStyle.labelUtility}
              >
                {tariffData.electricUtilityId}
              </span>
            )}
            {isEditing && (
              <InputComponent
                name="utility"
                value={tariffData.utility}
                data-testid="content-input-tariffUtility"
                invalid={tariffFormInvalid.utility}
                helperText={helper}
              />
            )}
          </Grid>
          <Grid item xs={6} className={classStyle.tariffFormLabel}>
            <span>
              {' '}
              <FormattedMessage
                {...tariffStructureMessages.electrictariffStructureLabel}
              >
                {(electrictariffStructureLabel) => (
                  <Typography variant="caption">
                    {electrictariffStructureLabel}
                  </Typography>
                )}
              </FormattedMessage>
            </span>
          </Grid>
          <Grid item xs={6} className={classStyle.listValue}>
            {!isEditing && (
              <span
                data-testid="content-label-tariffUtility"
                className={classStyle.labelUtility}
              >
                {tariffData.electricUtilityTariff}
              </span>
            )}
            {isEditing && (
              <InputComponent
                name="utility"
                value={tariffData.utility}
                data-testid="content-input-tariffUtility"
                invalid={tariffFormInvalid.utility}
                helperText={helper}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Box>
  );

  return (
    <>
      <Panel
        data-testid="content-tariffStructurePanel"
        headerContent={headerContent}
        content={contentBody}
      />
      <TariffStructureEditModal
        data-testid="content-tariffStructureEditModal"
        openModal={isModalOpen('tariffStructureEditModal')}
      />
    </>
  );
};

TariffStructure.propTypes = {
  intl: PropTypes.any,
  data: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
  enableEdition: PropTypes.func,
  cancelEdition: PropTypes.func,
  tariffStructure: PropTypes.object,
  setTariffStructure: PropTypes.func,
  fetchTariffStructure: PropTypes.func,
  siteId: PropTypes.number,
  isSiteLive: PropTypes.bool,
  permissions: PropTypes.object,
  siteAccount: PropTypes.string,
};

/**
 * mapStateToProps
 * @param {Object} tariffStructure receives sites.site.tariffStructure from redux
 */
const mapStateToProps = (state) => ({
  tariffStructure: getValueIfExists(() => state.sites.site.tariffStructure, {}),
  siteId: getValueIfExists(() => state.sites.site.siteId, 0),
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});

/**
 * mapDispatchToProps
 * @param {Function} setTariffStructure call updateTariffStructure action and set tariff structure data
 * @param {Function} fetchTariffStructure call getTariffStructure action and get tariff structure data
 */
const mapDispatchToProps = (dispatch) => ({
  fetchTariffStructure: (siteId) => dispatch(getTariffStructure(siteId)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TariffStructure);
/* eslint-enable */
