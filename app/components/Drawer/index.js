/**
 * DrawerComponent. Display a list of itmes with link and icon
 */
import Drawer from '@material-ui/core/Drawer';
import {
  Avatar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Colors } from 'Theme';
import { FormattedMessage } from 'react-intl';
import { stringIsNullOrEmpty } from 'Utils/propertyValidation';
import messages from './messages';

// Default with for the drawer
const drawerWidth = 82;

const selectedStyle = {
  position: 'absolute',
  width: 4,
  backgroundColor: '#20c161',
  top: 0,
  bottom: 0,
  right: 0,
};

const SelectedBox = () => <div style={selectedStyle} />;

/**
 * Declare UI styles
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  alignCenter: {
    'text-align': 'center',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    height: '80%',
  },
  avatarContainer: {
    padding: '16px 0px 42px 17px',
    fontSize: '16px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  spacing: {
    flexGrow: 1,
  },
  itemIcon: {
    justifyContent: 'center',
  },
  listItem: {
    height: 48,
    padding: 0,
    justifyContent: 'center',
    '&.Mui-selected': {
      background: '#d0eedd',
    },
  },
  circleAvatar: {
    backgroundColor: Colors.mountainMeadow,
    color: Colors.white,
    width: '48px',
    height: '48px',
  },
  avatarText: {
    fontSize: '14px',
  },
  versionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  },
}));

/**
 * DrawerComponent
 * @param {Object[]{id,selected:false,icon:'',url:''}} options Object Array with the options to display on Drawer
 * @param {string} version Application version
 * @param {Object} user Current user information
 */
const DrawerComponent = (props) => {
  const { options = [], version, user = {} } = props;
  const [nameInitialChar, setNameInitialChar] = React.useState('');
  const [familyNameInitialChar, setFamilyNameInitialChar] = React.useState('');

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      const nameInitial = !stringIsNullOrEmpty(user.user.firstName)
        ? user.user.firstName.substring(0, 1)
        : '';
      const familyNameInitial = !stringIsNullOrEmpty(user.user.lastName)
        ? user.user.lastName.substring(0, 1)
        : '';
      setNameInitialChar(nameInitial);
      setFamilyNameInitialChar(familyNameInitial);
    }
  }, [user]);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <div className={classes.avatarContainer}>
          <Avatar className={classes.circleAvatar} src={user.user.avatar}>
            <span className={classes.avatarText}>
              {nameInitialChar}
              {familyNameInitialChar}
            </span>
          </Avatar>
        </div>
        <List>
          {options.map(({ id, selected, icon, url }) => (
            <Link to={url} key={id}>
              <ListItem
                button
                selected={selected}
                className={classes.listItem}
                key={id}
              >
                <ListItemIcon className={classes.itemIcon}>
                  <img src={icon} alt="" />
                </ListItemIcon>
                {selected && <SelectedBox />}
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
      <div className={classes.versionContainer}>
        <Typography className={classes.alignCenter}>
          {window.env.environment}
        </Typography>
        <Typography>
          <FormattedMessage {...messages.version} />
        </Typography>
        <Typography>{version}</Typography>
      </div>
    </Drawer>
  );
};

DrawerComponent.propTypes = {
  options: PropTypes.array,
  version: PropTypes.string,
  user: PropTypes.object,
};

/**
 * mapStateToProps
 * @param {Object} state receives user reducer from redux
 */
const mapStateToProps = (state) => ({
  user: state.user,
});

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(mapStateToProps)(DrawerComponent);
/* eslint-enable */
