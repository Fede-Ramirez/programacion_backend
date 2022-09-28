// Desafío 1: Clases

// Creo la clase Usuario con los métodos solicitados

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }   

    getFullName() {
        return console.log(`El usuario es ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
        console.log(this.mascotas)
    }

    countMascotas(){
        return console.log(this.mascotas.length); 
    }

    addBook(nombre, autor) {
        this.libros.push({
            nombre: nombre,
            autor: autor
        });
        console.log(this.libros)
    }

    getBookNames() {
        return console.log(this.libros.map(libro => libro.nombre));
    }
}

// Creo mi usuario con valores arbitrarios

const usuario = new Usuario (
    "Federico",
    "Ramirez",
    [
        {nombre:"El Resplandor", autor: "Stephen King"},
        {nombre: "Dune", autor: "Frank Herbert"},
    ],
    ["perro", "gato"]
)

// Invocación de métodos

usuario.getFullName();
usuario.addMascota("conejo");
usuario.countMascotas();
usuario.addBook("Las aventuras de Huckleberry Finn", "Mark Twain");
usuario.getBookNames();