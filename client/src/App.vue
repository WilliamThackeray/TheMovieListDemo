<script setup>
import { RouterView } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)
</script>

<template>
  <main>
    <div>
      <RouterView />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    openModal() {

    }
  }
}
</script>

<style scoped></style>
