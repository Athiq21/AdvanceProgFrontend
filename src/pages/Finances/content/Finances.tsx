import React, { useState } from 'react';
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

interface FinanceData {
  trackingNumber: string;
  orderNumber: string;
  customerName: string;
  address: string;
  phone: string;
  email: string;
  collectedCOD: number;
  deliveryCharge: number;
  cod: number;
}

const Finances = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data for the summary
  const summaryData = {
    totalCOD: 250000,
    totalCollectedCOD: 200000,
    totalDeliveryCharge: 25000,
    payableCOD: 175000
  };

  // Extended mock data for the table
  const financeData: FinanceData[] = [
    {
      trackingNumber: "TRK001",
      orderNumber: "ORD001",
      customerName: "John Doe",
      address: "123 Main St, Colombo",
      phone: "0771234567",
      email: "john@example.com",
      collectedCOD: 5000,
      deliveryCharge: 500,
      cod: 5500
    },
    {
      trackingNumber: "TRK002",
      orderNumber: "ORD002",
      customerName: "Jane Smith",
      address: "456 Park Ave, Kandy",
      phone: "0772345678",
      email: "jane@example.com",
      collectedCOD: 7500,
      deliveryCharge: 600,
      cod: 8100
    },
    {
      trackingNumber: "TRK003",
      orderNumber: "ORD003",
      customerName: "Mike Johnson",
      address: "789 Lake Rd, Galle",
      phone: "0773456789",
      email: "mike@example.com",
      collectedCOD: 3000,
      deliveryCharge: 400,
      cod: 3400
    },
    {
      trackingNumber: "TRK004",
      orderNumber: "ORD004",
      customerName: "Sarah Wilson",
      address: "321 Hill St, Jaffna",
      phone: "0774567890",
      email: "sarah@example.com",
      collectedCOD: 12000,
      deliveryCharge: 800,
      cod: 12800
    },
    {
      trackingNumber: "TRK005",
      orderNumber: "ORD005",
      customerName: "David Brown",
      address: "654 Beach Rd, Negombo",
      phone: "0775678901",
      email: "david@example.com",
      collectedCOD: 9000,
      deliveryCharge: 700,
      cod: 9700
    },
    {
      trackingNumber: "TRK006",
      orderNumber: "ORD006",
      customerName: "Emma Davis",
      address: "987 Palm St, Matara",
      phone: "0776789012",
      email: "emma@example.com",
      collectedCOD: 15000,
      deliveryCharge: 900,
      cod: 15900
    },
    {
      trackingNumber: "TRK007",
      orderNumber: "ORD007",
      customerName: "James Wilson",
      address: "147 River Rd, Batticaloa",
      phone: "0777890123",
      email: "james@example.com",
      collectedCOD: 6000,
      deliveryCharge: 550,
      cod: 6550
    },
    {
      trackingNumber: "TRK008",
      orderNumber: "ORD008",
      customerName: "Lisa Anderson",
      address: "258 Sea View, Trincomalee",
      phone: "0778901234",
      email: "lisa@example.com",
      collectedCOD: 8500,
      deliveryCharge: 650,
      cod: 9150
    },
    {
      trackingNumber: "TRK009",
      orderNumber: "ORD009",
      customerName: "Tom Harris",
      address: "369 Mountain View, Nuwara Eliya",
      phone: "0779012345",
      email: "tom@example.com",
      collectedCOD: 11000,
      deliveryCharge: 750,
      cod: 11750
    },
    {
      trackingNumber: "TRK010",
      orderNumber: "ORD010",
      customerName: "Amy Taylor",
      address: "741 Valley Rd, Badulla",
      phone: "0770123456",
      email: "amy@example.com",
      collectedCOD: 4500,
      deliveryCharge: 450,
      cod: 4950
    }
  ];

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
  const currentPageData = financeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
    <NavBar2/>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, marginTop:'70px' }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              Total COD
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
              {formatCurrency(summaryData.totalCOD)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              Total Collected COD
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
              {formatCurrency(summaryData.totalCollectedCOD)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              Total Delivery Charge
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
              {formatCurrency(summaryData.totalDeliveryCharge)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              height: '100%'
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              Payable COD
            </Typography>
            <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
              {formatCurrency(summaryData.payableCOD)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 11, boxShadow: 3, borderRadius: 2 }}>
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
              <TableCell>Tracking No.</TableCell>
              <TableCell>Order No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Collected COD</TableCell>
              <TableCell align="right">Delivery Charge</TableCell>
              <TableCell align="right">COD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row) => (
              <TableRow 
                key={row.trackingNumber}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f8f9fa' }
                }}
              >
                <TableCell component="th" scope="row" sx={{ color: 'primary.main' }}>
                  {row.trackingNumber}
                </TableCell>
                <TableCell>{row.orderNumber}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{formatCurrency(row.collectedCOD)}</TableCell>
                <TableCell align="right">{formatCurrency(row.deliveryCharge)}</TableCell>
                <TableCell align="right">{formatCurrency(row.cod)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={financeData.length}
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
