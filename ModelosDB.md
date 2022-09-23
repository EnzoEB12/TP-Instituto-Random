
# **MODELO DE BASE DE DATOS**
### Brito Enzo Exequiel

#### *Las Colecciones Creadas:⬇.*

- [Usuarios](####USUARIOS)
- [Materias](####MATERIAS)
- [Publicaciones](####PUBLICACIONES)
- [Comentarios](####COMENTARIOS)

#

####  **USUARIOS**
```js
{
    nombre: {type: String,required: true},
    apellido: {type: String,required: true},
    dni: {type: String,required: true},
    email: {type: String,required: true},
    contrasena: {type: String,required: true},
    fotoURL:{type: String,required: true},
    Perfiles [
        {
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
            ]
        }
    ],
    activo: {type: Boolean,default: true}
}
```
####  **MATERIAS**
```js
{
    descripcionMateria: {type: String,require: true,},
    profTitular: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    profAux: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    carrera: {type: Schema.Types.ObjectId,ref: "Carreras",},
    anio: {type: String,required: true},
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
    inasistencia: [
    {
      dia: {type: Date,},
      idUser:{type: Schema.Types.ObjectId,ref: "User",},
    },
  ],
    activo: {type: Boolean,default: true}
}
```
####  **PUBLICACIONES**
```js
{
    autorNombre: {type: Schema.Types.ObjectId,ref: "User",},
    tipo: {type: String,required: true,},
    contenido: {type: String,required: true,},
    fecha: {type: Date,required: true,},
    imagenURL:{type: String,}
}
```

#### **COMENTARIOS**
```js
{
    autor: {type: Schema.Types.ObjectId,ref: "User",},
    descripcion: {type: String,required: true,},
},
```