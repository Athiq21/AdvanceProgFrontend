// import React, { useState } from 'react';
// import { Box, Grid, Paper, Typography, Dialog, DialogContent, DialogTitle } from "@mui/material";
// import SideBar from "../../../common/Component/SideBar/SideBar";
// import { Data } from "./SideBar/Data";
// import MainCard from '../../../common/Component/Cards/TravelCards/MainCard';
// import Sidebar from './SideBar/SideBar';
// import { catagoryData } from '../categoryData';
// import MenuBars from '../MenuBars/MenuBars';
// import MarketCards from '../../../common/Component/Cards/MarketCard/MarketCards';



// const updatedData = [{ id: 0, name: "All" }, ...Data];

// const ElectronicItems = () => {
//     const [selectedCategory, setSelectedCategory] = useState<number>(0);
//     const [title, setTitle] = useState<string>("Electronic Items");
 

//     const handleItemClick = (id: number, categoryTitle: string) => {
//         setSelectedCategory(id);
//         setTitle(id !== 0 ? categoryTitle : "Electronic Items");
//     };


//     const filteredData = selectedCategory !== 0 ? catagoryData.filter(item => item.categoryId === selectedCategory) : catagoryData;

//     return (
//         <Box sx={{ marginTop: '150px' }}>
//             <Grid container spacing={2} >
//                 <Grid item xs={2.5}>

//                     <Sidebar />
//                     <SideBar
//                         data={updatedData}
//                         selectedItem={selectedCategory}
//                         onItemClick={(id: number) => handleItemClick(id, updatedData.find(item => item.id === id)?.name || "Electronic Items")}
//                     />
//                 </Grid>
//                 <Grid item xs={9.5}>
//                     <Grid container spacing={1}>
//                         <Grid item xs={12}>
//                             <Box>
//                                 < MenuBars />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} marginTop={'170px'} marginLeft={'20px'}>
//                             <Typography sx={{color:'#263B4A', fontWeight:600, fontSize:'18px'}}>{title}</Typography>
//                         </Grid>
//                         <Grid item xs={12} marginLeft={'20px'}>
//                             <Grid container spacing={1}>
//                                 {filteredData.map((item) => (

//                                     <Grid key={item.id} item xs={12} sm={6} md={3}>
//                                         <MarketCards
//                                             id={item.id}
//                                             userProfilePic={item.userProfilePic}
//                                             userName={item.name}
//                                             title={item.title}
//                                             description={item.Description}
//                                             images={item.image}
//                                             onSave={function (): void {
//                                                 throw new Error("Function not implemented.");
//                                             }} onForward={function (): void {
//                                                 throw new Error("Function not implemented.");
//                                             }}
//                                         />
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

// export default ElectronicItems;


// import React, { useState, useEffect } from 'react';
// import { Box, Grid, Typography } from "@mui/material"; 
// import MarketCards from '../../../common/Component/Cards/MarketCard/MarketCards';
// import MenuBars from '../MenuBars/MenuBars';
// import axios from 'axios';
// import SideBar from "../../../common/Component/SideBar/SideBar";
// import Sidebar from './SideBar/SideBar';
// import { FileBlob } from '../../../type/FileBlob';
// import apiConfig from '../../../Authentication/api';

// interface ItemResponseDTO {
//   id: number;
//   description: string;
//   name: string;
//   isSold: boolean;
//   blob: FileBlob;
//   subCategory: { id: number; name: string };
//   category: { id: number; name: string };
// }

// const ElectronicItems = () => {
//     const [selectedCategory, setSelectedCategory] = useState<number>(0);
//     const [title, setTitle] = useState<string>("Electronic Items");
//     const [items, setItems] = useState<ItemResponseDTO[]>([]);
//     const [categories, setCategories] = useState<any[]>([]);

//     useEffect(() => {
//         fetchCategories();
//         fetchItems();
//     }, []);

//     useEffect(() => {
//         fetchItems();
//     }, [selectedCategory]);

//     const fetchCategories = async () => {
//         try {
           
//             const response = await apiConfig.get('/categories'); 
//             setCategories(response.data);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     const fetchItems = async () => {
//         try {
          
//             const response = await apiConfig.get('/items', {
//                 params: {
//                     category: selectedCategory === 0 ? undefined : selectedCategory
//                 }
//             });
//             setItems(response.data);
//         } catch (error) {
//             console.error("Error fetching items:", error);
//         }
//     };

//     const handleItemClick = (id: number, categoryTitle: string) => {
//         setSelectedCategory(id);
//         setTitle(id !== 0 ? categoryTitle : "Electronic Items");
//     };

//     return (
//         <Box sx={{ marginTop: '150px' }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={2.5}>
//                     <Sidebar />
//                     <SideBar
//                         data={categories} 
//                         selectedItem={selectedCategory}
//                         onItemClick={(id: number) => handleItemClick(id, categories.find(item => item.id === id)?.name || "Electronic Items")}
//                     />
//                 </Grid>
//                 <Grid item xs={9.5}>
//                     <Grid container spacing={1}>
//                         <Grid item xs={12}>
//                             <Box>
//                                 <MenuBars />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} marginTop={'170px'} marginLeft={'20px'}>
//                             <Typography sx={{color:'#263B4A', fontWeight:600, fontSize:'18px'}}>{title}</Typography>
//                         </Grid>
//                         <Grid item xs={12} marginLeft={'20px'}>
//                             <Grid container spacing={1}>
//                                 {items.map((item) => (
//                                     <Grid key={item.id} item xs={12} sm={6} md={3}>
//                                         <MarketCards
//                                             id={item.id}
//                                             userProfilePic={""}
//                                             userName={""}
//                                             title={item.name}
//                                             description={item.description}

//                                             onSave={() => { } }
//                                             onForward={() => { } } images={[]}                                        />
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

// export default ElectronicItems;



// import React, { useState, useEffect } from 'react';
// import { Box, Grid, Typography, CircularProgress } from "@mui/material";
// import SideBar from "../../../common/Component/SideBar/SideBar";
// import MenuBars from '../MenuBars/MenuBars';
// // import MarketCards from '../../../common/Component/Cards/MarketCard/MarketCards';
// import axios from 'axios';
// import apiConfig from '../../../Authentication/api';
// import MainCard from '../../../common/Component/Cards/TravelCards/MainCard';
// import Sidebar from './SideBar/SideBar';


// const ElectronicItems = () => {
//     const [selectedCategory, setSelectedCategory] = useState<number>(1);
//     const [title, setTitle] = useState<string>("Electronic Items");
//     const [items, setItems] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchItems = async () => {
//             try {
//                 setLoading(true);
//                 const response = await apiConfig.get(`/items/category/1`);
//                 setItems(response.data);
//             } catch (err) {
//                 setError("Error fetching items");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchItems();
//     }, [selectedCategory]);

//     return (
//         <Box sx={{ marginTop: '150px' }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={2.5}>
//                 <Sidebar />
//                     <SideBar
//                         data={updatedData}
//                         selectedItem={selectedCategory}
//                         onItemClick={(id: number) => handleItemClick(id, updatedData.find(item => item.id === id)?.name || "Electronic Items")}
//                     />
//                 </Grid>
//                 <Grid item xs={9.5}>
//                     <Grid container spacing={1}>
//                         <Grid item xs={12}>
//                             <MenuBars />
//                         </Grid>
//                         <Grid item xs={12} marginTop={'170px'} marginLeft={'20px'}>
//                             <Typography sx={{ color: '#263B4A', fontWeight: 600, fontSize: '18px' }}>{title}</Typography>
//                         </Grid>
//                         <Grid item xs={12} marginLeft={'20px'}>
//                             {loading ? (
//                                 <CircularProgress />
//                             ) : error ? (
//                                 <Typography color="error">{error}</Typography>
//                             ) : (
//                                 <Grid container spacing={1}>
//                                     {items.map((item: any) => (
//                                         <Grid key={item.id} item xs={12} sm={6} md={3}>
//                                             <MainCard
//                                                 id={item.id}
//                                                 userProfilePic={item.userProfilePic}
//                                                 userName={item.name}
//                                                 title={item.title}
//                                                 description={item.description}
//                                                 blob={item.image}
//                                                 onSave={() => {}}
//                                                 onForward={() => {}}
//                                             />
//                                         </Grid>
//                                     ))}
//                                 </Grid>
//                             )}
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default ElectronicItems;


import { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import SideBar from "../../../common/Component/SideBar/SideBar";
import MenuBars from '../MenuBars/MenuBars';
import apiConfig from '../../../Authentication/api';
import MainCard from '../../../common/Component/Cards/TravelCards/MainCard';


const ElectronicItems = () => {
    const [categories, setCategories] = useState<Array<{ id: number; name: string; subcategories: Array<{ id: number; name: string }> }>>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
    const [title, setTitle] = useState<string>("Electronic Items");
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiConfig.get(`/categories`);
                setCategories(response.data);
            } catch (err) {
                setError("Error fetching categories");
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory !== null && selectedSubcategory !== null) {
            const fetchItems = async (id:number) => {
                try {
                    setLoading(true);
                    const response = await apiConfig.get(`/items/subcategory/${id}`);
                    setItems(response.data);
                } catch (err) {
                    setError("Error fetching items");
                } finally {
                    setLoading(false);
                }
            };

            fetchItems(selectedSubcategory);
        }
    }, [selectedCategory, selectedSubcategory]);

    const handleCategoryClick = (id: number) => {
        setSelectedCategory(id);
        setSelectedSubcategory(null);
        setTitle(categories.find(category => category.id === id)?.name || "Electronic Items");
    };

    const handleSubcategoryClick = (id: number) => {
        setSelectedSubcategory(id);

        setTitle(categories.find(category => category.id === selectedCategory)?.subcategories.find(subcat => subcat.id === id)?.name || "Items");
    };

   
    const filteredCategories = categories.filter(category => category.id === selectedCategory);
    const filteredSubCategories = items.filter(subcat => subcat.id === selectedSubcategory);

    return (
        <Box sx={{ marginTop: '150px' }}>
            <Grid container spacing={2}>
                <Grid item xs={2.5}>
                    <SideBar
                        categories={filteredCategories}
                        selectedCategory={selectedCategory || -1}
                        selectedSubcategory={selectedSubcategory || -1}
                        onCategoryClick={handleCategoryClick}
                        onSubcategoryClick={handleSubcategoryClick}
                    />
                </Grid>
                <Grid item xs={9.5}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <MenuBars />
                        </Grid>
                        <Grid item xs={12} marginTop={'170px'} marginLeft={'20px'}>
                            <Typography sx={{ color: '#263B4A', fontWeight: 600, fontSize: '18px' }}>{title}</Typography>
                        </Grid>
                        <Grid item xs={12} marginLeft={'20px'}>
                            {loading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Typography color="error">{error}</Typography>
                            ) : (
                                <Grid container spacing={1}>
                                    {items.map((item: any) => (
                                        <Grid key={item.id} item xs={12} sm={6} md={3}>
                                            <MainCard
                                                id={item.id}
                                                userProfilePic={item.userProfilePic}
                                                userName={item.name}
                                                title={item.title}
                                                description={item.description}
                                                blob={item.image}
                                                onSave={() => {}}
                                                onForward={() => {}}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ElectronicItems;


