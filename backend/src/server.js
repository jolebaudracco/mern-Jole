//We have the package imports at the top
import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path"

//here we have the route and all the local imports
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
} //This allows every request from every single URL


app.use(express.json()); // This middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
//     next();
// })

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
});
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started in PORT:", PORT)
    })
})