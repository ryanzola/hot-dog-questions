import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import { parentMachine, assessmentMachine } from '~/lib/state-machine.js';

import { interpret } from 'xstate';

// import idb from '../idb/idb'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    customerId: '',
    counter: sessionStorage.getItem('counter') || 0,
    parentState: 'home',
    childState: null,
    hotdogs: [],
    questions: {
      privacy: null,
      hotdogs: null,
      cooked: null,
      bun: null,
      toppings: null,
      care: null
    }
  },
  getters: {
    async getCustomerId(state) {
      
    },
    getCounter(state) {
      return state.counter;
    },
    getChildState(state) {
      return state.childState
    },
    getCurrentState(state) {
      return {
        parent: state.parentState,
        child: state.childState
      }
    },
    getQuestions(state) {
      return state.questions;
    }
  },
  mutations: {
    setCurrentState(state, transition) {
      console.log('data', transition);
      send(transition.event, transition.data);

      if(service.state.changed) {
        state.parentState = service.state.value;
        state.childState = service.state.context.current;
      }
    },
  },
  actions: {
    sendJump() {
      console.log('jumpin')
      send('JUMP');
    },
    updateQuestions(context, question) {
      console.log(question);
    },
    setCustomerId(state) {
      // TODO: generate only if one does not exist
      let id = uuidv4();

      // await idb.setCustomerId(id);

    },
    // async deleteHotdogs(state, hotdog) {
    //   console.log(`store is being asked to delete ${hotdog.id}`);

    //   await idb.deleteHotdog(hotdog);
    // },
    // async getHotdogs(context) {
    //   context.state.hotdogs = [];

    //   let hotdogs = await idb.getHotdogs();
    //   hotdogs.forEach(h => {
    //     context.state.hotdogs.push(h);
    //   })
    // },
    // async saveHotdog(context, hotdog) {
    //   await idb.saveHotdog(hotdog)
    // }
  }
})



const service = interpret(parentMachine)
  .onTransition(state => {

  })
  .start();


const { send } = service;

export default store;