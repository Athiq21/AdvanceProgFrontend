import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Box, Typography, Avatar, Button, CardMedia, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AddButton from '../../Button/Add/AddButtons';
import { AppDispatch, RootState} from '../../../../store/index';
import { createOrder } from '../../../../store/features/orderSlice';
import { styled } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import ColorLensIcon from '@mui/icons-material/ColorLens';


interface DescriptionCardProps {
  open: boolean;
  onClose: () => void;
  image: string;
  userProfilePic: string;
  userId: number;
  firstName: string;
  title: string;
  description: string;
  mileage: string;
  price: string;
  fueltype: string;
  transmission: string;
  color: string;
  status: string;
  itemId: number;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflow: 'hidden'
  }
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  open,
  onClose,
  image,
  userProfilePic,
  firstName,
  title,
  description,
  mileage,
  price,
  fueltype,
  transmission,
  color,
  status,
  itemId,
}) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: '',
  });
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
 

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.order);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookButtonClick = () => {
    setIsBookingFormVisible(true);
  };

  const [userId, setUserId] = useState<number | null>(null);  // Declare state for userId

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');  // Get userId from sessionStorage
    if (storedUserId) {
      setUserId(parseInt(storedUserId));  // Set userId if available
    }
  }, []);

  const handleBookingSubmit = async () => {
    console.log('User ID:', userId);
    console.log('Start Date:', formData.startDate); 
    console.log('End Date:', formData.endDate);
    
    if (!formData.startDate || !formData.endDate || !userId) {
      console.error('Please provide valid start date, end date, and user information.');
      return;
    }
  
    const formattedStartDate = new Date(formData.startDate).toISOString().split('T')[0];
    const formattedEndDate = new Date(formData.endDate).toISOString().split('T')[0];
  
    console.log('Formatted Start Date:', formattedStartDate); 
    console.log('Formatted End Date:', formattedEndDate); 
  
    const orderData = {
      id: 0, // This will be assigned by the backend
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      user: { id: userId },
      item: { id: itemId },
      paymentMethod: formData.paymentMethod,
      status: 'pending' // Initial status
    };
  
    try {
      await dispatch(createOrder(orderData)).unwrap();
      console.log('Order Data:', orderData); 
      setIsBookingConfirmed(true);  
    } catch (err) {
      console.error('Booking submission failed:', err); 
    }
  };
  
  
  return (
    <StyledDialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      PaperProps={{
        sx: {
          width: '85%',
          height: '85%',
          maxHeight: '900px',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{ 
            width: '50%', 
            position: 'relative',
            backgroundColor: 'black'
          }}>
           
            <CardMedia
              component="img"
              image={`${image}`}
              alt="popup image"
              sx={{ height: '100%', width: '100%', objectFit: "contain", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
            />
         <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontWeight: 'bold'
              }}
            >
              {price}
            </Typography>
          </Box>

          <Box sx={{ 
            width: '50%', 
            pl: 4, 
            pr: 4, 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'auto',
            bgcolor: 'background.paper',
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} mt={3}>
              <Box display="flex" alignItems="center">
                <Avatar src={userProfilePic} sx={{ 
                  mr: 2, 
                  width: 48, 
                  height: 48,
                  border: '2px solid',
                  borderColor: 'primary.main'
                }} />
                <Box>
                  <Typography variant="h6">{firstName}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">Vehicle Owner</Typography>
                </Box>
              </Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor: status === 'available' ? 'success.light' : 'error.light',
                  color: status === 'available' ? 'success.dark' : 'error.dark',
                  fontWeight: 'medium'
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                lineHeight: 1.8
              }}
            >
              {description}
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>Vehicle Specifications</Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 2,
              mb: 4
            }}>
              <FeatureBox>
                <LocalGasStationIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Fuel Type</Typography>
                  <Typography variant="body1" fontWeight="medium">{fueltype}</Typography>
                </Box>
              </FeatureBox>
              
              <FeatureBox>
                <DirectionsCarIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Transmission</Typography>
                  <Typography variant="body1" fontWeight="medium">{transmission}</Typography>
                </Box>
              </FeatureBox>

              <FeatureBox>
                <ColorLensIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Color</Typography>
                  <Typography variant="body1" fontWeight="medium">{color}</Typography>
                </Box>
              </FeatureBox>

              <FeatureBox>
                <SpeedIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Mileage</Typography>
                  <Typography variant="body1" fontWeight="medium">{mileage}</Typography>
                </Box>
              </FeatureBox>
            </Box>

            {/* Booking section */}
            {status === 'available' && !isBookingFormVisible && (
              <Box sx={{ mt: 2 }}>
                
                  <AddButton 
                  variant="contained" 
                  onClick={handleBookButtonClick}
                  sx={{
                    width: '100%',
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                  >
                  Book
                </AddButton>
              </Box>
            )}

            {isBookingFormVisible && !isBookingConfirmed && (
              <Box>
                <TextField
  label="Start Date"
  name="startDate"
  type="date"
  fullWidth
  margin="normal"
  value={formData.startDate}
  onChange={handleInputChange}
  InputLabelProps={{ shrink: true }}
  InputProps={{
    inputProps: { min: new Date().toISOString().split('T')[0] },  // Prevent past dates
  }}
/>

<TextField
  label="End Date"
  name="endDate"
  type="date"
  fullWidth
  margin="normal"
  value={formData.endDate}
  onChange={handleInputChange}
  InputLabelProps={{ shrink: true }}
  InputProps={{
    inputProps: { min: formData.startDate || new Date().toISOString().split('T')[0] }, 
  }}
/>
                <FormControl>
                  <FormLabel>Payment Method</FormLabel>
                  <RadioGroup
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="payOnArrival" control={<Radio />} label="Pay on Arrival" />
                    <FormControlLabel value="online" control={<Radio />} label="Pay Online" />
                  </RadioGroup>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <AddButton
                  variant="contained"
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  sx={{ mt: 2,height: '50px' }}
                >
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </AddButton>
                </Box>
                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              </Box>
            )}

            {isBookingConfirmed && (
              <Typography sx={{ mt: 3 }}>Thank you for booking! Your order is confirmed.</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
};

export default DescriptionCard;
            