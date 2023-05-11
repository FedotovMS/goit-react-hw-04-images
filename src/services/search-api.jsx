function fetchImages(searchQuery, page = 1) {
  const API_KEY = '34617221-40fb3a679d52688cd42ce20c8';
  return fetch(
    `https://pixabay.com/api/?q=cat&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&q=${searchQuery}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No images according to ${searchQuery} request`)
    );
  });
}

export default fetchImages;
