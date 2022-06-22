/*
 * Login messages
 *
 * This contains all the text for the SitesPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Launch.Login';

export default defineMessages({
  termsAndConditions: {
    id: `${scope}.termsAndConditions`,
    defaultMessage: 'Terms & Conditions',
  },
  privacyAndPolicy: {
    id: `${scope}.privacyAndPolicy`,
    defaultMessage: 'Privacy Policy',
  },
  acceptTerms: {
    id: `${scope}.acceptTerms`,
    defaultMessage: 'accept',
  },
  dontAcceptTerms: {
    id: `${scope}.dontAcceptTerms`,
    defaultMessage: "Don't Accept",
  },
  reviewTerms: {
    id: `${scope}.review`,
    defaultMessage: 'review terms',
  },
  effectiveDate: {
    id: `${scope}.effectiveDate`,
    defaultMessage: 'Effective Date:',
  },
  notAcceptingTerms: {
    id: `${scope}.notAcceptingTerms`,
    defaultMessage:
      'Not accepting these Terms & Conditions will log you out of the portal. You can accept these Terms & Conditions at a laterdate to use the portal.',
  },
  nextButton: {
    id: `${scope}.nextButton`,
    defaultMessage: 'Next',
  },
  previousButton: {
    id: `${scope}.previousButton`,
    defaultMessage: 'Previous',
  },
  noRoleModal: {
    title: {
      id: `${scope}.title`,
      defaultMessage: 'Access Denied',
    },
    faithUsersMessage: {
      id: `${scope}.faithUsersMessage`,
      defaultMessage:
        'You are not associated with any User Groups in the DCentrIQ application. Please contact the support desk or your manager to resolve the issue. Until then you may not access the DCentrIQ application.',
    },
    customerUsersMessage: {
      id: `${scope}.customerUsersMessage`,
      defaultMessage:
        'You are not associated with any User Groups in the DCentrIQ application. Please contact your ICIAN to resolve the issue. Until then you may not access the DCentrIQ application.',
    },
    acceptOption: {
      id: `${scope}.acceptOption`,
      defaultMessage: 'OK',
    },
  },
});
