import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (!error) {
      const { id } = paymentMethod

      console.log('id: ', id);
      try {
        const { data } = await axios.post('/api/charge', { id, amount: 100 })

        console.log('res data: ', data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '20rem', margin: '4rem auto' }}
    >
      <CardElement />
      <button type="submit" disabled={!stripe}>
        pay
      </button>
    </form>
  )
}

const stripePromise = loadStripe('pk_test_51I18f9FYQ9ouv5EjYe1GUwJ50OoEohfN6qev6gHDWOlE75v8DVf9utk7BVp1Efv0OarbunNbtnTbMKxINPKODGDe00IYQ0wTuY')

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default App
