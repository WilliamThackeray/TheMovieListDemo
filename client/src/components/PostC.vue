<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps(['content', 'postId', 'picURL', 'name', 'username', 'date'])
</script>

<template>
  <li>
    <section class="postHeader">
      <img src="https://lh3.googleusercontent.com/a/ACg8ocIFJTkb-LmMUiS3V9Cg3fZL9jkJ8SO2BEqDF30W0Zgetic=s96-c"
        alt="avatar" width="40px" height="40px">
      <span id="name">{{ name }}</span>
      <span id="username">@{{ username }}</span>
      <span id="date">{{ date }}</span>
    </section>
    <section class="postBody">
      {{ content }}
    </section>
    <section class="postFooter">
      <button type="button" id="delBtnPost" @click="deletePost($event, postId)">
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
  </li>
</template>

<script>
export default {
  methods: {
    deletePost(e, postId) {
      // remove from UI 
      e.target.parentElement.remove()

      // do a fetch to remove from the DB
      fetch(`http://localhost:8080/api/post/${postId}`, {
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