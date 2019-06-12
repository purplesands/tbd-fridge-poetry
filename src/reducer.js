const initialState = {
  words: [],
}

// const store=require('store')

export default function reducer(state=initialState, action){
  switch(action.type) {
    case "ADD_WORD":
    return { ...state, words: [...state.words, action.payload] }
    case "SORT_WORDS":
    return { ...state, words: action.payload }

    default:
    return state;
  }

}
