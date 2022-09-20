# LOG DE DESARROLLO
 ---
### **expedientes**
1. 15-6-22: redux env. ✔
2. 15-6-22: enrutadores. ✔
3. 15-6-22: rutas autenticadas: ✔ 
4. 15-6-22: rutas principales ✔
5. 15-6-22: sidebar adaptable ✔
6. 15-6-22: componente buscador **(FInder)** ✔ * (busca expediente) ✔
7. 15-6-22: componente buscador **(FInder)** ✔ * (cambia el state) ✔
8. 15-6-22: **_página activar_** > filtros en todos los campos. ✔
9. 15-6-22: **_página activar_** > el boton cancelar limpia el estado de expediente. ✔ 
10. 16-6-22: **_página activar_** > alerta cuando se busque un exp. que ya ha sido activado. ✔
11. 16-6-22: **_página activar_** > capturar el error de exp no encontrado. ✔
12. 16-6-22: **_página activar_** > enviar al servidor para actualizar el exp. ✔
13. 21-6-22: **_página activar_** > validacion si el exp. es de actuaciones fiscales. ✔
14. 23-6-22: **_página incorporar novedades_** > ya tiene búsqueda de expedientes. ✔ 
15. 30-6-22: **_página activar_** & **_página incorporar novedades_** > validacion si el exp. ya fue activado o no. ✔
16. 1-7-22: **_página activar_** > el año de exp. se setea automaticamente. la propiedad activo: true tambien (antes de activar/enviar al BE). ✔
17. 1-7-22. **_página activar_** > una alerta que indica que el exp. se activó. Con la opcion de ir a incorporar novedades o no.(!) CORRECION: el propio activar.jsx ya detecta el cambio de estado y dispara el setAlert con la consecuente limpieza del state. ✔
18. 5-7-22 **_ all _** > el BE valida cuando no existe una actuacion retorna error, el front.
19. 5-7-22 **_pagina activar_** > cuando se intenta activar una exp que no tiene actuacion ocurre un error y se muestra en el sistema de alertas. ✔
20. 5-7-22 **_pagina incorporar novedades_** > armando la pagina de incorporar novedades.➕➖
21. 5-7-22 componente ItemExpediente **(ExpteItem)** (muestra los exps. en el area en forma de cards). ➕➖
22. 1-8-22 **_pagina activar_** > agregar tipo de movimiento(solo en codigo !not en interfaz) & agregar Tipo De Novedad & reorganizar los elementos. ✔
23. 2-8-22 **_pagina activar_** > hacer que al terminar la ejecucion de la activacion se ejecute el movimiento. ✔
23. 2-8-22 **_pagina activar_** > validar que la cantidad de fojas del movimiento no sean menores que las del expediente. 🤔
24. 2-8-22. 
25. 3-8-22. **_pagina activar_** > corregir el regex del input del expte. electronico ✔
26. 3-8-22. modal con vista de datos de expte ✔
27. 4-8-22. modal de vista de datos de expediente incluye en un tab la opcion de hacer agregar novedad al expte. ✔
29. 5-8-22. **_pagina agregar novedad_** agregar la funcion de busqueda de carpetas en alfresco directamente. ✔
30. 8-8-22. redux > hacer reducer & action de expdiente (singular) est se dispara y se actualiza cuando se va a trabajar con un expediente en particular, por ej. en casos de cargar novedades/movimientos. ✔
31. 19-8-22. **_pagina agregar novedad_** generar filtros de pantalla de uso general.✔
32. 19-8-22. **_pagina agregar novedad_** cuando se traen exps. al area debe de aparecer un mens que diga que no hay exps.✔
33. 22-8-22. agregar loadings!!😥➕➖
34. 23-8-22. agregar al estado de datos para envíar a agregar novedad: idArchivo, y detalles.➕➖
35. 30-8-22. **_REFACTORING_** => cambiar el texto de los botones de la tabla, que contemple no solo agregar novedad sino que agregar movimientos✔
36. 1-9-22. **_VALIDACIONES_** => implementar validación de MIME type, subida de archivos.
37. 1-9-22. **_pagina agregar novedad_** agregar el id(mongo) del area cuando se envíe.
38. 1-9-22. **_pagina moviemiento_** agregar el id(mongo) del area cuando se envíe & EVITAR QUE no se envíe a la misma area en la que se encuentra.➕➖