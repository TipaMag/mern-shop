import React from 'react';
import { Formik, Field, Form } from 'formik';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link as RouterLink } from 'react-router-dom';

import { TextField } from 'formik-material-ui';
import { ButtonGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { registration } from '../../../redux/auth-reducer';

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

export const RegistrationPage = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values) => {
            dispatch(registration(values))
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Field 
                name="name" 
                placeholder="enter you name" 
                type="text"
                label='Name'
                component={TextField}

                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                // autoFocus
              />
              <Field 
                name="email" 
                placeholder="jane@acme.com" 
                type="email"
                label='Email'
                component={TextField}

                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                autoComplete="email"
                // autoFocus
              />
              <Field 
                name="password" 
                placeholder="password" 
                type="password"
                label="Password"
                component={TextField}

                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                autoComplete="current-password"
              />
              <ButtonGroup className={classes.buttonGroup} variant="contained" color="primary" fullWidth aria-label="outlined primary button group">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Register
                  </Button>
                <Button component={RouterLink} color="secondary" to='/login'>Login</Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}