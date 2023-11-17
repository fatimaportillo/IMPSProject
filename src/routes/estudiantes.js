const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los estudiantes
router.get('/', isLoggedIn, async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

     response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', isLoggedIn, async(request, response) => {
   
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

    // Renderizamos el formulario
    response.render('estudiantes/agregar', {lstCarreras});
});

// Endpoint para agregar un estudiante
router.post('/agregar', isLoggedIn, async(request, response) => {
    const { accion, idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    // Se trata de una insercion
    const resultado = await queries.insertarEstudiante(nuevoEstudiante);
    
    response.redirect('/estudiantes');
});


// Endpoint que permite mostrar el formulario para modificar un estudiante
router.get('/modificar/:idestudiante', isLoggedIn, async(request, response) => {
    const {idestudiante} = request.params; 
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();

    // Aca es de obtener el objeto del estudiante
    const estudiante = await queries.obtenerEstudiante(idestudiante);

    response.render('estudiantes/editar', {lstCarreras, idestudiante, estudiante});
});

// Endpoint que permite actualizar un estudiante
router.post('/modificar/:id', isLoggedIn, async(request, response) => {
    const {id} = request.params; 
    const {  idestudiante, nombre,apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const actualizacion = await queries.editarEstudiante(id, nuevoEstudiante);

    response.redirect('/estudiantes');

});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

module.exports = router;

