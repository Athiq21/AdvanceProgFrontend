declare module 'react-avatar-editor' {
    import { Component } from 'react';
  
    interface AvatarEditorProps {
      width?: number;
      height?: number;
      border?: number;
      color?: [number, number, number, number];
      scale?: number;
      rotate?: number;
      image: string | File;
      position?: { x: number; y: number };
      onPositionChange?: (position: { x: number; y: number }) => void;
      onLoadFailure?: (event: any) => void;
      onLoadSuccess?: (imgInfo: any) => void;
      onImageReady?: (event: any) => void;
      onMouseUp?: (event: any) => void;
      onMouseMove?: (event: any) => void;
      onImageChange?: () => void;
      disableBoundaryChecks?: boolean;
      borderRadius?: number;
      className?: string;
      style?: React.CSSProperties;
    }
  
    export default class AvatarEditor extends Component<AvatarEditorProps> {
      getImage(): HTMLCanvasElement;
      getImageScaledToCanvas(): HTMLCanvasElement;
      getCroppingRect(): { x: number; y: number; width: number; height: number };
    }
  }
  