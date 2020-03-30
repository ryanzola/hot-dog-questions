<template>
  <section class="container mx-auto">
<div class="card">
    <div class="header">
      <div class="title font-bold text-xl text-blue mb-2 uppercase">
        LOADING
      </div>
      <div class="dots">🌭 🌭 🌭</div>
    </div>
  <div class="contents">
    <p class="text-grey-darker text-base align-middle">
      One moment please...
    </p>
  </div>
</div>
  </section>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    created() {

    },
    mounted() {
      console.log(sessionStorage.getItem('current'))
      if(sessionStorage.getItem('current')) {
        this.$router.replace(`/assessment/${sessionStorage.getItem('current')}`)
      } else {
        this.$router.replace(`/assessment/privacy`)
      }
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

.card .contents {
  height: 100%;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>