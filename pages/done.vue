<template>
  <div class="container mx-auto">
    <div class="card">
      <div class="header">
        <div class="title font-bold text-xl text-blue mb-2">
          K THNX BYE
        </div>
        <div class="dots">🌭 🌭 🌭</div>
      </div>

      <div class="content">
        bye
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
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

.card .content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>