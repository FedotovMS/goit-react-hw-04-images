import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, bigImage, tags, onClick }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={image}
        alt={tags}
        onClick={() => onClick(bigImage)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
