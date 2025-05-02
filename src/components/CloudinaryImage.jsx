// components/CloudinaryImage.jsx
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  },
});

export function CloudinaryImage({ publicId, width = 500, height = 500, alt }) {
  const img = cld
    .image(publicId)
    .resize(fill().width(width).height(height))
    .format("auto")
    .quality("auto");

  return <AdvancedImage cldImg={img} alt={alt} plugins={[placeholder()]} />;
}
