import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  TablePagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ViewIssueProp from './viewIssueProp';

interface Issue {
  refNo: string;
  subject: string;
  type: string;
  trackingNumber: string;
  status: string;
  description: string;
  createdAt?: Date;
  attachments?: string[];
}

const statusOptions = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

// Mock data - replace with actual data from your API
const mockIssues: Issue[] = [
  {
    refNo: 'ISS-001',
    subject: 'Website Login Issue',
    type: 'Technical Problem',
    trackingNumber: 'TRK123',
    status: 'Open',
    description: 'Unable to login to the website',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-002',
    subject: 'Payment Failed',
    type: 'Payment Issue',
    trackingNumber: 'TRK124',
    status: 'In Progress',
    description: 'Payment transaction failing at checkout',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-003',
    subject: 'Product Not Received',
    type: 'Delivery Issue',
    trackingNumber: 'TRK125',
    status: 'Open',
    description: 'Order marked as delivered but not received',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-001',
    subject: 'Website Login Issue',
    type: 'Technical Problem',
    trackingNumber: 'TRK123',
    status: 'Open',
    description: 'Unable to login to the website',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-002',
    subject: 'Payment Failed',
    type: 'Payment Issue',
    trackingNumber: 'TRK124',
    status: 'In Progress',
    description: 'Payment transaction failing at checkout',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-003',
    subject: 'Product Not Received',
    type: 'Delivery Issue',
    trackingNumber: 'TRK125',
    status: 'Open',
    description: 'Order marked as delivered but not received',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-001',
    subject: 'Website Login Issue',
    type: 'Technical Problem',
    trackingNumber: 'TRK123',
    status: 'Open',
    description: 'Unable to login to the website',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-002',
    subject: 'Payment Failed',
    type: 'Payment Issue',
    trackingNumber: 'TRK124',
    status: 'In Progress',
    description: 'Payment transaction failing at checkout',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-003',
    subject: 'Product Not Received',
    type: 'Delivery Issue',
    trackingNumber: 'TRK125',
    status: 'Open',
    description: 'Order marked as delivered but not received',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-001',
    subject: 'Website Login Issue',
    type: 'Technical Problem',
    trackingNumber: 'TRK123',
    status: 'Open',
    description: 'Unable to login to the website',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-002',
    subject: 'Payment Failed',
    type: 'Payment Issue',
    trackingNumber: 'TRK124',
    status: 'In Progress',
    description: 'Payment transaction failing at checkout',
    createdAt: new Date(),
  },
  {
    refNo: 'ISS-003',
    subject: 'Product Not Received',
    type: 'Delivery Issue',
    trackingNumber: 'TRK125',
    status: 'Open',
    description: 'Order marked as delivered but not received',
    createdAt: new Date(),
  },
];

const AllIssue: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string);
  };

  const handleViewIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsViewDialogOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch = Object.values(issue)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Apply pagination to filtered issues
  const paginatedIssues = filteredIssues.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3, ml: 10 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Search Issues"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            displayEmpty
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Issues Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref No</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Tracking Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedIssues.map((issue) => (
              <TableRow key={issue.refNo}>
                <TableCell>{issue.refNo}</TableCell>
                <TableCell>{issue.subject}</TableCell>
                <TableCell>{issue.type}</TableCell>
                <TableCell>{issue.trackingNumber}</TableCell>
                <TableCell>{issue.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewIssue(issue)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredIssues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Replace Dialog with ViewIssueProp component */}
      <ViewIssueProp
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        issue={selectedIssue}
      />
    </Box>
  );
};

export default AllIssue;
