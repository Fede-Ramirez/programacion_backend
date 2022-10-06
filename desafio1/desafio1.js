// Desafío 1: Clases

// Creo la clase Usuario con los métodos solicitados

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }   

    getFullName() {
        return (` ${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length; 
    }

    showMascotas(){
        return this.mascotas;
    }

    addBook(nombre, autor) {
        const book = {
            nombre: nombre,
            autor: autor
        };
        this.libros.push(book)
    }

    showBooks(){
        return this.libros;
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

// Creo mi usuario con valores arbitrarios

const usuario = new Usuario ("Federico","Ramirez",);

// Invocación de métodos

console.log(`El usuario es: ${usuario.getFullName()}`);
usuario.addMascota("conejo");
usuario.addMascota("gata");
console.log(`El usuario tiene ${usuario.countMascotas()} mascotas`);
console.log(`Mascotas del usuario: ${usuario.showMascotas()}`);
usuario.addBook("Las aventuras de Huckleberry Finn", "Mark Twain");
usuario.addBook("El Resplandor", "Stephen King");
console.log(usuario.showBooks());
console.log(`Nombres de los libros: ${usuario.getBookNames()}`);