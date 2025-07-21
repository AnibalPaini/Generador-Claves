import express from "express"
import palabrasRouter from "./routes/palabras.router.js";
import cors from "cors"

const app = express();
app.use(cors({
    origin:"http://localhost:5173"
}))
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/palabras",palabrasRouter)

app.listen(port, () => {
  console.log(`http://localhost:port`);
});