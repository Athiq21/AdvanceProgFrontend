import React from 'react';
import { HomeCardData } from '../../../common/Component/Cards/HomeCard/CategoryCard/HomeCardData';
import CategoryCards from '../../../common/Component/Cards/HomeCard/CategoryCard/CategoryCards';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Categorys: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
      // Navigate to the desired page with the event id
      navigate(path);
  };

    return (
    
            <Grid container spacing={0}>
              <Grid item xs={1}>

              </Grid>
              <Grid item xs={10}>
              <Grid container spacing={1}>
              {HomeCardData.map((event) => (
                <Grid key={event.id} item xs={12} sm={6} md={4}>
                  <CategoryCards
                    image={event.image}
                    title={event.title}
                    subTitle={event.subTitle}
                    onClick={() => handleCardClick(event.path)}   
                  />
                </Grid>
              
              ))}
              </Grid>
                
              </Grid>
              <Grid item xs={1}>
                
              </Grid>
              
            </Grid>
            // <>
            // <h1>
            //     kshdejwhf</h1></>
    
    );
}

export default Categorys;
