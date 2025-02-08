import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { AllfetchOrders } from '../../../store/features/orderSlice';
import NavBar2 from '../../../common/Component/NavBar/NavBar2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ItemStats {
  itemId: number;
  name: string;
  totalRevenue: number;
  rentCount: number;
  averageRentalDuration: number;
}

const Reports: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.order.orders);
  const [reportType, setReportType] = useState<'revenue' | 'items' | 'customers'>('revenue');

  useEffect(() => {
    dispatch(AllfetchOrders() as any);
  }, [dispatch]);

  const calculateTotalPrice = (order: any): number => {
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

  const calculateItemStats = (): ItemStats[] => {
    const itemMap = new Map<number, ItemStats>();

    orders?.forEach((order: any) => {
      const { item } = order;
      const rentalDuration = Math.ceil(
        Math.abs(new Date(order.endDate).getTime() - new Date(order.startDate).getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      const revenue = calculateTotalPrice(order);

      if (!itemMap.has(item.id)) {
        itemMap.set(item.id, {
          itemId: item.id,
          name: item.name,
          totalRevenue: 0,
          rentCount: 0,
          averageRentalDuration: 0,
        });
      }

      const stats = itemMap.get(item.id)!;
      stats.totalRevenue += revenue;
      stats.rentCount += 1;
      stats.averageRentalDuration = 
        (stats.averageRentalDuration * (stats.rentCount - 1) + rentalDuration) / stats.rentCount;
    });

    return Array.from(itemMap.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue);
  };

  const generateRevenueData = () => {
    const revenueByPaymentMethod = {
      online: 0,
      payOnArrival: 0,
    };

    orders?.forEach((order: any) => {
      const revenue = calculateTotalPrice(order);
      if (order.paymentMethod === 'online') {
        revenueByPaymentMethod.online += revenue;
      } else {
        revenueByPaymentMethod.payOnArrival += revenue;
      }
    });

    return [
      { name: 'Online Payments', value: revenueByPaymentMethod.online },
      { name: 'Cash Payments', value: revenueByPaymentMethod.payOnArrival },
    ];
  };

  const generatePDF = async () => {
    const input = document.getElementById('report-content');
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`rental-report-${new Date().toISOString()}.pdf`);
  };

  const itemStats = calculateItemStats();
  const revenueData = generateRevenueData();

  return (
    <>
      <NavBar2 />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Rental Reports</Typography>
          <Button variant="contained" color="primary" onClick={generatePDF}>
            Generate PDF Report
          </Button>
        </Box>

        <div id="report-content">
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              label="Report Type"
              onChange={(e) => setReportType(e.target.value as 'revenue' | 'items')}
            >
              <MenuItem value="revenue">Revenue Analysis</MenuItem>
              <MenuItem value="items">Item Performance</MenuItem>
              <MenuItem value="customers">Minissu Performance</MenuItem>
            </Select>
          </FormControl>

          {reportType === 'revenue' ? (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <Box sx={{ p: 2, height: 400 }}>
                      <Typography variant="h6" gutterBottom>Revenue Distribution</Typography>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={revenueData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                          >
                            {revenueData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `Rs. ${value.toLocaleString()}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>Revenue Summary</Typography>
                      <Typography>
                        Total Revenue: Rs. {revenueData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                      </Typography>
                      <Typography>
                        Online Revenue: Rs. {revenueData[0].value.toLocaleString()}
                      </Typography>
                      <Typography>
                        Cash Revenue: Rs. {revenueData[1].value.toLocaleString()}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Total Revenue</TableCell>
                    <TableCell align="right">Number of Rentals</TableCell>
                    <TableCell align="right">Average Rental Duration (Days)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemStats.map((item) => (
                    <TableRow key={item.itemId}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">Rs. {item.totalRevenue.toLocaleString()}</TableCell>
                      <TableCell align="right">{item.rentCount}</TableCell>
                      <TableCell align="right">{item.averageRentalDuration.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
            </TableContainer>
          )}
        </div>
      </Container>
    </>
  );
};

export default Reports;
