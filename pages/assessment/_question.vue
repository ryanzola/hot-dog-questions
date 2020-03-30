<template>
  <section class="container mx-auto">
    <div class="card">
      <div class="header">
        <div class="title font-bold text-xl mb-2 text-blue uppercase">{{ questions[$route.params.question].title }}</div>
      <div class="dots">🌭 🌭 🌭</div>
      </div>

      <form v-if="$route.params.question === 'privacy'" >
  
        <p>
          {{ questions[$route.params.question].text }}
        </p>

        <div class="button-thing-group one">
          <div class="button-thing">
            <label for="like-radio">{{ questions[$route.params.question].buttonText }}</label>
            <input type="radio" id="like-radio"  @click="onSubmit({privacy: true})">
          </div>
        </div>
        
      </form><!-- privacy -->

      <form v-if="$route.params.question === 'hotdog'">
 
          <p>
            {{ questions[$route.params.question].text }}
          </p>

          <div class="button-thing-group two flex justify-between">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[0] }}</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({hotdog: true})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[1] }}</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({hotdog: false})">
            </div>
          </div>
        
      </form><!-- hotdogs -->

      <form v-if="$route.params.question === 'cooked'">
    
          <p>
            {{ questions[$route.params.question].text }}
          </p>
          <div class="button-thing-group three">
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
     
      </form><!-- cooked -->

      <form v-if="$route.params.question === 'bun'">
   
        <p>{{ questions[$route.params.question].text }}</p>

        <div class="button-thing-group three">
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
    
      </form><!-- bun -->

      <form v-if="$route.params.question === 'toppings'">
 
          <p>
            {{ questions[$route.params.question].text }}
          </p>

          <div class="button-thing-group two">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">yes</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({toppings: true})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">no</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({toppings: false})">
            </div>
          </div>
     
      </form><!-- hotdogs -->

      <form v-if="$route.params.question === 'topping_select'">
    
          <p>{{ questions[$route.params.question].text }}</p>

          <div class="button-thing-group six">
            <div class="button-thing">
              <label for="like-radio-1" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[0] }}</label>
              <input type="radio" id="like-radio-1"  @click="onSubmit({toppings: 'relish'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-2" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[1] }}</label>
              <input type="radio" id="like-radio-2"  @click="onSubmit({toppings: 'kraut'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-3" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[2] }}</label>
              <input type="radio" id="like-radio-3"  @click="onSubmit({toppings: 'mustard'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-4" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[3] }}</label>
              <input type="radio" id="like-radio-4"  @click="onSubmit({toppings: 'ketchup'})">
            </div>
            <div class="button-thing">
              <label for="like-radio-5" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[4] }}</label>
              <input type="radio" id="like-radio-5"  @click="onSubmit({toppings: 'chilli'})">
            </div>
            <div class="button-thing disabled">
              <label for="like-radio-6" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded capitalize">{{ questions[$route.params.question].options[5] }}</label>
              <input type="radio" id="like-radio-6"  @click="onSubmit({toppings: 'cheese'})">
            </div>
          </div>
      
      </form><!-- toppings -->

      <form v-if="$route.params.question === 'how_many'" id="how_many">
        <div>
          <p class="mb-4">{{ questions[$route.params.question].text }}</p>
          <input type="text" name="how_many" id="how_many">
        </div>

        <div class="button-thing-group one">
          <div class="button-thing">
            <label for="like-radio">{{ questions[$route.params.question].buttonText }}</label>
            <input type="radio" id="like-radio"  @click="onSubmit({privacy: true})">
          </div>
        </div>
      </form><!-- how many -->
    </div>
  </section>
</template>

<script>
import questions from '../../lib/index';

export default {
  middleware: 'assessment',
  data() {
    return {
      questions: questions,
      state: null
    }
  },
  mounted() {
    if(!this.$store.getters.getChildState) {
      console.log('start the machine and rehydrate')
      this.$store.dispatch('startMachine');
    } else {
      console.log('use the existing machine')
    }

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
      this.$router.push(`/${state.parent ? state.parent +  '/' : '' }${state.child}`)
    }
  },
  beforeRouteUpdate(to, from, next) {

    let state = this.$store.getters.getCurrentState.child;
      console.log('state: ', state, 'to: ', to.params.question)

    if(state !== to.params.question) {
      console.log('whoa, hold up a minute');
    } else {
      console.log('this is fine, carry on');
    }

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
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);

}

.card form {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 10px;
  align-items: center;
}

.card form p {
  font-size: 24px;
}

.button-thing-group {
  width: 100%;
  display: grid;

}

.button-thing-group.one {

}

.button-thing-group.one .button-thing { 
  width: 320px; 
}

.button-thing-group.two {
  grid-gap: 0.8rem;
  grid-template-columns: 1fr 1fr;
}

.button-thing-group.two .button-thing,
.button-thing-group.three .button-thing,
.button-thing-group.six .button-thing  { 
  width: 100%; 
}

.button-thing-group.three {
  grid-gap: 0.8rem;
  grid-template-columns: 1fr 1fr 1fr;
}

.button-thing-group.six {
  grid-gap: 0.8rem;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}

.button-thing {
  justify-self: center;
}

.button-thing.disabled > label {
  background-color: #ccc;
  color: #545454;
  cursor: not-allowed;
}


.button-thing label {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.4rem;
  border-radius: 0.25rem;
  color: white;
  padding: 0 2rem;
  height: 65px;
  width: 100%;
  cursor: pointer;
  background-color: #255bc7;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.26);
}

.button-thing input {
  position: absolute;
  top: -110%;
  left: -110%;
  pointer-events: none;
}

#how_many input[type="text"] {
  height: 50px;
  width: 90px;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  justify-self: center;
  text-align: center;
  font-size: 2rem;
}
</style>