import { useState } from "react";
import TabComponent from "../../../common/Component/Tabs/TabComponent";
import { Box } from "@mui/material";
import EditCategory from "./EditCategory";



const PostSetting = ()=>{ 

const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Listing Setting',
      content:<EditCategory/>,
    },
  ];
   return(
    // <Box marginTop={'170px' } ml={5}>
    // <TabComponent tabs={tabs} value={value} onChange={handleChange} />
   
    // </Box>
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: { xs: '70px', sm: '100px' },
      marginRight: { xs: '16px', sm: 0 },
    }}
  >
    <TabComponent tabs={tabs} value={value} onChange={handleChange} />
  </Box>
   )


}
export default PostSetting;