export default {
  state: {
    movies: {
      data: [],
      // ниже добавлен объект для хранения информации о пагинации
      addition: {
        totalItems: null,
        currentPage: 1
      }
    }
  },
  mutations: {
    setMovies(state, movies = []) {
      // обновляем state (структуру данных)(data - используется при наличии мета-информации, в данном случае номера страницы)
      state.movies.data = movies
    },
    setAddition(state, { totalItems, currentPage }) {
      state.movies.addition.totalItems = totalItems;
      state.movies.addition.currentPage = currentPage
    }
  },
  actions: {
    async fetchMovies({ commit }, { currentPage = 1 } = {}) {
      const response = await this.$axios.$get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          // параметры запроса уточняем в api
          params: {
            api_key: '8043e6f7959ee5cf64fbcccb6e213164',
            language: 'ru-RU',
            sort_by: 'popularity.desc',
            include_adult: true,
            include_video: false,
            page: currentPage
          }
        }
      )
      console.log(response)
      commit('setMovies', response.results)
      commit('setAddition', {
        totalItems: response.total_results,
        currentPage: response.page
      })
    },
    async searchMovies({ commit }, { currentPage = 1, query = '' } = {}) {
      const response = await this.$axios.$get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: '8043e6f7959ee5cf64fbcccb6e213164',
            language: 'ru-RU',
            query: query,
            page: currentPage,
            include_adult: false
          }
        }
      )
      // коммиты те же, что и в fetchMovies!
      commit('setMovies', response.results)
      commit('setAddition', {
        totalItems: response.total_results,
        currentPage: response.page
      })
    }
  },
  getters: {
    movies(state) {
      return state.movies.data
    },
    pagination(state) {
      return state.movies.addition
    }
  }
}
