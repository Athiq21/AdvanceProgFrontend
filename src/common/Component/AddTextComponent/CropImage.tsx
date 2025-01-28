import { Area } from 'react-easy-crop';

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(file => {
      if (file) {
        resolve(new File([file], 'cropped.jpg', { type: 'image/jpeg' }));
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/jpeg');
  });
};

export default getCroppedImg;
