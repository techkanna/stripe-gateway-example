import express from 'express'
import Stripe from 'stripe'
import asyncHandler from 'express-async-handler'

const app = express()

app.use(express.json())

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post('/api/charge', asyncHandler(async (req, res) => {

  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'INR',
      description: 'test meyment',
      payment_method: id,
      confirm: true
    })

    return res.status(200).json({
      confirm: 'test-abc',
      payment
    })
  } catch (error) {
    console.log(error);
  }
}))

app.get('/api/config/stripe', (req, res) =>
  res.send(process.env.STRIPE_PUBLIC_KEY)
)

app.use('/', (req, res) => {
  res.send('api running...')
})

const PORT = process.env.PORT || 500
app.listen(PORT, () => console.log(`server started on port: ${PORT}`))