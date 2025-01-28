export interface User {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    imageUrl:string;
    hasUnreadMessages: boolean;
  }

  // export interface User {
  //   id: number;
  //   firstName: string;
  //   lastName: string;
  //   // avatar: string;
  //   email: string;
  //   imageUrl: string;
  // }
  
  interface Post {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
  }

  export interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: string;
    post?: Post; 
    itemId?: number;
    
  }
  
  export interface ChatMessage {
    id: number;
    senderId: number;
    content: string;
    timestamp: string;
    post?: Post; 
    postId?: number;
    itemId?: number;
  }


// Define the shape of a Category, including its subcategories
interface Category {
  id: number;
  name: string;
  subCategories?: SubCategory[];
}
interface SubCategory {
  // id: number;
  // name: string;
  id: number;
  name: string;
  categoryId: number;
}


