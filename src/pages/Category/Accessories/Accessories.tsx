import { Box, Grid, Typography } from "@mui/material";
import SideBar from "../../../common/Component/SideBar/SideBar";
import { Data } from "./Data/Data";
import { useState } from "react";
import { catagoryData } from "../categoryData";
import Sidebar from "../ElectronicCategory/SideBar/SideBar";
import MenuBars from "../MenuBars/MenuBars";
import MarketCards from "../../../common/Component/Cards/MarketCard/MarketCards";

interface Category {
    id: number;
    title: string;
}

const updatedData = [{ id: 0, name: "All" }, ...Data];

const Accessories = () => {

  const [selectedData, setSelectedData] = useState<number>(0);

  const [title, setTitle] = useState<string>("Accesories");

  const handleItemClick = (id: number, categoryTitle: string) => {
    setSelectedData(id);
    setTitle(id !== 0 ? categoryTitle : "Accesories");
  };

  // Filter data if a specific category is selected, otherwise show all electronic items
  const filteredData = selectedData !== 0 ? catagoryData.filter(item => item.categoryId === selectedData) : catagoryData;


  return (

      <Box  sx={{ marginTop: '150px' }}>
        <Grid container spacing={2}>

          <Grid item xs={2.5} >
            <Sidebar />
            <SideBar
              data={updatedData}
              selectedItem={selectedData}
              onItemClick={(id: number) => handleItemClick(id, updatedData.find(item => item.id === id)?.name || "Vechicles")} />
          </Grid>

          <Grid item xs={9.5}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box>
                < MenuBars />
              </Box>
            </Grid>

        

              {/* Title */}
              <Grid item xs={12} marginTop={'160px'} marginLeft={'20px'}>
                <Typography sx={{color:'#263B4A', fontWeight:600, fontSize:'18px'}}>{title} </Typography>
              </Grid>

              {/* Cards Grid */}
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {filteredData.map((item) => (
                    <Grid key={item.id} item xs={12} sm={6} md={3}>
                      {/* <MarketCards
                        id={item.id}
                        userProfilePic={item.userProfilePic}
                        userName={item.name}
                        title={item.title}
                        description={item.Description}
                        images={item.image}
                        onSave={function (): void {
                          throw new Error("Function not implemented.");
                        }}
                        onForward={function (): void {
                          throw new Error("Function not implemented.");
                        }} /> */}
                    </Grid>
                  ))}
                </Grid>

              </Grid>

  
            </Grid>

          </Grid>
        </Grid>
      </Box>


  );

}

export default Accessories;