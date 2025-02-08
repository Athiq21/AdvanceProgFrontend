import React, { useState, useEffect } from 'react';
import {
  Card,
  Select,
  DatePicker,
  Table,
  Typography,
  Space,
  Row,
  Col,
  Statistic,
} from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dayjs from 'dayjs';
import NavBar2 from '../../../common/Component/NavBar/NavBar2';

const { Title } = Typography;
const { Option } = Select;

interface ReportData {
  date: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<'daily' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [reportData, setReportData] = useState<ReportData[]>([]);

  // Mock data - Replace this with actual API calls
  const fetchReportData = async () => {
    // Simulate API call
    const mockData: ReportData[] = reportType === 'daily' 
      ? Array.from({ length: 24 }, (_, i) => ({
          date: `${i}:00`,
          revenue: Math.floor(Math.random() * 10000),
          orders: Math.floor(Math.random() * 100),
          averageOrderValue: Math.floor(Math.random() * 200),
        }))
      : Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          revenue: Math.floor(Math.random() * 50000),
          orders: Math.floor(Math.random() * 500),
          averageOrderValue: Math.floor(Math.random() * 200),
        }));

    setReportData(mockData);
  };

  useEffect(() => {
    fetchReportData();
  }, [reportType, selectedDate]);

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Average Order Value',
      dataIndex: 'averageOrderValue',
      key: 'averageOrderValue',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
  ];

  const totalRevenue = reportData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = reportData.reduce((sum, item) => sum + item.orders, 0);
  const averageOrderValue = totalOrders > 0 
    ? totalRevenue / totalOrders 
    : 0;

  return (
    <>
    <NavBar2/>
    <div style={{ padding: '24px', marginTop:'70px',marginLeft:'100px' }}>
      <Title level={2}>Financial Reports</Title>
      
      <Space direction="horizontal" size="middle" style={{ marginBottom: '24px' }}>
        <Select 
          value={reportType} 
          onChange={(value: 'daily' | 'monthly') => setReportType(value)}
          style={{ width: 200 }}
        >
          <Option value="daily">Daily Report</Option>
          <Option value="monthly">Monthly Report</Option>
        </Select>

        {reportType === 'daily' ? (
          <DatePicker 
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
          />
        ) : (
          <DatePicker 
            picker="month"
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
          />
        )}
      </Space>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="$"
              precision={2}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={totalOrders}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Order Value"
              value={averageOrderValue}
              prefix="$"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: '24px' }}>
        <BarChart
          width={1000}
          height={300}
          data={reportData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
          <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
        </BarChart>
      </Card>

      <Card>
        <Table 
          columns={columns} 
          dataSource={reportData} 
          rowKey="date"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
    </>
  );
};

export default Reports;
