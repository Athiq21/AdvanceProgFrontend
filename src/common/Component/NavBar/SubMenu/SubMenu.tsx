import React from 'react';

interface SubmenuProps {
  items: { id: number; name: string; path: string }[];
}

const SubMenu: React.FC<SubmenuProps> = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <a key={item.id} href={item.path}>
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default SubMenu;