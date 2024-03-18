<script setup>

import LoginC from '../components/LoginC.vue'
import LogoutC from '../components/LogoutC.vue'
import MovieSearch from '../components/MovieSearch.vue'

import { Modal } from 'bootstrap';
import { ref, reactive, onMounted } from 'vue'

defineEmits(['post', 'rating'])

const state = reactive({
  modal_rating: null,
  modal_post: null,
})

onMounted(() => {
  state.modal_rating = new Modal('#modal_rating', {})
  state.modal_post = new Modal('#modal_post', {})
})

function openModal(type) {
  if (type == 'r') state.modal_rating.show()
  else if (type == 'p') state.modal_post.show()
}

function closeModal(type) {
  if (type == 'r') state.modal_rating.hide()
  else if (type == 'p') state.modal_post.hide()
}
</script>

<template>
  <div class="navWrapper">
    <RouterLink to="/"><img alt="Vue logo" class="logo" src="@/assets/TML_white_1.svg" width="125" height="125" />
    </RouterLink>
    <nav v-if="auth">
      <RouterLink class="orange" to="/">Home</RouterLink>
      <RouterLink class="orange" :to="`/profile/${$auth0.user._rawValue.nickname}`">Profile</RouterLink>
      <RouterLink class="orange" to="/browse">Browse</RouterLink>
      <RouterLink class="orange" to="/settings">Settings</RouterLink>

      <button type="button" class="orange newRating link" @click="openModal('r')">New Rating</button>

      <button type="button" class="orange newPost link" @click="openModal('p')">New Post</button>

    </nav>

    <nav v-if="!auth">
      <RouterLink class="orange" to="/">Home</RouterLink>
      <RouterLink class="orange" to="/browse">Browse</RouterLink>
    </nav>


    <footer>
      <section class="logInOut">
        <LoginC v-if="!auth" />
        <LogoutC v-if="auth" />
      </section>
      &copy; 2024 William Thackeray
    </footer>
  </div>


  <!-- Rating Modal -->
  <div class="modal fade" id="modal_rating" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">New Rating</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal('r'); cancelRating()"></button>
        </div>
        <div class="modal-body">
          <h3>Movie</h3>
          <MovieSearch @select="select($event)" @deselect="deselect" />
          <h3>Ratings</h3>
          <div class="ratings">
            <div>
              <div>
                <label for="acting">Acting</label>
                <input id="acting" name="acting" type="number" max="5" min="0" step=".1" v-model="ratings.acting">
              </div>
              <div>
                <label for="attraction">Attraction</label>
                <input id="attraction" name="attraction" type="number" max="5" min="0" step=".1"
                  v-model="ratings.attraction">
              </div>
              <div>
                <label for="cinemetography">Cinemetography</label>
                <input id="cinemetography" name="cinemetography" type="number" max="5" min="0" step=".1"
                  v-model="ratings.cinemetography">
              </div>
              <div>
                <label for="dialogue">Dialogue</label><input id="dialogue" name="dialogue" type="number" max="5" min="0"
                  step=".1" v-model="ratings.dialogue">
              </div>
              <div>
                <label for="directing">Directing</label><input id="directing" name="directing" type="number" max="5"
                  min="0" step=".1" v-model="ratings.directing">
              </div>
              <div id="psLabel">
                <label for="personalScore">Personal Score</label>
                <input id="personalScore" name="personalScore" type="number" max="5" min="0" step=".1"
                  v-model="personalScore">
              </div>
            </div>
            <div>
              <div>
                <label for="editing">Editing</label>
                <input id="editing" name="editing" type="number" max="5" min="0" step=".1" v-model="ratings.editing">
              </div>
              <div>
                <label for="plot">Plot</label>
                <input id="plot" name="plot" type="number" max="5" min="0" step=".1" v-model="ratings.plot">
              </div>
              <div>
                <label for="soundtrack">Soundtrack</label>
                <input id="soundtrack" name="soundtrack" type="number" max="5" min="0" step=".1"
                  v-model="ratings.soundtrack">
              </div>
              <div>
                <label for="specialEffects">Special Effects</label>
                <input id="specialEffects" name="specialEffects" type="number" max="5" min="0" step=".1"
                  v-model="ratings.specialEffects">
              </div>
              <div>
                <label for="theme">Theme</label>
                <input id="theme" name="theme" type="number" max="5" min="0" step=".1" v-model="ratings.theme">
              </div>
            </div>
          </div>

          <div>
            Helo
          </div>

          <div id="psLabel">
          </div>

          <h3>Your Review</h3>
          <textarea class="review" v-model="review" placeholder="Write your review..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal('r'); cancelRating()">Cancel</button>
          <button type="button" class="btn btn-primary" id="post-btn" @click="closeModal('r'); postRating()"
            disabled>Post</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Post Modal -->
  <div class="modal fade" id="modal_post" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">New Post</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal('p')"></button>
        </div>
        <div class="modal-body">
          <textarea v-model="postContent" class="postContent" placeholder="What's on your mind..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal('p'); cancelPost()">Cancel</button>
          <button type="button" class="btn btn-primary" @click="closeModal('p'); postPost()">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: ref(this.$auth0.isAuthenticated),
      postContent: ref(''),
      ratings: {
        acting: ref(0),
        attraction: ref(0),
        cinemetography: ref(0),
        dialogue: ref(0),
        directing: ref(0),
        editing: ref(0),
        plot: ref(0),
        soundtrack: ref(0),
        specialEffects: ref(0),
        theme: ref(0),
      },
      personalScore: ref(0),
      review: '',
      movieId: ''
    }
  },
  methods: {
    async postRating() {
      const username = this.$auth0.user._rawValue.nickname
      let average
      let total = 0;
      let ratingArr = []

      for (let rating in this.ratings) {
        if (this.ratings[rating] != 0) ratingArr.push(this.ratings[rating])
      }
      for (let rating of ratingArr) {
        total += rating
      }

      if (ratingArr.length == 0) average = 0
      else average = total / ratingArr.length
      console.log('average: ', average)

      let movieTitle = document.querySelector('#selection p').innerText

      console.log('Movie Title: ', movieTitle)

      let user
      await fetch(`http://localhost:8080/api/user/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
        .then((result) => {
          user = result.user
        })

      const body = {
        user: user.id,
        movie: movieTitle,
        movieId: this.movieId,
        ratings: {
          acting: this.ratings.acting,
          attraction: this.ratings.attraction,
          cinemetography: this.ratings.cinemetography,
          dialogue: this.ratings.dialogue,
          directing: this.ratings.directing,
          editing: this.ratings.editing,
          plot: this.ratings.plot,
          soundtrack: this.ratings.soundtrack,
          specialEffects: this.ratings.specialEffects,
          theme: this.ratings.theme,
        },
        personalScore: this.personalScore,
        review: this.review,
      }

      await fetch(`http://localhost:8080/api/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      this.$emit('rating')

    },
    cancelRating() {
      console.log('cancel rating')
      // set rating content inputs to ''
      this.acting = 0.0
      this.attraction = 0.0
      this.cinemetography = 0.0
      this.dialogue = 0.0
      this.directing = 0.0
      this.editing = 0.0
      this.plot = 0.0
      this.soundtrack = 0.0
      this.specialEffects = 0.0
      this.theme = 0.0
      this.personalScore = 0.0
      this.review = ''
    },
    async postPost() {
      console.log('post!')
      console.log('content: ', this.postContent)

      const username = this.$auth0.user._rawValue.nickname

      let user
      await fetch(`http://localhost:8080/api/user/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
        .then((result) => {
          user = result.user
        })

      console.log('user: ', user)

      const body = {
        user: user.id,
        post: this.postContent
      }

      // fetch:POST the post
      await fetch(`http://localhost:8080/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      this.$emit('post')
    },
    cancelPost() {
      console.log('cancel post')
      this.postContent = ''
    },
    select(id) {
      console.log('select')
      this.movieId = id
      console.log(document.querySelector('#post-btn'))
      document.querySelector('#post-btn').disabled = false
    },
    deselect() {
      console.log('deselect')
      document.querySelector('#post-btn').disabled = true
    }
  },
}

</script>


<style scoped>
.navWrapper {
  border: solid 3px var(--tml-orange);
  min-height: 100vh;
  position: fixed;
  padding: 3rem;
  width: 25%;
  font-size: 1.5rem;
  min-width: 200px;
  background-color: var(--tml-black);
}

.navWrapper,
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav>* {
  padding: 0.5rem 1rem;
}


nav>*:hover {
  background-color: #f5901542;
}

.link {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.router-link-active {
  font-family: 'Caveat';
  font-size: 2rem;
}

.newRating {
  margin: 0;
  margin-top: 2rem;
}

.newPost {
  margin: 0
}

p {
  cursor: pointer;
}

.posts {
  margin-top: 2rem;
}

.ratings {
  column-count: 2;
}

.ratings div {
  display: flex;
  flex-direction: column;
}

.ratings div div {
  display: block;
}

.ratings label {
  width: 75%
}

#psLabel {
  padding: 1rem 0;
}

.ratings input {
  /* margin: 0 1rem; */
  width: 25%;
}

/* .modal-footer {
  color: var(--tml-black)
} */



.postContent,
.review {
  width: 100%;
  height: 200px;
}

footer {
  position: fixed;
  width: 25%;
  min-width: inherit;
  left: 0;
  bottom: 0;
  padding: 1rem;
  font-size: 1rem;
  text-align: center;
  color: white;
}
</style>