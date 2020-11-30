import React from 'react';
import { Formik, Field, Form } from 'formik';
import { authAPI } from '../../../api/auth-api';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const Login = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async (values) => {
        const result = await authAPI.login(values)
        if(result) alert(result)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="jane@acme.com" type="email" />

          <label htmlFor="password">Password</label>
          <Field name="password" placeholder="password" type="password" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);
