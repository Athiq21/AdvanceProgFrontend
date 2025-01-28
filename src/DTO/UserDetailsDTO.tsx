import { FileBlob } from "../type/FileBlob";
import { Post } from "../type/Posts";

export interface UserDetailsDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userImage: FileBlob;
    designation: string; 
    role: any;
    userPosts: Post[];
}


