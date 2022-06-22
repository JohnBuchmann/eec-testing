/**
 * Ician User helpers
 */
export const AllIcianUsers = 'All';

/**
 * getIcianUsersDropDown
 * Transform Report Types catalog into dropdown structure
 * @return {Array} Report Types dropdown options
 */
export const getIcianUsersDropDown = (icianUsers = []) => {
  const formattedIcianUsers = icianUsers.map((icianUser) => ({
    value: icianUser.externalId,
    text: icianUser.userName,
  }));

  formattedIcianUsers.unshift({
    value: AllIcianUsers,
    text: AllIcianUsers,
  });

  return formattedIcianUsers;
};
