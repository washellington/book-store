import { SET_BOOKS } from "./actions";

const initialState = {
  wishList: [],
};

export default function bookStore(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        wishList: [...state.wishList, ...action.books],
      };
    default:
      return initialState;
  }
}
