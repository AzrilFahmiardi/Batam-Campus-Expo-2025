import React, { useState } from "react";

const images = [
  { id: 1, src: "https://picsum.photos/id/1018/600/400", alt: "Image 1" },
  { id: 2, src: "https://picsum.photos/id/1015/600/400", alt: "Image 2" },
  { id: 3, src: "https://picsum.photos/id/1019/600/400", alt: "Image 3" },
  { id: 4, src: "https://picsum.photos/id/1016/600/400", alt: "Image 4" },
  { id: 5, src: "https://picsum.photos/id/1020/600/400", alt: "Image 5" },
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="w-80 rounded-lg bg-white p-3 shadow-lg">
      <div className="mb-3">
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="h-auto w-full rounded-lg"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images
          .filter((img) => img.id !== selectedImage.id)
          .map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-square object-cover"
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
