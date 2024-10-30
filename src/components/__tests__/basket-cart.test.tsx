import { fireEvent, screen } from '@testing-library/react'
import renderWithRedux from '~/mocks/redux' // renderWithRedux fonksiyonunuzu import edin
import BasketCart from '~/components/basket-cart'
import { IProduct } from '~/types/store'
import { basketMockActions } from '~/mocks/container/actions'

const mockProduct: Partial<IProduct> = {
  id: 1,
  title: 'Test Product',
  price: 100,
  thumbnail: 'http://example.com/image.jpg',
}

describe('BasketCart', () => {
  test('renders BasketCart component', async () => {
    await renderWithRedux(<BasketCart {...mockProduct} quantity={1} />)

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('decrease button calls decreaseBasket action', async () => {
    await renderWithRedux(<BasketCart {...mockProduct} quantity={1} />)

    const decreaseButton = screen.getByText('-')
    fireEvent.click(decreaseButton)
    expect(basketMockActions.decreaseBasket).toHaveBeenCalledWith(1)
  })

  test('increase button calls addBasket action', async () => {
    await renderWithRedux(<BasketCart {...mockProduct} quantity={1} />)

    const increaseButton = screen.getByTestId('basket-more-button')
    fireEvent.click(increaseButton)

    expect(basketMockActions.addBasket).toHaveBeenCalledWith({
      id: mockProduct.id,
    })
  })
})
