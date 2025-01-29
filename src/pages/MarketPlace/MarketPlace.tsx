import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { getSubcategories, Items } from '../../Service/CustomHook/marketPlace';
import SideBar from './SideBar/SideBar';
import { ItemResponseDTO } from '../../DTO/ItemResponseDTO';
import MainCard from '../../common/Component/Cards/TravelCards/MainCard';
import MarketPlaceTextComponent from '../../common/Component/AddTextComponent/MarketPlaceTextComponent';
import MenuBar from './MenuBar/MenuBar';

const Marketplace: React.FC = () => {
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
    const [itemcat, setItems] = useState<ItemResponseDTO[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredItems = itemcat.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchItems = async () => {
            let response;
            if (selectedSubcategoryId) {
                response = await getSubcategories(selectedSubcategoryId);
            } else {
                response = await Items();
            }
            setItems(response.data);
        };
        fetchItems();
    }, [selectedSubcategoryId]);


    const handleNewItem = (newItem: ItemResponseDTO) => {
        setItems([newItem, ...itemcat]);
    };

    const handleAllClick = () => {
        setSelectedSubcategoryId(null);
        setSearchQuery('');
    };

    return (
        <Box sx={{ marginTop: { xs: '40px', sm: '130px' },
        marginBottom: { xs: '50px', sm: '90px' },
        }}>
            <Grid container spacing={2}>
                <Grid
                item
                xs={12}
                sm={3}
                sx={{
                    display: { xs: 'flex', sm: 'block' }, 
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    marginTop: '-40px',
                }}
            >
                 <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column', 
                        width: '100%', 
                    }}
                >
                     {/* <MenuBar
                    onSearch={(query: string) => setSearchQuery(query)}
                    onAllClick={handleAllClick}
                /> */}
    <SideBar
  onSubcategorySelect={(subcategoryId) => setSelectedSubcategoryId(subcategoryId)}
  onSearch={(query) => setSearchQuery(query)} 
/>
    {/* <SideBar onSubcategorySelect={(subcategoryId) => setSelectedSubcategoryId(subcategoryId)} /> */}
                </Box>
        
            </Grid>


                {/* Marketplace Items */}
                <Grid item xs={12} sm={9}>
                    {/* Store Title */}
                    <Box align="center" sx={{ mt: { xs: '-20px', sm: '-55px' }, mb: '-20px' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: '3rem', sm: '4rem' }, 
                                background: 'linear-gradient(45deg, #4B0082, #E6E6FA)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            MEGA CITY CAB
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '30px', px: { xs: 2, sm: 0 } }}>
                        <MarketPlaceTextComponent />
                    </Box>

                    <Grid 
                        container 
                        spacing={1.5} 
                        sx={{
                            mt: '30px',
                            justifyContent: { xs: 'center', sm: 'flex-start' }, 
                        }}
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Grid 
                                    key={item.id} 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MainCard 
                                        key={item.id}
                                        id={item.id} 
                                        userId={item.createdBy?.id || ''}
                                        imageUrl={item.createdBy?.imageUrl || ''}
                                        userName={`${item.createdBy?.firstName || ''} ${item.createdBy?.lastName || ''}`}
                                        image={item.imageBlob}
                                        title={`${item.name}`}
                                        description={`Name: ${item.description}`} 
                                        mileage={`Mileage: ${item.mileage}`} 
                                        price={`Price: ${item.price}`} 
                                        fueltype={`Fuel Type: ${item.fueltype}`} 
                                        transmission={`Transmission: ${item.transmission}`}
                                        seatingCapacity={item.seatingCapacity}
                                        luggageCapacity={item.luggageCapacity}
                                        color={`Color: ${item.color}`}
                                        yearOfManufacture={item.yearOfManufacture}
                                        engineCapacity={item.engineCapacity}
                                        fuelEfficiency={item.fuelEfficiency}
                                        deposit={item.deposit}
                                        status={item.status}
                                        licensePlate={item.licensePlate}
                                        onSave={() => { /* Implement save functionality here */ }} 
                                        onForward={() => { /* Implement forward functionality here */ }} 
                                        selectedCategory={0} 
                                        selectedSubCategory={0} 
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography textAlign="center" color="text.secondary">
                                {selectedSubcategoryId ? 'No items found for the selected subcategory.' : 'Select a subcategory to view items.'}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Marketplace;
