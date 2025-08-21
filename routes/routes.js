import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../src/data/data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const routes = Router()

const handleRequestResponse = (req, res) => {

}

function normalizeInput(input) {
  return input
    .normalize('NFD')              
    .replace(/[\u0300-\u036f]/g, '') 
    .replace(/\s+/g, '')             
    .replace(/[^a-zA-Z0-9]/g, '')    
    .toLowerCase();                 
}

routes.get("/", (req, res) => {
    res.json({
        description: "Welcome to the Solar System API. This API provides detailed information about various celestial objects including planets, dwarf planets, asteroids, and galaxies. You can explore the full dataset or query specific categories and individual objects by their IDs.",
        contents: [
            "Planets: The major planets in our solar system.",
            "Dwarf Planets: Smaller planetary bodies that orbit the sun.",
            "Asteroids: Rocky objects primarily found in the asteroid belt.",
            "Galaxies: Large systems of stars, dust, and dark matter."
        ],
        routes: {
            "/all": "Retrieve the complete dataset including all categories.",
            "/planets": "List all planets.",
            "/planets/:id": "Get detailed information about a specific planet by its ID.",
            "/dwarf-planets": "List all dwarf planets.",
            "/asteroids": "List all asteroids.",
            "/galaxies": "List all galaxies.",
            "/find/:string": "Search for objects containing the specified string in their tags."
        }
    })
})

//show everything
routes.get("/all", (req, res) => {
    res.json(data)
})

// show the planets
routes.get("/planets", (req, res) => {
    res.json(data.planets)
})

// show detailed info about a planet by name
routes.get("/planet{s}/:name", (req, res) => {
    const { id } = req.params
    let filtered = data.planets.filter((p) => p.name.toLowerCase() === id)
    res.json(filtered)
    console.log(req.params);
})

//show dwarf planets

// show detailed info about a dwarf planet by name


// show planets + dwarf planets in the same list



// show asteroids

// show galaxies

// /find/:string search for objects containing the specified string in their tags


routes.get("/planets/:id", (req, res)=> {
    console.log(req.params)
    const { id } = req.params
    console.log(id)
    let filtered = data.planets.filter((p) => p.id === id)
    res.json(filtered)
})


export default routes