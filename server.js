import express from "express"
import routes from "./routes/routes.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';

const app = express()
const PORT = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(routes)
app.use('/files/planets', express.static(path.resolve(__dirname, 'public', 'images', 'planets')));


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
