<script setup>
import { ref } from 'vue'

const controller = new AbortController()
// eslint-disable-next-line no-unused-vars
const signal = controller.signal

defineEmits(['select', 'deselect'])

</script>

<template>
  <div>
    <!-- Search Bar Section -->
    <label for="movieSearch">Movie:
      <input id="search" type="text" name="movieSearch" placeholder="Search for a movie" v-model="searchTerm"
        @keyup="startSearch(controller)" v-if="!selected" />
      <div v-if="selected" id="selection">
        <p>{{ searchTerm }}</p>
        <p id="deselect" @click="deselect">X</p>
      </div>
    </label>
    <!-- results -->
    <div class="results">
      <ul>
        <li v-for="movie in filteredResults" :key="movie.id" @click="select($event, movie.id)">
          <h3 class="movieTitle">{{ movie.title }} ({{ movie.year }})</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchResults: [],
      filteredResults: [],
      searchTerm: '',
      selected: ref(false),
      movieId: ''
    }
  },
  methods: {
    async startSearch(controller) {
      controller.abort(); // cancel any pending fetch request before calling another
      await this.search()
    },
    async search() {
      if (this.searchTerm.length > 2) {

        const options = {
          method: 'GET',
          url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${this.searchTerm}`,
          params: {
            exact: 'false',
            info: 'base_info',
            titleType: 'movie',
            limit: '20',
          },
          headers: {
            'X-RapidAPI-Key': '6bee0ab6damshafb3993a5daf034p1d5334jsn3f5f2b13db0d',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        };

        try {
          const response = await axios.request(options);
          this.searchResults = response.data.results

          for (let res of this.searchResults) {
            if (res.releaseYear == undefined) {
              this.searchResults.splice(this.searchResults.indexOf(res), 1)
            }
          }

          this.filteredResults = this.searchResults.map((movie) => ({
            id: movie.id,
            title: movie.titleText.text,
            year: movie.releaseYear.year,
          }))


        } catch (error) {
          console.error(error);
        }
      }
    },
    select(e, movieId) {
      this.movieId = movieId
      this.searchTerm = this.filteredResults.filter((movie) => movie.id == movieId)[0].title
      this.filteredResults = []
      this.selected = true
      this.$emit('select', this.movieId)
    },
    deselect() {
      this.searchTerm = ''
      this.filteredResults = []
      this.selected = false
      this.$emit('deselect')
    }
  }
}
</script>

<style>
.movieTitle {
  cursor: pointer;
}

div label,
#search {
  width: 100%;
}

#selection {
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
  padding: 1px;
  display: flex;
  justify-content: space-between;
}

#selection p {
  margin: 0;
}

#deselect {
  padding: 0 0.5rem;
  cursor: pointer;
}
</style>