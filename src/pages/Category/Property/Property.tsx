import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../ElectronicCategory/SideBar/SideBar";
import MenuBars from "../MenuBars/MenuBars";
import { catagoryData } from "../categoryData";
import { useState } from "react";
import { Data } from "../Cakes/Data/Data";
import MarketCards from "../../../common/Component/Cards/MarketCard/MarketCards";


const updatedData = [{ id: 0, name: "All" }, ...Data];
const Property = ()=>{

  const [selectedData, setSelectedData] = useState<number>(0);
  const [title, setTitle] = useState<string>("Accesories");

  const handleItemClick = (id: number, categoryTitle: string) => {
    setSelectedData(id);
    setTitle(id !== 0 ? categoryTitle : "Accesories");
  };

  // Filter data if a specific category is selected, otherwise show all electronic items
  const filteredData = selectedData !== 0 ? catagoryData.filter(item => item.categoryId === selectedData) : catagoryData;


    return(
        <>
        <Grid container marginTop={'150px'}>
            <Grid item xs={2.5}>
<Sidebar/>
            </Grid>

            <Grid item xs={9.5}>
            <Grid item xs={12}>
               
               <Box>
            < MenuBars/>
               </Box>
            
               <Grid container spacing={1}>

{/* Title */}
<Grid item xs={12} marginTop={'170px'} marginLeft={'20px'}>
    <Typography sx={{color:'#263B4A', fontWeight:600, fontSize:'18px'}}>Property</Typography>
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
        </Grid>
        </>
    )
}
export default Property;