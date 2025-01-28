import { UserMinDTO } from "./UserMinDTO";
import { SubCategoryResponseDTO } from "./SubCategoryDTO";

export interface CategoryResponseDTO {
    id: number;
    descriptiom: string;
    createdBy: UserMinDTO;
    lasModifiedBy: UserMinDTO;
    createdDateTime: string; 
    lastModifiedDateTIme: string; 
    subcategories: Set<SubCategoryResponseDTO>; 
}