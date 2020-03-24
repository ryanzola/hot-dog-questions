import { Machine, assign, send } from 'xstate';


const callbackHandler = (context, event) => (callback, onEvent) => {
  onEvent(event => {
    console.log('callback', event)
    callback(event);
  })
}



const assessmentMachine = Machine({
  id: 'hotdogs',
  initial: 'privacy',
  context: {
    privacy: null,
    hotdog: null,
    cooked: null,
    bun: null,
    toppings: null,
    topping_select: null,
    care: null,
    exit: null
  },
  states: {
    privacy: {
      entry: send({type: 'UPDATE', payload: 'privacy'}, { to: 'parent' }),
      on: { 
        STEP: [
          {
            target: 'hotdog',
            cond: (_, event) => event.privacy === true,
            actions: [
              assign({
                privacy: (_, event) => event.privacy
              }),
              (_, event) => console.log('wtf', event)
            ]
          },
          {
            target: 'crap'
          }
      ]
      }
    },
    hotdog: {
      entry: send({type: 'UPDATE', payload: 'hotdog'}, { to: 'parent' }),
      on: {
        STEP: [
          {
            target: 'cooked',
            cond: (_, event) => event.hotdog === true,
            actions: [
              assign({
                cooked: (_, event) => event.hotdog
              }),
              (_, event) => console.log('wtf again', event)
            ]
          },
          {
            target: 'bye',
            actions: assign({
              exit: () => 'doesnt like hotdogs, wtf'
            })
          }
        ],
        POP: {
          target: 'privacy',
        }
      }
    },
    cooked: {
      entry: send({type: 'UPDATE', payload: 'cooked'}, { to: 'parent' }),
      on: { 
        STEP: [
          {
            target: 'bun',
            actions: [
              assign({
                cooked: (_, event) => event.cooked
              }),
            ]
          },
          {
            target: 'crap'
          }
      ],
        POP: {
          target: 'hotdog',
        }
      }
    },
    bun: {
      entry: send({type: 'UPDATE', payload: 'bun'}, { to: 'parent' }),
      on: { 
        STEP: {
          target: 'toppings',
          cond: (_, event) => event.bun !== null,
          actions: [
            assign({
              bun: (_, event) => event.bun
            })
          ]
        },
        POP: {
          target: 'cooked'
        }
      }
    },
    toppings: {
      entry: send({type: 'UPDATE', payload: 'toppings'}, { to: 'parent' }),
      on: {
        STEP: [
          {
            target: 'topping_select',
            cond: (_, event) => event.toppings === true,
            actions: [
              assign({
                toppings: (_, event) => event.toppings
              }),
              (_, event) => console.log('toppings: ', event.toppings)
            ]
          },
          {
            target: 'how_many'
          }
        ],
        POP: {
          target: 'bun'
        }
      }
    },
    topping_select: {
      entry: send({type: 'UPDATE', payload: 'topping_select'}, { to: 'parent' }),
      on: { 
        STEP: {
          target: 'how_many',
          cond: (_, event) => event.topping_select !== null,
          actions: [
            assign({
              topping_select: (_, event) => event.topping_select
            })
          ]
        },
        POP: {
          target: 'toppings',
          actions: [
            () => console.log('pop from t-select')
          ]
        }
      }
    },
    how_many: {
      entry: send({type: 'UPDATE', payload: 'how_many'}, { to: 'parent' }),
      on: { 
        STEP: 'summary',
        POP: [
          {
            target: 'topping_select',
            cond: (context) => context.topping_select !== null,
          },
          {
            target: 'toppings'
          }
        ]
      }
    },
    summary: {
      entry: send({type: 'UPDATE', payload: 'summary'}, { to: 'parent' }),
      type: 'final'
    },
    bye: {
      entry: send({type: 'UPDATE', payload: 'bye'}, { to: 'parent' }),
      type: 'final'
    },
    crap: {
      entry: send({type: 'UPDATE', payload: 'crap'}, { to: 'parent' }),
    }
  },
})

export const parentMachine = Machine({
  id: 'parent',
  initial: 'home',
  context: {
    current: null,
    history: []
  },
  states: {
    home: {
      on: { START: 'assessment'},
    },
    assessment: {
      invoke: {
        id: 'hotdogs',
        src: assessmentMachine,
        onDone: 'done'
      },
      on: {
        STEP: {
          actions: [
            send((_, event) => event, {to: 'hotdogs'}),
          ]
        },
        POP: {
          actions: [
            assign({
              current: (ctx) => ctx.history.splice(-2, 2)
            }),
            send((ctx) => ({type: 'POP', payload: ctx.current }), { to: 'hotdogs'})
          ]
        },
        UPDATE: {
          actions: [
            assign({
              current: (_, event) => event.payload,
              history: (context, event) => [...context.history, event.payload]
            }),
          ]
        }
      },
    },
    done: {
      entry: [
        assign({
          current: 'privacy',
          history: []
        })
      ],
      type: 'final'
    }
  }
})



