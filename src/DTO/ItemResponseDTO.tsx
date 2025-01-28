import { UserMinDTO } from "./UserMinDTO";
import { SubCategoryResponseDTO } from "./SubCategoryDTO";

export interface ItemResponseDTO {
    id: number;
    name: string;
    description:string;
    mileage:string;
    price:string;
    fueltype:string;
    transmission:string;
    seatingCapacity:string;
    luggageCapacity:string;
    color:string;
    imageBlob:string;
    yearOfManufacture:string;
    engineCapacity: string;
fuelEfficiency: string;
deposit:string;
status: string;
licensePlate: string;
firstName:string;

    isSold:boolean;
    blob:File;
    createdBy: UserMinDTO;
    lasModifiedBy: UserMinDTO;
    createdDateTime: string; 
    subcategories: Set<SubCategoryResponseDTO>; 
}
