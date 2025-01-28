import { Box, Divider, Grid, Typography } from "@mui/material";
import { catagoryData } from "../Category/categoryData";
import MainCard from "../../common/Component/Cards/TravelCards/MainCard";
import SideBar from "../MarketPlace/SideBar/SideBar";

const SoldPage = () => {
   
    return(
        <Box sx={{marginTop:'160px'}}>
          
            <Grid container>
                <Grid item md ={4}>
                    <SideBar/>
                </Grid>

                <Grid item md ={8}>
                <Typography>Sold Items</Typography>
                    <Box   sx={{ 
                display: 'flex',
                justifyContent: 'center', 
            }}>
                    </Box>

                    <Grid item xs={12} sx={{marginTop:'30px'}}>
                        <Grid container spacing={1.5}>
                            {catagoryData.map((item) => (
                                <Grid key={item.id} item xs={12} sm={6} md={3}>
                                <MainCard 
                                    id={item.id} 
                                    userProfilePic={item.userProfilePic} 
                                    userName={item.name} 
                                    title={item.title} 
                                    description={item.Description} 
                                    images={item.image} 
                                    onSave={function (): void {
                                        throw new Error("Function not implemented.");
                                    } } onForward={function (): void {
                                        throw new Error("Function not implemented.");
                                    } }/>
                                </Grid>
                            ))}
                        </Grid>

                    </Grid>
    

                </Grid>
            </Grid>
         
        </Box>
    );


}
export default SoldPage;