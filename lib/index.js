const questions = {
  privacy: {
    title: 'privacy policy bro',
    text: 'I acknowledge that I will not think about what is actually in the hotdogs.',
    type: 'acknowledge',
    buttonText: 'totally cool'
  },
  hotdog: {
    title: 'hotdog',
    text: 'do you like hotdogs?',
    type: 'bool',
    options: ['yes', 'no']
  },
  cooked: {
    title: 'let\'s get cookin\'',
    text: 'deep fried is the only correct answer, so...',
    type: 'option',
    options: [ 'regular', 'ripper', 'weller' ]
  },
  bun: {
    title: 'let\'s talk buns',
    text: 'I thought we were cool',
    type: 'option',
    options: [ 'potato', 'white', 'wheat' ]
  },
  toppings: {
    title: '',
    text: 'Do you like toppings or are you boring af?',
    type: 'multi',
    options: [ 'relish', 'kraut', 'mustard', 'ketchup', 'chili', 'cheese' ]
  },
  topping_select: {
    title: 'top it off',
    text: 'try not to get too carried away ',
    type: 'multi',
    options: [ 'relish', 'kraut', 'mustard', 'ketchup', 'chili', 'cheese' ]
  },
  how_many: {
    title: 'i won\'t judge' ,
    text: 'how many hot dogs do you eat per day?',
    type: 'text'
  },
}

export default questions