import express from 'express'

const app = express()

app.use(express.json())

app.use('/', (req, res) => {
  res.send('api running...')
})

const PORT = process.env.PORT || 500
app.listen(PORT, () => console.log(`server started on port: ${PORT}`))