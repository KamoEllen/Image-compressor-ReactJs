import { compress } from "browser-image-compression";
import React, { useState } from "react";
import { compress } from "browser-image-compression";

function ImageCompressor() {
  // Use the useState hook to track the selected image and the compressed image
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  // Handle image selection
  const handleImageSelect = event => {
    // Get the selected image file
    const image = event.target.files[0];
    setSelectedImage(image);

    // Compress the image using the browser-image-compression library
    compress(image, {
      maxSizeMB: 0.25, // Set the maximum size to 0.25MB
      maxWidthOrHeight: 1920, // Set the maximum width or height to 1920px
      useWebWorker: true // Use web workers to perform the compression in a separate thread
    }).then(compressedImage => {
      setCompressedImage(compressedImage);
    });
  };

  return (
    <div>
      {/* Input to select the image */}
      <input type="file" accept="image/*" onChange={handleImageSelect} />

      {/* Display the selected and compressed images */}
      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />
        </div>
      )}
      {compressedImage && (
        <div>
          <h2>Compressed Image</h2>
          <img src={URL.createObjectURL(compressedImage)} alt="Compressed Image" />
        </div>
      )}
    </div>
  );
}
