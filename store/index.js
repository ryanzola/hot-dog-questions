import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import { parentMachine, assessmentMachine } from '~/lib/state-machine.js';

import { State, interpret } from 'xstate';

import idb from '../idb/idb'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    customerId: '',
    service: interpret(parentMachine),
    parentState: null,
    childState: null,
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
    },
    getAssessmentData() {
      const stateDefinition = JSON.parse(sessionStorage.getItem('context'))
      console.log(stateDefinition.context.data)
      return stateDefinition.context.data;
    }
  },
  mutations: {
    setCurrentState(state, transition) {
      const { send } = state.service
      send(transition.event, transition.data);

      if (state.service.state.changed) {
        state.parentState = state.service.state.context.base
        state.childState = state.service.state.context.current;
        sessionStorage.setItem('current', state.childState);
        sessionStorage.setItem('context', JSON.stringify(state.service.state))
      }
    },
  },
  actions: {
    startMachine({ state }) {
      console.log('machine started');
      const stateDefinition = JSON.parse(sessionStorage.getItem('context'))

      if (stateDefinition) {

        const previousState = State.create(stateDefinition);
        const resolvedState = parentMachine.resolveState(previousState);
        state.service.start(resolvedState);
      } else {

        state.service.start();
      }

      state.parentState = state.service.state.context.base;
      state.childState = state.service.state.context.current;

      window.machine = state.service;
    },
    stopMachine({ state }) {
      console.log('machine stopped')
      sessionStorage.removeItem("context");
      sessionStorage.removeItem("current");
      state.service.stop();
    },
    sendJump() {
      send('JUMP');
    },
  }
})



// const service = interpret(parentMachine)
//   .onTransition(state => {

//   })
//   .start();


// const { send } = service;

export default store;