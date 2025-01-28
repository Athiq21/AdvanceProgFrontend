import React, { useState } from 'react';
import { Box, CircularProgress, Container, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from '@mui/material';
import EventCard from '../../../common/Component/Cards/EventCard/EventCard';
import { useEvents } from '../../../Service/CustomHook/getEvent';
import apiConfig from '../../../Authentication/api';
import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';

const EditEvent: React.FC = () => {
  const { events, loading, error } = useEvents();
  const [deletingEventId, setDeletingEventId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleDialogOpen = (id: number) => {
    setDeletingEventId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeletingEventId(null);
  };

  const handleDeleteConfirmed = async () => {
    if (deletingEventId === null) return;
    try {
      await apiConfig.delete(`/offer/offers/${deletingEventId}`);
      setSnackbarMessage(`Event with ID ${deletingEventId} deleted successfully.`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete event:', error);
      setSnackbarMessage('Failed to delete the event. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setDialogOpen(false);
      setDeletingEventId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: '10px' ,    marginLeft:0}}>
      <Grid container spacing={2}>
        {events.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={6}>
            <EventCard
              id={item.id}
              blob={item.image}
              onDelete={() => handleDialogOpen(item.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButtons onClick={handleDialogClose} color="primary">
            Cancel
          </CancelButtons>
          <DeleteButton onClick={handleDeleteConfirmed} color="secondary">
            Delete
          </DeleteButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default EditEvent;
;
