

import { Box, ImageList, ImageListItem, useMediaQuery, Typography } from "@mui/material";
import { useEvents } from "../../Service/CustomHook/getEvent";
import { BASE_URL } from "../../Authentication/api";

export default function EventPage() {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const { events } = useEvents();
  
    return (
        <Box 
            sx={{ 
                width: '100%', 
                overflowX: 'hidden', // Prevent horizontal scrolling
                padding: 0,
                margin: 0,
                mt: '60px',
                boxSizing: 'border-box', // Ensures padding doesn't affect width
                marginBottom: { xs: '70px', sm: '130px' },
            }}
        >
            <Box 
                align="center" 
                sx={{ mt: '-15px', mb: '-10px' }}
            >
                <Typography
                    variant="body3"
                    sx={{
                        fontSize: '4rem',
                        background: 'linear-gradient(45deg, #4B0082, #E6E6FA)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center', // Ensure text stays centered
                    }}
                >
                 News Letter
                </Typography>
            </Box>
            <ImageList 
                variant="masonry" 
                cols={isMobile ? 1 : 3} 
                gap={10}
                sx={{ 
                    width: '100%', // Ensure ImageList fits the screen width
                    margin: 0, 
                    padding: 0,
                    overflow: 'hidden', // Prevent overflow in ImageList
                }}
            >
                {events.map((item) => (
                    <ImageListItem 
                        key={item.id}
                        sx={{
                            width: '100%', // Ensure images fit container
                            overflow: 'hidden',
                        }}
                    >
                        <img
                           src={item.image} 
                            alt={item.title}
                            loading="lazy"
                            style={{ 
                                width: '100%', 
                                height: 'auto',
                                display: 'block', // Prevent inline elements from causing extra space
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
