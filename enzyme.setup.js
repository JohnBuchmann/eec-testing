import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
window.env = {
  environment: 'DEV',
  authClientId: '0oaao2by9Jshtn2YL1d6',
  authAuthority: 'https://faith.oktapreview.com/oauth2/default',
  authRedirectURI: `${window.location.origin}/login/callback`,
  authBaseUrl: 'https://faith.oktapreview.com',
  authPostLogoutRedirectUri: '',
  domainName: 'https://devweb.tapi7.dcentriq.energybyentech.com',
  doLog: true,
  privacyAndPolicyUri:
    'https://energybyentech.com/wp-content/uploads/2021/02/EnTech_Solutions_-_Privacy_Policy.pdf',
  termsAndConditionsUri:
    'https://energybyentech.com/wp-content/uploads/2021/02/EnTech_Solutions_-_Terms_and_Conditions.pdf',
  routes: {
    sitesService: '/sites-service',
    usersService: '/users-service',
    notificationsService: '/notifications-service',
    chartsService: '/charts-service',
    devicesService: '/devices-service',
  },
  idp: {
    type: 'MICROSOFT',
    id: '0oagcyokbNGo4MgYV1d6',
  },
};
