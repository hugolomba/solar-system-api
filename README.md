# 🌌 Solar System API

This is a simple RESTful API that provides information about celestial objects such as planets, dwarf planets, asteroids, and galaxies.  
The project is built with **Node.js** and **Express**.

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/solar-system-api.git
cd solar-system-api
npm install
```

---

## 🚀 Running the server

Start the development server:

```bash
npm start
```

By default, the API runs on **http://localhost:3000**

---

## 🔭 Available Routes

- `GET /` → Welcome message and available routes  
- `GET /all` → Retrieve the complete dataset  
- `GET /planets` → List all planets  
- `GET /planets/:name` → Get detailed information about a specific planet  
- `GET /dwarf-planets` → List all dwarf planets  
- `GET /dwarf-planets/:name` → Get detailed information about a specific dwarf planet  
- `GET /planets-and-dwarfs` → List all planets and dwarf planets together  
- `GET /asteroids` → List all asteroids  
- `GET /galaxies` → List all galaxies  
- `GET /find/:tag` → Search for objects by tag (supports partial search)  

---

## 🖼 Serving Images

Static images are available under the `/files` route. Example:

```
http://localhost:3000/files/images/planets/earth.png
```

---

## ⚠️ Error Handling

- `404` → Returned when a resource is not found  
- `500` → Returned for unexpected server errors  

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
