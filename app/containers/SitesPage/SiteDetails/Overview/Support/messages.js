/*
 * Opportunity Detail Messages
 * This contains all the text for the Opportunity Detail Page container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SiteInformation';

export default defineMessages({
  supportTitle: {
    id: `${scope}.supportTitle`,
    defaultMessage: 'SUPPORT',
  },
  primaryIcian: {
    id: `${scope}.primaryIcian`,
    defaultMessage: 'Primary Ician',
  },
  secondaryIcian: {
    id: `${scope}.secondaryIcian`,
    defaultMessage: 'Secondary Ician',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'email',
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'mobile',
  },
  salesAndGeneralQuestions: {
    id: `${scope}.salesAndGeneralQuestions`,
    defaultMessage: 'Sales and General Questions',
  },
  website: {
    id: `${scope}.website`,
    defaultMessage: 'website',
  },
  emergencyService: {
    id: `${scope}.emergencyService`,
    defaultMessage: 'emergency service',
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'phone',
  },
  siteInformationNotAvailable: {
    id: `${scope}.siteInformationNotAvailable`,
    defaultMessage: 'Not Available',
  },
});
