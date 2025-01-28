// import React from 'react';
// import { Box, Container, Grid, IconButton, Link, Paper, Typography, useMediaQuery, Theme } from "@mui/material";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import AnimationBox from "./AnimationBox/AnimationBox";
// import Categorys from "./Category/Categorys";
// import TravelComponentCard from "../../common/Component/Cards/TravelCards/TravelComponentCard/TravelComponentCard";
// import { TravelData } from "../../common/Component/Cards/TravelCards/TravelComponentCard/TravelData";

// const HomePage: React.FC = () => {
//     const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
//     const isSmallMobile = useMediaQuery('(max-width:375px)');

//     return (
//         <Box>
//             <AnimationBox />

//             <Box sx={{ margin: isMobile ? '5px' : '10px' }}>
//                 <Grid container>
//                     <Grid item xs={12} sm={1} />
//                     <Grid item xs={12} sm={10}>
//                         <Grid container justifyContent="space-between" alignItems="center" sx={{ paddingTop: 5 }}>
//                             <Grid item>
//                                 <Typography sx={{ color: '#263B4A', fontWeight: '600', fontSize: isMobile ? '16px' : '20px' }}>
//                                     Collective Memories
//                                 </Typography>
//                             </Grid>
//                             <Grid item>
//                                 {isMobile ? (
//                                     <IconButton href="/travel">
//                                         <ArrowForwardIcon />
//                                     </IconButton>
//                                 ) : (
//                                     <Link href="/travel" underline="hover" color={'#263B4A'}>
//                                         {'See all'}
//                                     </Link>
//                                 )}
//                             </Grid>
//                         </Grid>

//                         <Container sx={{ justifyContent: 'center', alignItems: 'center' }}>
//                             <Box
//                                 display="flex"
//                                 justifyContent="center"
//                                 alignItems="center"
//                                 minHeight="100vh"
//                             >
//                                 <Grid item xs={12}>
//                                     <Grid container spacing={0.2} sx={{ marginTop: '10px', marginBottom: '10px' }}>
//                                         {TravelData.map((item) => (
//                                             <Grid key={item.id} item xs={12} md={6} sx={{ marginTop: 2 }}>
//                                                 <TravelComponentCard
//                                                     userProfilePic={item.userProfilePic}
//                                                     title={item.title}
//                                                     image={item.image}
//                                                     showMessageIcon
//                                                     showForwardIcon
//                                                     showSaveIcon
//                                                     showLocationIcon
//                                                     showLikeIcon
//                                                 />
//                                             </Grid>
//                                         ))}
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Container>

//                         {/* Company Events */}
//                         <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: '30px' }}>
//                             <Grid item>
//                                 <Typography sx={{ color: '#263B4A', fontWeight: '600', fontSize: isMobile ? '16px' : '20px' }}>
//                                     Events
//                                 </Typography>
//                             </Grid>
//                             <Grid item>
//                                 {isMobile ? (
//                                     <IconButton href="/event">
//                                         <ArrowForwardIcon />
//                                     </IconButton>
//                                 ) : (
//                                     <Link href="/events" underline="hover" color={'#263B4A'}>
//                                         {'See all'}
//                                     </Link>
//                                 )}
//                             </Grid>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <Paper sx={{ width: '100%', height: isSmallMobile ? '200px' : '300px', overflow: 'hidden' }}>
//                                 <img src="./asset/poster/event/event.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                             </Paper>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={12} sm={1} />
//                 </Grid>
//             </Box>

//             <Grid container justifyContent="space-between" alignItems="center" sx={{ marginTop: '30px' }}>
//                 <Grid item>
//                     <Typography sx={{ color: '#263B4A', fontWeight: '600', fontSize: isMobile ? '16px' : '20px', marginLeft: isMobile ? '10px' : '15px' }}>
//                         Category
//                     </Typography>
//                 </Grid>
//                 <Box>
//                     <Categorys />
//                 </Box>
//             </Grid>
//         </Box>
//     );
// }

// export default HomePage;
