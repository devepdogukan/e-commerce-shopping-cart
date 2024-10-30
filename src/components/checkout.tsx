import useAppSelector from '~/utils/use-app-selector'
import withActions, { IWithActions } from '~/utils/with-actions'
import navigate from '~/utils/navigate'

function generateId(size = 21) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters[randomIndex]
  }

  return id
}

const Checkout = ({ actions, dispatch }: IWithActions) => {
  const list = useAppSelector((state) => state.basket.list)
  const isLogin = useAppSelector((state) => state.auth.user)

  const basketItem = useAppSelector((state) => state.product.list)

  const totalPrice = list.reduce((acc, cur) => {
    const price = basketItem.find((bi) => bi.id === cur.id)?.price ?? 0
    return acc + price * cur.quantity
  }, 0)

  return (
    <div data-testid="checkout-wrapper">
      <div className="flex justify-between text-lg font-semibold text-gray-800 ">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button
        onClick={() => {
          if (!isLogin) {
            return navigate('/auth')
          }
          const clearBasket = () => dispatch!(actions!.basket.clearBasket())

          const mappedBasketItems = list
            .map((bi) => {
              const product = basketItem.find((pi) => pi.id === bi.id)
              if (!product) return null
              return {
                id: product.id,
                name: product.title,
                quantity: bi.quantity,
                price: product.price,
                imageUrl: product.thumbnail,
              }
            })
            .filter(Boolean)
          if (mappedBasketItems.length === 0) clearBasket()

          dispatch!(
            actions!.order.addOrder({
              orderId: generateId(),
              items: mappedBasketItems,
              date: new Date().toISOString(),
              totalPrice: totalPrice,
            }),
          )
          clearBasket()
          navigate('/orders')
        }}
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
      >
        Pay
      </button>
    </div>
  )
}

export default withActions(Checkout)
