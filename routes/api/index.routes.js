import alumnosRutas from "./alumnos.routes.js";
import publicacionRutas from "./publicaciones.routes.js"
import adminsRutas from "./administradores.routes.js"
import carrerasRutas from "./carrera.routes.js"
import materiasRutas from "./materia.routes.js"
export const rutas = () => [
  alumnosRutas,
  publicacionRutas,
  adminsRutas,
  carrerasRutas,
  materiasRutas
];