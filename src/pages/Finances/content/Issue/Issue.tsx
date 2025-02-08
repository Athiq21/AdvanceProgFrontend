import { Container } from "@mui/material";
import { useState } from "react";
import TabComponent from "../../../../common/Component/Tabs/TabComponent";
import CreateIssue from "./Iss/CreateIssue";
import AllIssue from "./Iss/AllIssue";
import NavBar2 from "../../../../common/Component/NavBar/NavBar2";

const Issue = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Create Issue",
      content: <CreateIssue />,
    },
    {
      label: "All Issue",
      content: <AllIssue />,
    },
  ];

  return (
    <>
    <NavBar2/>
    <Container
      sx={{
        width: "100%", 
        maxWidth: { xs: "100%", sm: "100%", md: "100%" },
        padding: { xs: "16px", sm: "24px" }, 
        margin: "auto",
        marginTop:'70px',
      }}
    >
      <TabComponent tabs={tabs} value={value} onChange={handleChange} />
    </Container>
    </>
  );
};

export default Issue;
