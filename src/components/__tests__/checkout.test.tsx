import { fireEvent, screen } from '@testing-library/react'
import renderWithRedux from '~/mocks/redux'
import Checkout from '~/components/checkout'
import navigate from '~/utils/navigate'
import { ContainerStore } from '~/types/store'
import { basketMockActions, orderMockActions } from '~/mocks/container/actions'

jest.mock('~/utils/navigate', () => jest.fn())

const authState = {
  user: {
    email: 'user1',
    token: 'test',
    loginDate: new Date().toISOString(),
  },
  loading: true,
  error: null,
}

const exampleProduct = {
  id: 1,
  price: 10,
  title: 'Test product',
  thumbnail: 'thumbnail.png',
  brand: 'Test brand',
  category: 'Test category',
  description: 'Test description',
  images: [''],
}

const productState: ContainerStore['product'] = {
  list: [exampleProduct],
  filter: '',
  loading: true,
  error: '',
  sort: null,
}
const mockState = {
  basket: {
    list: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 5 },
    ],
  },
  product: productState,
  auth: authState,
}

describe('Checkout Component', () => {
  test('renders total price correctly', async () => {
    await renderWithRedux(<Checkout />, {
      initialState: mockState,
    })

    const totalPrice = screen.getByText(/\$20.00/)
    expect(totalPrice).toBeInTheDocument()
  })

  test('renders product list and basket list not match', async () => {
    await renderWithRedux(<Checkout />, {
      initialState: {
        ...mockState,
        product: {
          ...mockState.product,
          list: [{ ...exampleProduct, id: 5 }],
        },
      },
    })

    fireEvent.click(screen.getByRole('button', { name: /pay/i }))
  })

  test('adds an order and clears the basket if user is logged in', async () => {
    await renderWithRedux(<Checkout />, {
      initialState: mockState,
    })

    fireEvent.click(screen.getByRole('button', { name: /pay/i }))

    expect(orderMockActions.addOrder).toHaveBeenCalled()

    expect(navigate).toHaveBeenCalledWith('/orders')
  })

  it('navigates to /auth if user is not logged in', async () => {
    await renderWithRedux(<Checkout />, {
      initialState: { ...mockState, auth: { ...mockState.auth, user: null } },
    })

    fireEvent.click(screen.getByRole('button', { name: /pay/i }))
    expect(navigate).toHaveBeenCalledWith('/auth')
  })

  it('clears basket if no items mapped in the order', async () => {
    await renderWithRedux(<Checkout />, {
      initialState: mockState,
    })

    fireEvent.click(screen.getByRole('button', { name: /pay/i }))

    expect(basketMockActions.clearBasket).toHaveBeenCalled()

    expect(navigate).toHaveBeenCalledWith('/orders')
  })
})
