import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto, onFetchError } from './service/api';
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};
const perPage = 12;

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    addPhotoPage(searchQuery, page);
  }, [searchQuery, page]);

  const onSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = form.searchQuery.value
      .trim()
      .toLowerCase()
      .split(' ')
      .join('+');

    if (searchValue === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    }

    if (searchValue === searchQuery) {
      Notify.info('Enter new request, please!', paramsForNotify);
      return;
    }

    setSearchQuery(searchValue);
    setPage(1);
    setPhotos([]);
  };

  const addPhotoPage = (searchQuery, page) => {
    setLoading(true);

    fetchPhoto(searchQuery, page, perPage)
      .then(data => {
        const { totalHits } = data;
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalHits === 0) {
          return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.',
            paramsForNotify
          );
        }

        const arrPhotos = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        setPhotos(prevPhotos => [...prevPhotos, ...arrPhotos]);

        if (totalPage > page) {
          setBtnLoadMore(true);
        } else {
          Notify.info(
            "We're sorry, but you've reached the end of search results.",
            paramsForNotify
          );
          setBtnLoadMore(false);
        }
      })
      .catch(onFetchError)
      .finally(() => {
        setLoading(false);
      });
  };

  const onClickRender = () => {
    setPage(prevPage => prevPage + 1);
  };
  const onClickOpenModal = event => {
    const imageId = event.target.getAttribute('data-id');
    const selectedBigPhoto = photos.find(photo => photo.id === Number(imageId));
    setSelectedPhoto(selectedBigPhoto);

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {loading && <Loader />}
      <AppStyle>
        <ImageGallery photos={photos} onClickImageItem={onClickOpenModal} />
      </AppStyle>
      {photos.length !== 0 && btnLoadMore && (
        <Button onClickRender={onClickRender} />
      )}
      {showModal && (
        <Modal selectedPhoto={selectedPhoto} onClose={toggleModal} />
      )}
    </div>
  );
};
