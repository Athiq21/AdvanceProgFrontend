import React, { useEffect, useState } from 'react';
import { 
  Box, CssBaseline, Card, CardContent, Grid, Typography,
  Select, MenuItem, FormControl, InputLabel 
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import NavBar2 from '../../common/Component/NavBar/NavBar2';
import { useDispatch, useSelector } from 'react-redux';
import { AllfetchOrders } from '../../store/features/orderSlice';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Finance: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.order.orders);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    dispatch(AllfetchOrders() as any);
  }, [dispatch]);

  // Helper function to parse the date string
  const parseCreatedDateTime = (dateStr: string): Date => {
    return new Date(dateStr);
  };

  // Filter orders for selected month
  const filterOrdersByMonth = (orders: any[], yearMonth: string) => {
    const [year, month] = yearMonth.split('-');
    return orders?.filter((order: any) => {
      const orderDate = parseCreatedDateTime(order.createdDatetime);
      return orderDate.getFullYear() === parseInt(year) && 
             orderDate.getMonth() === parseInt(month) - 1; // Month is 0-based
    }) || [];
  };

  const currentMonthOrders = filterOrdersByMonth(orders, selectedMonth);

  // Calculate order statistics for selected month
  const orderStats = [
    { status: 'Processing', count: currentMonthOrders.filter((order: any) => order.status === 'processing').length || 0 },
    { status: 'Completed', count: currentMonthOrders.filter((order: any) => order.status === 'completed').length || 0 },
    { status: 'Cancelled', count: currentMonthOrders.filter((order: any) => order.status === 'cancelled').length || 0 },
  ];

  // Calculate total revenue and create revenue data
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

  // Get daily data for selected month
  const getDaysInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-');
    return new Date(parseInt(year), parseInt(month), 0).getDate();
  };

  const dailyOrderData = Array.from(
    { length: getDaysInMonth(selectedMonth) },
    (_, i) => {
      const dayNum = i + 1;
      const [year, month] = selectedMonth.split('-');
      
      return {
        date: `${selectedMonth}-${String(dayNum).padStart(2, '0')}`,
        totalOrders: currentMonthOrders.filter((order: any) => {
          const orderDate = parseCreatedDateTime(order.createdDatetime);
          return orderDate.getDate() === dayNum;
        }).length,
        revenue: currentMonthOrders
          .filter((order: any) => {
            const orderDate = parseCreatedDateTime(order.createdDatetime);
            return orderDate.getDate() === dayNum;
          })
          .reduce((sum: number, order: any) => {
            // Handle the case where price might be "gg" or similar
            const price = order.item.price.replace(/[^0-9]/g, '');
            if (!price) return sum; // Skip if no valid price
            return sum + calculateTotalPrice(order);
          }, 0)
      };
    }
  );

  // Calculate total statistics for selected month
  const totalOrders = currentMonthOrders.length;
  const totalRevenue = currentMonthOrders.reduce((sum: number, order: any) => 
    sum + calculateTotalPrice(order), 0);
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  // Generate last 12 months for selector
  const getLast12Months = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthYear = date.toISOString().slice(0, 7);
      const label = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      months.push({ value: monthYear, label });
    }
    return months;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar2 />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: '100px',
          padding: 3,
          maxWidth: '1200px',
          ml: 'auto',
          mr: 'auto',
        }}
      >
        <Box sx={{ height: 64 }} />
        
        {/* Month Selector */}
        <Box sx={{ mb: 3, backgroundColor: 'white', p: 2, borderRadius: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Select Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Select Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {getLast12Months().map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {/* Summary Stats */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Overview
                </Typography>
                <Typography variant="body1">Total Orders: {totalOrders}</Typography>
                <Typography variant="body1">Total Revenue: Rs. {totalRevenue.toLocaleString()}</Typography>
                <Typography variant="body1">Average Order Value: Rs. {averageOrderValue.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Status Breakdown */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Status
                </Typography>
                <Typography variant="body1">Processing: {orderStats[0].count}</Typography>
                <Typography variant="body1">Completed: {orderStats[1].count}</Typography>
                <Typography variant="body1">Cancelled: {orderStats[2].count}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                {currentMonthOrders?.slice(0, 5).map((order: any) => (
                  <Typography key={order.id} variant="body2" sx={{ mb: 1 }}>
                    Order #{order.id} - {order.status} - Rs. {calculateTotalPrice(order)}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Daily Orders Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Orders
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyOrderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.split('-')[2]} // Show only day
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Daily Revenue Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Revenue
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyOrderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.split('-')[2]} // Show only day
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Status Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStats}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {orderStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Finance;
