
// export type Category = 'Electronics' | 'Furniture';
// export type SubCategory = 'Mobile Phone' | 'Laptop' | 'Camera' | 'Sofa' | 'Table' | 'Chair';

import { useEffect, useState } from "react";
import apiConfig from "../../../Authentication/api";
import { CategoryResponseDTO } from "../../../DTO/CategoryResponseDTO";


// interface SubCategory {
//   id: number;
//   name: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   subCategory: SubCategory[];
// }
export interface PopupConfig {
  name: boolean;
  description: boolean;
  color:boolean;
  images: boolean;
  mileage:boolean;
  transmission:boolean;
  fueltype:boolean;
  price:boolean;
  category: boolean;
  subCategory: boolean;
}

export const postingPageConfig: PopupConfig = {
  name: true,
  description: true,
  color: true,
  images: true,
  mileage:true,
  transmission:true,
  fueltype:true,
  price:true,
  category: false,
  subCategory: false,
};

export const marketplacePageConfig: PopupConfig = {
  name: true,
  description: true,
  color: true,
  images: true,
  mileage:true,
  transmission:true,
  fueltype:true,
  price:true,
  category: true,
  subCategory: true,
};

 export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await apiConfig.get<CategoryResponseDTO[]>('/categories/');
              setCategories(response.data);
          } catch (err) {
              setError('Error fetching categories');
          } finally {
              setLoading(false);
          }
      };

      fetchCategories();
  }, []);

  return { categories, loading, error };
};