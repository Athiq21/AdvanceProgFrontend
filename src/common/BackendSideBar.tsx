import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

interface SidebarProps {
  categories: { id: number; name: string }[];
}

const BackendSideBar: React.FC<SidebarProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <List>
      {categories.map((category) => (
        <ListItem button key={category.id} onClick={() => handleCategoryClick(category.id)}>
          <ListItemText primary={category.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default BackendSideBar;
