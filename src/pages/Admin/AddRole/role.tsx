

import { useState } from "react";
import TabComponent from "../../../common/Component/Tabs/TabComponent";
import { Box } from "@mui/material";
import AddRole from "./AddRole";


const RoleAdmin = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Add Admin',
      content: <AddRole />,
    },
    {
      label: 'Permission',
    //   content: <EditEvent />,
    },
  ];

  return (
    <Box
      sx={{
  
        flexDirection: 'column',
        marginTop: { xs: '70px', sm: '100px' },
    
      }}
    >
      <TabComponent tabs={tabs} value={value} onChange={handleChange} />
    </Box>
  );
};

export default RoleAdmin;
