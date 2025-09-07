import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../src/data/data.json");

let data;
try {
    data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} catch (error) {
    console.error("Error reading data.json:", error);
    process.exit(1);
}

const routes = Router()

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
routes.get("/all", (req, res, next) => {
    try {
        res.json(data);
    } catch (error) {
        next(error);
    }
})

// show the planets
routes.get("/planets", (req, res, next) => {
    try {
        res.json(data.planets);
    } catch (error) {
        next(error);
    }
});

// show detailed info about a planet by name
routes.get("/planet{s}/:name", (req, res, next) => {
    try {
        const { name } = req.params
        let filteredPlanet = data.planets.find((p) => normalizeInput(p.name) === normalizeInput(name))
        if (!filteredPlanet) res.status(404).json({ message: `Planet '${req.params.name}' not found.` });
        res.json(filteredPlanet)

    } catch(error) {
        next(error)
    }
  
})

//show dwarf planets
routes.get("/dwarf-planets", (req, res, next) => {
    try {
        res.json(data.dwarfPlanets);
    } catch (error) {
        next(error);
    }

})

// show detailed info about a dwarf planet by name
routes.get("/dwarf-planet{s}/:name", (req, res, next) => {
    try{
     const { name } = req.params
    let filteredDwarfPlanet = data.dwarfPlanets.find((p) => normalizeInput(p.name) === normalizeInput(name))
    if (!filteredDwarfPlanet) res.status(404).json({ message: `Dwarf planet '${req.params.name}' not found.`})
    res.json(filteredDwarfPlanet)
    } catch (error) {
        next(error)
    }
   
})

// show detailed info about a dwarf planet by name
routes.get("/dwarf-planet{s}/:name", (req, res, next) => {
    try{
     const { name } = req.params
    let filteredDwarfPlanet = data.dwarfPlanets.find((p) => normalizeInput(p.name) === normalizeInput(name))
    if (!filteredDwarfPlanet) res.status(404).json({ message: `Dwarf planet '${req.params.name}' not found.`})
    res.json(filteredDwarfPlanet)
    } catch (error) {
        next(error)
    }

})

// show planets + dwarf planets in the same list
routes.get("/planets-and-dwarfs", (req, res, next) => {
     try {
        res.json([...data.planets, ...data.dwarfPlanets]);
    } catch (error) {
        next(error);
    }
    
})

// show asteroids
routes.get("/asteroids", (req, res, next) => {
    try {
        res.json(data.asteroids);
    } catch (error) {
        next(error);
    }
})

// show galaxies
routes.get("/galaxies", (req, res, next) => {
    try {
        res.json(data.galaxies);
    } catch (error) {
        next(error);
    }
})

// /find/:string search for objects containing the specified string in their tags
routes.get("/find/:tag", (req, res, next)=> {
    try {
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

    if (Object.keys(results).length === 0) {
            return res.status(404).json({ message: `No objects found for tag '${req.params.tag}'.` });
    }
    res.json(results);
    } catch (error) {
        next(error)
    }
})

// Global middleware 
routes.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong on the server.", error: err.message });
});



export default routes