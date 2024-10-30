import { screen } from '@testing-library/react'
import ShoppingPage from '../shopping-cart'
import { ContainerStore } from '~/types/store'
import renderWithRedux from '~/mocks/redux'

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

describe('ShoppingPage Component', () => {
  test('renders nothing when basket items list is empty', async () => {
    const { container } = await renderWithRedux(<ShoppingPage />, {
      initialState: {
        ...mockState,
        product: { ...mockState.product, list: [] },
      },
    })
    expect(container.firstChild).toBeNull()
  })

  test('renders EmptyCart component when basket list is empty', async () => {
    await renderWithRedux(<ShoppingPage />, {
      initialState: {
        ...mockState,
        basket: { list: [] },
      },
    })
    expect(screen.getByTestId('empty-cart')).toBeInTheDocument()
  })

  test('renders BasketCart components and Checkout when basket has items', async () => {
    await renderWithRedux(<ShoppingPage />, {
      initialState: mockState,
    })

    expect(screen.getByTestId('basket-cart-item')).toBeInTheDocument()
    expect(screen.getByTestId('checkout-wrapper')).toBeInTheDocument()
  })

  test('renders BasketCart components and Checkout when basket has items', async () => {
    await renderWithRedux(<ShoppingPage />, {
      initialState: {
        ...mockState,
        product: {
          ...mockState.product,
          list: [...mockState.product.list, { ...exampleProduct, id: 2 }],
        },
      },
    })

    expect(screen.getAllByTestId('basket-cart-item')).toHaveLength(2)
    expect(screen.getByTestId('checkout-wrapper')).toBeInTheDocument()
  })
})
