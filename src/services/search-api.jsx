import axios from 'axios';

const API_KEY = '34617221-40fb3a679d52688cd42ce20c8';

const FetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    }
  );
  return { images, totalImages: response.data.totalHits };
};

export default FetchImages;

// function fetchImages(searchQuery, page = 1) {
//   const API_KEY = '34617221-40fb3a679d52688cd42ce20c8';
//   return fetch(
//     `https://pixabay.com/api/?q=cat&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&q=${searchQuery}`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(
//       new Error(`No images according to ${searchQuery} request`)
//     );
//   });
// }

// export default fetchImages;
