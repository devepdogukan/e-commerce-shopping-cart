import { IProduct } from '~/types/store'
import withActions, { IWithActions } from '~/utils/with-actions'

type BasketCartProps = IWithActions &
  Partial<IProduct> & {
    quantity: number
  }

const BasketCart = ({
  actions,
  dispatch,
  thumbnail,
  id,
  title,
  quantity,
  price,
}: BasketCartProps) => {
  return (
    <div
      data-testid="basket-cart-item"
      className="flex items-center justify-between pb-6 px-0 border-b border-gray-200"
    >
      <img src={thumbnail} alt={title} className="w-16 h-16 rounded" />

      <div className="flex-1 mx-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">${price}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => dispatch!(actions!.basket.decreaseBasket(id))}
          className="bg-gray-300 select-none hover:bg-gray-400 w-6 h-6 grid place-content-center text-gray-800 px-2 py-1 rounded"
        >
          -
        </button>
        <span className="text-gray-800 font-medium">{quantity}</span>
        <button
          data-testid="basket-more-button"
          onClick={() => dispatch!(actions!.basket.addBasket({ id }))}
          className="bg-gray-300 select-none hover:bg-gray-400 w-6 h-6 grid place-content-center text-gray-800 px-2 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default withActions(BasketCart)
