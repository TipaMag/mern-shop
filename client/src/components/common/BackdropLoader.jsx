import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const BackdropLoader = ({color}) => {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={true} >
        <CircularProgress color={color ? color : 'inherit'} />
      </Backdrop>
    </div>
  );
}