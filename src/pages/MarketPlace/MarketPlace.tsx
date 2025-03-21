// import React, { useState, useEffect } from 'react';
// import { Grid, Typography, Box } from '@mui/material';
// import { getSubcategories, Items } from '../../Service/CustomHook/marketPlace';
// import SideBar from './SideBar/SideBar';
// import { ItemResponseDTO } from '../../DTO/ItemResponseDTO';
// import MainCard from '../../common/Component/Cards/TravelCards/MainCard';
// import MarketPlaceTextComponent from '../../common/Component/AddTextComponent/MarketPlaceTextComponent';

// const Marketplace: React.FC = () => {
//     const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
//     const [itemcat, setItems] = useState<ItemResponseDTO[]>([]);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [role,setRole] = useState <string | null>(null);

//     useEffect(() => {
//         const userRole = sessionStorage.getItem('roleName');
//         setRole(userRole);
//     }, []);

//     const filteredItems = itemcat.filter(
//         (item) =>
//             item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     useEffect(() => {
//         const fetchItems = async () => {
//             let response;
//             if (selectedSubcategoryId) {
//                 response = await getSubcategories(selectedSubcategoryId);
//             } else {
//                 response = await Items();
//             }
//             setItems(response.data);
//         };
//         fetchItems();
//     }, [selectedSubcategoryId]);


//     const handleNewItem = (newItem: ItemResponseDTO) => {
//         setItems([newItem, ...itemcat]);
//     };

//     const handleAllClick = () => {
//         setSelectedSubcategoryId(null);
//         setSearchQuery('');
//     };

//     return (
//         <Box sx={{ marginTop: { xs: '30px', sm: '50px' },
//         marginBottom: { xs: '50px', sm: '90px' },
//         }}>
//             <Grid container spacing={2}>
//                 <Grid
//                 item
//                 xs={12}
//                 sm={3}
//                 sx={{
//                     display: { xs: 'flex', sm: 'block' }, 
//                     alignItems: { xs: 'center', sm: 'flex-start' },
//                     marginTop: '-40px',
//                 }}
//             >
//                  <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column', 
//                         width: '100%', 
//                     }}
//                 >
//     <SideBar
//   onSubcategorySelect={(subcategoryId) => setSelectedSubcategoryId(subcategoryId)}
//   onSearch={(query) => setSearchQuery(query)} 
// />
//                 </Box>
        
//             </Grid>

//                 <Grid item xs={12} sm={9}>
//                     <Box align="center" sx={{ mt: { xs: '-10px', sm: '5px' }, mb: '-20px' }}>
//                         <Typography
//                             variant="h3"
//                             sx={{
//                                 fontSize: { xs: '3rem', sm: '4rem' }, 
//                                 background: 'linear-gradient(45deg, #46627f, #E6E6FA)', 
//                                 WebkitBackgroundClip: 'text', 
//                                 WebkitTextFillColor: 'transparent',
//                             }}
//                         >
//                             MEGA CITY CAB
//                         </Typography>
//                     </Box>

//                     {role === 'ROLE_ADMIN' && (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', mt: '30px', px: { xs: 2, sm: 0 } }}>
//                             <MarketPlaceTextComponent />
//                         </Box>
//                     )}

//                     <Grid 
//                         container 
//                         spacing={1.5} 
//                         sx={{
//                             mt: '30px',
//                             justifyContent: { xs: 'center', sm: 'flex-start' }, 
//                         }}
//                     >
//                         {filteredItems.length > 0 ? (
//                             filteredItems.map((item) => (
//                                 <Grid 
//                                     key={item.id} 
//                                     item 
//                                     xs={12} 
//                                     sm={6} 
//                                     md={3}
//                                     sx={{
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                     }}
//                                 >
//                                     <MainCard 
//                                         key={item.id}
//                                         id={item.id} 
//                                         userId={item.createdBy?.id || ''}
//                                         imageUrl={item.createdBy?.imageUrl || ''}
//                                         userName={`${item.createdBy?.firstName || ''} ${item.createdBy?.lastName || ''}`}
//                                         image={item.imageBlob}
//                                         title={`${item.name}`}
//                                         description={`Name: ${item.description}`} 
//                                         mileage={`Mileage: ${item.mileage}`} 
//                                         price={`Price: ${item.price}`} 
//                                         fueltype={`Fuel Type: ${item.fueltype}`} 
//                                         transmission={`Transmission: ${item.transmission}`}
//                                         seatingCapacity={item.seatingCapacity}
//                                         luggageCapacity={item.luggageCapacity}
//                                         color={`Color: ${item.color}`}
//                                         yearOfManufacture={item.yearOfManufacture}
//                                         engineCapacity={item.engineCapacity}
//                                         fuelEfficiency={item.fuelEfficiency}
//                                         deposit={item.deposit}
//                                         status={item.status}
//                                         licensePlate={item.licensePlate}
//                                         onSave={() => { /* Implement save functionality here */ }} 
//                                         onForward={() => { /* Implement forward functionality here */ }} 
//                                         selectedCategory={0} 
//                                         selectedSubCategory={0} 
//                                     />
//                                 </Grid>
//                             ))
//                         ) : (
//                             <Typography textAlign="center" color="text.secondary">
//                                 {selectedSubcategoryId ? 'No items found for the selected subcategory.' : 'Select a subcategory to view items.'}
//                             </Typography>
//                         )}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default Marketplace;



import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { getSubcategories, Items } from '../../Service/CustomHook/marketPlace';
import SideBar from './SideBar/SideBar';
import { ItemResponseDTO } from '../../DTO/ItemResponseDTO';
import MainCard from '../../common/Component/Cards/TravelCards/MainCard';
import MarketPlaceTextComponent from '../../common/Component/AddTextComponent/MarketPlaceTextComponent';

const Marketplace: React.FC = () => {
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
    const [itemcat, setItems] = useState<ItemResponseDTO[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [role,setRole] = useState <string | null>(null);

    useEffect(() => {
        const userRole = sessionStorage.getItem('roleName');
        setRole(userRole);
    }, []);

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

    return (
        <Box sx={{ 
            marginTop: { xs: '30px', sm: '50px' },
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
    <SideBar
  onSubcategorySelect={(subcategoryId) => setSelectedSubcategoryId(subcategoryId)}
  onSearch={(query) => setSearchQuery(query)} 
/>
                </Box>
        
            </Grid>

                <Grid item xs={12} sm={9}>
                    <Box sx={{ 
                        textAlign: 'center',
                        mt: { xs: '-10px', sm: '5px' }, 
                        mb: '-20px'
                    }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: { xs: '3rem', sm: '4rem' },
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #46627f, #E6E6FA)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                letterSpacing: '0.1em',
                                mb: 2
                            }}
                        >
                            MEGA CITY CAB
                        </Typography>
                    </Box>

                    {role === 'ROLE_ADMIN' && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '30px', px: { xs: 2, sm: 0 } }}>
                            <MarketPlaceTextComponent />
                        </Box>
                    )}

                    <Grid 
                        container 
                        spacing={2} 
                        sx={{
                            mt: '30px',
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            px: { xs: 1, sm: 2 }
                        }}
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Grid 
                                    key={item.id} 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={4}
                                    lg={3}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MainCard 
                                        key={item.id}
                                        id={item.id} 
                                        userId={item.createdBy?.id || ''}
                                        userName={`${item.createdBy?.firstName || ''} ${item.createdBy?.lastName || ''}`}
                                        image={item.imageBlob}
                                        title={item.name}
                                        description={item.description}
                                        mileage={`Mileage: ${item.mileage}`} 
                                        price={`Per Day: ${item.price}/=`} 
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
                                        onSave={() => {}} 
                                        onForward={() => {}} 
                                        selectedCategory={0} 
                                        selectedSubCategory={0} 
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ 
                                width: '100%', 
                                textAlign: 'center', 
                                mt: 4 
                            }}>
                                <Typography 
                                    variant="h6" 
                                    color="text.secondary"
                                    sx={{ 
                                        fontStyle: 'italic',
                                        opacity: 0.8
                                    }}
                                >
                                    {selectedSubcategoryId 
                                        ? 'No items found for the selected subcategory.' 
                                        : 'Select a subcategory to view items.'}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Marketplace;



