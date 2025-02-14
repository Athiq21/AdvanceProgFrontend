import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  useMediaQuery, Select, MenuItem, FormControl, InputLabel, TextField,
  Grid, Button, Box,
  Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Container } from "@mui/material";
import NavBar2 from '../../../common/Component/NavBar/NavBar2';
import { useDispatch, useSelector } from 'react-redux';
import { AllfetchOrders } from '../../../store/features/orderSlice';
import { Visibility } from '@mui/icons-material';

interface OrderData {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  createdDatetime: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    isActivated: boolean;
  };
  item: {
    id: number;
    name: string;
    price: string;
    imageBlob: string;
    createdBy: number;
  };
}

interface OrderDetailsDialogProps {
  order: OrderData | null;
  open: boolean;
  onClose: () => void;
}

const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const calculateTotalPrice = (order: OrderData): number => {
  const numberOfDays = calculateDaysBetween(order.startDate, order.endDate);
  const pricePerDay = parseInt(order.item.price.replace(/[^0-9]/g, ''));
  return numberOfDays * pricePerDay;
};

const isDateInRange = (date: string, startDate: string, endDate: string): boolean => {
  const orderDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return orderDate >= start && orderDate <= end;
};

const OrderDetailsDialog = ({ order, open, onClose }: OrderDetailsDialogProps) => {
  if (!order) return null;

  const numberOfDays = calculateDaysBetween(order.startDate, order.endDate);
  const pricePerDay = parseInt(order.item.price.replace(/[^0-9]/g, ''));
  const totalPrice = numberOfDays * pricePerDay;


  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Order Information</Typography>
            <Typography>Order ID: {order.id}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Payment Method: {order.paymentMethod}</Typography>
            <Typography>Order Date: {order.createdDatetime}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Customer Information</Typography>
            <Typography>Name: {order.user.firstName} {order.user.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Rental Period & Cost Calculation</Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography>Start Date: {new Date(order.startDate).toLocaleDateString()}</Typography>
                  <Typography>End Date: {new Date(order.endDate).toLocaleDateString()}</Typography>
                  <Typography>Total Days: {calculateDaysBetween(order.startDate, order.endDate)} days</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Price per Day: Rs. {parseInt(order.item.price.replace(/[^0-9]/g, ''))}</Typography>
                  <Typography fontWeight="bold" color="primary">
                    Total Cost: Rs. {calculateTotalPrice(order)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">Item Information</Typography>
            <Typography>Item Name: {order.item.name}</Typography>
            <Typography>Price per Day: {order.item.price}</Typography>
            <Box mt={2}>
              <img 
                src={order.item.imageBlob} 
                alt={order.item.name}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Order = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [dateRange, setDateRange] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const statuses = ['', 'processing', 'completed', 'cancelled'];
  const orderTypes = ['','Delivery', 'Exchange', 'Return'];

  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.order.orders);

  useEffect(() => {
    dispatch(AllfetchOrders() as any);
    // handleDateRangeChange('today');
  }, [dispatch]);

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    switch (range) {
      case 'today':
        setStartDate(now.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        break;
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        setStartDate(yesterday.toISOString().split('T')[0]);
        setEndDate(yesterday.toISOString().split('T')[0]);
        break;
      case 'last 7 days':
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        break;
      case 'custom':
        break;
      default:
        setStartDate('');
        setEndDate('');
    }
  };

  const filteredData = orders?.filter((order: OrderData) => {
    const orderDate = new Date(order.createdDatetime);
    orderDate.setHours(0, 0, 0, 0);

    const matchesStatus = status === '' || order.status === status;
    const matchesOrderNumber = orderNumber === '' || order.id.toString().includes(orderNumber);
    
    let matchesDate = true;
    if (startDate && endDate) {
      matchesDate = isDateInRange(order.createdDatetime, startDate, endDate);
    }

    return matchesStatus && matchesOrderNumber && matchesDate;
  });

  const handleViewOrder = (order: OrderData) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  return (
    <>
    <NavBar2 />
      <Container maxWidth="lg" style={{ backgroundColor: '#f8f9fa', padding: '20px', marginBottom: '05px',marginTop:'70px' }}>
      <Typography variant="h7">ALL ORDERS</Typography>
        <Grid container spacing={3}>
          {/* Date Selection Row */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap', 
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 1
            }}>
              <Typography variant="h7">Date</Typography>
              {['Today', 'Yesterday', 'Last 7 Days', 'Custom'].map((option) => (
                <Button
                  key={option}
                  variant={dateRange === option.toLowerCase() ? "contained" : "outlined"}
                  onClick={() => handleDateRangeChange(option.toLowerCase())}
                  size="small"
                >
                  {option}
                </Button>
              ))}
              {dateRange === 'custom' && (
                <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              backgroundColor: 'white',
   
              borderRadius: 1
            }}>
              
              <Box sx={{ marginTop: '15px' }}>
              <Typography variant="h7">Select Status</Typography>
              </Box>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                  size="medium"
                >
                  {statuses.map((statusOption) => (
                    <MenuItem key={statusOption} value={statusOption}>{statusOption}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

        </Grid>
      </Container>
      <Container maxWidth="lg" style={{ backgroundColor: '#e9ecef', padding: '20px', marginBottom: '10px' }}>
        <Grid container spacing={2}>
         
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 1
            }}>
              <Typography variant="h7" sx={{ marginBottom: 1 }}>Order Number</Typography>
              <TextField
                fullWidth
                placeholder="Enter order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                size="medium"
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 1
            }}>
              <Typography variant="h7" sx={{ marginBottom: 1 }}>Phone Number</Typography>
              <TextField
                fullWidth
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                size="medium"
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" style={{ backgroundColor: '#dee2e6', padding: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Orders</Typography>

        <TableContainer 
          component={Paper} 
          sx={{ 
            mt: 2,
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table 
            size={isMobile ? "small" : "medium"} 
            sx={{
              minWidth: 650,
              backgroundColor: 'white',
              "& th": {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
                color: '#2c3e50'
              },
              "& th, & td": {
                padding: isMobile ? "8px" : "16px",
                fontSize: isMobile ? "0.8rem" : "1rem",
                borderBottom: '1px solid #e0e0e0'
              },
              "& tr:hover": {
                backgroundColor: '#f8f9fa'
              }
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">Order ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Customer Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Item Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Payment Method</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Order Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Start Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">End Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Total Cost</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData?.map((order: OrderData) => (
                <TableRow 
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                    {order.id}
                  </TableCell>
                  <TableCell>{`${order.user.firstName} ${order.user.lastName}`}</TableCell>
                  <TableCell>{order.item.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.createdDatetime}</TableCell>
                  <TableCell>{order.startDate}</TableCell>
                  <TableCell>{order.endDate}</TableCell>
                  <TableCell>{order.item.price}</TableCell>
                  <TableCell>Rs. {calculateTotalPrice(order)}</TableCell>
                  


                  <TableCell> 
                    <IconButton
                      color="primary"
                      onClick={() => handleViewOrder(order)}
                      size="small"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {(!filteredData || filteredData.length === 0) && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No orders found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <OrderDetailsDialog
        order={selectedOrder}
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default Order;
