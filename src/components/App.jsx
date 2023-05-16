import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';
import FetchImages from '../services/search-api';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    const getImages = async () => {
      setStatus('pending');

      try {
        const { images: fetchedImages, totalImages: fetchedTotalImages } =
          await FetchImages(searchQuery, page);

        if (fetchedImages.length === 0) {
          setNotification({
            type: 'error',
            message: 'Nothing found. Please, change your request.',
          });
        }
        if (fetchedImages.length !== 0 && page === 1) {
          setNotification({
            type: 'success',
            message: `We have found ${fetchedTotalImages} images on your request.`,
          });
        }

        if (
          fetchedTotalImages > 0 &&
          page !== 1 &&
          fetchedTotalImages <= images.length + 12
        ) {
          setNotification({
            type: 'info',
            message: 'There are no more images.',
          });
        }

        setImages(prevImages => [...prevImages, ...fetchedImages]);
        setStatus('resolved');
        setTotalImages(fetchedTotalImages);
      } catch (error) {
        console.log(error.message);
        setNotification({
          type: 'error',
          message: 'There are some problems! Try again later.',
        });
        setStatus('rejected');
      }
    };

    if (
      searchQuery !== '' &&
      (page === 1 || (page !== 1 && totalImages > images.length))
    ) {
      getImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  useEffect(() => {
    const handleNotification = () => {
      const { type, message } = notification;

      if (type === 'info') {
        toast.info(message);
        setNotification({ type: '', message: '' });
      }
      if (type === 'error') {
        toast.error(message);
        setNotification({ type: '', message: '' });
      }
      if (type === 'success') {
        toast.success(message);
        setNotification({ type: '', message: '' });
      }
    };
    if (notification.type !== '') {
      handleNotification();
    }
  }, [notification]);

  const formSubmitHandler = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      setNotification({
        type: 'info',
        message: 'Images on your request are already shown.',
      });
      return;
    }
    setSearchQuery(newSearchQuery);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <section className={css.App}>
      <Searchbar onSubmit={formSubmitHandler} />
      {status === 'pending' && <Loader />}
      {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
        <ImageGallery images={images} />
      )}
      {((totalImages !== images.length && status === 'resolved') ||
        (status === 'pending' && page > 1)) && <Button onClick={onLoadMore} />}
      <ToastContainer autoClose={3000} />
    </section>
  );
}
// comment
