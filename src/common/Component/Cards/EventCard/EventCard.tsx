import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, IconButton, Menu, MenuItem, Dialog, DialogContent, DialogActions, Button, Select, MenuItem as SelectMenuItem, InputLabel, FormControl } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { FileBlob } from '../../../../type/FileBlob';
import { BASE_URL } from '../../../../Authentication/api';

interface CustomCardProps {
  blob: FileBlob;
  id:number;
  onDelete: (id: number) => void;
  
}

const EventCard: React.FC<CustomCardProps> = ({ blob, id, onDelete }) => {
  console.log("blob", blob);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log("Image URL: ", blob.image);

  return (
    <div>
      <Card
        sx={{
          height: '360px',
          width: '500px',
          borderRadius: '10px',
          '@media (max-width: 600px)': {
            width: '360px',
            height: '300px',
          }
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >

          <MenuItem onClick={() => {onDelete(id)}} sx={{color:'#A81400'}}>
            <DeleteIcon fontSize="small"  sx={{ mr: 1, color:'#A81400'}}/> Delete
          </MenuItem>
        </Menu>
        <CardMedia
          component="img"
          height="300"
          image={blob}
        />
      </Card>

    </div>
  );
};

export default EventCard;
