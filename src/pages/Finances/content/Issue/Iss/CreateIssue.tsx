import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';

const issueTypes = [
  'Technical Problem',
  'Billing Issue',
  'Delivery Problem',
  'Product Quality',
  'Other'
];

const CreateIssue: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    issueType: '',
    trackingNumber: '',
    description: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ ...formData, files });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Issue
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          required
          fullWidth
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
        />

        <FormControl required fullWidth>
          <InputLabel>Issue Type</InputLabel>
          <Select
            name="issueType"
            value={formData.issueType}
            label="Issue Type"
            onChange={handleInputChange}
          >
            {issueTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Tracking Number (Optional)"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleInputChange}
        />

        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <Box>
          <input
            accept="image/*,.pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span">
              Upload Attachments
            </Button>
          </label>
          {files.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {files.length} file(s) selected
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateIssue;
