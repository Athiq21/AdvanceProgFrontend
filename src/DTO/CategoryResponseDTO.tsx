import { UserMinDTO } from "./UserMinDTO";
import { SubCategoryResponseDTO } from "./SubCategoryDTO";

export interface CategoryResponseDTO {
    id: number;
    name: string;
    createdBy: UserMinDTO;
    lasModifiedBy: UserMinDTO;
    createdDateTime: string; 
    lastModifiedDateTIme: string; 
    subcategories:SubCategoryResponseDTO[]; 
}