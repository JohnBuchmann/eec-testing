/*
 * SitePermissions
 *
 * This is the component for Site Permissions panel
 *
 */
import React, { useEffect } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ButtonComponent from 'Components/Button';
import InputComponent from 'Components/Input';
import { iconAlignmentType } from 'Components/Input/enum';
import Panel from 'Components/Panel';
import Switch from 'Components/Switch';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getDefaultToggleOptions } from 'Utils/toggle';
import { validatePermission } from 'Config/appSettings';
import {
  getOktaUsers,
  getUsersPermissions,
  addUsersPermissions,
  removeUserPermissions,
} from 'Store/Sites/actions';
import {
  SiteAdminAccess,
  PermissionsList,
  TypeValidation,
} from 'Utils/enums/roles';
import { propertyExist, getValueIfExists } from 'Utils/propertyValidation';
import { Colors } from 'Theme';
import AddNewUserModal from './modals/AddNewUserModal';
import DeleteUserModal from './modals/DeleteUserModal';
import messages from './messages';

const useStyles = makeStyles({
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
  },
  title: {
    fontWeight: 600,
  },
  usersWrapper: {
    marginBottom: '12px',
  },
  user: {
    alignItems: 'center',
    display: 'flex',
    height: '40px',
    marginBottom: '8px',
  },
  newUsersWrapper: {
    marginBottom: '24px',
  },
  newUser: {
    marginBottom: '16px',
  },
  addUser: {
    marginTop: '8px',
  },
  iconSearch: {
    position: 'relative',
    bottom: '3px',
    left: '-5px',
  },
  cancelButton: {
    height: '40px',
    width: '120px',
    cursor: 'pointer',
  },
  submitButton: {
    height: '40px',
    width: '120px',
    border: 0,
    color: Colors.white,
    backgroundColor: Colors.primaryLight,
    outline: 'none',
    margin: '0',
    marginLeft: '10px',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.5,
    },
  },
});

/**
 * SitePermissions creates a panel to display
 * current users and allow add new ones
 */
const SitePermissions = (props) => {
  const {
    sitePermission,
    fetchOktaUsers,
    oktaUsers,
    fetchUsersPermissions,
    siteId,
    isPermissioned,
    updateUserPermissions,
    usersPermissions,
    deleteUserPermissions,
    icianPrincipal,
    permissions,
    isSiteLive,
    siteAccount,
  } = props;
  const classStyle = useStyles();
  const { sitePermissions: sitePermissionsMessages } = messages;
  const sitePermissionsToggleOptions = getDefaultToggleOptions();
  const trashCanIcon = 'deleteDarkIcon';
  const { allowEdit } = sitePermission;
  /**
   * @property {Boolean} allowEditPermissions Stores as React hook the permissions
   * toggle selection to display the users allowed to manage the sites.
   */
  const [allowEditPermissions, setEditPermissions] = React.useState(allowEdit);
  const [openModal, setOpenModal] = React.useState(null);
  const [newUserToAdd, setNewUser] = React.useState(null);
  const [removeUser, setRemoveUser] = React.useState(null);
  const [users, setUsers] = React.useState({
    noEditable: [],
    editable: [],
  });

  useEffect(() => {
    fetchUsersPermissions(siteId);
  }, []);

  useEffect(() => {
    if (typeof isPermissioned === 'boolean') {
      setEditPermissions(isPermissioned);
    }
  }, [isPermissioned]);

  useEffect(() => {
    if (usersPermissions) {
      fetchOktaUsers();
      setUsers({
        noEditable: usersPermissions.filter(
          (user) => user.isEditable === false
        ),
        editable: usersPermissions.filter((user) => user.isEditable === true),
      });
    }
  }, [usersPermissions]);

  /**
   * Params to Permissions in Permissions Delete User
   */
  const paramsToPermissionsDeleteUsers = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteAdmin, ''),
    type: getValueIfExists(() => TypeValidation.Edit, ''),
    action: getValueIfExists(() => SiteAdminAccess.DeleteUsers, ''),
    siteAccount,
  };

  /**
   * Handle which can user to delete users
   */
  const canDeletePermissions = validatePermission(
    paramsToPermissionsDeleteUsers
  );

  /**
   * Params to Permissions in Permissions Add New User
   */
  const paramsToPermissionsAddUser = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteAdmin, ''),
    type: getValueIfExists(() => TypeValidation.Edit, ''),
    action: getValueIfExists(() => SiteAdminAccess.AddUser, ''),
    siteAccount,
  };

  /**
   * Handle which can user to add new user
   */
  const canAddPermissions = validatePermission(paramsToPermissionsAddUser);

  /**
   * @method onPermissionsChange
   * Handles the persmissions toggle option changes to enable or disable the view
   * of the users with permissions to manage the sites.
   * @property {Object} event The default change event.
   * We need to catch it to get the new value.
   * @property {Boolean} switchValue The switch value selected
   * @return {void}
   */
  const onPermissionsChange = (event, switchValue) => {
    const params = {
      isPermissioned: switchValue,
    };
    setEditPermissions(switchValue);
    updateUserPermissions(siteId, params);
  };

  /**
   * @method handleAutoCompleteChange
   * Handles the autocomplete change event to update the users
   * lists and send the requests to update the users assigned.
   * @param {Object} event The default change event
   * @param {String} emailSelected The email selected in the form
   * @return {void}
   */
  const handleAutoCompleteChange = (event, emailSelected) => {
    const userToAdd = oktaUsers.find(
      (user) => user.profile.email === emailSelected
    );
    if (userToAdd) {
      setNewUser(userToAdd);
    }
  };

  /**
   * @method openAddNewUserDialog
   * Opens the dialog to manage the users allowed in the site.
   * It should connect with Okta to retrieve the users data and populate the selectors.
   * @return {void}
   */
  const openAddNewUserDialog = () => {
    setOpenModal({
      modal: 'addNewUserModal',
      isOpen: true,
    });
  };

  /**
   * @method closeAddNewUserDialog
   * Closes the AddNewUserDialog without process data.
   * @return {void}
   */
  const closeAddNewUserDialog = () => {
    setOpenModal({
      modal: 'addNewUserModal',
      isOpen: false,
    });
  };

  /**
   * @method submitAddnewUserDialog
   * Submits the AddNewUserDialog data to update the users assigned.
   * @return {void}
   */
  const submitAddnewUserDialog = () => {
    if (propertyExist(() => newUserToAdd.profile)) {
      const { profile } = newUserToAdd;
      const newUser = {
        users: [
          {
            userName: `${profile.firstName} ${profile.lastName}`,
            externalId: profile.email,
          },
        ],
      };
      updateUserPermissions(siteId, newUser);
    }
    closeAddNewUserDialog();
  };

  /**
   * @method isModalOpen
   * Validates if a specific modal is open
   * or not to display or hide it.
   * @param {String} modal The name of the modal to validate
   * @return {void}
   */
  const isModalOpen = (modal) =>
    openModal && openModal.modal === modal && openModal.isOpen;

  /**
   * @method onRemoveUser
   * Opens the Dialog to delete the user from the assigned users list.
   * @param {Object} user The user to remove from the list.
   * @return {void}
   */
  const onRemoveUser = (user) => {
    setOpenModal({
      modal: 'deleteUserModal',
      isOpen: true,
    });
    setRemoveUser(user);
  };

  /**
   * @method closeDeleteUserDialog
   * Closing the dialog to delete users from the
   * list without any actions or data submission.
   * @return {void}
   */
  const closeDeleteUserDialog = () => {
    setOpenModal({
      modal: 'deleteUserModal',
      isOpen: false,
    });
  };

  /**
   * @method submitDeleteUserDialog
   * Process the data to remove the user stored in state.
   * Also sends the request to API to remove.
   * @return {void}
   */
  const submitDeleteUserDialog = () => {
    setOpenModal({
      modal: 'deleteUserModal',
      isOpen: false,
    });
    deleteUserPermissions(siteId, removeUser);
    setRemoveUser(null);
  };

  // Creates panel header section
  const headerContent = (
    <div
      className={classStyle.headerWrapper}
      data-testid="content-headerContent"
    >
      <FormattedMessage {...sitePermissionsMessages.title}>
        {(title) => (
          <Typography variant="caption" className={classStyle.title}>
            {title}
          </Typography>
        )}
      </FormattedMessage>
      <Box className={classStyle.actionsBar}>
        <Switch
          disabled={!icianPrincipal}
          data-testid="content-sitePermissionsToggleOptions"
          leftOption={sitePermissionsToggleOptions.left}
          rightOption={sitePermissionsToggleOptions.right}
          value={allowEditPermissions}
          onChange={onPermissionsChange}
        />
      </Box>
    </div>
  );

  // Creates Site Permissions body
  const contentBody = (
    <div data-testid="content-contentBody">
      {users && users.noEditable && (
        <Box className={classStyle.usersWrapper}>
          {users.noEditable.map((user) => (
            <Box className={classStyle.user} key={`user-${user.externalId}`}>
              <Typography variant="caption">{user.userName}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {users && users.editable && (
        <Box
          className={classStyle.newUsersWrapper}
          data-testid="content-userAssigned"
        >
          {users.editable.map((user) => (
            <Box
              className={classStyle.newUser}
              key={`user-${user.externalId}`}
              data-testid="content-userAssignedWrapper"
            >
              {canDeletePermissions && (
                <InputComponent
                  data-testid="content-userAssignedInput"
                  value={user.userName}
                  icon={trashCanIcon}
                  iconAlignment={iconAlignmentType.right}
                  iconClick={() => onRemoveUser(user.userId)}
                />
              )}
              {!canDeletePermissions && (
                <InputComponent
                  data-testid="content-userAssignedInput"
                  value={user.userName}
                />
              )}
            </Box>
          ))}
        </Box>
      )}

      {canAddPermissions && (
        <Box className={classStyle.addUser}>
          <ButtonComponent
            onClick={openAddNewUserDialog}
            data-testid="content-addNewUserButton"
          >
            <FormattedMessage {...sitePermissionsMessages.addUserButtonLabel} />
          </ButtonComponent>
        </Box>
      )}
    </div>
  );

  return (
    <>
      <Panel
        data-testid="content-sitePermissionsPanel"
        headerContent={headerContent}
        content={icianPrincipal ? contentBody : ''}
      />
      {oktaUsers && (
        <AddNewUserModal
          data-testid="content-addNewUserModal"
          openModal={isModalOpen('addNewUserModal')}
          users={oktaUsers}
          newUserToAdd={newUserToAdd}
          handleAutoCompleteChange={handleAutoCompleteChange}
          closeAddNewUserDialog={closeAddNewUserDialog}
          submitAddnewUserDialog={submitAddnewUserDialog}
        />
      )}
      <DeleteUserModal
        data-testid="content-deleteUserModal"
        openModal={isModalOpen('deleteUserModal')}
        closeDeleteUserDialog={closeDeleteUserDialog}
        submitDeleteUserDialog={submitDeleteUserDialog}
      />
    </>
  );
};

SitePermissions.propTypes = {
  site: PropTypes.object,
  sitePermission: PropTypes.object,
  fetchOktaUsers: PropTypes.func,
  oktaUsers: PropTypes.array,
  usersPermissions: PropTypes.array,
  fetchUsersPermissions: PropTypes.func,
  updateUserPermissions: PropTypes.func,
  deleteUserPermissions: PropTypes.func,
  siteId: PropTypes.number,
  isPermissioned: PropTypes.bool,
  icianPrincipal: PropTypes.bool,
  permissions: PropTypes.object.isRequired,
  isSiteLive: PropTypes.bool.isRequired,
  siteAccount: PropTypes.string.isRequired,
};

/**
 * mapStateToProps
 * @param {Object} siteId receives sites.site.siteId reducer from redux
 * @param {Object} site receives sites.site.site reducer from redux
 * @param {Object} oktaUsers receives sites.oktaUsers reducer from redux
 * @param {Object} usersPermissions receives sites.usersPermissions.users reducer from redux
 * @param {Object} isPermissioned receives sites.usersPermissions.isPermissioned reducer from redux
 */
const mapStateToProps = (state) => ({
  siteId: state.sites.site.siteId,
  site: state.sites.site,
  oktaUsers: state.sites.oktaUsers,
  usersPermissions: state.sites.usersPermissions.users,
  isPermissioned: state.sites.usersPermissions.isPermissioned,
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});

/**
 * mapDispatchToProps
 * @param {Function} fetchOktaUsers call getOktaUsers action and get all okta users settings data
 * @param {Function} fetchUsersPermissions call getUsersPermissions action and get all users permissions data
 * @param {Function} updateUserPermissions call addUsersPermissions action and add users permissions data
 * @param {Function} deleteUserPermissions call removeUserPermissions action and delete user in users permissions data
 */
const mapDispatchToProps = (dispatch) => ({
  fetchOktaUsers: () => dispatch(getOktaUsers()),
  fetchUsersPermissions: (siteId) => dispatch(getUsersPermissions(siteId)),
  updateUserPermissions: (siteId, data) =>
    dispatch(addUsersPermissions(siteId, data)),
  deleteUserPermissions: (siteId, userId) =>
    dispatch(removeUserPermissions(siteId, userId)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitePermissions);
/* eslint-enable */
