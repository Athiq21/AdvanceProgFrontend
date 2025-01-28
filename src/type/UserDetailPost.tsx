import { FileBlob } from "./FileBlob";
import { Post } from "./Posts";


// export interface UserDetailPost {
//     createdBy: any;
//     id: number;
//     blobs: FileBlob[];
//     posts: Post;
//     firstName: string;
//     lastName: string;
//     title: string;
//     description: string;
//     isLoggedUserReacted: boolean;
//     likeCount: number;
// }

export interface UserDetailPost {
    id: number;
    blobs: FileBlob[];
    profileImageBlob?: FileBlob; // Optional profile image blob
    userId:number;
    imageUrl: string;
    firstName: string;
    lastName: string;
    designation: string; 
    designationUrl:string;
    Role:string;
    title: string;
    description: string;
    isLoggedUserReacted: boolean;
    likeCount: number;
    // Removed the 'posts' attribute if not needed
  }