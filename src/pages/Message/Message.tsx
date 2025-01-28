
// // import React, { useEffect, useState, useCallback } from 'react';
// // import { useLocation } from 'react-router-dom'; // Import useLocation to receive state from the redirect
// // import { Box, Container, CircularProgress, Typography } from '@mui/material';
// // import Sidebar from './SideBar/SideBar';
// // import MessageList from './Content/MessageContent';
// // import { User, Message as ChatMessage } from '../../store/types';
// // import { sendMessage, getMessagesFromSender, getUsersWhoMessaged } from '../../Service/messageService';

// // const Message: React.FC = () => {
// //   const location = useLocation(); // To get the passed state (userId, preloadedMessage)
// //   const { userId: preloadedUserId, preloadedMessage } = location.state || {};

// //   const [users, setUsers] = useState<User[]>([]);
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null);
// //   const [messages, setMessages] = useState<ChatMessage[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const loggedInUserId = Number(sessionStorage.getItem('userId'));

// //   useEffect(() => {
// //     getUsersWhoMessaged()
// //       .then(fetchedUsers => {
// //         setUsers(fetchedUsers);
// //         setLoading(false);

// //         // If redirected with preloaded data, automatically select that user
// //         if (preloadedUserId) {
// //           const userToSelect = fetchedUsers.find(user => user.id === preloadedUserId);
// //           if (userToSelect) {
// //             setSelectedUser(userToSelect);
// //           }
// //         }
// //       })
// //       .catch(err => {
// //         setError('Failed to fetch users');
// //         setLoading(false);
// //       });
// //   }, [preloadedUserId]);

// //   useEffect(() => {
// //     if (selectedUser) {
// //       const intervalId = setInterval(() => {
// //         getMessagesFromSender(selectedUser.id)
// //           .then(fetchedMessages => {
// //             setMessages(fetchedMessages);
// //           })
// //           .catch(error => {
// //             console.error('Failed to fetch messages:', error);
// //           });
// //       }, 3000);

// //       return () => clearInterval(intervalId);
// //     }
// //   }, [selectedUser]);

// //   const handleSendMessage = useCallback((message: string) => {
// //     if (selectedUser) {
// //       const newMessage: ChatMessage = {
// //         id: Date.now(),
// //         senderId: loggedInUserId,
// //         receiverId: selectedUser.id,
// //         content: message,
// //         timestamp: new Date().toISOString(),
// //       };

// //       setMessages(prevMessages => [...prevMessages, newMessage]);

// //       sendMessage(selectedUser.id, message).catch(error => {
// //         console.error('Failed to send message:', error);
// //       });
// //     }
// //   }, [selectedUser, loggedInUserId]);

// //   // Preload the message if one was passed
// //   useEffect(() => {
// //     if (preloadedMessage && selectedUser) {
// //       handleSendMessage(preloadedMessage);
// //     }
// //   }, [preloadedMessage, selectedUser, handleSendMessage]);

// //   return (
// //     <Container sx={{ marginTop: '160px' }}>
// //       <Box sx={{ display: 'flex' }}>
// //         {loading && (
// //           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
// //             <CircularProgress />
// //             <Typography variant="h6" sx={{ marginLeft: '16px' }}>Loading...</Typography>
// //           </Box>
// //         )}
// //         {error && (
// //           <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
// //         )}
// //         {!loading && !error && (
// //           <>
// //             <Sidebar 
// //               users={users.filter(user => user.id !== loggedInUserId)}
// //               onUserSelect={setSelectedUser}
// //             />
// //             <MessageList 
// //               user={selectedUser}
// //               messages={messages}
// //               onSendMessage={handleSendMessage}
// //             />
// //           </>
// //         )}
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default Message;


// import React, { useEffect, useState, useCallback } from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation to receive state from the redirect
// import { Box, Container, CircularProgress, Typography } from '@mui/material';
// import Sidebar from './SideBar/SideBar'; // User list and selection
// import MessageList from './Content/MessageContent'; // Chat content
// import { User, Message as ChatMessage } from '../../store/types';
// import { sendMessage, getMessagesFromSender, getUsersWhoMessaged } from '../../Service/messageService'; // API services

// const Message: React.FC = () => {
//   const location = useLocation(); // To get the passed state (userId, preloadedMessage, postId, itemId)
//   const { userId: preloadedUserId, preloadedMessage, postId, itemId } = location.state || {};

//   const [users, setUsers] = useState<User[]>([]); // List of users who messaged
//   const [selectedUser, setSelectedUser] = useState<User | null>(null); // Currently selected user
//   const [messages, setMessages] = useState<ChatMessage[]>([]); // Messages with the selected user
//   const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching users
//   const [error, setError] = useState<string | null>(null); // Error handling for fetching users/messages
//   const loggedInUserId = Number(sessionStorage.getItem('userId')); // Logged-in user's ID

//   // Fetch users who have messaged the logged-in user
//   useEffect(() => {
//     getUsersWhoMessaged()
//       .then(fetchedUsers => {
//         setUsers(fetchedUsers);
//         setLoading(false);

//         // If redirected with preloaded data, automatically select that user
//         if (preloadedUserId) {
//           const userToSelect = fetchedUsers.find(user => user.id === preloadedUserId);
//           if (userToSelect) {
//             setSelectedUser(userToSelect);
//           }
//         }
//       })
//       .catch(err => {
//         setError('Failed to fetch users');
//         setLoading(false);
//       });
//   }, [preloadedUserId]);

//   // Fetch messages from the selected user periodically (polling every 3 seconds)
//   useEffect(() => {
//     if (selectedUser) {
//       const intervalId = setInterval(() => {
//         getMessagesFromSender(selectedUser.id)
//           .then(fetchedMessages => {
//             setMessages(fetchedMessages);
//           })
//           .catch(error => {
//             console.error('Failed to fetch messages:', error);
//           });
//       }, 10000);

//       return () => clearInterval(intervalId); // Clean up the interval on unmount or when `selectedUser` changes
//     }
//   }, [selectedUser]);

//   // Handle user selection from the sidebar
//   const handleUserSelect = useCallback((user: User) => {
//     if (selectedUser?.id !== user.id) {
//       setSelectedUser(user);
//       setMessages([]); // Clear messages when switching users
//     }
//   }, [selectedUser]);

//   // Handle sending messages
//   const handleSendMessage = useCallback((message: string) => {
//     if (selectedUser) {
//       const newMessage: ChatMessage = {
//         id: Date.now(), // Unique ID for the message (optimistic UI)
//         senderId: loggedInUserId,
//         receiverId: selectedUser.id,
//         content: message,
//         timestamp: new Date().toISOString(),
//       };

//       // Optimistically update the messages state with the new message
//       setMessages(prevMessages => [...prevMessages, newMessage]);

//       // Send the message to the server with optional postId and itemId
//       sendMessage(selectedUser.id, message, postId, itemId)
//         .catch(error => {
//           console.error('Failed to send message:', error);
//         });
//     }
//   }, [selectedUser, loggedInUserId, postId, itemId]);

//   // Preload the message if one was passed
//   useEffect(() => {
//     if (preloadedMessage && selectedUser) {
//       handleSendMessage(preloadedMessage);
//     }
//   }, [preloadedMessage, selectedUser, handleSendMessage]);

//   // Define the `onUsersUpdate` function to update users
//   const handleUsersUpdate = (updatedUsers: User[]) => {
//     setUsers(updatedUsers);
//   };

//   return (
//     <Container sx={{ marginTop: '160px' }}>
//       <Box sx={{ display: 'flex' }}>
//         {loading && (
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
//             <CircularProgress />
//             <Typography variant="h6" sx={{ marginLeft: '16px' }}>Loading...</Typography>
//           </Box>
//         )}
//         {error && (
//           <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
//         )}
//         {!loading && !error && (
//           <>
//             <Sidebar 
//               users={users.filter(user => user.id !== loggedInUserId)} // Exclude the logged-in user from the sidebar
//               onUserSelect={handleUserSelect} // Handle user selection
//               onUsersUpdate={handleUsersUpdate} // Pass the `onUsersUpdate` function here
//             />
//             <MessageList 
//               user={selectedUser} // The currently selected user for chat
//               messages={messages} // The chat messages with the selected user
//               onSendMessage={handleSendMessage} // Handle sending a new message
//             />
//           </>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Message;



import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import Sidebar from './SideBar/SideBar';
import MessageList from './Content/MessageContent';
import { User, Message as ChatMessage } from '../../store/types';
import { sendMessage, getMessagesFromSender, getUsersWhoMessaged } from '../../Service/messageService';

const Message: React.FC = () => {
  const location = useLocation();
  const { userId: preloadedUserId, preloadedMessage, postId, itemId } = location.state || {};

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const loggedInUserId = Number(sessionStorage.getItem('userId'));
  const messageContainerRef = useRef<HTMLDivElement>(null); // Reference to the message container

  // Fetch users who have messaged the logged-in user
  useEffect(() => {
    getUsersWhoMessaged()
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
        setLoading(false);
        if (preloadedUserId) {
          const userToSelect = fetchedUsers.find(user => user.id === preloadedUserId);
          if (userToSelect) {
            setSelectedUser(userToSelect);
          }
        }
      })
      .catch(err => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, [preloadedUserId]);

  // Fetch messages from the selected user periodically (polling every 10 seconds)
  useEffect(() => {
    if (selectedUser) {
      const intervalId = setInterval(() => {
        getMessagesFromSender(selectedUser.id)
          .then(fetchedMessages => {
            setMessages(prevMessages => {
              const newMessageCount = fetchedMessages.length;
              const oldMessageCount = prevMessages.length;

              // Update messages state
              const updatedMessages = fetchedMessages;

              // Scroll down only if new messages were added
              if (newMessageCount > oldMessageCount) {
                const container = messageContainerRef.current;
                if (container) {
                  container.scrollTop = container.scrollHeight; // Scroll to bottom
                }
              }

              return updatedMessages; // Return updated messages
            });
          })
          .catch(error => {
            console.error('Failed to fetch messages:', error);
          });
      }, 5000); // Fetch every 10 seconds

      return () => clearInterval(intervalId);
    }
  }, [selectedUser]);

  // Handle user selection from the sidebar
  const handleUserSelect = useCallback((user: User) => {
    if (selectedUser?.id !== user.id) {
      setSelectedUser(user);
      setMessages([]); // Clear messages when switching users
    }
  }, [selectedUser]);


  const handleUsersUpdate = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
  };

  const handleSendMessage = useCallback((message: string) => {
    if (selectedUser) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        senderId: loggedInUserId,
        receiverId: selectedUser.id,
        content: message,
        timestamp: new Date().toISOString(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      sendMessage(selectedUser.id, message, postId, itemId)
        .catch(error => {
          console.error('Failed to send message:', error);
        });
    }
  }, [selectedUser, loggedInUserId, postId, itemId]);

  // Preload the message if one was passed
  useEffect(() => {
    if (preloadedMessage && selectedUser) {
      handleSendMessage(preloadedMessage);
    }
  }, [preloadedMessage, selectedUser, handleSendMessage]);

  return (
    <Container sx={{
      marginTop: {
        xs: '120px', 
        md: '120px',
      },
    }}>
      <Box sx={{ display: 'flex' }}>
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ marginLeft: '16px' }}>Loading...</Typography>
          </Box>
        )}
        {error && (
          <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
        )}
        {!loading && !error && (
          <>
              <Sidebar 
              users={users.filter(user => user.id !== loggedInUserId)} // Exclude the logged-in user from the sidebar
              onUserSelect={handleUserSelect} // Handle user selection
              onUsersUpdate={handleUsersUpdate} // Pass the `onUsersUpdate` function here
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                maxHeight: 'calc(100vh - 150px)',
     width:'100%',
     marginTop:-6
              }}
              ref={messageContainerRef} // Reference to scrollable container
            >
              <MessageList
                user={selectedUser}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Message;
