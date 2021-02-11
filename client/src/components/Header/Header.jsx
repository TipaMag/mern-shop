import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import { Link as RouterLink } from 'react-router-dom'

import { LeftMobileMenu } from './LeftMobileMenu'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth-reducer'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    textDecoration: 'none',
    color: '#fff'
  },
  userName: {
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const isAuth = useSelector(state => state.auth.isAuth)
  const isAdmin = useSelector(state => state.user.isAdmin)
  const user = useSelector(state => state.user)

  const [isOpen, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!isOpen)
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  };

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  const menuId = 'primary-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(); handleLogout()}}>Log out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h5" noWrap component={RouterLink} to='/'>
            Sundries shop
          </Typography>

          <div className={classes.grow} />
          <div className={classes.navigationDesktop}>
            {isAdmin ?
              <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                <Button component={RouterLink} to='/'>products</Button>
                <Button component={RouterLink} to='/create_product'>create product</Button>
                <Button component={RouterLink} to='/categories'>categories</Button>
                <Button component={RouterLink} to='/history'>history</Button>
              </ButtonGroup> :
            (!isAdmin & isAuth) ?
              <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                <Button component={RouterLink} to='/'>shop</Button>
                <Button component={RouterLink} to='/history'>history</Button>
              </ButtonGroup> :
              <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
                <Button component={RouterLink} to='/'>shop</Button>
                <Button component={RouterLink} to='/login'>Login</Button>
                <Button component={RouterLink} to='/register'>Registration</Button>
              </ButtonGroup>
            }
          </div>
          {
            user.name &&
              <div className={classes.userName}>
                <Typography variant="button" color='inherit' component="p">
                    {isAdmin ? `${user.name} (admin)`: `${user.name}`}
                </Typography>
              </div>
          }
          {
            !isAdmin && 
              <div className={classes.shopCart}>
                <IconButton aria-label="user cart" color="inherit" component={RouterLink} to='/cart'>
                  <Badge badgeContent={user.cart.length} showZero color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </div>
          }
          {
            (isAuth || isAdmin) &&
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
          }
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LeftMobileMenu 
        toggleDrawer={toggleDrawer} 
        isOpen={isOpen} 
        isAdmin={isAdmin} 
        isAuth={isAuth}
        />
    </div>
  )
}
