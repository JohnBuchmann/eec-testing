/**
 * Asynchronously loads the component for SitesPage
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./Dashboard/index'));
