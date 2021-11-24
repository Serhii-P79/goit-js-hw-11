const axios = require('axios').default;

export async function getPhoto({ searchPhrase, page, per_page, key, safesearch }) {
  try {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${key}&q=${searchPhrase}&image_type=photo&orientation=horizontal&safesearch=${safesearch}&page=${page}&per_page=${per_page}`,
    );
    return data;
  } catch (error) {
    return error;
  }
}
