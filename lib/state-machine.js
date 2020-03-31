import { Machine, assign } from 'xstate';

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
    },
    message: '',
    status: null
  },
  states: {
    assessment: {
      entry: [
        assign({
          status: (ctx) => ctx.status === null ? 'inProgress' : ctx.status
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
            if (ctx.history.length) {
              ctx.current = ctx.history.pop();
              ctx.prev = ctx.history.length ? ctx.history[ctx.history.length - 1] : null
              // ctx.track.push(ctx.current);
            }
          }
        }
      },
    },
    evaluate: {
      entry: () => console.log('evaluating...'),
      on: {
        '': [
          {
            target: 'assessment',
            cond: 'shouldWeTho',
            actions: 'okWhereTo'
          },
          {
            target: 'end',
            cond: (ctx) => ctx.status !== 'complete',
            actions: [
              () => console.log('ummmmmmmmm end'),
              assign({
                current: () => 'kickout'
              })
            ],
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

        switch (ctx.prev) {
          case 'privacy':
            ctx.current = 'hotdog'
            break;
          case 'hotdog':
            if (event.hotdog === true) {
              ctx.current = 'cooked'
            } else {
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
            if (ctx.data.toppings === true) {
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
        switch (ctx.prev) {
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



