import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../src/data/data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const routes = Router()

routes.get("/", (req, res) => {
    res.json({
  "/planets": "Listing all planets",
  "/planet/:id": "Fetching a planet by its ID",
  "/find/:string": "Compares each tag of each item to check if this string exists in the tags array, returning the objects that match."
})
})

routes.get("/planets", (req, res) => {
    res.json(data.planets)
})

routes.get("/planets/:id", (req, res)=> {
    console.log(req.params)
    const { id } = req.params
    console.log(id)
    let filtered = data.planets.filter((p) => p.id === id)
    res.json(filtered)
})


export default routes