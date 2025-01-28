import apiConfig from "../../Authentication/api";

export const getCategories = async () => {
    return await apiConfig.get(`/categories`);
};

export const getSubcategories = async (subcategoryId: number) => {
   
    return await apiConfig.get(`/item/subcategory/${subcategoryId}`);
};

// export const getItemsBySubcategory = async (subcategoryId: number) => {
//     return await apiConfig.get(`/items/subcategory/${subcategoryId}`);
// };

export const Items = async () => {
    return await apiConfig.get(`/item`);
};