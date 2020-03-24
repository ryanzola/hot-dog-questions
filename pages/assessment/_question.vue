<template>
  <section class="container mx-auto">
    <div class="card">
      <div class="header">
        <div class="title font-bold text-xl mb-2 text-blue uppercase">{{ questions[$route.params.question].title }}</div>
      <div class="dots">🌭 🌭 🌭</div>
      </div>

      <form v-if="$route.params.question === 'privacy'" >
        <div class="contents px-6 py-4">
          <p>
            shit's private round here
          </p>

          <div class="button-thing-group flex justify-center">
            <div class="button-thing">
              <label for="like-radio" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">oh damn, ok</label>
              <input type="radio" id="like-radio"  @click="onSubmit({privacy: true})">
            </div>
          </div>
        </div>
      </form><!-- privacy -->

      <form v-if="$route.params.question === 'hotdog'">
        <div class="contents px-6 py-4">
          <p>
            {{ questions[$route.params.question].text }}
          </p>

          <div class="button-thing-group flex justify-between">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">yes</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({hotdog: true})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">no</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({hotdog: false})">
            </div>
          </div>
        </div>
      </form><!-- hotdogs -->

      <form v-if="$route.params.question === 'cooked'">
        <div class="contents px-6 py-4">
          <p>
            {{ questions[$route.params.question].text }}
          </p>
          <div class="button-thing-group flex justify-between">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">regular</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({cooked: 'regular'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">ripper</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({cooked: 'ripper'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-3" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">weller</label>
              <input type="radio" id="like-radio-3"  @click="onSubmit({cooked: 'weller'})">
            </div>
          </div>
        </div>
      </form><!-- cooked -->

      <form v-if="$route.params.question === 'bun'">
        <div class="contents px-6 pt-4">
          <p>{{questions[$route.params.question].text}}</p>

          <div class="button-thing-group flex justify-between">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">potato roll</label>
              <input type="checkbox" id="like-radio-1"  @click="onSubmit({bun: 'potato'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">white roll</label>
              <input type="checkbox" id="like-radio-2"  @click="onSubmit({bun: 'white'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-3" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">wheat roll</label>
              <input type="checkbox" id="like-radio-3"  @click="onSubmit({bun: 'wheat'})">
            </div>
          </div>
        </div>
      </form><!-- bun -->

      <form v-if="$route.params.question === 'toppings'">
        <div class="contents px-6 py-4">
          <p>
            {{ questions[$route.params.question].text }}
          </p>

          <div class="button-thing-group flex justify-between">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">yes</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({toppings: true})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">no</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({toppings: false})">
            </div>
          </div>
        </div>
      </form><!-- hotdogs -->

      <form v-if="$route.params.question === 'topping_select'">
        <div class="contents px-6 py-4">
          <p>{{ questions[$route.params.question].text }}</p>

          <div class="button-thing-group flex justify-between">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">relish</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({toppings: 'relish'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">kraut</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({toppings: 'kraut'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-3" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">mustard</label>
              <input type="radio" id="like-radio-3"  @click="onSubmit({toppings: 'mustard'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-4" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">ketchup</label>
              <input type="radio" id="like-radio-4"  @click="onSubmit({toppings: 'ketchup'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-5" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">chillllli</label>
              <input type="radio" id="like-radio-5"  @click="onSubmit({toppings: 'chilli'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-6" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">cheese</label>
              <input type="radio" id="like-radio-6"  @click="onSubmit({toppings: 'cheese'})">
            </div>
          </div>
        </div>
      </form><!-- toppings -->

      <form v-if="$route.params.question === 'how_many'">
        <div class="contents px-6 py-4">
          <p>{{ questions[$route.params.question].text }}</p>
          <input type="number" name="" id="">
        </div>
      </form><!-- how many -->
    </div>
  </section>
</template>

<script>
import questions from '../../lib/index';

export default {
  data() {
    return {
      questions: questions,
      state: null
    }
  },
  mounted() {
    this.state = this.$store.getters.getChildState;
  },
  methods: {
    sendJump() {
      this.$store.dispatch('sendJump')
    },
    onSubmit(data) {
      // get current state
      let state = this.$store.getters.getCurrentState;
      
      // commit answer
      this.$store.commit('setCurrentState', {event: 'STEP', data});
      
      // get updated state
      state = this.$store.getters.getCurrentState;
      this.$router.push(`/${state.parent}${state.child ? '/' + state.child : ''}`)
    }
  },
  beforeRouteUpdate(to, from, next) {
    let state = this.$store.getters.getCurrentState;

    next();
  },
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

}

.card form .contents {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
}


.button-thing label {
  display: block;
}

.button-thing input {
  position: absolute;
  top: -110%;
  left: -110%;
  pointer-events: none;
}
</style>