const emptyMockFn = jest.fn(() => () => {
  return Promise.resolve()
})

export const basketMockActions = {
  addBasket: emptyMockFn,
  decreaseBasket: emptyMockFn,
  clearBasket: emptyMockFn,
}

export const orderMockActions = {
  addOrder: emptyMockFn,
}

export default {
  basket: basketMockActions,
  order: orderMockActions,
}
