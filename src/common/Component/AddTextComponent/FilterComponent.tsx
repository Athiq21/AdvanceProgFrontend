// FilterComponent.tsx
import React from 'react';
import ImageFilter from 'react-image-filter';

interface FilterComponentProps {
  image: string;
  filter: number[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({ image, filter }) => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <ImageFilter image={image} filter={filter} />
    </div>
  );
};

export default FilterComponent;
