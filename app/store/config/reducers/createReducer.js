/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import history from 'Utils/history';
import appReducer from '../../App/appReducer';
import devicesReducer from '../../Devices/reducer';
import languageProviderReducer from '../../LanguageProvider/reducer';
import notificationReducer from '../../Notification/notificationReducer';
import reportsReducer from '../../Reports/reportsReducer';
import settingsReducer from '../../Settings/settingsReducer';
import sitesReducer from '../../Sites/reducer';
import userReducer from '../../User/userReducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    app: appReducer,
    user: userReducer,
    settings: settingsReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    sites: sitesReducer,
    notification: notificationReducer,
    reports: reportsReducer,
    devices: devicesReducer,
    ...injectedReducers,
  });
}
