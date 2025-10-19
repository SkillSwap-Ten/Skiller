'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { IPictureProps } from '@/src/shared/types/atoms/picture.type';

const StyledPicture = styled(Image)`
`;

const Picture: React.FC<IPictureProps> = ({ src, type, alt, width, style, className, height }) => {
  const [imgError, setImgError] = useState(false);
  let defaultUrl = '';

  if (type === 'circled') {
    defaultUrl = "/img/default-picture-circled.webp"
  } else { 
    defaultUrl = "/img/default-picture-full.webp" 
  };

  const handleError = () => {
    setImgError(true);
  };

  const isValidUrl = (url: string) => {
    return url && (url.startsWith('http') || url.startsWith('https'));
  };

  const imageUrl = isValidUrl(src) && !imgError
    ? src
    : defaultUrl;

  return (
    <StyledPicture
      className={className}
      style={style}
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};

export default Picture;
