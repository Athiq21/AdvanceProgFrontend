// import React, { useState, useEffect, useRef } from 'react';
// import { Box, TextField, Typography, CircularProgress, IconButton } from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import MicrosoftIcon from '@mui/icons-material/Microsoft';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import openAiConfig from '../../Authentication/openAiConfig';
// import AddButtons from '../../common/Component/Button/Add/AddButtons';
// import * as XLSX from 'xlsx';
// import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
// import { Document, Page, pdfjs } from 'react-pdf';
// import mammoth from 'mammoth'; 

// const ChatGPT: React.FC = () => {
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fileLoading, setFileLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [generatedImages, setGeneratedImages] = useState<string[]>([]);
//   const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const [isEmpty, setIsEmpty] = useState(true); 

//   useEffect(() => {
//     // If messages exist, set isEmpty to false
//     if (messages && messages.length > 0) {
//       setIsEmpty(false);
//     }
//   }, [messages]); // Check when messages change


//   useEffect(() => {
//     // Scroll to the bottom whenever messages change
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage = { role: 'user', content: inputMessage };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);
//     setError(null);
//     setInputMessage('');

//     try {
//       const response = await openAiConfig.post('chat/completions', {
//         model: 'gpt-3.5-turbo',
//         messages: [...messages, userMessage],
//       });

//       const botMessage = response.data.choices[0].message;
//       setMessages((prev) => [...prev, botMessage]);
//       if (botMessage.content.includes("Image URL: ")) {
//         const imageUrl = botMessage.content.split("Image URL: ")[1].trim();
//         setGeneratedImages((prev) => [...prev, imageUrl]);
//       }
//       if (femaleVoice) speak(botMessage.content);
//     } catch (err) {
//       console.error('Error while fetching the GPT response:', err);
//       setError('Failed to get a response. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const speak = (text: string) => {
//     const speech = new SpeechSynthesisUtterance(text);
//     if (femaleVoice) speech.voice = femaleVoice;
//     window.speechSynthesis.speak(speech);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       handleFileUpload(file);
//     }
//   };

//   const handleFileUpload = (file: File) => {
//     const fileType = file.name.split('.').pop()?.toLowerCase();
//     if (fileType === 'pdf') {
//       parsePdfFile(file);
//     } else if (fileType === 'xlsx' || fileType === 'xls') {
//       parseExcelFile(file);
//     } else if (fileType === 'doc' || fileType === 'docx') {
//       parseDocxFile(file);
//     } else {
//       setError('Unsupported file type. Please upload a PDF, DOCX, or Excel file.');
//     }
//   };

//   const parsePdfFile = async (file: File) => {
//     setFileLoading(true);
//     const reader = new FileReader();
//     reader.onload = async () => {
//       const typedArray = new Uint8Array(reader.result as ArrayBuffer);
//       try {
//         const loadingTask = getDocument({ data: typedArray });
//         const pdf = await loadingTask.promise;
//         let textContent = '';

//         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const text = await page.getTextContent();
//           textContent += text.items.map((item: any) => item.str).join(' ') + '\n\n';
//         }

//         setMessages((prev) => [
//           ...prev,
//           { role: 'assistant', content: `PDF Extracted Text:\n${textContent.slice(0)}...\n(See full document for details.)` },
//         ]);
//         await summarizePdfText(textContent);
//       } catch (err) {
//         console.error('Error extracting text from PDF:', err);
//         setError('Failed to extract text from the PDF. Please check the file.');
//       } finally {
//         setFileLoading(false);
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const summarizePdfText = async (text: string) => {
//     setLoading(true);
//     try {
//       const response = await openAiConfig.post('chat/completions', {
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: `Please summarize the following text:\n\n${text}` }],
//       });
//       const summary = response.data.choices[0].message.content;

//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', content: `PDF Summary:\n${summary}` },
//       ]);
//     } catch (err) {
//       console.error('Error summarizing PDF text:', err);
//       setError('Failed to summarize the PDF. Please try again.');
//     } finally {
//       setLoading(false);
//       setFileLoading(false);
//     }
//   };

//   const parseExcelFile = (file: File) => {
//     setFileLoading(true);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryStr = e.target?.result;
//       const workbook = XLSX.read(binaryStr, { type: 'binary' });
//       const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//       const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

//       const rows = sheetData.map((row: any) => row.join(' | ')).join('\n');

//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', content: `Give me a command to process the data below:\n\nExcel Summary:\n${rows}` },
//       ]);
//     };
//     reader.readAsBinaryString(file);
//     reader.onloadend = () => {
//       setFileLoading(false);
//     };
//   };

//   const parseDocxFile = (file: File) => {
//     setFileLoading(true);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const arrayBuffer = e.target?.result as ArrayBuffer;
//       mammoth.extractRawText({ arrayBuffer })
//         .then((result) => {
//           const docxContent = result.value; // The raw text
//           setMessages((prev) => [
//             ...prev,
//             { role: 'assistant', content: `DOCX Extracted Text:\n${docxContent.slice(0)}...\n(See full document for details.)` },
//           ]);
//         })
//         .catch((err) => {
//           console.error('Error extracting text from DOCX:', err);
//           setError('Failed to extract text from the DOCX file. Please check the file.');
//         })
//         .finally(() => {
//           setFileLoading(false);
//         });
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         height: '70vh',
//         width: '80%',
//         margin: 'auto',
//         padding: '20px',
//         marginTop: '150px',
//         backgroundColor: '#f5f5f5',
//         borderRadius: '10px',
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//   <Box variant="h7" gutterBottom align="center" sx={{ mt: '-45px' }}>
//   <Typography
//   variant="body3"
//   sx={{
//     fontSize: '4rem',
//     background: 'linear-gradient(45deg, #ff6601, #f9e294)', 
//     WebkitBackgroundClip: 'text', // Clip the gradient to the text
//     WebkitTextFillColor: 'transparent', // Make the text fill transparent to show the gradient
//   }}
// >
//   JXG
// </Typography>

//   <Typography variant="body1" sx={{ color: 'black', mb:'10px', mt:'-10px'}}>
//     your very own personal assistant!!
//   </Typography>
// </Box>


//       <Box
//         sx={{
//           flex: 1,
//           overflowY: 'auto',
//           border: '1px solid #ddd',
//           borderRadius: '10px',
//           backgroundColor: '#fff',
//           padding: '10px',
//           maxHeight: '400px',
//         }}
//       >
//         {isEmpty && (
//         <Typography
//           variant="body3"
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             fontSize: '1rem',
//             background: 'linear-gradient(45deg, #ff6601, #f9e294)', 
//             WebkitBackgroundClip: 'text', 
//             WebkitTextFillColor: 'transparent', 
//           }}
//         >
//          Don't be shy, say something
//         </Typography>
//       )}

//         {messages.map((message, index) => (
//           <Typography
//             key={index}
//             variant="body2"
//             sx={{
//               margin: '5px 0',
//               color: message.role === 'user' ? '#1976d2' : 'text.secondary',
//               whiteSpace: 'pre-line',
//             //   textAlign: message.role === 'user' ?'right':'left',
//               marginBottom: message.role === 'user' ?'20px':'0px',
//               marginTop: message.role === 'user' ?'20px':'0px',
//             }}
//           >
//             <strong>{message.role === 'user' ? 'You:' : 'JXG :'}</strong> {message.content}
            
//           </Typography>
//         ))}
//         {loading && (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <CircularProgress size={24} sx={{ marginRight: '10px' }} />
//             <Typography variant="body2">JXG is typing...</Typography>
//           </Box>
//         )}
//         {generatedImages.map((imageUrl, index) => (
//           <Box key={index} sx={{ margin: '10px 0' }}>
//             <img
//               src={imageUrl}
//               alt={`Generated ${index}`}
//               style={{ maxWidth: '100%', borderRadius: '8px' }}
//             />
//           </Box>
//         ))}
//         <div ref={messagesEndRef} /> {/* Reference for scrolling */}
//       </Box>

//       <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//         <TextField
//           variant="outlined"
//           placeholder="Type your message..."
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           sx={{ flex: 1 }}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               handleSendMessage();
//             }
//           }}
//         />
//         <AddButtons color="primary" onClick={handleSendMessage} sx={{ height: '40px', width: '80px', ml: '20px', mr:'10px'}}>
//           Send
//         </AddButtons>
//         <IconButton color="black" component="label" title="Upload an Excel Sheet">
//   <AnalyticsIcon />
//   <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} />
// </IconButton>

// <IconButton color="black" component="label" title="Upload a PDF">
//   <PictureAsPdfIcon />
//   <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
// </IconButton>

// <IconButton color="black" component="label" title="Upload a Word">
//   <MicrosoftIcon />
//   <input type="file" accept=".doc, .docx" hidden onChange={handleFileChange} />
// </IconButton>

//       </Box>

//       {error && (
//         <Typography color="error" variant="body2" align="center" sx={{ marginTop: '10px' }}>
//           {error}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default ChatGPT;












import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, CircularProgress, IconButton , Popover} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import openAiConfig from '../../Authentication/openAiConfig';
import AddButtons from '../../common/Component/Button/Add/AddButtons';
import * as XLSX from 'xlsx';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ChatGPT: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);


  useEffect(() => {
    if (messages && messages.length > 0) {
      setIsEmpty(false);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const userMessage = { role: 'user', content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    setInputMessage('');
  
    let generatedImage = false; // Flag to track if an image is generated
  
    try {
      // Check for specific keywords to trigger image generation
      if (inputMessage.toLowerCase().includes("generate image of") || 
          inputMessage.toLowerCase().includes("i want an image of") || 
          inputMessage.toLowerCase().includes("show me an image of") ||
          inputMessage.toLowerCase().includes("make me an image of") || 
          inputMessage.toLowerCase().includes("image of")) {
        
        await generateImage(inputMessage);  
        generatedImage = true;            
      } 
  
      if (!generatedImage) {
        // If no image was generated, proceed with text-based response
        const response = await openAiConfig.post('chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        });
  
        const botMessage = response.data.choices[0].message;
        setMessages((prev) => [...prev, botMessage]);
  
        if (femaleVoice) speak(botMessage.content);
      }
  
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get a response. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  
  const generateImage = async (prompt) => {
    try {
      const response = await openAiConfig.post('images/generations', {
        prompt,
        n: 1,
        size: "256x256",
      });
  
      const imageUrl = response.data.data[0].url;
      
      // Add image as a message in the same `messages` array
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: imageUrl, isImage: true },
      ]);
  
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
    }
  };
  
  

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    if (femaleVoice) speech.voice = femaleVoice;
    window.speechSynthesis.speak(speech);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType === 'pdf') {
      parsePdfFile(file);
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      parseExcelFile(file);
    } else if (fileType === 'doc' || fileType === 'docx') {
      parseDocxFile(file);
    } else {
      setError('Unsupported file type. Please upload a PDF, DOCX, or Excel file.');
    }
  };

  const parsePdfFile = async (file: File) => {
    setFileLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      try {
        const loadingTask = getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;
        let textContent = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const text = await page.getTextContent();
          textContent += text.items.map((item: any) => item.str).join(' ') + '\n\n';
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `PDF Extracted Text:\n${textContent.slice(0)}...\n(See full document for details.)` },
        ]);
        await summarizePdfText(textContent);
      } catch (err) {
        console.error('Error extracting text from PDF:', err);
        setError('Failed to extract text from the PDF. Please check the file.');
      } finally {
        setFileLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const summarizePdfText = async (text: string) => {
    setLoading(true);
    try {
      const response = await openAiConfig.post('chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Please summarize the following text:\n\n${text}` }],
      });
      const summary = response.data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `PDF Summary:\n${summary}` },
      ]);
    } catch (err) {
      console.error('Error summarizing PDF text:', err);
      setError('Failed to summarize the PDF. Please try again.');
    } finally {
      setLoading(false);
      setFileLoading(false);
    }
  };

  const parseExcelFile = (file: File) => {
    setFileLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
      // Prepare headers and data rows separately
      const headers = sheetData[0];  // Assuming the first row is the header
      const rows = sheetData.slice(1);  // Get the rest of the rows
  
      // Create the table format as requested
      let formattedData = `| ${headers.join(' | ')} |\n`; // Headers in table format
      formattedData += `| ${headers.map(() => '---').join(' | ')} |\n`; // Divider
      rows.forEach(row => {
        formattedData += `| ${row.join(' | ')} |\n`; // Data rows in table format
      });
  
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `**Excel Summary:**\n${formattedData}What would you like me to do with this data?`,
        },
      ]);
    };
    reader.readAsBinaryString(file);
    reader.onloadend = () => {
      setFileLoading(false);
    };
  };
  
  

  const parseDocxFile = (file: File) => {
    setFileLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      mammoth.extractRawText({ arrayBuffer })
        .then((result) => {
          const docxContent = result.value;
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: `DOCX Extracted Text:\n${docxContent.slice(0)}...\n(See full document for details.)` },
          ]);
        })
        .catch((err) => {
          console.error('Error extracting text from DOCX:', err);
          setError('Failed to extract text from the DOCX file. Please check the file.');
        })
        .finally(() => {
          setFileLoading(false);
        });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Box
      sx={{
        position: 'relative', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: { xs: '67vh', sm: '75vh' }, 
        width: '80%',
        margin: 'auto',
        padding: '20px',
        marginTop: { xs: '80px', sm: '130px' },  // Adjust top margin for mobile
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >

<IconButton
        sx={{
          position: 'absolute',
          top: 15,
          right: 20,
       
        }}
        onClick={handleClick}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

<Box sx={{ padding: 2, maxWidth: 300 }}>
          <Typography variant="body1" fontWeight="bold">
            Instructions
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            - Enter a message and await feedback from JXG<br /><br />
            - Upload files by clicking the icons next to the message box.<br /><br />
            - If you need an image, type phrases like "generate image of..."<br />
            "i want an image of..."<br />
            "show me an image of..."<br />
            "make me an image of..."<br />
          </Typography>
        </Box>
      </Popover>

      <Box variant="h7" gutterBottom align="center" sx={{ mt: '-45px' }}>
        <Typography
          variant="body3"
          sx={{
            fontSize: '4rem',
            background: 'linear-gradient(45deg, #ff6601, #f9e294)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          JXG
        </Typography>
          <Typography variant="body1" sx={{ color: 'black', mb:'10px', mt:'-10px'}}>
   your very own personal assistant!!
  </Typography>
      </Box>

      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ margin: '10px 0' ,
          display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',}}>
              {msg.isImage ? (
        <img src={msg.content} alt={`Generated ${index}`} style={{ maxWidth: '100%', borderRadius: '8px' }} />
      ) : (
            <Typography
              variant="body2"
              sx={{
                backgroundColor: msg.role === 'user' ? '#e9e9e9' : 'transparent', // Use 'transparent' for gradient background
                backgroundImage: msg.role === 'user' ? 'none' : 'linear-gradient(45deg, #ff9751, #f5db85)',
                color: msg.role === 'user' ? 'inherit' : 'black', 
                borderRadius: '10px',
                padding: '8px',
                textAlign: 'left',
                boxShadow: msg.role === 'user' ? '2px 2px 5px rgba(0, 0, 0, 0.15)' : 'none',
                fontFamily: 'Roboto, sans-serif',
                maxWidth: '80%',   
                wordWrap: 'break-word',   // Ensure long words wrap within the bubble
                overflowWrap: 'break-word', 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' 
              }}
            > <strong>{msg.role === 'user' ? 'You:' : 'JXG:'}</strong>
              {msg.content && (
            <pre
              style={{
                fontFamily: 'Roboto, sans-serif',
                 whiteSpace: 'pre-wrap', 
                margin: 0  
              }}>
                              {msg.content}
            </pre>
              )}
            </Typography>
             )}
          </Box>
        ))}

        {generatedImages.map((imageUrl, index) => (
          <Box key={index} sx={{ margin: '10px 0' }}>
            <img
              src={imageUrl}
              alt={`Generated ${index}`}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </Box>
        ))}

        {loading && (
          <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
        )}
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        
      <TextField
          variant="outlined"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{ flex: 1 }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        {/* <AddButtons handleFileChange={handleFileChange} /> */}
        <AddButtons color="primary" onClick={handleSendMessage} sx={{ height: '40px', width: '80px', ml: '20px', mr:'10px'}}>
         Send
        </AddButtons>
        <IconButton color="black" component="label" title="Upload an Excel Sheet">
  <AnalyticsIcon />
  <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileChange} />
 </IconButton>

{/* <IconButton color="black" component="label" title="Upload a PDF">
  <PictureAsPdfIcon />
  <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
</IconButton> */}

 <IconButton color="black" component="label" title="Upload a Word">
  <MicrosoftIcon />
  <input type="file" accept=".doc, .docx" hidden onChange={handleFileChange} />
</IconButton>
      </Box>
    </Box>
  );
};

export default ChatGPT;
