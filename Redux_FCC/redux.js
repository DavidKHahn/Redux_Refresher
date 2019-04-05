const INCREMENT = 'INCREMENT'; // define a constant for increment action types
const DECREMENT = 'DECREMENT'; // define a constant for decrement action types
const defaultState = {
  number: 0
}
const counterReducer = (state = defaultState.number, action) => {
  const copy = Object.assign({}, defaultState);
    switch(action.type) {
      case INCREMENT:
        return copy.number + 1;
      break;
      case DECREMENT:
        return copy.number;
      break;
      default: return state;
    }
}; // define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = function(add){
  return {
    type: INCREMENT
  }
}; // define an action creator for incrementing

const decAction = function(subtract){
  return {
    type: DECREMENT
  }
}; // define an action creator for decrementing

const store = Redux.createStore(counterReducer); // define the Redux store here, passing in your reducers