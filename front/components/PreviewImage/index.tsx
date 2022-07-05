import Image from 'next/image';
import React, { useState } from 'react';

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onerror = () => {
    setPreview(reader.result);
  };

  return (
    <>
      {preview ? (
        <img src={preview} width="250px" height="250px" />
      ) : (
        'loading ...'
      )}
    </>
  );
};

export default PreviewImage;
