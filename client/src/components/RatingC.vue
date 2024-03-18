<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps(['rating', 'picURL', 'name', 'username'])
</script>

<template>
  <!-- <section class="ratingHeader">
    <img src="https://lh3.googleusercontent.com/a/ACg8ocIFJTkb-LmMUiS3V9Cg3fZL9jkJ8SO2BEqDF30W0Zgetic=s96-c"
      alt="avatar" width="40px" height="40px">
    <span id="name">{{ name }}</span>
    <span id="username">@{{ username }}</span>
    <span id="date">{{ rating.date }}</span>
  </section> -->
  <section class="ratingBody">
    <td>{{ rating.movie_title }}</td>
    <td>{{ rating.average }}</td>
    <td>{{ rating.plot }}</td>
    <td>{{ rating.attraction }}</td>
    <td>{{ rating.theme }}</td>
    <td>{{ rating.acting }}</td>
    <td>{{ rating.dialogue }}</td>
    <td>{{ rating.cinemetography }}</td>
    <td>{{ rating.editing }}</td>
    <td>{{ rating.specialEffects }}</td>
    <td>{{ rating.soundtrack }}</td>
    <td>{{ rating.directing }}</td>
    <td>{{ rating.personalScore }}</td>
    <td>{{ rating.review }}</td>
  </section>
  <section class="ratingFooter">
    <button type="button" id="delBtnRating" @click="deleteRating($event, rating.id, rating.movieId)">
      <FontAwesomeIcon icon="fa-regular fa-trash-can" />
    </button>

    <button type="button" id="starBtn">
      <!-- <FontAwesomeIcon icon="fa-solid fa-star" id="starIcon" /> -->
      <FontAwesomeIcon icon="fa-regular fa-star" />
    </button>
    <button type="button" id="commentBtn">
      <FontAwesomeIcon icon="fa-regular fa-message" />
    </button>
  </section>
</template>

<script>
export default {
  methods: {
    deleteRating(e, ratingId, movieId) {
      // remove from UI 
      e.target.parentElement.remove()

      console.log('ratingId: ', ratingId)

      // do a fetch to remove from the DB
      fetch(`http://localhost:8080/api/rating/${ratingId}?movieId=${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
        .then((result) => {
          console.log(result)
        })
    },
  }
}
</script>

<style>
button {
  border: none;
  outline: none;
  background: none;
  color: white;
}

#name,
#username {
  font-size: 1.2rem;
}

#name {
  margin-left: 1rem;
}

#username,
#date {
  color: rgb(194, 194, 194);
  margin-left: 1rem;
}

.postBody {
  padding: 0.5rem 0;
}

#starIcon {
  color: var(--tml-orange)
}
</style>