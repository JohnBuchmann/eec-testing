/*
 * ReportsPage
 *
 * This is the reports container to display all the charts at the '/reports' route
 *
 */

import Charting from 'containers/Charting';
import { connect } from 'react-redux';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ReportTypesId } from 'Utils/enums/report';
import {
  PermissionsList,
  SiteDetailsCatalog,
  TypeValidation,
} from 'Utils/enums/roles';
import { getValueIfExists } from 'Utils/propertyValidation';
import { validatePermission } from 'Config/appSettings';

/**
 * ReportsPage creates the container to
 * display the charts and reporting the consume of energy.
 * User will be able to access
 * this container at the 'sites/1/details' route to review the charts.
 */
function ReportsPage(props) {
  const { siteId } = useParams();
  const chartSites = [+siteId];
  const defaultReportType = ReportTypesId.Facility;

  const { isSiteLive, permissions, siteAccount, selectedSiteName } =
    props || {};

  const paramsToPermissions = {
    permissions,
    isSiteLive,
    section: PermissionsList.SiteDetails,
    type: TypeValidation.Edit,
    action: SiteDetailsCatalog.Reports,
    siteAccount,
  };

  const allowReportActions = validatePermission(paramsToPermissions);
  return (
    <Charting
      sites={chartSites}
      company={selectedSiteName}
      defaultReportType={defaultReportType}
      allowShareReport={allowReportActions}
      allowPrintReport={allowReportActions}
      allowPdfDownloadReport={allowReportActions}
    />
  );
}

const mapStateToProps = (state) => ({
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
  selectedSiteName: getValueIfExists(() => state.sites.site.name, ''),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(mapStateToProps)(ReportsPage);
/* eslint-enable */
