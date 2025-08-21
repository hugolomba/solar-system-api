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
    if (!input) return ''
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
            "/planets-and-dwarfs": "List all planets and dwarf planets",
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
    const { name } = req.params
    let filtered = data.planets.filter((p) => p.name.toLowerCase() === normalizeInput(name))
    res.json(filtered)
    console.log(req.params);
})

//show dwarf planets
routes.get("/dwarf-planets", (req, res) => {
   
    res.json(data.dwarfPlanets)

})

// show detailed info about a dwarf planet by name
routes.get("/dwarf-planet{s}/:name", (req, res) => {
    const { name } = req.params
    let filtered = data.dwarfPlanets.filter((p) => p.name.toLowerCase() === normalizeInput(name))
    res.json(filtered)
})

// show planets + dwarf planets in the same list
routes.get("/planets-and-dwarfs", (req, res) => {
    let mergedPlanetsAndDwarfPlanets = [...data.planets, ...data.dwarfPlanets]
    res.json(mergedPlanetsAndDwarfPlanets)
    
})

// show asteroids
routes.get("/asteroids", (req, res) => {
    res.json(data.asteroids)
})

// show galaxies
routes.get("/galaxies", (req, res) => {
    res.json(data.galaxies)
})

// /find/:string search for objects containing the specified string in their tags
routes.get("/find/:tag", (req, res)=> {
   const { tag } = req.params;
    const normalizedTag = normalizeInput(tag);
    const results = {};

    for (const category in data) {
        const filteredItems = data[category].filter(item =>
            item.searchTags.some(t => normalizeInput(t).includes(normalizedTag))
        );

        if (filteredItems.length > 0) {
            results[category] = filteredItems;
        }
    }

    res.json(results);
})


export default routes