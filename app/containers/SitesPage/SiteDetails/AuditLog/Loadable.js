/**
 * Asynchronously loads the component for Audit Log
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
