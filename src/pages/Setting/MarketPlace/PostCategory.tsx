import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersByUser } from "../../../store/features/orderSlice"; 
import MainCard from "../../../common/Component/Cards/TravelCards/MainCard";
import SearchComponent from "../../../common/Component/SearchBar/SearchComponent";
import { RootState } from "../../../store/index";

const PostCategory = () => {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state: RootState) => state.order);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(Number(storedUserId)); 
        }
    }, [dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // const filteredOrders = orders.filter((order) => {
    //     const statusLower = order.status ? order.status.toLowerCase() : '';
    //     const fullName = order.user.firstName && order.user.lastName
    //         ? `${order.user.firstName} ${order.user.lastName}`.toLowerCase()
    //         : '';
    //     const searchLowerCase = searchQuery.toLowerCase();

    //     return (
    //         statusLower.includes(searchLowerCase) ||
    //         fullName.includes(searchLowerCase) ||
    //         (order.paymentMethod && order.paymentMethod.toLowerCase().includes(searchLowerCase))
    //     );
    // });
    const filteredOrders = orders.filter((order) => {
        const statusLower = order.status ? order.status.toLowerCase() : '';
    
        if (statusLower !== 'ongoing') return false;
    
        const fullName = order.user.firstName && order.user.lastName
            ? `${order.user.firstName} ${order.user.lastName}`.toLowerCase()
            : '';
        const searchLowerCase = searchQuery.toLowerCase();
    
        return (
            fullName.includes(searchLowerCase) ||
            (order.paymentMethod && order.paymentMethod.toLowerCase().includes(searchLowerCase))
        );
    });

    if (status === 'loading') return <div><CircularProgress /></div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <Box sx={{ padding: "20px", marginLeft: 0 }}>
            <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2, marginTop: '25px' }}>
                <Box sx={{ width: '500px', mt: '-30px' }}>
                    <SearchComponent value={searchQuery} onChange={handleSearchChange} />
                </Box>
            </Box>

            <Grid container spacing={1}>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Grid item xs={11} sm={6} md={2.5} key={order.id}>
                            <Box sx={{ marginLeft: "30px" }}>
                            <MainCard
                                     id={order.id}
                                     userId={order.user.id || ''}
                                     userName={`${order.id}`}
                                     title={`Order ID: ${order.id}`}
                                     description={`Payment Method: ${order.paymentMethod}`}
                                     fueltype={`Start Date: ${order.startDate}`} 
                                     mileage={`Car Model: ${order.item.name}`}
                                     price={`Price: ${order.item.price}`}
                                     status={`Status: ${order.status}`}
                                     transmission={`End Date: ${order.endDate}`}
                                     color={`Name: ${order.user.firstName}  ${order.user.lastName}`}
                                     image={order.item.imageBlob}
                                
                                />
                                
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <div>No Ongoing Rides found</div>
                )}
            </Grid>
        </Box>
    );
};

export default PostCategory;
