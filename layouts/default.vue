<template class="all">
  <div class="container-fluid">
    <div class="pos-f-t">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <router-link class="navbar-brand text-info" to="/">MEGAMOVIE</router-link>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-info" to="/favoritesList">Избранное</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" @submit.prevent="onSearchMovie">
            <b-form-input v-model="text" placeholder="Movie title"></b-form-input>
            <b-button variant="outline-info" class="btn my-2 my-sm-0 ml-1" type="submit" @click="onSearchMovie">Search
            </b-button>
          </form>
        </div>
      </nav>
    </div>
    <nuxt />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // data проксируется, потому можно обращаться к содержимому через this, напрямую
  data() {
    return {
      text: ''
    };
  },
  methods: {
    ...mapActions('movies-list', ['fetchMovies', 'searchMovies']),
    // обрабатчик поиска !!!!!!!!
    async onSearchMovie() {
      await this.searchMovies({ query: this.text })
    }
  }
};
</script>

<style>
  @media (min-width: 576px) {

  }
</style>
