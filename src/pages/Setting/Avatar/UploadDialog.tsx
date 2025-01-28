import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import apiConfig from '../../../Authentication/api'; // Adjust the path as needed

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onImageChange: (newImage: string) => void;
  currentImage: string; // Added prop to show the current image
}

const UploadDialog: React.FC<UploadDialogProps> = ({ open, onClose, onImageChange, currentImage }) => {
  const [image, setImage] = useState<File | null>(null);
  const [filter, setFilter] = useState('none');
  const editorRef = useRef<AvatarEditor | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Effect to reset editor if currentImage changes
  useEffect(() => {
    if (currentImage) {
      setImage(null); // Reset file input when currentImage is updated
    }
  }, [currentImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      setError(null); // Clear any previous errors
    }
  };

  const handleSave = async () => {
    if (!image || !editorRef.current) return;

    setUploading(true);
    setError(null);

    try {
      // Get the edited image from the editor
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();

      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append('file', dataURLtoFile(dataUrl, 'profile-picture.png'));

      const response = await apiConfig.put('/users/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
      });

      if (response.status === 200) {
        onImageChange(response.data); // Assuming response.data contains the image URL
        onClose();
      } else {
        setError('Error uploading image. Please try again.');
      }
    } catch (error) {
      setError('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload and Edit Profile Picture</DialogTitle>
      <DialogContent>
        {currentImage && !image && (
          <div style={{ marginBottom: 16 }}>
            <img
              src={currentImage}
              alt="Current Profile"
              style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {image && (
          <div style={{ position: 'relative', marginTop: 16 }}>
            <AvatarEditor
              ref={editorRef}
              image={URL.createObjectURL(image)}
              width={250}
              height={250}
              border={50}
              borderRadius={125}
              color={[255, 255, 255, 0.6]}
              scale={1.2}
              rotate={0}
              style={{ filter }}
            />
          </div>
        )}
        {image && (
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 16 }}>
            <Button onClick={() => setFilter('sepia(100%)')}>Sepia</Button>
            <Button onClick={() => setFilter('grayscale(100%)')}>Grayscale</Button>
            <Button onClick={() => setFilter('invert(100%)')}>Invert</Button>
            <Button onClick={() => setFilter('none')}>None</Button>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;
