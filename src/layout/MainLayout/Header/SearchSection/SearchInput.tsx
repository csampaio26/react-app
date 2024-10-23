import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { FormattedMessage } from 'react-intl';

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
  color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
  }
}));

interface Props {
  value: string;
  setValue: (value: string) => void;
  popupState: any;
}

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, setValue, popupState }: Props) => {
  const theme = useTheme();

  return (
    <FormattedMessage id="Search">
      {(msg) => (
        <OutlineInputStyle
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={msg.toString()}
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Box sx={{ ml: 2 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
                    color: theme.palette.orange.dark,
                    '&:hover': {
                      background: theme.palette.orange.dark,
                      color: theme.palette.orange.light
                    }
                  }}
                  {...bindToggle(popupState)}
                >
                  <IconX stroke={1.5} size="1.3rem" />
                </Avatar>
              </Box>
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
        />
      )}
    </FormattedMessage>
  );
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchInput = (props: { setValueSearch: (searchedVal: string) => void }) => {
  const theme = useTheme();
  const [value, setValue] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      props.setValueSearch(value);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' }, float: 'right', marginTop: 1, marginRight: 1 }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                  <IconSearch stroke={1.5} size="1.2rem" />
                </HeaderAvatarStyle>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                      <Card
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch
                                value={value}
                                setValue={(str) => {
                                  props.setValueSearch(str);
                                  setValue(str);
                                }}
                                popupState={popupState}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block', marginTop: 0, marginRight: 20, marginBottom: 20, float: 'right' } }}>
        <FormattedMessage id="Search">
          {(msg) => (
            <OutlineInputStyle
              id="input-search-header"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder={msg.toString()}
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                </InputAdornment>
              }
              aria-describedby="search-helper-text"
              inputProps={{ 'aria-label': 'weight' }}
            />
          )}
        </FormattedMessage>
      </Box>
    </>
  );
};

export default SearchInput;
