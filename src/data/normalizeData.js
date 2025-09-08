import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Valor padrão para satellites
const emptySatellites = { number: 0, names: [] };

// Normaliza qualquer corpo do sistema solar
function normalizeBody(body) {
  return {
    ...body,
    introduction: body.introduction || "",
    images: {
      png: body.images?.png || "",
      svg: body.images?.svg,
    },
    searchTags: body.searchTags || [],
    atmosphere: body.atmosphere || [],
    discovery: {
      year: body.discovery?.year || "",
      by: body.discovery?.by || "",
    },
    curiosities: body.curiosities || [],
    geography: body.geography || "",
    features: {
      ...body.features,
      satellites: body.features?.satellites || emptySatellites,
    },
  };
}

// Normaliza todo o dataset
function normalizeSolarSystemData(data) {
  return {
    stars: data.stars.map(normalizeBody),
    planets: data.planets.map(normalizeBody),
    dwarfPlanets: data.dwarfPlanets.map(normalizeBody),
    asteroids: data.asteroids.map(normalizeBody),
    galaxies: data.galaxies.map(normalizeBody),
  };
}

// __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o JSON original
const dataPath = path.join(__dirname, "data.json");

// Caminho para o JSON normalizado
const outputPath = path.join(__dirname, "data.normalized.json");

// Lê o JSON original
const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Normaliza os dados
const normalizedData = normalizeSolarSystemData(rawData);

// Salva em um novo arquivo
fs.writeFileSync(outputPath, JSON.stringify(normalizedData, null, 2), "utf-8");

console.log("Arquivo normalizado criado em:", outputPath);