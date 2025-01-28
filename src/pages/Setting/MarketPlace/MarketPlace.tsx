import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import TabComponent from "../../../common/Component/Tabs/TabComponent";
import PostCategory from "./PostCategory";
import SaveCategory from "./SaveCategory";
import CompletedCategory from "./CompletedCategory";

const MarketPlace = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    const tabs = [
      {
        label: 'InProgress',
        content: <PostCategory/>,
      },
      {
        label: 'Completed',
        content: <CompletedCategory/>,
      },
      {
        label: 'Saved',
        content: <SaveCategory/>,
      },
    ];

    return (
        < Container sx={{
          width: "100%", // Take full width
          maxWidth: { xs: "100%", sm: "100%", md: "100%" }, // Responsiveness for mobile and larger screens
          padding: { xs: "16px", sm: "24px" }, // Add padding for smaller screens
          margin: "auto", // Center horizontally
        }}
      >
        

                <TabComponent tabs={tabs} value={value} onChange={handleChange} />


        </Container>
    );

}
export default MarketPlace;