import { Box } from "@mui/material";
import TextComponent from "../../common/Component/AddTextComponent/TextComponent";
import PostPage from "../PostPage/PostPage";
// import { usePosts } from "../../Service/CustomHook/getPost";
import StoryCard from "./Story/StoryCard";

const HomePage = () => {

    return (
        <Box 
        sx={{
            overflowX: "hidden",  // Prevent horizontal scrolling
            width: "100vw",       // Ensure it uses the full viewport width
            boxSizing: "border-box", // Includes padding in width calculations
            marginBottom: { xs: '50px', sm: '90px' },
            marginTop: { xs: '70px', sm: '130px' }, // Responsive margin-top: 60px on mobile and 130px on larger screens
        }}
    >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt:'20px',
                        mr:'15px',
                        ml:'15px'
                    }}
                >
                        <TextComponent/>
                
                </Box>
                {/* <Box
                    sx={{
                        marginTop:'60px'
                    }}
                >
                    <PostPage/>
                </Box> */}
                <Box
    sx={{
        display: "flex",        // Use flexbox
        justifyContent: "center", // Center horizontally
        alignItems: "center",   // Center vertically
        marginTop: "20px",      // Adjust top margin as needed
        height: "100%",         // Ensure it takes up the available height (adjust based on the layout)
    }}
>
    <PostPage />
</Box>

               
            </Box>
        </Box>
    );
};

export default HomePage;
