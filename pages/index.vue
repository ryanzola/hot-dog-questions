<template>
  <section class="container mx-auto">
<div class="card max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <div class="contents px-6 py-4">
    <div class="header">
      <div class="title font-bold text-xl text-blue mb-2">
        WELCOME
      </div>
      <div class="dots">🌭 🌭 🌭</div>
    </div>
    <p class="text-gray-700 text-base">
      Ask your stomach if hotdogs are right for you.
    </p>
    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded no-underline" @click="onClick">
      The Only Button That Matters
  </button>
  </div>
</div>
  </section>
</template>

<script>
export default {
  mounted() {

  },
  methods: {
    onClick() {
      this.$store.commit('setCurrentState', {event: 'START', data: true});
      this.$store.dispatch('setCustomerId');

      let state = this.$store.getters.getCurrentState;
      
      this.$router.push(`/${state.parent}/${state.child}`)
    }
  }
}
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card {
  height: 200px;
  width: 300px;
}

.card .contents {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-content: center;
  align-items: center;
}

.dots {
  position: relative;
  font-size: 8px;
  margin: auto;
}
</style>
