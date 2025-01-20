/**
 * @swagger
 * components:
 *   schemas:
 *     Bicicleta:
 *       type: object
 *       required:
 *         - id
 *         - color
 *         - modelo
 *         - ubicacion
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the bicycle
 *         color:
 *           type: string
 *           description: The color of the bicycle
 *         modelo:
 *           type: string
 *           description: The model of the bicycle
 *         ubicacion:
 *           type: array
 *           items:
 *             type: number
 *           description: The location of the bicycle (latitude and longitude)
 *       example:
 *         id: 1
 *         color: Rojo
 *         modelo: Trek
 *         ubicacion: [28.503789, -13.853296]
 */

/**
 * @swagger
 * tags:
 *   name: Bicicletas
 *   description: The bicycles managing API
 * /bicicletas:
 *   post:
 *     summary: Create a new bicycle
 *     tags: [Bicicletas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bicicleta'
 *     responses:
 *       200:
 *         description: The created bicycle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bicicleta'
 *       500:
 *         description: Some server error
 * /bicicletas/{id}:
 *   put:
 *     summary: Update a bicycle by id
 *     tags: [Bicicletas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bicycle id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bicicleta'
 *     responses:
 *       200:
 *         description: The updated bicycle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bicicleta'
 *       404:
 *         description: The bicycle was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a bicycle by id
 *     tags: [Bicicletas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bicycle id
 *     responses:
 *       200:
 *         description: The bicycle was deleted
 *       404:
 *         description: The bicycle was not found
 *       500:
 *         description: Some server error
 */


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
