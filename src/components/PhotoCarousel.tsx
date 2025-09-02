import React from "react";

import "./PhotoCarousel.css";

interface Photo {
  src: string;
  alt?: string;
}

interface PhotoCarouselProps {
  images: Photo[];
  showModalOnClick?: boolean;
  rounded?: boolean;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  images,
  showModalOnClick = true,
  rounded = false,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [clickedOnImage, setClickedOnImage] = React.useState<Photo | null>(
    null,
  );

  const openModal = () => {
    if (showModalOnClick) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="photo-carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt || `Photo ${index + 1}`}
            className={`carousel-image ${rounded ? "rounded" : ""}`}
            onClick={() => {
              openModal();
              setClickedOnImage(image);
            }}
          />
        ))}
      </div>

      {isModalOpen && (
        <div
          className="modal"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === "Escape" && isModalOpen) {
              closeModal();
            }
          }}
        >
          <span className="close" onClick={closeModal}>
            ×
          </span>
          <img
            className="modal-content"
            src={clickedOnImage?.src}
            alt={clickedOnImage?.alt || "Enlarged Photo"}
          />
          {clickedOnImage?.alt && (
            <div className="caption">{clickedOnImage.alt}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;
