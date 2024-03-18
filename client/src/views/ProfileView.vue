<script setup>
import NavC from '../components/NavC.vue'
import Post from '../components/PostC.vue'
import Rating from '../components/RatingC.vue'

import { Modal } from 'bootstrap';
import { reactive, onMounted } from 'vue'
import { ref } from 'vue'


const state = reactive({
  modal_edit_profile: null,
})

onMounted(() => {
  state.modal_edit_profile = new Modal('#modal_edit_profile', {})
})

function openModal(type) {
  if (type == 'ep') state.modal_edit_profile.show()
}

function closeModal(type) {
  if (type == 'ep') state.modal_edit_profile.hide()
}

</script>

<template>
  <NavC @post="newPost" @rating="newRating" />
  <div class="profile">
    <div>
      <section class="profile-info">
        <img :src="user.picture" alt="avatar" width="200px" height="200px">
        <section>
          <h2>{{ user.name }}</h2>
          <h4>@{{ user.nickname }}</h4>
          <p>Bio: {{ bio }}</p>
        </section>
      </section>
      <section>
        <a>Followers</a>
        <a>Following</a>
      </section>
      <section>
        <!-- Open a modal for profile editing -->
        <button type="button" @click="openModal('ep')">Edit Profile</button>
        <button type="button" @click="shareLink">Share Profile</button>
      </section>
    </div>

    <div class="profile-view">
      <button type="button" class="ml-btn active" @click="showSection('ml')">Your Movie List</button>
      <button type="button" class="wl-btn" @click="showSection('wl')">Your Watchlist</button>
      <button type="button" class="pl-btn" @click="showSection('pl')">Your Posts</button>
    </div>

    <div class="movie-list" v-if="sections.ml">
      <table>
        <thead>
          <tr>
            <th id="movie">
              <span>Movie</span>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Average</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Plot</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Attraction</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Theme</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Acting</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Dialogue</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Cinemetography</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Editing</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Special Effects</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Soundtrack</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Directing</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Personal Score</span></div>
            </th>
            <th>
              <div class="rotated-th"><span class="rotated-th__label">Review</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <ol v-for="rating in userRatings" v-bind:key="rating.id">
            <li>
              <Rating :rating="rating" :picURL="user.picture" :name="user.name" :username="user.nickname" />
            </li>
          </ol>
          <p v-if="userRatings == ''">
            Looks like there are no ratings for this user..
          </p>
        </tbody>
      </table>
    </div>
    <div class="posts" v-if="sections.pl">
      <ul>
        <Post v-for="post in posts" v-bind:key="post.id" :content="post.content" :postId="post.id"
          :picURL="user.picture" :name="user.name" :username="user.nickname" :date="dateFormat(post.createdDate)">
        </Post>
      </ul>
    </div>
  </div>


  <!-- Edit Profile Modal -->
  <div class="modal fade" id="modal_edit_profile" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_demo_label">New Post</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal('ep')"></button>
        </div>
        <div class="modal-body">
          <textarea v-model="bio" class="bio" placeholder="Tell people a little about yourself."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal('ep')">Cancel</button>
          <button type="button" class="btn btn-primary" @click="closeModal('ep'); saveProfile()">Save</button>
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
      user: ref(this.$auth0.user),
      dbUser: ref(''),
      posts: ref([]),
      sections: ref({
        ml: true,
        wl: false,
        pl: false
      }),
      bio: ref(''),
      userRatings: ref('')
    }
  },
  async beforeMount() {
    // use this to check if a user is already logged in
    if (!this.auth) {
      // user is not authenticated && redirect
      this.$router.push('/')
    } else {
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

      this.dbUser = user
      this.bio = user.bio

      this.getRatings(user.id)
      this.getPosts(user.id)
    }
  },
  methods: {
    authCheck() {
      console.log('user: ', this.user)
    },
    showSection(sec) {
      const mlBtn = document.querySelector('.ml-btn')
      const wlBtn = document.querySelector('.wl-btn')
      const plBtn = document.querySelector('.pl-btn')
      switch (sec) {
        case 'ml':
          this.sections.ml = true
          this.sections.wl = false
          this.sections.pl = false
          mlBtn.classList.add('active')
          wlBtn.classList.remove('active')
          plBtn.classList.remove('active')
          break
        case 'wl':
          this.sections.ml = false
          this.sections.wl = true
          this.sections.pl = false
          mlBtn.classList.remove('active')
          wlBtn.classList.add('active')
          plBtn.classList.remove('active')
          break
        case 'pl':
          this.sections.ml = false
          this.sections.wl = false
          this.sections.pl = true
          mlBtn.classList.remove('active')
          wlBtn.classList.remove('active')
          plBtn.classList.add('active')
          break
      }
    },
    async getRatings(userId) {
      await fetch(`http://localhost:8080/api/rating/user?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          this.userRatings = result.result;
        });
      console.log('this.userRatings: ', this.userRatings)
    },
    newRating() {
      this.getRatings(this.dbUser.id)
    },
    async getPosts(userId) {
      await fetch(`http://localhost:8080/api/post/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())

        .then((result) => {
          this.posts = result.result.reverse()
        })

      console.log('this.posts: ', this.posts)
    },
    newPost() {
      this.getPosts(this.dbUser.id)
    },
    saveProfile() {
      const userId = this.dbUser.id
      const bio = this.bio

      fetch(`http://localhost:8080/api/user/${userId}?bio=${bio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => res.json())
        .then((result) => {
          console.log(result)
        })
    },
    shareLink() {
      console.log('shareLink')
    },
    dateFormat(date) {
      return date
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

thead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid white;
  width: 100%;
}

thead th {
  padding: 0.25rem 2.5rem 0.25rem 0;
  text-align: right;
}

thead tr {
  margin-left: 2rem;
}

tbody td {
  border: 1px solid #cccccc;
  padding: 8px 15px 8px 15px;
  text-align: center;
}

.rotated-th {
  height: 110px;
  position: relative;
}

.rotated-th__label {
  bottom: 5px;
  left: 50%;
  position: absolute;
  transform: rotate(-45deg);
  transform-origin: center left;
  white-space: nowrap;
  border-bottom: solid 1px white;
  padding: 0 1rem 0 0;
}

#movie {
  vertical-align: bottom;
}

#movie span {
  margin-left: 1rem;
  margin-right: 4rem;

}


.profile-info {
  display: flex;
  flex-direction: row;
  padding: 1rem;
}

.profile-info section {
  padding: 0.5rem;
}

.profile-info h2 {
  padding-bottom: 0.1rem;
  margin: 0;
}

.profile-info h4 {
  color: rgb(194, 194, 194);
}

.profile-view {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.profile-view button {
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid var(--tml-orange);
  color: var(--tml-orange);
  padding: 0.5rem;
  width: 100%;
}

.active {
  font-family: 'Caveat';
  font-size: 1.5rem;
}

.posts ul {
  padding: 0;
}

.posts li {
  list-style-type: none;
  border: solid 1px white;
  padding: 0.5rem;
}

#delBtnPost {
  float: right;
}
</style>
