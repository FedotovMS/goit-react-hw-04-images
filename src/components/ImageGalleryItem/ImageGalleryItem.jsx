import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.imageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} alt={tags} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
