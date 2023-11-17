const pool = require('../config/databaseController');

module.exports = {
    // Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() => {
        try{
            const result = await pool.query('SELECT * FROM estudiantes')
            return result;
        }catch(error){
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
        
    },

    // Eliminar un estudiante
    eliminarEstudiante: async(idestudiante) => {
    try{
          const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
          return result.affectedRows > 0;
    }catch(error){
           console.error('Erro al eliminar el registro', error);
    }
    },

    // Insertar un estudiante
    insertarEstudiante: async(nuevoEstudiante) => {
        try{
          const result = await pool.query("INSERT INTO estudiantes SET ? ", nuevoEstudiante);
          return result.insertId;

        }catch(error){
          console.error('Erro al insertar el registro', error);
        }
    },

    // Editar un estudiante
    editarEstudiante: async(idestudiante, actualizacion) => {
        try{
          const resultado = await pool.query("UPDATE estudiantes SET ? WHERE idestudiante =  ?", [actualizacion, idestudiante]);
          return resultado;

        }catch(error){
          console.error('Erro al editar el registro', error);
        }
    },

    obtenerEstudiante: async(idestudiante) => {
      try{
          console.log('ID ESTUDIANTE', idestudiante)
          const [result] = await pool.query('SELECT * FROM estudiantes where idestudiante = ?', [idestudiante])
          console.error('prueba ', result);
          return result;
      }catch(error){
          console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
      }
      
  }
    
}
