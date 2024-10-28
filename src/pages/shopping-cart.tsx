import BasketCart from '~/components/basket-cart'
import Checkout from '~/components/checkout'
import EmptyCart from '~/components/empty-cart'
import useAppSelector from '~/utils/use-app-selector'

const ShoppingPage = () => {
  const { list } = useAppSelector((state) => state.basket)
  const basketItem = useAppSelector((state) => state.product.list)

  if (basketItem.length === 0) return

  return (
    <div className="shadow-lg rounded-lg">
      <div className="w-full mx-auto p-6 bg-white  space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Basket</h2>

        <div className="space-y-4 max-h-[calc(100vh-300px)] max-lg:max-h-[200px] overflow-auto">
          {list.map((basket) => {
            const product = basketItem.find((bi) => bi.id === basket.id)

            if (!product) return

            return (
              <BasketCart
                key={product?.id}
                {...product}
                quantity={basket.quantity}
              />
            )
          })}
        </div>

        {list.length === 0 && <EmptyCart />}
        {list.length > 0 && <Checkout />}
      </div>
    </div>
  )
}

export default ShoppingPage
