import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import { login } from '../../../redux/auth-reducer';

import { Typography, Container, CssBaseline, Avatar, ButtonGroup, Button, TextField } from '@material-ui/core';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonGroup: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)

  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(login(values))
    }
  })

  if (isAuth) return <Redirect to='/' />
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.form} onSubmit={formik.handleSubmit} >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="email"
            variant="outlined"
            margin="normal"
            type="email"
            autoFocus

            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={e => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={75}
            />
          </FormControl>

          <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" fullWidth aria-label="outlined primary button group">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
              </Button>
            <Button component={RouterLink} color="secondary" to='/register'>Registration</Button>
          </ButtonGroup>
        </form>
      </div>
    </Container>
  )
}