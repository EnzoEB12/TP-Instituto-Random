
# **MODELO DE BASE DE DATOS**
### Brito Enzo Exequiel

#### *Las Colecciones Creadas:⬇.*

- [Usuarios](####USUARIOS)

- [Perfiles](####PERFILES)

- [Materias](####MATERIAS)

#

####  **USUARIOS**
```js
{
    nombre: {type: String,required: true},
    apellido: {type: String,required: true},
    dni: {type: String,required: true},
    email: {type: String,required: true},
    contrasena: {type: String,required: true},
    activo: {type: Boolean,default: true}
}
```
####  **PERFILES**
```js
{
    //Ref
    usuario: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    tipo: [
        {
            alumno:{type: Boolean,default: true},
            profesor:{type: Boolean,default: false},
            administrados:{type: Boolean,default: false},
        }
    ],
    dataAlumno:[
        {
            carrera:{type: String}, 
            analitico: {type: String},
            certificadoDomicilio: {type: String},
        }
    ],
    dataProfesores:[{datos: {type: String}}
    ],
    dataAdmin:[{datos: {type: String},}
    ],
    activo: {type: Boolean,default: true}
}
```
####  **MATERIAS**
```js
{
    profTitular: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    profAux: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    anio: {type: String,required: true},
    nombreMateria: {type: String,require: true,},
    horarioIncio: {type: String,require: true,},
    horarioFinal: {type: String,require: true,},
    notas:[
        {
            Alumno: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
            parcial1:{type: String,require: true,},
            parcial2:{type: String,require: true,},
            parcial3:{type: String,require: true,},
            recuperatorio:{type: String,require: true,},
            final:{type: String,require: true,},
            estado:{type: String,require: true,},
        }
    ],
    activo: {type: Boolean,default: true}
}
```