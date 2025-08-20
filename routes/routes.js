import { Router } from 'express';
// import data from "../src/data.json"

const routes = Router()

routes.get("/", (req, res) => {
    res.json({
  "/planets": "Listing all planets",
  "/planet/:id": "Fetching a planet by its ID",
  "/find/:string": "Compares each tag of each item to check if this string exists in the tags array, returning the objects that match."
})
})





export default routes