<template>
  <section class="container mx-auto">
    <div class="card">
      <div class="header">
        <div class="title font-bold text-xl text-blue mb-2">
          WELCOME
        </div>
        <div class="dots">🌭 🌭 🌭</div>
      </div>

      <div class="content">
        <p>
          Definitely don't ask your doctor if hot dogs are right for you.
        </p>
        <button class="button" @click="onClick">
          I Never Do
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("stopMachine");
  },
  methods: {
    onClick() {
      this.$store.dispatch("startMachine");

      let state = this.$store.getters.getCurrentState;

      this.$router.push(`/${state.parent}/${state.child}`);
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card {
  min-height: 450px;
  width: 650px;
  background-color: white;
  border-radius: 0.25rem;
  padding: 0.8rem 2rem 2rem;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
}

.card .content {
  height: 100%;
  font-size: 22px;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
  align-items: center;
}

.dots {
  position: relative;
  font-size: 8px;
  margin: auto;
}

.button {
  font-weight: bold;
  font-size: 1.4rem;
  border-radius: 0.25rem;
  color: white;
  padding: 0 2rem;
  height: 65px;
  width: 100%;
  max-width: 320px;
  justify-self: center;
  background-color: #255bc7;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.26);
}
</style>
