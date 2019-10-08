<template>
  <div class="d-flex flex-column justify-content-center">
    <div class="d-inline-flex p-2 bd-highlight justify-content-center mt-5 pt-3"><h1 class="display-4">Most Popular Movies</h1></div>
    <div class="card-container">
    <div v-for="movie in movies" :key="movie.id" class="card mx-2 my-1 border-dark movie-card" style="max-width: 500px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <nuxt-link :to="{name: 'movie-details', params: {index: movie.id}}">
            <!-- Обратить внимание на ковычки, они важны для интерполяции
            еще тут мы добавляем ":" (bind) к src, чтобы он читался как нативный js-->
              <img  :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="card-img" alt="...">
            </nuxt-link>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <nuxt-link :to="{name: 'movie-details', params: {index: movie.id}}">
                <h5 class="card-title text-info">{{ movie.title }} <b-badge v-if="isMovieInFavorites(movie.id)" variant="danger" class="badge">В избранном</b-badge></h5>
              </nuxt-link>
              <p class="card-text"> {{ movie.overview | minify }}</p>
              <p class="card-text">
                <!--<small class="text-muted">Жанры: <span v-for="genreID in movie.genre_ids" :key="genreID">{{ getGenresById(genreID) ? getGenresById(genreID).name : genreID }}</span> </small> --> <br>
                <small class="text-muted"> Год выхода: {{ movie.release_date | date }}</small>
              </p>
              <b-button v-if="isMovieInFavorites(movie.id)" variant="info" class="float-right mb-1  favorite-btn" @click="onDelFromFavorites(movie.id)">Удалить из избранного</b-button>
              <b-button v-else variant="info" class="float-right mb-1 favorite-btn" @click="onAddToFavorites(movie)">В избранное</b-button>
            </div>
          </div>
        </div>
    </div>
  </div>
    <div class="mt-3">
      <b-pagination :value="pagination.currentPage" @input="onChangePage" :total-rows="pagination.totalItems" align="center"></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import favoriteMovies from '../utils/favoriteMovies';
import textFilters from '../utils/textFilters';
export default {
  layout: 'default',
  components: {},
  computed: {
    // обратить внимание
    ...mapGetters('movies-list', ['movies', 'pagination']),
    ...mapGetters('genres', ['genres', 'getGenresById']),
    ...mapGetters('movie-details', ['movie']),
    genresFilter: function() {
    }
  },
  fetch: async function ({store, params}) { // пример https://nuxtjs.org/api/pages-fetch/
    await Promise.all([
      store.dispatch('movies-list/fetchMovies'),
      store.dispatch('genres/fetchGenres')
    ]);
  },
  methods: {
    // обратить внимание
    ...mapActions('movies-list', ['fetchMovies', 'searchMovies']),
    ...mapActions('genres', ['fetchGenres']),
    ...mapActions('movie-details', ['fetchMovie']),
    // пагинация, обработчик события
    onChangePage(page) {
      this.fetchMovies({ currentPage: page })
    },
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
<style>

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .favorite-btn {
    font-size: 12px;
  }
  .card-text {
    margin-bottom: 0;
  }
  .badge {
    font-size: 10px;
  }

  @media (min-width: 768px) {
  .movie-card {
    min-width: 499px;
   }
  }
</style>
