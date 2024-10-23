// material-ui
import { Box } from '@mui/material';

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}></Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}></Box>
    </>
  );
};

export default SearchSection;
