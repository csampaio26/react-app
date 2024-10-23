import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import useConfig from 'hooks/useConfig';
import { StoreAuto } from 'types/storeauto';
import useAuth from 'hooks/useAuth';
import { IconHome } from '@tabler/icons';

// ==============================|| LOCALIZATION ||============================== //

const storeAutoSection = () => {
  const { borderRadius, storeAuto, onChangestoreAuto } = useConfig();

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const [store, setstore] = useState<StoreAuto>(storeAuto!);

  const handleListItemClick = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | undefined,
    std: StoreAuto
  ) => {
    setstore(std);
    onChangestoreAuto(std);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const { user } = useAuth();

  useEffect(() => {
    if (store === undefined) {
      if (
        user?.role != undefined &&
        user?.role.description.toString() == 'user'
      ) {
        setstore(user!.store);
        onChangestoreAuto(user!.store);
      } else if (user !== null) {
        setstore(user!.storesauto[0]);
        onChangestoreAuto(user!.storesauto[0]);
      }
    } else {
      if (
        user?.role != undefined &&
        user?.role.description.toString() == 'user'
      ) {
        setstore(user!.store);
        onChangestoreAuto(user!.store);
      } else {
        setstore(store);
        onChangestoreAuto(store);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, user]);

  return user != undefined &&
    user?.role != undefined &&
    user?.role.description.toString() !== 'user' ? (
    <>
      <Box
        sx={{
          ml: 2,
          [theme.breakpoints.down('md')]: {
            ml: 1,
          },
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            border: '1px solid',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            background:
              theme.palette.mode === 'dark'
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            transition: 'all .2s ease-in-out',
            '&[aria-controls="menu-list-grow"],&:hover': {
              borderColor: theme.palette.secondary.main,
              background: theme.palette.secondary.main,
              color: theme.palette.secondary.light,
            },
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="inherit"
        >
          <IconHome stroke={1.5} size="1.3rem" />
        </Avatar>
      </Box>

      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions
              position={matchesXs ? 'top' : 'top-left'}
              in={open}
              {...TransitionProps}
            >
              <Paper elevation={16}>
                {open && (
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      minWidth: 300,
                      maxWidth: 380,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: `${borderRadius}px`,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 250,
                      },
                    }}
                  >
                    {user?.storesauto != undefined &&
                      user?.storesauto.map((item) => {
                        return (
                          <ListItemButton
                            key={item.id}
                            selected={store.id === item.id}
                            onClick={(event) =>
                              handleListItemClick(event, item)
                            }
                          >
                            <ListItemText
                              primary={
                                <Grid container>
                                  <Typography color="textPrimary">
                                    {item.description}
                                  </Typography>
                                </Grid>
                              }
                            />
                          </ListItemButton>
                        );
                      })}
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  ) : (
    <></>
  );
};

export default storeAutoSection;
