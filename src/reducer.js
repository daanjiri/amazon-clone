export const initialState = {
  basket: [],
};

//selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      index >= 0
        ? newBasket.splice(index, 1)
        : console.warn(
            `Cant remove product (id: ${action.id}) as its not in basket!`
          );
      /*    if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      } */
      return {
        ...state,
        basket: newBasket,
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: state.basket.concat(
          action.item
        ) /* [...state.basket, action.item], */,
      };
    default:
      return state;
  }
};

export default reducer;