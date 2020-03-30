import { Machine, assign, send } from 'xstate';


const assessmentMachine = Machine({
  id: 'hotdogs',
  initial: 'privacy',
  context: {
    data: {
      privacy: null,
      hotdog: null,
      cooked: null,
      bun: null,
      toppings: null,
      topping_select: null,
      care: null,
    },
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
  initial: 'assessment',
  context: {
    base: 'assessment',
    current: 'privacy',
    prev: '',
    history: [],
    // track: [],
    data: {
      privacy: null,
      hotdog: null,
      cooked: null,
      bun: null,
      toppings: null,
      topping_select: null,
      care: null,
    },
    message: '',
    status: null
  },
  states: {
    assessment: {
      entry: [
        assign({
          status: (ctx) => ctx.status === null ? 'inProgress': ctx.status
        }),
        (ctx) => console.log(ctx.status) 
      ],
      exit: assign({
        history: (ctx, event) => [...ctx.history, Object.getOwnPropertyNames(event)[1]],
        // track: (ctx, event) => [...ctx.track, Object.getOwnPropertyNames(event)[1]],
      }),
      on: {
        STEP: {
          target: 'evaluate',
          actions: [
            assign({
              prev: (ctx) => ctx.current,
            }),
            assign((ctx, event) => {
              let key = Object.getOwnPropertyNames(event)[1];
              let val = Object.values(event)[1];

              ctx.data[key] = val;
            }),
          ]
        },
        POP: {
          actions: (ctx, event) => {
            if(ctx.history.length) {
              ctx.current  = ctx.history.pop();
              ctx.prev = ctx.history.length ? ctx.history[ctx.history.length - 1] : null
              // ctx.track.push(ctx.current);
            }
          }
        }
      },
    },
    evaluate: {
      entry: () => console.log('evaluating'),
      on: {
        '': [
          {
            target: 'assessment',
            actions: [
              () => console.log('ummmmmmmmm ass'),
            ],
            cond: 'shouldWeTho',
            actions: 'okWhereTo'
          },
          {
            target: 'end',
            cond: (ctx) => ctx.status !== 'complete',
            actions: () => console.log('ummmmmmmmm end'),
          },
          {
            target: 'complete'
          },
          {
            target: 'crap',
            actions: () => console.log('youre not supposed to be here, check your work')
          }
        ]
      }
    },
    end: {
      entry: [
        assign({
          status: 'kickout'
        })
      ],
      type: 'final'
    },
    complete: {
      entry: [
        assign({
          status: 'complete'
        })
      ],
    },
    crap: {
      entry: [
        (ctx) => ctx.base = 'crap',
      ],
    },
  }
},
{
  actions: {
    okWhereTo: (ctx, event) => {
      let incoming = Object.keys(event)[1];

      switch(ctx.prev) {
        case 'privacy':
          ctx.current = 'hotdog'
          break;
        case 'hotdog':
          if(event.hotdog === true) {
            ctx.current = 'cooked'
          } else {
            ctx.base = 'kickout'
            ctx.current = null;
            ctx.message = 'doesnt like hotdogs'
          }
          break;
   
        case 'cooked':
          ctx.current = 'bun';
          break
        case 'bun':
          ctx.current = 'toppings';
          break
        case 'toppings':
          if(ctx.data.toppings === true) {
            ctx.current = 'topping_select'
          } else {
            ctx.current = 'how_many'
          }
          break
        case 'topping_select':
          ctx.current = 'how_many'
          break;
        case 'how_many':
          ctx.current = 'summary'
          ctx.status = 'complete'
      }
    },
  },
  guards: {
    shouldWeTho: (ctx, event) => {
      switch(ctx.prev) {
        case 'privacy':
          return ctx.data.privacy
        case 'hotdog':
          return ctx.data.hotdog
        case 'cooked':
        case 'bun':
        case 'toppings':
        case 'topping_select':
          return true
        case 'how_many':
          console.log('status', ctx.status);
          return true
          
      }
    }
  }
})



