export interface IPictureProps {
    alt: string;
    src: string;
    width?: number; 
    height?: number;
    className?: string;
    type?: 'circled' | 'full';
    style?: React.CSSProperties;
    quality?: number;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    loading?: 'lazy' | 'eager';
    onError?: () => void;
}
