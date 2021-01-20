import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Divider from '@material-ui/core/Divider';

import InboxIcon from "@material-ui/icons/MoveToInbox";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HistoryIcon from '@material-ui/icons/History';
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';

import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

export const LeftMobileMenu = ({ isOpen, toggleDrawer, isAdmin, isAuth }) => {
  const classes = useStyles();
  return (
    <div>
      <Drawer anchor={"left"} open={isOpen} onClick={toggleDrawer}>
        <List className={classes.list}>
          {isAdmin ?
            <>
              <ListItem button component={RouterLink} to='/'>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="products" />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="create products" />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary="categories" />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon><HistoryIcon /></ListItemIcon>
                <ListItemText primary="history" />
              </ListItem>
            </> :
            (!isAdmin & isAuth) ?
              <>
                <ListItem button component={RouterLink} to='/'>
                  <ListItemIcon><StorefrontIcon /></ListItemIcon>
                  <ListItemText primary="shop" />
                </ListItem>
                <Divider/>
                <ListItem buttoncomponent={RouterLink} to='/history'>
                  <ListItemIcon><HistoryIcon /></ListItemIcon>
                  <ListItemText primary="history" />
                </ListItem>
              </> :
              <>
                <ListItem button component={RouterLink} to='/'>
                  <ListItemIcon><StorefrontIcon /></ListItemIcon>
                  <ListItemText primary="shop" />
                </ListItem>
                <Divider/>
                <ListItem button component={RouterLink} to='/login'>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="login" />
                </ListItem>
                <Divider/>
                <ListItem button component={RouterLink} to='/register'>
                  <ListItemIcon><LockOpenIcon /></ListItemIcon>
                  <ListItemText primary="registration" />
                </ListItem>
              </>
          }

        </List>
      </Drawer>
    </div>
  );
}
