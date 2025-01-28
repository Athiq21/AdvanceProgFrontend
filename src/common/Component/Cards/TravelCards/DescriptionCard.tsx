import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Typography, Avatar, Button, CardMedia, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AddButton from '../../Button/Add/AddButtons';

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
  userId,
  firstName,
  title,
  description,
  mileage,
  price,
  fueltype,
  transmission,
  color,
  status,
  itemId
}) => {
  const [formData, setFormData] = useState({
    address: '',
    nic: '',
    phoneNumber: '',
    paymentMethod: 'payOnArrival',
  });

  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false); // New state to toggle form visibility
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  const handleBookingSubmit = () => {
    console.log('Booking details:', formData);
    setIsBookingConfirmed(true); // Show confirmation message or close modal
  };

  const handleBookButtonClick = () => {
    setIsBookingFormVisible(true); // Show the booking form when "Book" button is clicked
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{
      sx: {
        borderRadius: 2,
        width: '80%',
        height: '80%',
      }
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
            <Box display="flex" alignItems="center" mb={2} marginTop='10px'>
              <Avatar src={userProfilePic} sx={{ mr: 1, width: 40, height: 40 }} />
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>  {firstName} </Typography>
            </Box>
            <Typography><strong>Title:</strong>{title}</Typography>
            <Typography><strong>Description:</strong> {description}</Typography>
            <Typography><strong>Fuel Type:</strong>{fueltype}</Typography>
            <Typography><strong>Transmission:</strong>{transmission}</Typography>
            <Typography><strong>Color:</strong>{color}</Typography>
            <Typography><strong>Mileage:</strong>{mileage}</Typography>
            <Typography><strong>Price:</strong>{price}</Typography>
            <Typography><strong>Status:</strong>{status}</Typography>

            {/* Show "Book" Button only if status is "available" */}
            {status === 'available' && !isBookingFormVisible && (
              <Box sx={{ mt: 3 }}>
                <AddButton variant="contained" onClick={handleBookButtonClick}>
                  Book
                </AddButton>
              </Box>
            )}

            {/* Booking Form */}
            {isBookingFormVisible && !isBookingConfirmed && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <TextField
                  label="NIC"
                  fullWidth
                  margin="normal"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />

                {/* Payment Method */}
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handlePaymentChange}
                  >
                    <FormControlLabel value="payOnArrival" control={<Radio />} label="Pay on Arrival" />
                    <FormControlLabel value="online" control={<Radio />} label="Pay Online" />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleBookingSubmit}
                  >
                    Confirm Booking
                  </Button>
                </Box>
              </Box>
            )}

            {/* Booking Confirmation */}
            {isBookingConfirmed && (
              <AddButton sx={{ mt: 2 }}>
                <Typography>Thank you for booking with us! Your ride is confirmed.</Typography>
              </AddButton>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionCard;
