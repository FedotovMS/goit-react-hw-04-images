import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import fetchImages from '../../services/search-api';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    loading: false,
    showModal: false,
    modalImage: '',
    page: 1,
    totalHits: null,
  };

  // static propTypes = {
  //   searchQuery: PropTypes.string.isRequired,
  // };
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true, images: [], page: 1, totalHits: null });

      fetchImages(this.props.searchQuery, 1)
        .then(({ hits, totalHits }) =>
          this.setState({ images: hits, totalHits, page: 2 })
        )
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  fetchMoreImages = () => {
    const { searchQuery } = this.props;
    const { page } = this.state;
    this.setState({ loading: true });

    fetchImages(searchQuery, page)
      .then(({ hits }) =>
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  toggleModal = imageUrl => {
    this.setState(({ showModal, modalImage }) => ({
      showModal: !showModal,
      modalImage: imageUrl || modalImage,
    }));
  };

  render() {
    const { images, loading, error, showModal, modalImage, totalHits } =
      this.state;
    const { searchQuery } = this.props;
    return (
      <div className={css.ImageGalleryContainer}>
        {loading && <Loader />}
        {error && <h2>{error.message}</h2>}
        {!loading && images.length === 0 && searchQuery.trim() !== '' && (
          <h2>No images found for "{searchQuery}"</h2>
        )}
        {images.length > 0 && (
          <>
            <ul className={css.ImageGallery}>
              {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  image={webformatURL}
                  bigImage={largeImageURL}
                  tags={tags}
                  onClick={this.toggleModal}
                />
              ))}
            </ul>
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={modalImage} />
        )}
        <div className={css.btnBox}>
          {totalHits > images.length && (
            <Button onClick={this.fetchMoreImages} />
          )}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
