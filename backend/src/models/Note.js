import mongoose from "mongoose";

// los squemas sirven para definir las estructuras y reglas 
//que deben tener un conjunto de datos, como un objeto o un documento
// 1- Create a schema
// 2- Create a model based off of that schema

//1
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {timestamps: true}); //mongodb by default will give you the createdAt, updatedAt

//2 - creamos los model para poder interactuar con la base de datos usando ese schema
const Note = mongoose.model("Note", noteSchema)
// "Note" es el nombre del modelo
// "noteSchema": es el schema que definiste con la estructura de cada nota
// "Note": es ahora un objeto que te permite crear, leer, actualizar y borrar documentos de notas en la base de datos, siguiendo la estructura del schema

export default Note;

