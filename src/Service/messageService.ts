import apiConfig from "../Authentication/api";
import { Message, User } from "../store/types";

export const sendMessage = async (receiverId: number, content: string, postId?: number, itemId?: number) => {
  console.log('Sending Message Params:', { receiverId, content, postId, itemId }); // Log params here

  try {
    const response = await apiConfig.post('/messages', null, {
      params: {
        receiverId,
        content,
        postId,
        itemId, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message', error);
    throw new Error('Error sending message');
  }
};


export const getMessagesFromSender = async (otherUserId: number) => {
  try {
    const response = await apiConfig.get('/messages/from-sender', {
      params: { otherUserId },
    });
    // Assuming the API returns messages with `postId` property
    return response.data.map((message: any) => ({
      ...message,
      post: message.postId ? { id: message.postId, /* fetch other post details here */ } : null,
    }));
  } catch (error) {
    throw new Error('Error fetching messages');
  }
};

export const getUsersWhoMessaged = async (): Promise<User[]> => {
  try {
    const response = await apiConfig.get('/messages/users-who-messaged');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users who messaged');
  }
};

export const fetchUsersWithMessages = async () => {
  try {
    const response = await apiConfig.get('/messages/users-who-messaged');
    return response;
  } catch (error) {
    console.error('Error fetching users who messaged:', error);
    throw error;
  }
};

export const searchUsersByFirstName = async (firstName: string): Promise<User[]> => {
  try {
    const response = await apiConfig.get('/users/search', {
      params: { firstName }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const getUnreadMessages = async (): Promise<Message[]> => {
  try {
    const response = await apiConfig.get('/messages/unread');
    return response.data;
  } catch (error) {
    console.error('Error fetching unread messages:', error);
    throw new Error('Error fetching unread messages');
  }
};

