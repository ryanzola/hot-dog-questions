import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import { parentMachine, assessmentMachine } from '~/lib/state-machine.js';

import { interpret } from 'xstate';

import idb from '../idb/idb'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    customerId: '',
    counter: sessionStorage.getItem('counter') || 0,
    service: interpret(parentMachine),
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
      const { send } = state.service
      send(transition.event, transition.data);

      if(state.service.state.changed) {
        state.parentState = state.service.state.value;
        state.childState = state.service.state.context.current;
      }
    },
  },
  actions: {
    startMachine({state}) {
      console.log('cool');
      state.service.start();
    },
    stopMachine({state}) {
      console.log('stop stop stop');
      state.service.stop();
    },
    sendJump() {
      console.log('jumpin')
      send('JUMP');
    },
    updateQuestions(context, question) {
      console.log(question);
    },
    async setCustomerId(state) {
      // TODO: generate only if one does not exist
      let id = uuidv4();

      await idb.setCustomerId(id);

    },
    async deleteHotdogs(state, hotdog) {
      console.log(`store is being asked to delete ${hotdog.id}`);

      await idb.deleteHotdog(hotdog);
    },
    async getHotdogs(context) {
      context.state.hotdogs = [];

      let hotdogs = await idb.getHotdogs();
      hotdogs.forEach(h => {
        context.state.hotdogs.push(h);
      })
    },
    async saveHotdog(context, hotdog) {
      await idb.saveHotdog(hotdog)
    }
  }
})



// const service = interpret(parentMachine)
//   .onTransition(state => {

//   })
//   .start();


// const { send } = service;

export default store;