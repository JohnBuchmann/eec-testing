import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import messages from '../messages';

/**
 * @method NoRoleModal
 * The consent management modal to display terms & conditions consent to current logged in user.
 *
 * @param {boolean} openModal Open modal
 * @param {function} acceptActionHandler method to call on accept button
 * @param {boolean} isFaithAccount Indicates if is faith account
 * @param {*} intl Internationalization (i18n)
 */
const NoRoleModal = (props) => {
  const { intl = {}, acceptActionHandler, isFaithAccount, openModal } = props;
  const { formatMessage } = intl;
  const { noRoleModal: noRoleModalMessages } = messages;
  const showCancelButton = false;
  const noAccessMessage = isFaithAccount
    ? noRoleModalMessages.faithUsersMessage
    : noRoleModalMessages.customerUsersMessage;

  return (
    <GenericModalConfirmation
      data-testid="no-role-modal"
      titleMessage={formatMessage(noRoleModalMessages.title)}
      bodyMessage={formatMessage(noAccessMessage)}
      openModal={openModal}
      saveLabelText={formatMessage(noRoleModalMessages.acceptOption)}
      showCancel={showCancelButton}
      submitSave={acceptActionHandler}
    />
  );
};

NoRoleModal.propTypes = {
  intl: PropTypes.any.isRequired,
  acceptActionHandler: PropTypes.func.isRequired,
  openModal: PropTypes.bool,
  isFaithAccount: PropTypes.bool,
};

export default injectIntl(NoRoleModal);
