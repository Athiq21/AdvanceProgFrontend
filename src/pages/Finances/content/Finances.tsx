import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  useMediaQuery,
  useTheme,
  TablePagination,
} from '@mui/material';
import NavBar2 from '../../../common/Component/NavBar/NavBar2';
import { useDispatch, useSelector } from 'react-redux';
import { AllfetchOrders } from '../../../store/features/orderSlice';

interface OrderData {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  createdDatetime: string;
  user: {
    firstName: string;
    lastName: string;
  };
  item: {
    name: string;
    price: string;
  };
}

const Finances = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.order.orders);

  useEffect(() => {
    dispatch(AllfetchOrders() as any);
  }, [dispatch]);

  // Calculate rental duration and price
  const calculateTotalPrice = (order: OrderData): number => {
    try {
      const start = new Date(order.startDate);
      const end = new Date(order.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const priceStr = order.item.price.replace(/[^0-9]/g, '');
      const pricePerDay = priceStr ? parseInt(priceStr) : 0;
      return diffDays * pricePerDay;
    } catch (error) {
      console.error('Error calculating price for order:', order);
      return 0;
    }
  };

  // Calculate summary statistics
  const calculateSummaryData = () => {
    if (!orders) return { totalRevenue: 0, onlinePayments: 0, cashPayments: 0, averageOrderValue: 0 };

    const totalRevenue = orders.reduce((sum: number, order: OrderData) => 
      sum + calculateTotalPrice(order), 0);

    const onlinePayments = orders
      .filter((order: OrderData) => order.paymentMethod === 'online')
      .reduce((sum: number, order: OrderData) => sum + calculateTotalPrice(order), 0);

    const cashPayments = orders
      .filter((order: OrderData) => order.paymentMethod === 'payOnArrival')
      .reduce((sum: number, order: OrderData) => sum + calculateTotalPrice(order), 0);

    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    return {
      totalRevenue,
      onlinePayments,
      cashPayments,
      averageOrderValue
    };
  };

  const summaryData = calculateSummaryData();

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get current page data
  const currentPageData = orders?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ) || [];

  return (
    <>
      <NavBar2/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, marginTop:'70px' }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}>
              <Typography variant="subtitle1" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
                {formatCurrency(summaryData.totalRevenue)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}>
              <Typography variant="subtitle1" color="text.secondary">
                Online Payments
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
                {formatCurrency(summaryData.onlinePayments)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}>
              <Typography variant="subtitle1" color="text.secondary">
                Cash Payments
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
                {formatCurrency(summaryData.cashPayments)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}>
              <Typography variant="subtitle1" color="text.secondary">
                Average Order Value
              </Typography>
              <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
                {formatCurrency(summaryData.averageOrderValue)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
          <Table 
            size={isMobile ? "small" : "medium"}
            sx={{
              minWidth: 650,
              "& th": {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold'
              },
              "& th, & td": {
                padding: isMobile ? "8px" : "16px",
                fontSize: isMobile ? "0.8rem" : "0.875rem"
              }
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((order: OrderData) => (
                <TableRow 
                  key={order.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f8f9fa' }
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ color: 'primary.main' }}>
                    {order.id}
                  </TableCell>
                  <TableCell>{`${order.user.firstName} ${order.user.lastName}`}</TableCell>
                  <TableCell>{order.item.name}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{new Date(order.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(order.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell align="right">{formatCurrency(calculateTotalPrice(order))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #dee2e6'
            }}
          />
        </TableContainer>
      </Container>
    </>
  );
};

export default Finances;
