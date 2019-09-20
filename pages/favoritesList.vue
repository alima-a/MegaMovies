<template>
  <div class="d-flex flex-column justify-content-center">
    <div class="d-inline-flex p-2 bd-highlight justify-content-center mt-5 pt-3"><h1 class="display-4">Favorite Movies</h1></div>
    <div class="card-container">
      <div v-for="movie in movies" :key="movie.id" class="card mx-2 my-1 border-dark movie-card" style="max-width: 500px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <nuxt-link :to="{name: 'movie-details', params: {index: movie.id}}">
              <!-- Обратить внимание на ковычки, они важны для интерполяции
              еще тут мы добавляем ":" (bind) к src, чтобы он читался как нативный js-->
              <img  :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" class="card-img" alt="...">
            </nuxt-link>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <nuxt-link :to="{name: 'movie-details', params: {index: movie.id}}">
                <h5 class="card-title text-info">{{ movie.title }} <b-badge v-if="isMovieInFavorites(movie.id)" variant="danger">В избранном</b-badge></h5>
              </nuxt-link>
              <p class="card-text"> {{ movie.overview | minify }}</p>
              <p class="card-text">
                <small class="text-muted"> Год выхода: {{ movie.release_date | date }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import favoriteMovies from '../utils/favoriteMovies';
export default {
  layout: 'default',
  components: {},
  data() {
    return {
      movies: []
    }
  },
  methods: {
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
      if (!value) return '';
      value = value.toString();
      if(value.length < 100) {
        return value.slice(0, 99)
      } else {
        return value.slice(0, 99) + "..."
      }
    },
    date: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.slice(0, 4)
    }
  },
  mounted() {
   this.movies = favoriteMovies.getFavourites();
  }
}
</script>
<style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .movie-card {
      min-width: 499px;
    }
  }
</style>

