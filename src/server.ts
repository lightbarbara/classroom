import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const port = 5000 || process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`))