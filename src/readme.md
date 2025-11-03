# Sistema REST para una Clínica Veterinaria

El sistema permite gestionar la información de una clínica veterinaria mediante una API REST construida con NestJS. Los módulos principales incluyen clientes, mascotas, historial clínico y turnos. Cada uno cuenta con validaciones, control de errores y su propia lógica de negocio.

---

## ClienteService

## Este módulo implementa operaciones CRUD para la gestion de clientes.

### `getAll()`

**Descripción:**  
Obtiene todos los clientes registrados en la base de datos.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para acceder al estado actual de la base.
- Verifica si `datos.clientes` existe y contiene al menos un elemento.
- Si el array está vacío o no existe, el método responde con un `NotFoundException` y el mensaje `"No hay clientes registrados"`.
- Si hay clientes, los devuelve como resultado.

---

### `getAllActivos()`

**Descripción:**  
Filtra y devuelve todos los clientes cuyo estado sea `"activo"`.

**Funcionamiento:**

- Accede a la base con `dbService.leerDB()`.
- Verifica que `datos.clientes` sea un array válido y no esté vacío.
- Si no hay clientes, devuelve un `NotFoundException` con el mensaje `"No hay clientes registrados"`.
- Aplica un filtro sobre el campo `estado` y retorna solo los que sean `"activo"`.
- Si no hay clientes activos, retorna un `NotFoundException` con el mensaje `"No hay clientes activos"`
- Retorna los clientes activos.

---

### `getAllInactivos()`

**Descripción:**  
Filtra y devuelve todos los clientes cuyo estado sea `"inactivo"`.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Verifica que el array de clientes exista y tenga elementos.
- Si no hay clientes, devuelve un `NotFoundException` con el mensaje `"No hay clientes registrados"`.
- Filtra por estado `"inactivo"` y retorna solo los `"inactivos"`.
- Si no hay clientes inactivos, retorna un `NotFoundException` con el mensaje `"No hay clientes inactivos"`
- Retorna los clientes inactivos.

---

### `getById(id: number)`

**Descripción:**  
Busca un cliente por su id.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para obtener los datos.
- Usa `find()` para encontrar el cliente con el ID indicado.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe un cliente con ID ${id}"`.
- Si lo encuentra, lo retorna directamente.

---

### `createCliente(dto: CreateClienteDto)`

**Descripción:**  
Registra un nuevo cliente en la base de datos.

**Campos esperados (`CreateClienteDto`):**

- `dni`: string numérico, obligatorio, exactamente 8 dígitos.
- `nombre`: string, obligatorio, se transforma a minúsculas.
- `telefono`: string numérico, obligatorio, exactamente 10 dígitos.
- `direccion`: string, obligatorio, mínimo 4 caracteres, debe contener al menos un número.
- `mail`: string, opcional, debe ser un email válido.
- `estado`: string, opcional, debe ser `"activo"` o `"inactivo"`.

- todos se transforman con trim().toLowerCase().

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Inicializa `datos.clientes` si no existe.
- Verifica si ya existe un cliente con el mismo `dni`. Si lo encuentra, rechaza la operación con un `BadRequestException` y el mensaje correspondiente.
- Valida que la dirección incluya al menos un número. Si no lo cumple, devuelve un `BadRequestException` con el mensaje `"La dirección debe incluir al menos un número"`.
- Calcula el nuevo ID recorriendo los clientes existentes.
- Crea el objeto `ClienteModel`, asignando valores por defecto a `mail` y `estado` si no están presentes.
- Agrega el nuevo cliente al array.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el cliente recién creado.

---

### `updateCliente(id: number, dto: UpdateClienteDto)`

**Descripción:**  
Modifica parcialmente los datos de un cliente existente.

**Campos permitidos (`UpdateClienteDto`):**

- `dni`: string numérico, opcional, exactamente 8 dígitos.
- `nombre`: string, opcional.
- `telefono`: string numérico, opcional, exactamente 10 dígitos.
- `direccion`: string, opcional, mínimo 4 caracteres, debe contener al menos un número.
- `mail`: string, opcional, debe ser un email válido.
- `estado`: string, opcional, debe ser `"activo"` o `"inactivo"`.

**Condiciones de modificación:**

- Cada campo se actualiza **solo si el nuevo valor es distinto al actual**.
- Si el nuevo `dni` está en uso por otro cliente, la operación se rechaza con un `BadRequestException`.
- Si se modifica la dirección y no contiene número, se devuelve un `BadRequestException`.
- Si no se incluye ningún campo o todos coinciden con los valores actuales, no se realiza ninguna modificación.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Busca el cliente por ID. Si no lo encuentra, responde con un `NotFoundException`.
- Aplica las modificaciones campo por campo según las condiciones anteriores.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el cliente actualizado.

---

### `deleteCliente(id: number)`

**Descripción:**  
Elimina un cliente por su ID.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para obtener los datos actuales.
- Busca el índice del cliente con ese ID usando `findIndex()`.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe un cliente con ID ${id}"`.
- Elimina el cliente del array con `splice()`.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el cliente.

---

## MascotaService

Este módulo permite crear, consultar, modificar y eliminar registros de mascotas. Incluye validaciones, tipos de datos esperados y condiciones de modificación.

---

### `getAll()`

**Descripción:**  
Obtiene todas las mascotas registradas en la base de datos.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para acceder al estado actual de la base.
- Verifica si `datos.mascotas` existe y contiene al menos un elemento.
- Si el array está vacío o no existe, responde con un `NotFoundException` y el mensaje `"No hay mascotas registradas"`.
- Si hay mascotas, las devuelve como resultado.

---

### `getAllActivos()`

**Descripción:**  
Filtra y devuelve todas las mascotas cuyo estado sea `"activo"`.

**Funcionamiento:**

- Accede a la base con `dbService.leerDB()`.
- Si `datos.mascotas` no existe o está vacío, retorna un array vacío.
- Aplica un filtro sobre el campo `estado` y retorna solo los que sean `"activo"`.
- Si no hay mascotas activas, retorna un `NotFoundException` con el mensaje `"No hay mascotas activas"`
- Retorna las mascotas activas.

---

### `getAllInactivos()`

**Descripción:**  
Filtra y devuelve todas las mascotas cuyo estado sea `"inactivo"`.

**Funcionamiento:**

- Accede a la base con `dbService.leerDB()`.
- Si `datos.mascotas` no existe o está vacío, retorna un array vacío.
- Filtra por estado `"inactivo"` y devuelve el resultado.
- Si no hay mascotas inactivas, retorna un `NotFoundException` con el mensaje `"No hay mascotas inactivas"`
- Retorna las mascotas inactivas.

---

### `getById(id: number)`

**Descripción:**  
Busca una mascota por su identificador numérico.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para obtener los datos.
- Usa `find()` para encontrar la mascota con el ID indicado.
- Si no la encuentra, responde con un `NotFoundException` y el mensaje `"No existe una mascota con ID ${id}"`.
- Si la encuentra, retorna la mascota.

---

### `createMascota(dto: CreateMascotaDto)`

**Descripción:**  
Registra una nueva mascota en la base de datos.

**Campos esperados (`CreateMascotaDto`):**

- `nombre`: string, obligatorio, se transforma con value.trim().toLowerCase().
- `especie`: string, obligatorio, se transforma con value.trim().toLowerCase().
- `raza`: string, obligatorio, se transforma con value.trim().toLowerCase().
- `edad`: número entero, obligatorio, mayor a 0.
- `sexo`: string, obligatorio, debe ser `"macho"` o `"hembra"`.
- `clienteId`: número entero, obligatorio, mayor a 0.
- `estado`: string, opcional, debe ser `"activo"` o `"inactivo"`.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Inicializa `datos.mascotas` si no existe.
- Verifica que exista el array de clientes. Si no existe, responde con un `BadRequestException` y el mensaje `"No hay clientes registrados"`.
- Verifica que el `clienteId` esté asociado a un cliente existente. Si no lo encuentra, responde con un `NotFoundException`.
- Calcula el nuevo ID recorriendo las mascotas existentes.
- Crea el objeto `MascotaModel` con los datos recibidos.
- Agrega la nueva mascota al array.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna la mascota creada.

---

### `updateMascota(id: number, dto: UpdateMascotaDto)`

**Descripción:**  
Modifica parcialmente los datos de una mascota existente.

**Campos permitidos (`UpdateMascotaDto`):**

- `nombre`: string, opcional. Se transforma con value.trim().toLowerCase()
- `especie`: string, opcional. Se transforma con value.trim().toLowerCase()
- `raza`: string, opcional. Se transforma con value.trim().toLowerCase()
- `edad`: número entero, opcional, mayor a 0.
- `sexo`: string, opcional, debe ser `"macho"` o `"hembra"`. Se transforma con value.trim().toLowerCase()
- `clienteId`: número entero, opcional, mayor a 0.
- `estado`: string, opcional, debe ser `"activo"` o `"inactivo"`. Se transforma con value.trim().toLowerCase()

**Condiciones de modificación:**

- Cada campo se actualiza **solo si el nuevo valor es distinto al actual**.
- Si se modifica el `clienteId`, se verifica que el cliente exista. Si no existe, responde con un `NotFoundException`.
- Si no se incluye ningún campo o todos coinciden con los valores actuales, no se realiza ninguna modificación.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Busca la mascota por ID. Si no la encuentra, responde con un `NotFoundException`.
- Aplica las modificaciones campo por campo según las condiciones anteriores.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna la mascota actualizada.

---

### `deleteMascota(id: number)`

**Descripción:**  
Elimina una mascota por su ID.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para obtener los datos actuales.
- Busca el índice de la mascota con ese ID usando `findIndex()`.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe una mascota con ID ${id}"`.
- Elimina la mascota del array con `splice()`.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna un objeto con el mensaje de confirmación.

---

## HistorialService

Este módulo permite registrar, consultar, modificar y eliminar entradas clínicas asociadas a mascotas. A continuación se detalla el comportamiento de cada método, incluyendo validaciones, tipos de datos esperados y condiciones de modificación.

---

### `getAll()`

**Descripción:**  
Obtiene todos los registros clínicos cargados en el historial.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para acceder al estado actual de la base.
- Verifica si `datos.historialMascotas` existe y contiene al menos un elemento.
- Si el array está vacío o no existe, responde con un `NotFoundException` y el mensaje `"No hay historial registrado"`.
- Si hay registros, los devuelve como resultado.

---

### `getById(id: number)`

**Descripción:**  
Busca un registro clínico por su identificador numérico.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Busca el historial con el ID indicado.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe historial con ID ${id}"`.
- Si lo encuentra, lo retorna directamente.

---

### `createHistorial(dto: CreateHistorialDto)`

**Descripción:**  
Registra una nueva entrada clínica en el historial de una mascota.

**Campos esperados (`CreateHistorialDto`):**

- `mascotaId`: número entero, obligatorio, mayor a 0.
- `fecha`: string, obligatorio, no puede ser futura. Se transforma con value.trim().
- `tipo`: string, obligatorio, se transforma a minúsculas. Se transforma con value.trim().toLowerCase().
- `descripcion`: string, obligatorio. Se transforma con value.trim().toLowerCase().
- `tratamiento`: string, opcional. Se transforma con value.trim().toLowerCase().
- `proximaAplicacion`: string, opcional, debe ser una fecha futura si se incluye. Se transforma con value.trim().
- `resultado`: string, opcional. Se transforma con value.trim().toLowerCase().
- `observacion`: string, opcional. Se transforma con value.trim().toLowerCase().

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Inicializa `datos.historialMascotas` si no existe.
- Verifica que la mascota exista. Si no, responde con un `BadRequestException`.
- Valida que la fecha no sea futura. Si lo es, responde con un `BadRequestException`.
- Si se incluye `proximaAplicacion`, valida que sea una fecha futura.
- Verifica que no exista un historial duplicado para la misma mascota, fecha y tipo. Si lo encuentra, rechaza la operación con un `BadRequestException`.
- Calcula el nuevo ID recorriendo los registros existentes.
- Crea el objeto `HistorialModel` con los datos recibidos.
- Agrega el nuevo historial al array.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el historial recién creado.

---

### `updateHistorial(id: number, dto: UpdateHistorialDto)`

**Descripción:**  
Modifica parcialmente un registro clínico existente.

**Campos permitidos (`UpdateHistorialDto`):**

- `mascotaId`: número entero, opcional, mayor a 0.
- `fecha`: string, opcional, no puede ser futura.
- `tipo`: string, opcional.
- `descripcion`: string, opcional.
- `tratamiento`: string, opcional.
- `proximaAplicacion`: string, opcional, debe ser una fecha futura si se incluye.
- `resultado`: string, opcional.
- `observacion`: string, opcional.

**Condiciones de modificación:**

- Cada campo se actualiza **solo si el nuevo valor es distinto al actual**.
- Si se modifica el `mascotaId`, se verifica que la mascota exista. Si no existe, responde con un `BadRequestException`.
- Si se modifica la `fecha`, se valida que no sea futura.
- Si se modifica `proximaAplicacion`, se valida que sea una fecha futura.
- Si no se incluye ningún campo o todos coinciden con los valores actuales, no se realiza ninguna modificación.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Busca el historial por ID. Si no lo encuentra, responde con un `NotFoundException`.
- Aplica las modificaciones campo por campo según las condiciones anteriores.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el historial actualizado.

---

### `deleteHistorial(id: number)`

**Descripción:**  
Elimina un registro clínico por su ID.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para obtener los datos actuales.
- Busca el índice del historial con ese ID usando `findIndex()`.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe historial con ID ${id}"`.
- Elimina el historial del array con `splice()`.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el historial eliminado.

---

## TurnosService

Este módulo permite registrar, consultar, modificar y eliminar turnos asignados a mascotas. A continuación se detalla el comportamiento de cada método, incluyendo validaciones, tipos de datos esperados y condiciones de modificación.

---

### `getAll()`

**Descripción:**  
Obtiene todos los turnos registrados en la base de datos.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para acceder al estado actual de la base.
- Verifica si `datos.turnos` existe y contiene al menos un elemento.
- Si el array está vacío o no existe, responde con un `NotFoundException` y el mensaje `"No hay turnos registrados"`.
- Si hay turnos, los devuelve como resultado.

---

### `getById(id: number)`

**Descripción:**  
Busca un turno por su identificador numérico.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Busca el turno con el ID indicado.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe un turno con ID ${id}"`.
- Si lo encuentra, lo retorna directamente.

---

### `getPendientes()`

**Descripción:**  
Devuelve todos los turnos cuyo estado sea `"pendiente"`.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Filtra los turnos por estado `"pendiente"`.
- Si no existe turnos pendientes, responde `"No existe un turnos pendientes"`.
- Si existen, los retorna.

---

### `getRealizados()`

**Descripción:**  
Devuelve todos los turnos cuyo estado sea `"realizado"`.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Filtra los turnos por estado `"realizado"`.
- Si no existen turnos realizados, responde `"No existe un turnos realizados"`.
- Si existen, los retorna.

---

### `create(dto: CreateTurnoDto)`

**Descripción:**  
Registra un nuevo turno para una mascota.

**Campos esperados (`CreateTurnoDto`):**

- `fecha`: string con formato ISO, obligatorio, no puede ser pasada.
- `motivo`: string, obligatorio, mínimo 3 caracteres, se transforma con value.trim().toLowerCase().
- `mascotaId`: número entero, obligatorio, mayor a 0.
- `estado`: string, obligatorio, debe ser `"pendiente"`, `"realizado"` o `"cancelado"`.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Inicializa `datos.turnos` si no existe.
- Valida que la fecha no sea pasada. Si lo es, responde con un `BadRequestException`.
- Verifica que la mascota exista. Si no existe, responde con un `NotFoundException`.
- Verifica que no exista un turno duplicado para la misma mascota en la misma fecha. Si lo encuentra, rechaza la operación con un `BadRequestException`.
- Calcula el nuevo ID recorriendo los turnos existentes.
- Crea el objeto `TurnoModel` con los datos recibidos.
- Agrega el nuevo turno al array.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el turno recién creado.

---

### `update(id: number, dto: UpdateTurnoDto)`

**Descripción:**  
Modifica parcialmente un turno existente.

**Campos permitidos (`UpdateTurnoDto`):**

- `fecha`: string con formato ISO, opcional.
- `motivo`: string, opcional, mínimo 3 caracteres. Se transforma con value.trim().toLowerCase().
- `mascotaId`: número entero, opcional, mayor a 0.
- `estado`: string, opcional, debe ser `"pendiente"`, `"realizado"` o `"cancelado"`. Se transforma con value.trim().toLowerCase().

**Condiciones de modificación:**

- Cada campo se actualiza **solo si el nuevo valor es distinto al actual**.
- Si se modifica la fecha y la mascota, se verifica que no exista un turno duplicado para esa combinación. Si existe, se rechaza con un `BadRequestException`.
- Si no se incluye ningún campo o todos coinciden con los valores actuales, no se realiza ninguna modificación.

**Funcionamiento:**

- Accede a los datos con `dbService.leerDB()`.
- Busca el turno por ID. Si no lo encuentra, responde con un `NotFoundException`.
- Aplica las modificaciones campo por campo según las condiciones anteriores.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el turno actualizado.

---

### `delete(id: number)`

**Descripción:**  
Elimina un turno por su ID.

**Funcionamiento:**

- Llama a `dbService.leerDB()` para obtener los datos actuales.
- Busca el índice del turno con ese ID usando `findIndex()`.
- Si no lo encuentra, responde con un `NotFoundException` y el mensaje `"No existe un turno con ID ${id}"`.
- Elimina el turno del array con `splice()`.
- Guarda los cambios con `dbService.guardarDB()`.
- Retorna el turno eliminado.
