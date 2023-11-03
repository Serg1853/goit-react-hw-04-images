import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ photos, onClickImageItem }) => {
  return (
    <Gallery>
      {photos.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            id={id}
            tags={tags}
            smallUrl={webformatURL}
            onClickImageItem={onClickImageItem}
          />
        );
      })}
    </Gallery>
  );
};
