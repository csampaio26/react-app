import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography, SlideProps } from '@mui/material';
import { FormattedMessage } from 'react-intl';

// animation
const Transition = React.forwardRef((props: SlideProps, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - SLIDE ANIMATION ||=============================== //

export default function AlertDialogSlide(props: {
  handleClose: () => void;
  displayElement: any;
  title: string;
  message: string;
  cancelMessage?: JSX.Element;
  okMessage?: JSX.Element;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmClose = () => {
    props.handleClose();
    setOpen(false);
  };

  return (
    <>
      {React.cloneElement(props.displayElement, { onClick: handleClickOpen })}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title1"
        aria-describedby="alert-dialog-slide-description1"
      >
        {open && (
          <>
            <DialogTitle id="alert-dialog-slide-title1">
              <FormattedMessage id={props.title} />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description1">
                <Typography variant="body2" component="span">
                  <FormattedMessage id={props.message} />
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pr: 2.5 }}>
              <Button
                sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                onClick={handleClose}
                color="secondary"
              >
                {props.cancelMessage ? React.cloneElement(props.cancelMessage) : <FormattedMessage id="Cancel" />}
              </Button>
              <Button variant="contained" size="small" onClick={confirmClose}>
                {props.okMessage ? React.cloneElement(props.okMessage) : <FormattedMessage id="Ok" />}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
