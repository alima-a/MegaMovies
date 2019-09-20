export default {
  state: {
    movie: {},
    cast: {},
    crew: {},
    similarMovies: []
  },
  mutations: {
    setMovie(state, movie = {}) {
      state.movie = movie
    },
    setCast(state, cast = {}) {
      state.cast = cast
    },
    setCrew(state, crew = {}) {
      state.crew = crew
    },
    setSimilarMovies(state, similarMovies = []) {
      state.similarMovies = similarMovies
    }
  },
  actions: {
    //  movieId - это айдишник фильма(динамический), который мы будем получать при нажатии на карточку фильма в списке
    async fetchMovie({ commit }, { movieId }) {
      const response = await this.$axios.$get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          params: {
            api_key: '8043e6f7959ee5cf64fbcccb6e213164',
            language: 'ru-RU'
          }
        }
      )
      // eslint-disable-next-line no-console
      console.log(response)
      commit('setMovie', response)
    },
    async fetchCredits({ commit }, { movieId }) {
      const response = await this.$axios.$get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          params: {
            api_key: '8043e6f7959ee5cf64fbcccb6e213164',
            language: 'ru-RU'
          }
        }
      )
      // eslint-disable-next-line no-console
      console.log(response)
      commit('setCast', response.cast)
      commit('setCrew', response.crew)
    },
    async fetchSimilarMovies({ commit }, { movieId }){
      const response = await this.$axios.$get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar`,
        {
          params: {
            api_key: '8043e6f7959ee5cf64fbcccb6e213164',
            language: 'ru-RU'
          }
        }
      )
      // eslint-disable-next-line no-console
      console.log(response)
      commit('setSimilarMovies', response.results)
    }
  },
  getters: {
    movie(state) {
      return state.movie
    },
    cast(state) {
      return state.cast
    },
    crew(state) {
      return state.crew
    },
    similarMovies(state) {
      return state.similarMovies
    },
    getGenresById: state => id => { //  как это работает => https://vuex.vuejs.org/ru/guide/getters.html#стиnь-обращения-как-к-методам
      return state.genres.data.find(function (genre) {
        return genre.id === id
      });
    }
  }
}
