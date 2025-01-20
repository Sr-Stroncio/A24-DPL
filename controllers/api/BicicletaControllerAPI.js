/**
 * @swagger
 * tags:
 *   name: Bicicletas
 *   description: The bicycles managing API
 * /bicicletas:
 *   get:
 *     summary: Lists all the bicycles
 *     tags: [Bicicletas]
 *     responses:
 *       200:
 *         description: The list of the bicycles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../../models/Bicicleta'
 *   post:
 *     summary: Create a new bicycle
 *     tags: [Bicicletas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../../models/Bicicleta'
 *     responses:
 *       200:
 *         description: The created bicycle.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../models/Bicicleta'
 *       500:
 *         description: Some server error
 * /bicicletas/{id}:
 *   get:
 *     summary: Get the bicycle by id
 *     tags: [Bicicletas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bicycle id
 *     responses:
 *       200:
 *         description: The bicycle response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../models/Bicicleta'
 *       404:
 *         description: The bicycle was not found
 *   put:
 *     summary: Update the bicycle by id
 *     tags: [Bicicletas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bicycle id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../../models/Bicicleta'
 *     responses:
 *       200:
 *         description: The bicycle was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../../models/Bicicleta'
 *       404:
 *         description: The bicycle was not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the bicycle by id
 *     tags: [Bicicletas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bicycle id
 *     responses:
 *       200:
 *         description: The bicycle was deleted
 *       404:
 *         description: The bicycle was not found
 */




let Bicicleta = require("../../models/Bicicleta");

exports.bicicleta_list = (req, res) => {
    res.status(200).json({ bicicletas: Bicicleta.allBicis });
};

exports.bicicleta_create = (req, res) => {
    const { id, color, modelo, latitud, longitud } = req.body;

    if (!id || !color || !modelo || !latitud || !longitud) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    let bici = new Bicicleta(id, color, modelo, [latitud, longitud]);
    Bicicleta.add(bici);

    res.status(201).json({ bicicleta: bici });
};

exports.bicicleta_delete = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = Bicicleta.removeById(id);

    if (deleted) {
        res.status(200).json({ message: "Bicicleta eliminada" });
    } else {
        res.status(404).json({ error: "Bicicleta no encontrada" });
    }
};

exports.bicicleta_update = (req, res) => {
    const id = parseInt(req.params.id);
    const { color, modelo, latitud, longitud } = req.body;

    if (!color || !modelo || !latitud || !longitud) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const updatedBici = Bicicleta.update(id, color, modelo, latitud, longitud);

    if (updatedBici) {
        res.status(200).json({ bicicleta: updatedBici });
    } else {
        res.status(404).json({ error: "Bicicleta no encontrada" });
    }
};
