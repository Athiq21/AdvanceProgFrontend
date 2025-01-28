// 

import { Box, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DevicesIcon from '@mui/icons-material/Devices';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CakeIcon from '@mui/icons-material/Cake';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import WatchIcon from '@mui/icons-material/Watch';
import NavData from '../../common/Component/NavBar/NavData/NavData';

const iconMap: { [key: string]: JSX.Element } = {
  "Electronic Items": <DevicesIcon />,
  "Vehicles": <DirectionsCarIcon />,
  "Cakes": <CakeIcon/>,
  "Home & Garden": <HomeWorkIcon />,
  "Property": <LocationCityIcon />,
  "Fashion":<WatchIcon/>,
  "Others": <ReadMoreIcon />
};

const MenuBars: React.FC = () => {
  const categoryLinks = NavData.find(item => item.label === "Category")?.subLinks || [];

  return (
    <Box
    sx={{
      borderRadius:'30px',
      width: '680px',
      position: 'absolute',
      top:135,
      left: '35%',
      bottom: 0,
      backgroundColor: '#f4f4f4',
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'column',
      height: '20%'
    }}
  >
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row',  
        overflowX: 'auto',    
        gap: '8px',       
        px: 1,             
      }}>
        {categoryLinks.map((item) => {
          const icon = iconMap[item.label] || <ReadMoreIcon />; // Default icon if not found

          return (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: '0 0 auto',
                minWidth: '100px', // Reduced minimum width for each item
              }}
            >
              <IconButton
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ mb: 0.5 }} // Reduced margin bottom for spacing between icon and text
              >
                {icon}
              </IconButton>
              <Typography variant="body2" sx={{ textTransform: 'capitalize', fontSize: '0.875rem' }}>
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Typography variant="h6" align="center" sx={{ mr:50,mt: 4, fontSize: '1rem' }}>
        Categorie
      </Typography>
    </Box>
  );
};

export default MenuBars;