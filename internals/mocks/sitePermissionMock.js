const sitePermissionMock = {
  allowEdit: true,
  users: [
    {
      id: 1,
      firstName: 'ICIAN 1',
      userGroup: 'ICIAN',
      email: 'ician@ician.com',
    },
    {
      id: 2,
      firstName: 'ICIAN 2',
      userGroup: 'ICIAN',
      email: 'ician2@ician.com',
    },
  ],
  newUsers: [
    {
      firstName: 'ICIAN 3',
      userGroup: 'ICIAN',
      email: 'ician3@ician.com',
    },
    {
      firstName: 'ICIAN 4',
      userGroup: 'ICIAN',
      email: 'ician4@ician.com',
    },
  ],
  addUsers: [
    // TODO: this should come from OKTA
    {
      firstName: 'ICIAN 5',
      userGroup: 'ICIAN',
      email: 'ician5@ician.com',
    },
    {
      firstName: 'ICIAN 6',
      userGroup: 'ICIAN',
      email: 'ician6@ician.com',
    },
  ],
};

export default sitePermissionMock;
