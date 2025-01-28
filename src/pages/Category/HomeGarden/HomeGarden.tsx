import { Box, Grid, Paper, Typography } from "@mui/material"
import { catagoryData } from "../categoryData";
import SideBar from "../../../common/Component/SideBar/SideBar";
import { Data } from "./Data/Data"
import { useState } from "react";
import MainCard from "../../../common/Component/Cards/TravelCards/MainCard";
import Sidebar from "../ElectronicCategory/SideBar/SideBar";
import MenuBars from "../MenuBars/MenuBars";
import MarketCards from "../../../common/Component/Cards/MarketCard/MarketCards";

const updatedData = [{ id: 0, name: "All" }, ...Data];

const HomeGarden = () => {

    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [title, setTitle] = useState<string>("Home & Garden");
    const [selectedItem, setSelectedItem] = useState<any>(null); // Store the selected item details

    const handleItemClick = (id: number, categoryTitle: string) => {
        setSelectedCategory(id);
        setTitle(id !== 0 ? categoryTitle : "Home & Garden");
    };

    const handleCardClick = (item: any) => {
        setSelectedItem(item);
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    const filteredData = selectedCategory !== 0 ? catagoryData.filter(item => item.categoryId === selectedCategory) : catagoryData;


    return (
        <Box marginTop={'150px'}>
            <Grid container spacing={2}>

                <Grid item xs={2.5} >
                    <Sidebar />
                    <SideBar
                        data={updatedData}
                        selectedItem={selectedCategory}
                        onItemClick={(id: number) => handleItemClick(id, updatedData.find(item => item.id === id)?.name || "Home & Garden")} />
                </Grid>

                {/* Right Side Content */}
                <Grid item xs={9.5}>

                    <Grid item xs={12}>

                        <Box>
                            < MenuBars />
                        </Box>
                        {/* <MenuBars/> */}



                    </Grid>
                    <Grid container spacing={1}>

                        {/* Title */}
                        <Grid item xs={12} marginTop={'170px'} marginLeft={'20px'}>
                            <Typography sx={{color:'#263B4A', fontWeight:600, fontSize:'18px'}}>{title} </Typography>
                        </Grid>

                        {/* Cards Grid */}
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {/* {filteredData.map((item) => (
                                    <Grid key={item.id} item xs={12} sm={6} md={3}>
                                        <MarketCards
                                            id={item.id}
                                            userProfilePic={item.userProfilePic}
                                            userName={item.name}
                                            title={item.title}
                                            description={item.Description}
                                            images={item.image}
                                            onSave={function (): void {
                                                throw new Error("Function not implemented.");
                                            }} onForward={function (): void {
                                                throw new Error("Function not implemented.");
                                            }} />
                                    </Grid>
                                ))} */}
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );


}
export default HomeGarden;