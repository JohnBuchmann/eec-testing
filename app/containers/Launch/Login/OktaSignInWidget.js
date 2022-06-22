/**
 * Okta sign in widget
 */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import images from 'Assets/images';
import { makeStyles } from '@material-ui/core/styles';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { Colors } from 'Theme';
import { injectIntl } from 'react-intl';
import messages from './messages';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundColor: Colors.white,
  },
  imageContainerColumn: {
    backgroundImage: `url("${images.loginBackImage}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minWidth: '720px',
    maxWidth: '56.25%',
  },
  oktaWidgetContainerColumn: {
    backgroundPosition: 'center',
    minWidth: '560px',
    maxWidth: '43.75%',
    boxShadow: 'none',
  },
  paper: {
    margin: '8px auto 8px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '548px',
    position: 'relative',
  },
  oktaSignIn: {
    width: '100%',
    '& #okta-sign-in': {
      border: '0px',
    },
    '& #okta-sign-in.auth-container': {
      paddingTop: '20px',
      height: '80vh',
      minHeight: '650px',
    },
    '& #okta-sign-in .auth-footer': {
      position: 'relative',
      bottom: '125px',
      width: '200px',
    },
    '& #okta-sign-in .forgot-password .auth-footer, & #okta-sign-in .account-unlock .auth-footer': {
      position: 'relative',
      bottom: '0',
    },

    '& #okta-sign-in .primary-auth-container': {
      position: 'relative',
      top: '125px',
    },
    '& #okta-sign-in .auth-divider': {
      color: `${Colors.mercury} !important`,
      backgroundColor: `${Colors.mercury} !important`,
    },
    '& #okta-sign-in .auth-footer a:focus': {
      boxShadow: 'none !important',
    },
    '& #okta-sign-in.auth-container.main-container': {
      width: '100%',
      boxShadow: 'none',
    },
    '& #okta-sign-in.auth-container .okta-sign-in-header': {
      display: 'none',
    },
    '& #okta-sign-in *': {
      color: Colors.lunarGreen,
    },
    '& #okta-sign-in.auth-container .o-form-head': {
      textAlign: 'left',
    },
    '& #okta-sign-in.auth-container .okta-form-title': {
      textAlign: 'left',
      fontSize: '24px',
      color: Colors.lunarGreen,
      paddingTop: '50px',
      height: '115px !important',
      background: `url(${
        images.loginBrandingImage
      }) 200px no-repeat !important`,
    },
    '& #okta-sign-in.auth-container .okta-form-input-field': {
      background: Colors.athensGray,
    },
    '& #okta-sign-in .o-form-button-bar': {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '0px',
      marginBottom: '0px',
    },
    '& #okta-sign-in .o-form-button-bar.focused-input, & #okta-sign-in.auth-container input[type=button]:focus, & #okta-sign-in.auth-container input[type=submit]:focus': {
      outline: '0 !important',
      border: '0 !important',
      'border-color': 'transparent !important',
      'box-shadow': 'none !important',
    },
    '& #okta-sign-in.auth-container .button-primary': {
      color: Colors.white,
      background: Colors.mountainMeadow,
      border: '0px',
      width: '160px',
      height: '40px',
      lineHeight: '40px',
      position: 'relative',
      display: 'block',
    },
    '& #okta-sign-in .social-auth-microsoft-button': {
      position: 'relative',
      width: '302px !important',
      height: '40px !important',
      top: '50px',
      lineHeight: '40px',
      paddingLeft: '65px',
      textAlign: 'right',
      margin: '10px auto 228px auto',
      padding: '0 16px !important',
      objectFit: 'contain',
      borderRadius: '2px',
      border: 'solid 1px !important',
      borderColor: `${Colors.mountainMeadow} !important`,
      display: 'block',
      color: `${Colors.mountainMeadow} !important`,
      background: `url(${images.microsoftIcon}) 15px no-repeat !important`,
      fontWeight: '600 !important',
      '&:hover': {
        textDecoration: 'none !important',
        backgroundColor: `${Colors.alphaWhite} !important`,
      },
    },
    // Prevents Outline (Dotted Lines) for All Focused Items
    '& *:focus': {
      outline: '0 !important',
    },
  },
  legalLinksContainer: {
    position: 'relative',
    display: 'flex',
    bottom: '0',
    textAlign: 'center',
    width: '464px',
    margin: '0 auto',
  },
  termsAndConditionsLink: {
    fontWeight: 'normal',
    color: Colors.mountainMeadow,
    fontSize: '14px',
    float: 'left',
  },
  privacyPolicyLink: {
    fontWeight: 'normal',
    color: Colors.mountainMeadow,
    fontSize: '14px',
    textAlign: 'center',
    float: 'right',
  },
  oktaSSOContainer: {
    clear: 'both',
    position: 'relative',
    width: '448px',
  },
});

/**
 * Okta sign in widget
 * @param {*} config Okta Widget configuration
 * @param {function} onSuccess On success function
 * @param {function} onError On error function
 */
const { env } = window;
const OktaSignInWidget = ({ config, onSuccess, onError, intl }) => {
  const globalConfig = env;
  const { formatMessage } = intl;
  const classes = useStyles();
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    if (!config) {
      return () => {};
    }

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={classes.imageContainerColumn}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.oktaWidgetContainerColumn}
      >
        <div className={classes.paper}>
          <div ref={widgetRef} className={classes.oktaSignIn} />
        </div>

        <Grid container className={classes.legalLinksContainer}>
          <Grid item sm={6}>
            <Typography>
              <Link
                href={globalConfig.termsAndConditionsUri}
                target="_blank"
                className={classes.termsAndConditionsLink}
              >
                {formatMessage(messages.termsAndConditions)}
              </Link>
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography>
              <Link
                href={globalConfig.privacyAndPolicyUri}
                target="_blank"
                className={classes.privacyPolicyLink}
              >
                {formatMessage(messages.privacyAndPolicy)}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

OktaSignInWidget.propTypes = {
  config: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  intl: PropTypes.any.isRequired,
};

export default injectIntl(OktaSignInWidget);
