import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto, onFetchError } from './service/api';
import { Searchbar } from './Searchbar/Searchbar';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';


export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};
const perPage = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    photos: [],
    page: 1,
    loading: false,
    btnLoadMore: false,
    showModal: false,
    selectedPhoto:null,
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchQuery;
    const prevPage = prevState.page;
    const newSearch = this.state.searchQuery;
    const newPage = this.state.page;

   
    if (prevSearch !== newSearch || prevPage !== newPage) {
    this.setState({ page: 1, photos: [], btnLoadMore: false });
    this.addPhotoPage(newSearch, newPage);
  }
  }

  addPhotoPage = (searchQuery, page) => {
    this.setState({ loading: true });

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

        this.setState(prevState => ({
          photos: [...prevState.photos, ...arrPhotos],
        }));

        if (totalPage > page) {
          this.setState({ btnLoadMore: true });
        } else {
          Notify.info(
            "We're sorry, but you've reached the end of search results.",
            paramsForNotify
          );
          this.setState({ btnLoadMore: false });
        }
      })
      .catch(onFetchError)
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onClickRender = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
   
  };
 
  render() {
    const { loading, photos, btnLoadMore } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        <AppStyle>
          <ImageGallery photos={photos} />
        </AppStyle>
        {photos.length !== 0 && btnLoadMore && (
          <Button onClickRender={this.onClickRender} />
        )}
      </div>
    );
  }
}
