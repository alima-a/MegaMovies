export default {
  addToFavourites(movie) {
    // в переменную movies вкладываем значения ключа movies из Storage
    let movies = window.localStorage.getItem('movies');

    if (!movies) { // если в Storage по ключу movies ничего нет, присваеваем переменной movies - массив, содержащий в себе одно значение
      movies = [movie];
    } else {
      try { // если из storage данные получены, парсим их и добавляем новое значение в массив
        movies = JSON.parse(movies);

        movies.push(movie);
      } catch (e) {
        console.error('Ошибка парсинга массива', e);
      }
    }
    // обновляем значение по ключу movies в storage
    window.localStorage.setItem('movies', JSON.stringify(movies));
  },
  isFavourite(movieId) {
    let movies = window.localStorage.getItem('movies');

    if (movies) {
      movies = JSON.parse(movies);

      return Boolean(movies.find(movie => {
        return movieId === movie.id;
      }));
    }

    return false;
  },
  removeFromFavourite(movieId) {
    let movies = window.localStorage.getItem('movies');

    if (!movies) {
      return;
    } else {
      try {
        movies = JSON.parse(movies);

        movies = movies.filter(movie => { return movieId !== movie.id });
      } catch (e) {
        console.error('Ошибка парсинга массива', e);
      }
    }

    window.localStorage.setItem('movies', JSON.stringify(movies));
  },
  getFavourites() {
    let movies = window.localStorage.getItem('movies');

    return movies = JSON.parse(movies);
  },
};
