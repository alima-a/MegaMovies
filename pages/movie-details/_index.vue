<template>
  <div class="d-flex flex-column justify-content-center">
    <div class="d-inline-flex p-2 bd-highlight justify-content-center mt-5 pt-3"><h1 class="display-4">{{ movie.title }}</h1></div>

    <div class="d-flex flex-row flex-lg-wrap justify-content-center">
      <div class="card mx-2 my-1 border-dark movie-card" style="max-width: 1017px">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img  :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <table class="table table-bordered">
                <tbody>
                  <th scope="row">Рейтинг</th>
                  <td>{{ movie.vote_average }}</td>
                </tr>
                <tr>
                  <th scope="row">Жанр</th>
                  <td> <span> {{ genresFilter }} </span></td>
                </tr>
                <tr>
                  <th scope="row">Год выхода</th>
                  <td>{{ movie.release_date | date }}</td>
                </tr>
                <tr>
                  <th scope="row">Актеры</th>
                  <td>{{ castsFilter }}</td>
                </tr>
                <tr>
                  <th scope="row">Режжисеры</th>
                  <td>{{ crewFilter }}</td>
                </tr>
                </tbody>
              </table>
              <p class="card-text"> {{ movie.overview }}</p>
              <b-badge v-if="isMovieInFavorites(movie.id)" variant="danger">В избранном</b-badge>
              <b-button v-if="isMovieInFavorites(movie.id)" variant="info" class="float-right mb-3" @click="onDelFromFavorites(movie.id)">Удалить из избранного</b-button>
              <b-button v-else variant="info" class="float-right mb-3" @click="onAddToFavorites(movie)">В избранное</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-inline-flex p-2 bd-highlight justify-content-center"><h4>Похожие фильмы</h4></div>
    <div class="card-container">
      <div v-for="similarMovie in similarMovies" :key="similarMovie.id" class="card mx-2 my-1 border-dark movie-card" style="max-width: 500px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <nuxt-link :to="{name: 'movie-details', params: {index: similarMovie.id}}">
              <!-- Обратить внимание на ковычки, они важны для интерполяции
              еще тут мы добавляем ":" (bind) к src, чтобы он читался как нативный js-->
              <img  :src="`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`" class="card-img" alt="...">
            </nuxt-link>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <nuxt-link :to="{name: 'movie-details', params: {index: similarMovie.id}}">
                <h5 class="card-title text-info">{{ movie.title }} <b-badge v-if="isMovieInFavorites(similarMovie.id)" variant="danger" class="badge">В избранном</b-badge></h5>
              </nuxt-link>
              <p class="card-text"> {{ similarMovie.overview | minify }}</p>
              <p class="card-text">
                <!--<small class="text-muted">Жанры: <span v-for="genreID in movie.genre_ids" :key="genreID">{{ getGenresById(genreID) ? getGenresById(genreID).name : genreID }}</span> </small> --> <br>
                <small class="text-muted"> Год выхода: {{ similarMovie.release_date | date }}</small>
              </p>
              <b-button v-if="isMovieInFavorites(movie.id)" variant="info" class="float-right mb-1  favorite-btn" @click="onDelFromFavorites(similarMovie.id)">Удалить из избранного</b-button>
              <b-button v-else variant="info" class="float-right mb-1 favorite-btn" @click="onAddToFavorites(similarMovie)">В избранное</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import favoriteMovies from '../../utils/favoriteMovies';
  import textFilters from '../../utils/textFilters';
  export default {
    layout: 'default',
    name: "movie-details",
    components: {},
    computed: {
      // обратить внимание
      ...mapGetters('genres', ['genres', 'getGenresById']),
      ...mapGetters('movie-details', ['movie', 'cast', 'crew', 'similarMovies']),
      genresFilter: function() {
        return this.movie.genres.map(genre => { return genre.name }).join(', ')
      },
      castsFilter: function() {
        return this.cast.map(cast => { return cast.name }).slice(0, 4).join(', ')
      },
      crewFilter: function() {
        return this.crew.map(crew => { return crew.name }).slice(0, 4).join(', ')
      }
    },
    methods: {
      // обратить внимание
      ...mapActions('genres', ['fetchGenres']),
      ...mapActions('movie-details', ['fetchMovie', 'fetchCredits', 'fetchSimilarMovies']),
      onAddToFavorites(movie) {
        favoriteMovies.addToFavourites(movie);

        this.$forceUpdate(); // обновляем компонент
      },
      isMovieInFavorites(movieId) {
        return favoriteMovies.isFavourite(movieId);
      },
      onDelFromFavorites(movieId) {
        favoriteMovies.removeFromFavourite(movieId);

        this.$forceUpdate(); // обновляем компонент
      }
    },
    fetch: async function ({store, params}) { // пример https://nuxtjs.org/api/pages-fetch/
      //index - названия параметра в маршруте
      // console.log(params);
      await Promise.all([
        store.dispatch('movie-details/fetchCredits', {movieId: params.index}),
        store.dispatch('movie-details/fetchMovie', {movieId: params.index}),
        store.dispatch('movie-details/fetchSimilarMovies', {movieId: params.index}),
        store.dispatch('genres/fetchGenres')
    ])
  },
    filters: {
      minify: function (value) {
        return textFilters.minifyText(value)
      },
      date: function (value) {
        return textFilters.minifyDate(value)
      }
    },
  }
</script>

<style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
