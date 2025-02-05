
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Avatar, TextField, Paper, Button } from '@mui/material';
import { User, ChatMessage } from '../../../store/types';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ItemCard from './ItemCard';
import AddButtons from '../../../common/Component/Button/Add/AddButtons';

const linkify = (text: string) => {
  const urlRegex = /((https?:\/\/[^\s]+))/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};

interface MessageListProps {
  user: User | null;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ user, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [postDetails, setPostDetails] = useState<Map<number, Post>>(new Map());
  const [itemDetails, setItemDetails] = useState<Map<number, any>>(new Map());
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const loggedInUserId = Number(sessionStorage.getItem('userId'));
  const [shouldScroll, setShouldScroll] = useState(true); // Track whether to scroll
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  useEffect(() => {
    const fetchPostDetails = async (postId: number) => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPostDetails((prev) => new Map(prev).set(postId, response.data));
      } catch (error) {
        console.error('Failed to fetch post details:', error);
      }
    };

    const fetchItemDetails = async (itemId: number) => {
      try {
        const response = await axios.get(`/api/items/${itemId}`);
        setItemDetails((prev) => new Map(prev).set(itemId, response.data));
      } catch (error) {
        console.error('Failed to fetch item details:', error);
      }
    };

    messages.forEach((message) => {
      if (message.postId && !postDetails.has(message.postId)) {
        fetchPostDetails(message.postId);
      }
      if (message.itemId && !itemDetails.has(message.itemId)) {
        fetchItemDetails(message.itemId);
      }
    });

    const container = messageContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
      if (shouldScroll || isAtBottom) {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, postDetails, itemDetails, shouldScroll]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const isSender = (senderId: number) => {
    return senderId === loggedInUserId;
  };

  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
      setShouldScroll(isAtBottom); // Update the scroll flag based on the scroll position
    }
  };

  return (
    <Box
    sx={{
      width: '100%', // Ensures it spans the full width of its parent or screen
      maxWidth: '100%', // Limits the width to 500px on larger screens
      borderRadius: '10px',
      boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%', // Ensures it takes up the full available height
      maxHeight: 'calc(100vh - 150px)', // Prevents overflow beyond the viewport
      boxSizing: 'border-box', // Ensures padding is included in the width/height
    }}
  >
      <Box
        ref={messageContainerRef}
        onScroll={handleScroll}
        sx={{
          padding: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {user ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar src={user.imageUrl} sx={{ mr: 2 }} />
              <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                maxHeight: 'calc(100% - 10px)',
              }}
            >
              {messages.length > 0 ? (
                messages
                  .slice()
                  .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                  .map((message, index) => {
                    const isMessageFromSender = isSender(message.senderId);
                    const timestamp = formatDate(message.timestamp);
                    const showSenderName =
                      !isMessageFromSender &&
                      (index === 0 || messages[index - 1].senderId !== message.senderId);
                    const senderName = isMessageFromSender ? 'You' : `${user.firstName} ${user.lastName}`;

                    const messageWithLinks = linkify(message.content);

                    return (
                      <Box
                        key={message.id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isMessageFromSender ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        {!isMessageFromSender && showSenderName && (
                          <Typography variant="caption" sx={{ mb: 0.5, color: 'gray' }}>
                            {senderName}
                          </Typography>
                        )}
                        <Paper
                          sx={{
                            padding: 1,
                            maxWidth: '60%',
                            borderRadius: 2,
                            bgcolor: isMessageFromSender ? '#e1f5fe' : '#f1f1f1',
                            boxShadow: 1,
                            alignSelf: isMessageFromSender ? 'flex-end' : 'flex-start',
                          }}
                        >
                          <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(messageWithLinks) }}
                          />
                         
                          {message.itemId && itemDetails.get(message.itemId) && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="subtitle1">Shared Item:</Typography>
                              <ItemCard id={message.itemId} />
                            </Box>
                          )}
                          <Typography variant="caption" sx={{ color: 'gray', textAlign: 'right' }}>
                            {timestamp}
                          </Typography>
                        </Paper>
                        {isMessageFromSender && (
                          <Typography variant="caption" sx={{ mt: 0.5, color: 'gray' }}>
                            {senderName}
                          </Typography>
                        )}
                      </Box>
                    );
                  })
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <Typography variant="body1">Say something...</Typography>
                </Box>
              )}
              <div ref={endOfMessagesRef} />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              flex: 1,
            }}
          >
            <Typography variant="body1">Select or search user to start a conversation</Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <AddButtons variant="contained" onClick={handleSendMessage} sx={{ ml: 1,height:50 }}>
          Send
        </AddButtons>
      </Box>
    </Box>
  );
};

export default MessageList;
