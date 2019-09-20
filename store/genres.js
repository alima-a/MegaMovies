export default {
  state: {
    genres: {
      data: []
    }
  },
  mutations: {
    setGenres(state, genres = []) {
      // обновляем state (структуру данных)
      state.genres.data = genres
    }
  },
  actions: {
    async fetchGenres({ commit }) {
      const response = await this.$axios.$get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
            api_key: '8043e6f7959ee5cf64fbcccb6e213164',
            language: 'ru-RU'
          }
        }
      );
      commit('setGenres', response.genres)
    }
  },
  getters: {
    genres(state) {
      return state.genres.data
    },
    getGenresById: state => id => { //  как это работает => https://vuex.vuejs.org/ru/guide/getters.html#стиnь-обращения-как-к-методам
      return state.genres.data.find(function (genre) {
        return genre.id === id
     });
    }
  }
}
