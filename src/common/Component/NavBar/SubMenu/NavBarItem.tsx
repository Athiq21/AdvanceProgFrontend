// NavbarItem.tsx
import React, { useState } from 'react';
import Submenu from './SubMenu';

interface NavbarItemProps {
  item: {
    id: number;
    title: string;
    path: string;
    subMenuItem?: { id: number; name: string; path: string }[];
  };
}

const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span>{item.title}</span>
      {item.subMenuItem && isHovered && <Submenu items={item.subMenuItem} />}
    </div>
  );
};

export default NavbarItem;
