import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, TextField, Button, Grid, Input } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

interface CalendarPickerProps {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onDateChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [postDetails, setPostDetails] = useState<{ title: string; description: string; image: string }>({
    title: '',
    description: '',
    image: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: Dayjs | null) => {
    onDateChange(date);
    handleClose();
    setDialogOpen(true);
  };


  const shouldDisableDate = (date: Dayjs) => date.isAfter(dayjs(), 'day');

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <CalendarTodayIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Date</DialogTitle>
        <Box sx={{ padding: 2 }}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            shouldDisableDate={shouldDisableDate}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default CalendarPicker;