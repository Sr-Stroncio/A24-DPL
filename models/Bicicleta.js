let Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
};

Bicicleta.allBicis = [];

Bicicleta.add = function (bici) {
    this.allBicis.push(bici);
};

Bicicleta.removeById = function (id) {
    for (let i = 0; i < this.allBicis.length; i++) {
        if (this.allBicis[i].id === id) {
            this.allBicis.splice(i, 1);
            return true;
        }
    }
    return false;
};

Bicicleta.update = function (id, color, modelo, latitud, longitud) {
    for (let bici of this.allBicis) {
        if (bici.id === id) {
            bici.color = color;
            bici.modelo = modelo;
            bici.ubicacion = [latitud, longitud];
            return bici;
        }
    }
    return null; // Si no encuentra la bicicleta
};


// Crear bicicletas de ejemplo
let a = new Bicicleta(1, "Rojo", "Trek", [28.503789, -13.853296]);
let b = new Bicicleta(2, "Azul", "Orbea", [28.501367, -13.853476]);
Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
