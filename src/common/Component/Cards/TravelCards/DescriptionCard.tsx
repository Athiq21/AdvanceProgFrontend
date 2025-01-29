import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Box, Typography, Avatar, Button, CardMedia, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AddButton from '../../Button/Add/AddButtons';
import { AppDispatch, RootState} from '../../../../store/index';
import { createOrder } from '../../../../store/features/orderSlice';


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
  const { loading, success, error } = useSelector((state: RootState) => state.order);

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
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      user: { id: userId },
      item: { id: itemId },
      paymentMethod: formData.paymentMethod,
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{
      sx: {
        borderRadius: 2,
        width: '80%',
        height: '80%',
      },
    }}>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={`${image}`}
              alt="popup image"
              sx={{ height: '100%', width: '100%', objectFit: "contain", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
            />
          </Box>
          <Box sx={{ width: '50%', pl: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" alignItems="center" mb={2} marginTop="10px">
              <Avatar src={userProfilePic} sx={{ mr: 1, width: 40, height: 40 }} />
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{firstName}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{title}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{description}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{fueltype}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{transmission}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{color}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{mileage}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography> {price}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            <Typography>{status}</Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop="10px">
            </Box>
            {status === 'available' && !isBookingFormVisible && (
              <Box sx={{ mt: 3 }}>
                <AddButton variant="contained" onClick={handleBookButtonClick}>
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
    inputProps: { min: formData.startDate || new Date().toISOString().split('T')[0] },  // Min date set to startDate
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
                <Button
                  variant="contained"
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </Button>
                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              </Box>
            )}

            {isBookingConfirmed && success && (
              <Typography sx={{ mt: 3 }}>Thank you for booking! Your order is confirmed.</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionCard;


