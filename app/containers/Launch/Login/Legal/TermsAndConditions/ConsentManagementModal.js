import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import {
  oktaAuthClient,
  refreshAccessToken,
  updateAuthState,
} from 'system/auth';
import Modal from 'Components/Modal';
import Button from 'Components/Button';
import Box from '@material-ui/core/Box';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import { Document, Page, pdfjs } from 'react-pdf';
import { updateUserPolicy } from 'Store/User/actions';
import messages from '../../messages';

const useStyles = makeStyles({
  modal: {
    minHeight: '484px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
  },
  cancelButton: {
    marginRight: '45px',
    fontSize: '14px',
  },
  submitButton: {
    height: '40px',
    width: '160px',
    border: '0px',
    color: `${Colors.white} !important`,
    backgroundColor: Colors.primaryLight,
    outline: 'none',
    margin: '0px',
    marginLeft: '10px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: Colors.white,
      textDecoration: 'none',
    },
    textTransform: 'uppercase',
    fontSize: '14px',
  },
  effectiveDateTitle: {
    fontSize: '14px',
    fontWeight: '600',
  },
  legalContent: {
    height: '217px',
    width: '556px',
    border: '0px',
  },
  notAcceptingTerms: {
    marginBottom: '55px',
  },
  nextButton: {
    float: 'right',
  },
  previousButton: {
    float: 'left',
  },
});

const setUpReactPdf = async () => {
  pdfjs.GlobalWorkerOptions.workerSrc = await import(
    `./static/pdf.worker.entry`
  );
};

/**
 * @method ConsentManagementModal
 * The consent management modal to display terms & conditions consent to current logged in user.
 * @param {boolean} openModal Open modal
 * @param {*} intl Internationalization (i18n)
 */
const ConsentManagementModal = (props) => {
  const {
    openModal = false,
    intl = {},
    pdf = '',
    effectiveDate = '',
    setUpdateUserPolicy,
  } = props;
  const { formatMessage } = intl;
  const oktaAuth = oktaAuthClient;
  const classes = useStyles();
  const scalePdf = 0.9;
  const dontAcceptDefault = false;
  const pageDefault = 1;
  const [modalIsOpen, setModalIsOpen] = React.useState(openModal);
  const [firstDisplay, setFirstDisplay] = React.useState(true);
  const [userFirstDontAccepted, setUserFirstDontAccepted] = React.useState(
    dontAcceptDefault
  );
  const [page, setPage] = React.useState(pageDefault);
  const [totalNumPages, setTotalNumPages] = React.useState(0);

  React.useEffect(() => {
    setUpReactPdf();
  }, []);
  /**
   * Review terms function returns modal to its initial state
   * Initial state contains first "Don't Accept" and "ACCEPT" buttons
   * with the PDF viewer.
   */
  const reviewTerms = () => {
    setFirstDisplay(true);
    setUserFirstDontAccepted(false);
  };

  /**
   * First "Don't Accept" button function change to the second screen which
   * prompts user to consider not to cancel the acceptance of term and conditions
   */
  const firstDontAccept = () => {
    setUserFirstDontAccepted(true);
    setFirstDisplay(false);
  };

  /**
   * Closes terms and condition modal
   */
  const closeModal = () => {
    setModalIsOpen(false);
  };

  /**
   * Signs out the user and close the modal
   */
  const logout = async () => {
    closeModal();
    oktaAuth.signOut();
  };

  /**
   * The user-accepted function closes the modal and sets the acceptance to 'true' using reducers and web services.
   * Then, refresh token and update okta auth state data
   */
  const accepted = async () => {
    closeModal();
    setUpdateUserPolicy(effectiveDate);
    await refreshAccessToken();
    updateAuthState();
  };

  /**
   * @property {Object} modalTitle title to be displayed in the modal
   */
  const modalTitle = (
    <Typography
      variant="caption"
      className={classes.modalTitle}
      data-testid="content-modalTitle"
    >
      {formatMessage(messages.termsAndConditions)}
    </Typography>
  );

  /**
   * @method onDocumentLoadSuccess on load of PDF, set the number of pages.
   * @param {Object} numPages number of pages of the pdf document.
   */
  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalNumPages(numPages);
  };

  return (
    <Modal
      data-testid="content-consentManagementModal"
      className={classes.modal}
      open={modalIsOpen}
      title={modalTitle}
    >
      {firstDisplay && (
        <>
          <Box>
            <Typography
              data-testid="content-effectiveDateTitle"
              className={classes.effectiveDateTitle}
            >
              {formatMessage(messages.effectiveDate)} {effectiveDate}
            </Typography>
          </Box>
          <Box>
            {/* <Pdf
              file={pdf}
              scale={scalePdf}
              page={page}
              data-testid="content-pdfContainer"
            >
              {({ pdfDocument, canvas }) => (
                <>
                  {canvas}
                  {Boolean(pdfDocument && pdfDocument.numPages) && (
                    <nav>
                      <ul className="pager">
                        <li className="previous">
                          <Button
                            className={classes.previousButton}
                            disabled={page === pageDefault}
                            onClick={() => setPage(page - pageDefault)}
                          >
                            {formatMessage(messages.previousButton)}
                          </Button>
                        </li>
                        <li className="next">
                          <Button
                            className={classes.nextButton}
                            disabled={page === pdfDocument.numPages}
                            onClick={() => setPage(page + pageDefault)}
                          >
                            {formatMessage(messages.nextButton)}
                          </Button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </Pdf> */}
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              data-testid="content-pdfContainer"
            >
              <Page pageNumber={page} renderMode="canvas" scale={scalePdf} />
              {Boolean(totalNumPages > 0) && (
                <nav>
                  <ul className="pager">
                    <li className="previous">
                      <Button
                        className={classes.previousButton}
                        disabled={page === pageDefault}
                        onClick={() => setPage(page - pageDefault)}
                      >
                        {formatMessage(messages.previousButton)}
                      </Button>
                    </li>
                    <li className="next">
                      <Button
                        className={classes.nextButton}
                        disabled={page === totalNumPages}
                        onClick={() => setPage(page + pageDefault)}
                      >
                        {formatMessage(messages.nextButton)}
                      </Button>
                    </li>
                  </ul>
                </nav>
              )}
            </Document>
          </Box>
        </>
      )}
      {userFirstDontAccepted && (
        <Typography
          data-testid="content-dontAcceptWarningLabel"
          className={classes.notAcceptingTerms}
        >
          {formatMessage(messages.notAcceptingTerms)}
        </Typography>
      )}
      <div>
        {firstDisplay && (
          <div>
            <Button
              className={classes.cancelButton}
              type="button"
              onClick={firstDontAccept}
              data-testid="content-firstDontAcceptTermsButton"
            >
              {formatMessage(messages.dontAcceptTerms)}
            </Button>
            <Button
              type="button"
              className={classes.submitButton}
              onClick={accepted}
              data-testid="content-acceptButton"
            >
              {formatMessage(messages.acceptTerms)}
            </Button>
          </div>
        )}
        {userFirstDontAccepted && (
          <div>
            <Button
              className={classes.cancelButton}
              type="button"
              onClick={logout}
              data-testid="content-dontAcceptButtonLogout"
            >
              {formatMessage(messages.dontAcceptTerms)}
            </Button>
            <Button
              type="button"
              className={classes.submitButton}
              onClick={reviewTerms}
              data-testid="content-reviewButton"
            >
              {formatMessage(messages.reviewTerms)}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

ConsentManagementModal.propTypes = {
  intl: PropTypes.any.isRequired,
  openModal: PropTypes.bool,
  pdf: PropTypes.string,
  effectiveDate: PropTypes.string,
  setUpdateUserPolicy: PropTypes.func,
};
/**
 * mapDispatchToProps
 * @param {Function} setUpdateUserPolicy call updateUserPolicy action and update user terms and conditions
 */
const mapDispatchToProps = (dispatch) => ({
  setUpdateUserPolicy: (date) => dispatch(updateUserPolicy(date)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  null,
  mapDispatchToProps
)(injectIntl(ConsentManagementModal));
/* eslint-enable */
