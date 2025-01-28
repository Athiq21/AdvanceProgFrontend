import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';

interface ThreeDotIconProps {
  onEdit?: () => void;
  onDelete?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
}

const MoreOptioNMenu: React.FC<ThreeDotIconProps> = ({ onEdit, onDelete, showEdit = true, showDelete = true }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="more" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {showEdit && onEdit && (
          <MenuItem onClick={() => { onEdit(); handleClose(); }}>
            <Edit /> Edit
          </MenuItem>
        )}
        {showDelete && onDelete && (
          <MenuItem onClick={() => { onDelete(); handleClose(); }}>
            <Delete /> Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MoreOptioNMenu;
