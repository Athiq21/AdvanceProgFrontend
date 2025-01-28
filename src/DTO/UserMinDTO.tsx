import { FileBlob } from "../type/FileBlob";

export interface UserMinDTO {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    imageBlob: FileBlob;
    designation: string; 
    role_id: number;
}
