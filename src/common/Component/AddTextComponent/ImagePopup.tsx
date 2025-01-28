import React, { useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton, Snackbar, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CropIcon from '@mui/icons-material/Crop';
import FilterIcon from '@mui/icons-material/Filter';
import CancelButtons from '../Button/Cancel/CancelButtons';
import AddButtons from '../Button/Add/AddButtons';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utils/getCroppedImg';

interface ImagePopupProps {
  open: boolean;
  onClose: () => void;
  onImagesSelected: (images: File[]) => void;
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ open, onClose, onImagesSelected }) => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [originalFiles, setOriginalFiles] = useState<(File & { preview: string })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cropping, setCropping] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 4) {
      setError('You can only upload up to 4 images.');
      return;
    }

    const validFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    const imageUrl = validFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setFiles(prevFiles => [...prevFiles, ...imageUrl]);
    setOriginalFiles(prevFiles => [...prevFiles, ...imageUrl]);
    setError(null);
  }, [files.length]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: true });

  const handleSave = () => {
    onImagesSelected(files);
    onClose();
  };

  const handleDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setOriginalFiles(originalFiles.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFiles([]);
    setOriginalFiles([]);
    setError(null);
    onClose();
  };

  const showCropper = (file: File & { preview: string }, index: number) => {
    setCurrentImage(file.preview);
    setCurrentIndex(index);
    setCropping(true);
  };

  const applyCrop = async () => {
    if (!currentImage || !croppedAreaPixels || currentIndex === null) return;
    const croppedImage = await getCroppedImg(currentImage, croppedAreaPixels);
    const croppedFile = new File([croppedImage as Blob], files[currentIndex].name, { type: 'image/jpeg' });
    const newFiles = files.map((file, index) => {
      if (index === currentIndex) {
        return Object.assign(croppedFile, { preview: URL.createObjectURL(croppedFile) });
      }
      return file;
    });
    setFiles(newFiles);
    setCropping(false);
    setCurrentImage(null);
    setCurrentIndex(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const applyFilter = (index: number) => {
    // Implement your Fabric.js filter functionality here.
    console.log('Apply Fabric.js filter to image at index:', index);
  };

  const handleReCrop = (index: number) => {
    const originalImage = originalFiles[index];
    setCurrentImage(originalImage.preview);
    setCurrentIndex(index);
    setCropping(true);
  };

  const handleReset = (index: number) => {
    const originalImage = originalFiles[index];
    const newFiles = files.map((file, idx) => {
      if (idx === index) {
        return originalImage;
      }
      return file;
    });
    setFiles(newFiles);
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth>
      <DialogTitle>
        <Typography variant="h6">Upload Images</Typography>
      </DialogTitle>
      <DialogContent>
        <Box {...getRootProps()} sx={{ border: '2px dashed gray', p: 2, textAlign: 'center' }}>
          <input {...getInputProps()} />
          <Typography>Drag and drop some Images here, or click to select files</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={file.preview} alt={`preview-${index}`} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 8 }} />
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => showCropper(file, index)}>
                <CropIcon />
              </IconButton>
              <IconButton onClick={() => applyFilter(index)}>
                <FilterIcon />
              </IconButton>
              <Button onClick={() => handleReCrop(index)}>Re-crop</Button>
              <Button onClick={() => handleReset(index)}>Reset</Button>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <CancelButtons width="100px" height="30px" onClick={handleCancel}>
            Cancel
          </CancelButtons>
          <AddButtons width="100px" height="30px" onClick={handleSave} text={''}>
            Save
          </AddButtons>
        </Box>
      </DialogContent>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setError(null)}>
              <CloseIcon />
            </IconButton>
          }
        />
      )}
      {cropping && (
        <Dialog open={cropping} onClose={() => setCropping(false)} fullWidth>
          <DialogContent>
            <Box position="relative" width="100%" height="400px">
              <Cropper
                image={currentImage!}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels);
                }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={applyCrop}>
                Apply Crop
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setCropping(false)}>
                Cancel
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default ImagePopup;
