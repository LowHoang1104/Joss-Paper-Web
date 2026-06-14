import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cartContext.js'

const CART_STORAGE_KEY = 'vietma-cart'

function parsePrice(price) {
  const digits = String(price || '').replace(/[^\d]/g, '')
  return Number(digits || 0)
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

function readStoredCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce(
      (total, item) => total + parsePrice(item.price) * item.quantity,
      0,
    )

    const addItem = (product) => {
      setItems((current) => {
        const existingItem = current.find((item) => item.id === product.id)

        if (existingItem) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        }

        return [
          ...current,
          {
            id: product.id,
            category: product.category,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ]
      })
    }

    const updateQuantity = (productId, quantity) => {
      const nextQuantity = Math.max(1, Number(quantity) || 1)

      setItems((current) =>
        current.map((item) =>
          item.id === productId ? { ...item, quantity: nextQuantity } : item,
        ),
      )
    }

    const removeItem = (productId) => {
      setItems((current) => current.filter((item) => item.id !== productId))
    }

    const clearCart = () => {
      setItems([])
    }

    return {
      addItem,
      clearCart,
      formatCurrency,
      itemCount,
      items,
      parsePrice,
      removeItem,
      subtotal,
      updateQuantity,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
