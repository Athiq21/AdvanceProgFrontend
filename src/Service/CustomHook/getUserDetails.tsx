  import { useEffect, useState } from "react";
  import apiConfig from "../../Authentication/api";
import { UserDetailsDTO } from "../../DTO/UserDetailsDTO";
import { ItemResponseDTO } from "../../DTO/ItemResponseDTO";
  
//   export const getUserDetails = async (id:number ) => {
  
//       const [userDetails, setUserDetails] = useState<any[]>([]);
//       const [loading, setLoading] = useState<boolean>(true);
//       const [error, setError] = useState<string | null>(null);
  
//       useEffect(() => {
//           const fetchUserDetails = async () => {
//               try {
//                   const response = await apiConfig.get(`/users/details/${id}`);
//                   setUserDetails(response.data);
//               } catch (err) {
//                   setError('Failed to fetch posts');
//               } finally {
//                   setLoading(false);
//               }
//           };
  
//           fetchUserDetails();
//       }, []);
  
//       return { userDetails, loading, error };
//     };


// Fetch user details with posts


// Fetch user details with posts
export const useGetUserDetails = (id: number) => {
    const [userDetails, setUserDetails] = useState<UserDetailsDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await apiConfig.get(`/users/details/${id}`);
                setUserDetails(response.data as UserDetailsDTO);
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    return { userDetails, loading, error };
};



export const useGetUserItemDetails = (id: number) => {
    // const [userItemDetails, setUserItemDetails] = useState<ItemResponseDTO | null>(null);
    
    const [postItems, setPostItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await apiConfig.get(`/items/user/${id}`);
                setPostItems(response.data)
                // setUserItemDetails(response.data as ItemResponseDTO);
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    return { postItems, loading, error };
};



