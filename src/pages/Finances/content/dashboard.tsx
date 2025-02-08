
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Card, CardContent, Grid, Typography } from '@mui/material';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import NavBar2 from '../../../common/Component/NavBar/NavBar2';


const sampleProductStats = [
  { name: 'Product A', stock: 120, sold: 450 },
  { name: 'Product B', stock: 85, sold: 320 },
  { name: 'Product C', stock: 150, sold: 500 },
];

const sampleOrderStats = [
  { status: 'Pending', count: 30 },
  { status: 'Completed', count: 120 },
  { status: 'Cancelled', count: 10 },
];

const sampleOrderHistory = [
  { date: '2023-01-01', totalOrders: 30 },
  { date: '2023-01-02', totalOrders: 40 },
  { date: '2023-01-03', totalOrders: 35 },
  { date: '2023-01-04', totalOrders: 50 },
  { date: '2023-01-05', totalOrders: 60 },
];

const sampleRevenueData = [
  { month: 'January', revenue: 1200 },
  { month: 'February', revenue: 1500 },
  { month: 'March', revenue: 1300 },
  { month: 'April', revenue: 1700 },
];

const Dashboard: React.FC = () => {
  const [productStats, setProductStats] = useState(sampleProductStats);
  const [orderStats, setOrderStats] = useState(sampleOrderStats);
  const [orderHistory, setOrderHistory] = useState(sampleOrderHistory);
  const [revenueData, setRevenueData] = useState(sampleRevenueData);

  const totalSold = productStats.reduce((sum, product) => sum + product.sold, 0);
  const totalStock = productStats.reduce((sum, product) => sum + product.stock, 0);
  const totalOrders = orderStats.reduce((sum, order) => sum + order.count, 0);
  const totalCompletedOrders = orderStats.find(order => order.status === 'Completed')?.count || 0;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar2 /> {/* Ensure Navbar is included */}

      {/* Main Content Box */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: '100px', // Adjust for sidebar width
          padding: 3,
          maxWidth: '1200px', // Limit width for better centering
          ml: 'auto',
          mr: 'auto',
        }}
      >
        <Box sx={{ height: 64 }} /> {/* Spacer for AppBar */}
        <Grid container spacing={3}>
          {/* Products Stats Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Products Overview
                </Typography>
                <Typography variant="body1">Total Products: {productStats.length}</Typography>
                <Typography variant="body1">Total Stock: {totalStock} units</Typography>
                <Typography variant="body1">Total Sold: {totalSold} units</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Stats Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Orders Overview
                </Typography>
                <Typography variant="body1">Total Orders: {totalOrders}</Typography>
                <Typography variant="body1">Completed Orders: {totalCompletedOrders}</Typography>
                <Typography variant="body1">Pending Orders: {orderStats.find(order => order.status === 'Pending')?.count || 0}</Typography>
                <Typography variant="body1">Cancelled Orders: {orderStats.find(order => order.status === 'Cancelled')?.count || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Trend Chart */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={orderHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Trend Chart */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Orders Status Breakdown
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

export default Dashboard;
