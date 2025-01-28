import { UserMinDTO } from "../DTO/UserMinDTO";
import { FileBlob } from "./FileBlob";

 export interface Post {
     id: number;
    reactions:Reaction[];
    userId:number;
    firstName: string;
    lastName: string;
    designation: string; 
    title: string;
    description: string;
    blobs: FileBlob[]; 
    likeCount: number;
    createdBy: UserMinDTO;
    lastModifiedBy: UserMinDTO;
  }

  export interface Reaction{
    id:number;

  }



