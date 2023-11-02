import { Component } from 'react';
import {
  ImageGalleryItemStyled,
  ImageGalleryImg,
} from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    selectedPhoto: null,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };


  render() {
    const {
      photo: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <ImageGalleryItemStyled onClick={this.toggleModal}>
          <ImageGalleryImg src={webformatURL} alt={tags} />
        </ImageGalleryItemStyled>
        {this.state.showModal && (
          <Modal
            selectedPhoto={this.state.selectedPhoto}
            largeImageURL={largeImageURL}
            alt={tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
