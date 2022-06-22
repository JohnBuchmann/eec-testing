/*
 * Opportunity Detail Messages
 * This contains all the text for the Opportunity Detail Page container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SiteInformation';

export default defineMessages({
  siteInformationTitle: {
    id: `${scope}.siteInformationTitle`,
    defaultMessage: 'SITE INFORMATION',
  },
  siteInformationArea: {
    id: `${scope}.siteInformationArea`,
    defaultMessage: 'area',
  },
  siteInformationAddress: {
    id: `${scope}.siteInformationAddress`,
    defaultMessage: 'address',
  },
  siteInformationCity: {
    id: `${scope}.siteInformationCity`,
    defaultMessage: 'city',
  },
  siteInformationState: {
    id: `${scope}.siteInformationState`,
    defaultMessage: 'state',
  },
  siteInformationZip: {
    id: `${scope}.siteInformationZip`,
    defaultMessage: 'zip',
  },
  siteInformationPrimaryContact: {
    id: `${scope}.siteInformationPrimaryContact`,
    defaultMessage: 'primary contact',
  },
  siteInformationElectricityTariffStructure: {
    id: `${scope}.siteInformationElectricityTariffStructure`,
    defaultMessage: 'electricity tariff structure',
  },
  siteInformationGasTariffStructure: {
    id: `${scope}.siteInformationGasTariffStructure`,
    defaultMessage: 'gas tariff structure',
  },
  siteInformationeMail: {
    id: `${scope}.siteInformationeMail`,
    defaultMessage: 'email',
  },
  siteInformationMobile: {
    id: `${scope}.siteInformationMobile`,
    defaultMessage: 'mobile',
  },
  siteInformationOffice: {
    id: `${scope}.siteInformationOffice`,
    defaultMessage: 'office',
  },
  siteInformationUtility: {
    id: `${scope}.siteInformationUtility`,
    defaultMessage: 'utility',
  },
  siteInformationTariff: {
    id: `${scope}.siteInformationTariff`,
    defaultMessage: 'tariff',
  },
  siteInformationDocuments: {
    id: `${scope}.siteInformationDocuments`,
    defaultMessage: 'Project Engineering Documents',
  },
  siteInformationView: {
    id: `${scope}.siteInformationView`,
    defaultMessage: 'View',
  },
  siteInformationMapModalTitle: {
    id: `${scope}.siteInformationMapModalTitle`,
    defaultMessage: 'Site Location',
  },
  siteInformationMapModalCloseButton: {
    id: `${scope}.siteInformationMapModalCloseButton`,
    defaultMessage: 'Close',
  },
  siteInformationNotAvailable: {
    id: `${scope}.siteInformationNotAvailable`,
    defaultMessage: 'Not Available',
  },
  siteMapNotAvailable: {
    id: `${scope}.siteMapNotAvailable`,
    defaultMessage: 'Unable to Map Site Address',
  },
});
