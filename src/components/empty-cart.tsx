const EmptyCart = () => {
  return (
    <div
      data-testid="empty-cart"
      className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-lg mt-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h18M9 3v18m6-18v18m-3-4h3l1 4H8l1-4h3v-2m-3-4h6"
        />
      </svg>
      <p className="mt-4 text-lg font-medium text-gray-600">
        Your cart is currently empty
      </p>
    </div>
  )
}

export default EmptyCart
