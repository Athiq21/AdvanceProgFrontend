import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getChatGPTResponse = async (message: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4', // Or use 'gpt-3.5-turbo' based on your usage
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content; // Return the response text
  } catch (error) {
    console.error('Error fetching ChatGPT response:', error);
    throw error;
  }
};
