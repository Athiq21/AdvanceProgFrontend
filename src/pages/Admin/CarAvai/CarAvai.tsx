// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   IconButton,
//   Popover,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../../store';
// import { viewItemAdmin, updateItem,updateItemOrder } from '../../../store/features/itemSlice';

// const CarAvai = () => {
//   const dispatch: AppDispatch = useDispatch();

//   // Access Redux state
//   const items = useSelector((state: RootState) => state.items.items);
//   const loading = useSelector((state: RootState) => state.items.loading);
//   const error = useSelector((state: RootState) => state.items.error);

//   // State for Popover
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedItem, setSelectedItem] = useState<{ id: number; name: string; status: string ; imageBlob:string} | null>(null);
//   useEffect(() => {
//     dispatch(viewItemAdmin());
//   }, [dispatch]);


//   // Handle Popover close
//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedItem(null);
//   };


//   const formatStatus = (status: string) => {
//     if (status.toLowerCase() === 'available') return 'Available';
//     if (status.toLowerCase() === 'unavailable') return 'unavailable';
//     if (status.toLowerCase() === 'maintenance') return 'Maintenance';
//     return status; 
//   };

//   const handleClick = (event: React.MouseEvent<HTMLElement>, item: { id: number; name: string; status: string; imageBlob: string }) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedItem({
//       ...item,
//       status: formatStatus(item.status), 
//     });
//   };

  
//   const handleStatusChange = (event: SelectChangeEvent) => {
//     if (selectedItem) {
//       const updatedStatus = event.target.value as string;
//       const normalizedStatus = updatedStatus.toLowerCase(); 
//       console.log("Updating item with:", { itemId: selectedItem.id, status: normalizedStatus });
//       dispatch(updateItemOrder({ itemId: selectedItem.id, status: normalizedStatus })); 
    
//       handleClose();
//     }
//   };
  

//   // Display loading or error messages
//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }
//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   // Render the table
//   return (
//     <Box marginTop="160px" marginLeft="-50px">
//       <Typography marginLeft="30px">Availability</Typography>
//       <Container>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="Car Availability Table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Car ID
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Name
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Description
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Color
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Mileage
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Fuel Type
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Price
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Status
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold' }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map((item) => (
//                 <TableRow key={item.id}>
//                 <TableCell align="center">{item.id}</TableCell>
//                 <TableCell align="center">{item.name}</TableCell>
//                 <TableCell align="center">{item.description}</TableCell>
//                 <TableCell align="center">{item.color}</TableCell>
//                 <TableCell align="center">{item.mileage}</TableCell>
//                 <TableCell align="center">{item.fueltype}</TableCell>
//                 <TableCell align="center">{item.price}</TableCell>
//                 <TableCell align="center">{item.status}</TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={(e) => handleClick(e, { id: item.id, name: item.name, status: item.status, imageBlob: item.imageBlob })}>
//                     <MoreVertIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>

//       <Popover
//   open={Boolean(anchorEl)}
//   anchorEl={anchorEl}
//   onClose={handleClose}
//   anchorOrigin={{
//     vertical: 'bottom',
//     horizontal: 'center',
//   }}
//   transformOrigin={{
//     vertical: 'top',
//     horizontal: 'center',
//   }}
// >
//   <Box
//     sx={{
//       p: 10,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center', 
//       justifyContent: 'center', 
//       textAlign: 'center',
//     }}
//   >
//     <Typography variant="h6" gutterBottom>
//       Update Status
//     </Typography>
//     {/* Display the item image */}
//     {selectedItem?.imageBlob && (
//       <Box
//         sx={{
//           width: '100px',
//           height: '100px',
//           borderRadius: '50%',
//           overflow: 'hidden',
//           mb: 2,
//         }}
//       >
//         <img
//           src={selectedItem.imageBlob}
//           alt={`Car ${selectedItem.id}`}
//           style={{ width: '100%', height: '100%' }}
//         />
//       </Box>
//     )}
//     <Typography>ID: {selectedItem?.id}</Typography>
//     <Typography>Name: {selectedItem?.name}</Typography>
//     <Typography>Current status: {selectedItem?.status}</Typography>
//     <Select
//       value={selectedItem?.status || ''}
//       onChange={handleStatusChange}
//       fullWidth
//       sx={{ mt: 2 }}
//     >
//       <MenuItem value="Available">Available</MenuItem>
//       <MenuItem value="unavailable">Unavailable</MenuItem>
//       <MenuItem value="Maintenance">Maintenance</MenuItem>
//     </Select>
//   </Box>
// </Popover>
//     </Box>
//   );
// };

// export default CarAvai;


import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Popover,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { viewItemAdmin,updateItemOrder } from '../../../store/features/itemSlice';

const CarAvai = () => {
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const loading = useSelector((state: RootState) => state.items.loading);
  const error = useSelector((state: RootState) => state.items.error);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<{ id: number; name: string; status: string ; imageBlob:string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(viewItemAdmin());
  }, [dispatch]);

  // Handle Popover close
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const formatStatus = (status: string) => {
    if (status.toLowerCase() === 'available') return 'Available';
    if (status.toLowerCase() === 'unavailable') return 'unavailable';
    if (status.toLowerCase() === 'maintenance') return 'Maintenance';
    return status; 
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, item: { id: number; name: string; status: string; imageBlob: string }) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem({
      ...item,
      status: formatStatus(item.status), 
    });
  };
  
  const handleStatusChange = (event: SelectChangeEvent) => {
    if (selectedItem) {
      const updatedStatus = event.target.value as string;
      const normalizedStatus = updatedStatus.toLowerCase(); 
      console.log("Updating item with:", { itemId: selectedItem.id, status: normalizedStatus });
      dispatch(updateItemOrder({ itemId: selectedItem.id, status: normalizedStatus })); 
    
      handleClose();
    }
  };
  
  const filteredItems = items.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower)
    );
  });

  // Display loading or error messages
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Render the table
  return (
    <Box marginTop="160px" marginLeft="-50px">
      <Typography marginLeft="30px">Availability</Typography>
      <Container>
        <TextField
          fullWidth
          label="Search by car name or status"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Car Availability Table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Car ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Color
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Mileage
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Fuel Type
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Price
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.color}</TableCell>
                <TableCell align="center">{item.mileage}</TableCell>
                <TableCell align="center">{item.fueltype}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleClick(e, { id: item.id, name: item.name, status: item.status, imageBlob: item.imageBlob })}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Popover
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
>
  <Box
    sx={{
      p: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center',
    }}
  >
    <Typography variant="h6" gutterBottom>
      Update Status
    </Typography>
    {/* Display the item image */}
    {selectedItem?.imageBlob && (
      <Box
        sx={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <img
          src={selectedItem.imageBlob}
          alt={`Car ${selectedItem.id}`}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
    )}
    <Typography>ID: {selectedItem?.id}</Typography>
    <Typography>Name: {selectedItem?.name}</Typography>
    <Typography>Current status: {selectedItem?.status}</Typography>
    <Select
      value={selectedItem?.status || ''}
      onChange={handleStatusChange}
      fullWidth
      sx={{ mt: 2 }}
    >
      <MenuItem value="Available">Available</MenuItem>
      <MenuItem value="unavailable">Unavailable</MenuItem>
      <MenuItem value="Maintenance">Maintenance</MenuItem>
    </Select>
  </Box>
</Popover>
    </Box>
  );
};

export default CarAvai;