<template>
  <section class="container mx-auto">
<div class="card max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <div class="contents px-6 py-4">
    <div class="header">
      <div class="title font-bold text-xl text-blue mb-2 uppercase">
        {{ this.questions[0].title}}
      </div>
      <div class="dots">🌭 🌭 🌭</div>
    </div>
    <p class="text-grey-darker text-base">
      {{ this.questions[0].text}}
    </p>

    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" @click="onSubmit">
      <span v-if="this.questions[0].buttonText">
        {{ this.questions[0].buttonText }}
      </span>
      <span v-else> what?</span>
    </button>
  </div>
</div>
  </section>
</template>

<script>
import questions from '../../lib/index';
  export default {
    data() {
      return {
        questions: questions,
        counter: +this.$store.getters.getCounter,
      }
    },
    created() {
      this.$store.dispatch('getHotdogs');
      this.$store.commit('setCustomerId');
    },
    mounted() {
      this.$store.commit('setCounter', 0);
    },
    methods: {

    }
  }
</script>

<style scoped>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>