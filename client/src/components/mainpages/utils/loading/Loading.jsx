import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    // width: 'auto', 
    // height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
}));

export const Loading = ({color}) => {
  const classes = useStyles();

  return (
    <div className={classes.loadingContainer}>
      <CircularProgress color={color ? color : "primary"} />
    </div>
  );
}