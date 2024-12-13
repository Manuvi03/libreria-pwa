import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY; // Clave de la API de Google Books
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const getBooks = async (title, genre) => {
  try {
    let url = `${BASE_URL}?q=${encodeURIComponent(title)}`;

    if (genre) {
      url += `+subject:${encodeURIComponent(genre)}`;
    }

    // Añado un console.log para mostrar la URL
    console.log('URL:', url);

    const response = await axios.get(url, {
      params: {
        key: API_KEY,
        maxResults: 20,
      },
    });
    
      if (!response.data.items || !Array.isArray(response.data.items)) {
        console.warn('No se encontraron resultados o la respuesta no es un array:', response.data);
        return []; 
      }

    return response.data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Desconocido',
      pageCount: item.volumeInfo.pageCount || 'Desconocido',
      imageUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      link: item.volumeInfo.infoLink, 
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};