import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';


export const ImageGallery = ({ photos }) => {
  return (
  <Gallery>
    {photos.map(photo => {
      return (
        <ImageGalleryItem
          key={photo.id}
          photo={photo}
       
        />
      );
    })}
  </Gallery>
);
  };

