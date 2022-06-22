/* eslint-disable no-param-reassign */
export const formatCustomerAreas = (customers) => {
  let initialId = 1;
  customers.forEach((customer) => {
    if (customer.areas) {
      const assignedUsersCustomer = [];
      customer.areas.forEach((area) => {
        const assignedUsersAreas = [];
        area.areaId = initialId;
        initialId += 1;
        area.locations.forEach((location) => {
          const assignedUsersLocations = [];
          location.assets.forEach((asset) => {
            if (!assignedUsersCustomer.includes(asset.externalIcianId)) {
              assignedUsersCustomer.push(asset.externalIcianId);
            }
            if (!assignedUsersAreas.includes(asset.externalIcianId)) {
              assignedUsersAreas.push(asset.externalIcianId);
            }
            if (!assignedUsersLocations.includes(asset.externalIcianId)) {
              assignedUsersLocations.push(asset.externalIcianId);
            }
          });
          location.assignedUsers = assignedUsersLocations;
        });
        area.assignedUsers = assignedUsersAreas;
      });
      customer.assignedUsers = assignedUsersCustomer;
    }
  });
  return customers;
};
/* eslint-disable no-param-reassign */
