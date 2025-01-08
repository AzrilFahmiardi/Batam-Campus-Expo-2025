import React, { useState, useEffect } from "react";

const ImageGallery = ({ universities }) => {
  const images = [
    {
      id: 1,
      src: `/CardImage/${universities.kode_univ}_1.webp`,
      alt: "Image 1",
    },
    {
      id: 2,
      src: `/CardImage/${universities.kode_univ}_2.webp`,
      alt: "Image 2",
    },
    {
      id: 3,
      src: `/CardImage/${universities.kode_univ}_3.webp`,
      alt: "Image 3",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [universities.kode_univ]);

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="w-80 rounded-lg bg-white p-3 shadow-lg">
      <div className="mb-3 flex h-56 items-center justify-center">
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedImage.id === image.id ? "ring-2 ring-blue-500" : ""} `}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-16 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
