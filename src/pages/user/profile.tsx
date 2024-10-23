import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';

// project imports
import UserProfile from 'components/users/account-profile/UserProfile';
import ChangePassword from 'components/users/account-profile/ChangePassword';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';

// types
import { TabsProps } from 'types';
import { FormattedMessage } from 'react-intl';

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// tabs option
const tabsOption = [
  {
    label: <FormattedMessage id="User Profile" />,
    icon: <PersonOutlineTwoToneIcon />,
    caption: <FormattedMessage id="Profile Settings" />
  },
  {
    label: <FormattedMessage id="Change Password" />,
    icon: <VpnKeyTwoToneIcon />,
    caption: <FormattedMessage id="Update Profile Security" />
  }
];

// ==============================|| PROFILE 2 ||============================== //

const Profile = () => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title={<FormattedMessage id="Account Settings" />} content={false}>
          <Grid container spacing={gridSpacing} marginBottom={1}>
            <Grid item xs={12} lg={4}>
              <CardContent>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  orientation="vertical"
                  variant="scrollable"
                  sx={{
                    '& .MuiTabs-flexContainer': {
                      borderBottom: 'none'
                    },
                    '& button': {
                      color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
                      minHeight: 'auto',
                      minWidth: '100%',
                      py: 1.5,
                      px: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      justifyContent: 'flex-start',
                      borderRadius: `${borderRadius}px`
                    },
                    '& button.Mui-selected': {
                      color: theme.palette.primary.main,
                      background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                    },
                    '& button > svg': {
                      marginBottom: '0px !important',
                      marginRight: 1.25,
                      marginTop: 1.25,
                      height: 20,
                      width: 20
                    },
                    '& button > div > span': {
                      display: 'block'
                    },
                    '& > div > span': {
                      display: 'none'
                    }
                  }}
                >
                  {tabsOption.map((tab, index) => (
                    <Tab
                      key={index}
                      icon={tab.icon}
                      label={
                        <Grid container direction="column">
                          <Typography variant="subtitle1" color="inherit">
                            {tab.label}
                          </Typography>
                          <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                            {tab.caption}
                          </Typography>
                        </Grid>
                      }
                      {...a11yProps(index)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent
                sx={{
                  borderLeft: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                  height: '100%'
                }}
              >
                <TabPanel value={value} index={0}>
                  <UserProfile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ChangePassword />
                </TabPanel>
              </CardContent>
            </Grid>
          </Grid>
          <Divider />
          <CardActions>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item>
                {value > 0 && (
                  <AnimateButton>
                    <Button variant="outlined" size="large" onClick={(e) => handleChange(e, value - 1)}>
                      <FormattedMessage id="Back" />
                    </Button>
                  </AnimateButton>
                )}
              </Grid>
              <Grid item>
                {value < 3 && (
                  <AnimateButton>
                    <Button variant="contained" size="large" onClick={(e) => handleChange(e, 1 + value)}>
                      <FormattedMessage id="Continue" />
                    </Button>
                  </AnimateButton>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
};
Profile.Layout = 'authGuard';
export default Profile;
