import { useState } from "react";
import TabComponent from "../../../common/Component/Tabs/TabComponent";
import { Box, Button, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Buttons from "../../../common/Component/Button/Buttons";
import AddNewCategory from "./AddNewCategory";
import AddNewSubCategory from "./AddNewSubCategory";


const CategorySetting = ()=>{

const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'New Category',
      content: <AddNewCategory/>,
    },
    {
      label: 'New Sub Category',
      content: <AddNewSubCategory/>,
    },
  ];
   return(
    // <Box marginTop={'170px' } ml={5}>
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: { xs: '70px', sm: '170px' },
      marginLeft: { xs: '16px', sm: '40px' },
      marginRight: { xs: '16px', sm: 0 },
    }}
  >
    <TabComponent tabs={tabs} value={value} onChange={handleChange} />
   
    </Box>
   )


}
export default CategorySetting;