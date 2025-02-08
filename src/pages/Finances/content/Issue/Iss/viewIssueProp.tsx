import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

interface ViewIssuePropProps {
  open: boolean;
  onClose: () => void;
  issue: Issue | null;
}

const ViewIssueProp: React.FC<ViewIssuePropProps> = ({ open, onClose, issue }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Issue Details
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {issue && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Typography variant="subtitle2">Reference Number</Typography>
            <Typography>{issue.refNo}</Typography>

            <Typography variant="subtitle2">Subject</Typography>
            <Typography>{issue.subject}</Typography>

            <Typography variant="subtitle2">Issue Type</Typography>
            <Typography>{issue.type}</Typography>

            <Typography variant="subtitle2">Tracking Number</Typography>
            <Typography>{issue.trackingNumber || 'N/A'}</Typography>

            <Typography variant="subtitle2">Status</Typography>
            <Typography>{issue.status}</Typography>

            <Typography variant="subtitle2">Description</Typography>
            <Typography>{issue.description}</Typography>

            {issue.attachments && issue.attachments.length > 0 && (
              <>
                <Typography variant="subtitle2">Attachments</Typography>
                <Box>
                  {issue.attachments.map((attachment, index) => (
                    <Typography key={index}>{attachment}</Typography>
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewIssueProp;
