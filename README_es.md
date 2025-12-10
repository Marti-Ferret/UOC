# PJP PEC 3

En esta PEC se practican las técnicas de programación asíncrona en JavaScript: _callbacks_, promesas y _async/await_, así como las diferentes combinaciones entre ellas.

## Competencias

En esta PEC se desarrollan las siguientes competencias del Máster:

- [CB10] Que los estudiantes posean las habilidades de aprendizaje que les permitan continuar estudiando de una manera que tendrá que ser en gran medida autodirigida o autónoma.
- [CG2] Resolver problemas, identificando, analizando y definiendo sus elementos significativos.
- [CE3] Utilizar de manera adecuada los lenguajes de programación y las mejores herramientas de desarrollo para el análisis, el diseño y la implementación de lugares y aplicaciones web en función de las necesidades del proyecto.
- [CE5] Aplicar de la manera más adecuada los patrones de arquitectura de software más conveniente para cada problema.

## Objetivos

Los objetivos concretos de esta PEC son:

- Aprender a utilizar JavaScript y sus características básicas.
- Contribuir a conocer a fondo el lenguaje JavaScript para poder usarlo en el desarrollo de aplicaciones Web.
- Usar las técnicas de programación asíncrona que JavaScript ofrece.

## Entrega de la PEC

Una vez hayas realizado las actividades prácticas propuestas en este enunciado, **la entrega se realizará a través del apartado del aula virtual de la UOC**.

## Puntuación

El hecho de trabajar con tests para verificar la funcionalidad del código os permitirá tener una idea de vuestra propia nota antes de la entrega.

La puntuación de los ejercicios prácticos se basa en dos criterios: **Funcionalidad** e **Implementación**. Se espera que los ejercicios funcionen correctamente (pasen los tests) y que la implementación (el código) tenga una calidad adecuada.

Algunos detalles a tener en cuenta:

- Se penalizará cualquier intento de _hardcodear_ los tests para forzar que pasen. Esta técnica consiste en cambiar la implementación para que devuelva únicamente el valor esperado por el test (cualquier otro test fallaría).
- Los tests automáticos están diseñados para detectar ejercicios erróneos o incompletos para casos concretos. El hecho de que un test pase no garantiza que el ejercicio esté realizado correctamente, es decir, que cubra todos los casos.
- Un ejercicio cuyos tests no pasan se puntuará con un 0 salvo que existan problemas con el test.
- Además de pasar los tests, el profesorado evaluará vuestro código en base a los siguientes criterios:
  - Legibilidad, sencillez y calidad del código.
  - Conocimientos de programación. Por ejemplo, no utilizar las estructuras de control adecuadas, como utilizar un bucle para construir una sentencia condicional o viceversa.

## Requisitos mínimos

- Tener instalado Visual Studio Code.
- Estudio de la introducción y repaso a JavaScript (Actividad 1 del Reto 2).
- Estudio de los conceptos de JavaScript (Actividades 2 y 3 del Reto 2).
- Estudio de la introducción a la asincronía en JavaScript (Actividad 1 del Reto 3).
- Estudio de los conceptos de asincronía de JavaScript (Actividad 2 del Reto 3).

## Actividades del reto (0,5ps)

Recuerda que este reto tiene asociadas dos actividades de evaluación que también deberás realizar. En particular, son las actividades 1.2 y 2.2, que encontrarás en el aula virtual.

## Ejercicios prácticos (9,5p)

Para realizar los ejercicios prácticos debes dirigirte a la siguiente ruta, dentro del repositorio: `src/pec3/pec3.js`.
En este fichero deberás implementar las funciones que te indicamos en los ejercicios que verás más abajo.

Por otro lado, los tests que te permitirán saber si la solución que propones para los ejercicios es correcta están en el fichero `src/pec3/pec3.test.js`.
**No debes editar este fichero**.
Ten en cuenta que los tests son condiciones que deben cumplir las funciones que implementarás en los ejercicios, por lo que pueden servirte de ayuda para corregirlos.

### Preparando el entorno

Una vez hecho **clone** del repositorio, debes instalar las dependencias del proyecto.

```
npm install
```

A continuación, para lanzar los tests debes ejecutar el siguiente comando:

```
npm test
```

La instrucción anterior lanzará los tests cada vez que guardes el fichero `src/pec3/pec3.js`, que es precisamente donde implementarás los ejercicios de esta PEC.

Tal y como te indicamos en la PEC 1, la primera vez que ejecutes `npm test` y se lancen los tests, muy posiblemente fallarán todos, ya que no hay ningún ejercicio implementado. Conforme vayas trabajando en los ejercicios y guardes el fichero, puede que algún test lance algún error. Revisa el mensaje de error que se imprime para conocer su formato y entender cómo se notifican los errores.

Si tienes algún problema con los tests, no dudes en preguntar en el foro "Dudas PEC 3 | Dubtes PAC 3" del aula.

### Ejercicio 1 · Resumir artículos del carrito con un callback (2 pts)

En este ejercicio practicaremos el uso de _callbacks_ para gestionar la asincronía en JavaScript.

#### Conceptos tratados

- Uso de funciones _callback_
- Manipulación de arrays y objetos.
- Validación de parámetros de entrada.

#### Enunciado

Implementa la función:

```js
function summarizeCartItems(cartItems, callback) { ... }
```

**Objetivo**

- Validar una lista de artículos del carrito (`cartItems`) y obtener totales útiles usando un callback (`callback(error, summary)`).

**Requisitos**

- Si la entrada es válida, calcula la cantidad total, el precio total y la lista ordenada de identificadores y compón el objeto `summary` con la siguiente estructura: `{ totalItems, totalPrice, itemIds }`. Invoca el callback con el valor de error a `null` y el objeto `summary`.
- Si la entrada es inválida, invoca el callback con `error` siendo un string describiendo el error y `summary` siendo `null`.
- La entrada es válida si `cartItems` es un array no vacío de objetos con la siguiente estructura: `{ id: Number, price: Number, quantity: Number }`, donde `quantity` y `price` son positivos.

**Ejemplo**

```js
const cart = [
  { id: 401, price: 35.5, quantity: 2 },
  { id: 208, price: 12, quantity: 1 },
];

summarizeCartItems(cart, (error, summary) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(summary);
});
// { totalItems: 3, totalPrice: 83, itemIds: [208, 401] }
```

### Ejercicio 2 · Promesa que ejecuta un callback (2 pts)

En este ejercicio practicaremos el uso de promesas simples y temporizadores para simular retrasos en una API.

#### Conceptos tratados

- Gestión asíncrona mediante promesas.
- Temporizadores (`setTimeout`).
- Comunicación combinada de promesas y callbacks.

#### Enunciado

Implementa la función:

```js
function fetchUserRecommendations(userId, callback) { ... }
```

**Objetivo**

- Devolver una promesa que simule la entrega de recomendaciones personalizadas y que, además, notifique mediante un callback.

**Requisitos**

- La función debe devolver una promesa que se resuelve tras 200 ms.
- Antes de resolver, ejecuta `callback(null, payload)`, donde `payload` es un objeto `{ userId, recommendations }` y `recommendations` es un array con tres cadenas de texto.
- Si `userId` no es un entero positivo, llama a `callback(error, null)`, donde `error` es un error `Error("Invalid user id")` y rechaza la promesa devuelta con el mismo error.

**Ejemplo**

```js
fetchUserRecommendations(99, (error, payload) => {
  if (!error) {
    console.log("Recommendations:", payload.recommendations);
  }
})
  .then((result) => {
    console.log("Promise resolved", result);
  })
  .catch((err) => {
    console.error("Promise failed", err.message);
  });
// (After 200 ms)
// Recommendations: [ 'Top pick for user 99', 'Trending in your area', 'Customers too enjoyed' ]
// Promise resolved { userId: 99, recommendations: [ 'Top pick for user 99', 'Trending in your area', 'Customers too enjoyed' ] }
```

### Ejercicio 3 · Promesa con lógica de resolución y rechazo (1 pts)

En este ejercicio practicaremos la creación de promesas que gestionan flujos de éxito y error con reglas de negocio.

#### Conceptos tratados

- Control de flujo con promesas.
- Validación de parámetros numéricos.
- Manejo de errores mediante `Promise.reject`.

#### Enunciado

Implementa la función:

```js
function authorizeOrderPayment(amount) { ... }
```

**Objetivo**

- Implementar un flujo de control con promesas que verifique o rechace una petición de pago según su valor.

**Requisitos**

- Devuelve una promesa que se resuelva con `{ status: "approved", amount }` cuando `amount` sea un número positivo menor o igual que 2500.
- Rechaza con `Error("Order total too high")` si la cantidad supera 2500.
- Rechaza con `Error("Invalid order amount")` si la cantidad no es un número o es menor o igual que cero.

**Ejemplo**

```js
authorizeOrderPayment(1999)
  .then(console.log)
  .catch((error) => console.error(error.message));
// { status: 'approved', amount: 1999 }

authorizeOrderPayment(9000).catch((error) => console.error(error.message));
// "Order total too high"
```

### Ejercicio 4 · Encadenar diferentes promesas (1,5 pts)

En este ejercicio practicaremos cómo coordinar llamadas asíncronas dependientes utilizando encadenamiento de promesas.

#### Conceptos tratados

- Encadenamiento de promesas.
- Propagación y transformación de errores.

#### Enunciado

Implementa la función:

```js
function buildCustomerOnboarding(fetchCustomerProfile, fetchSubscription, fetchWelcomePack) { ... }
```

**Objetivo**

- Conectar tres pasos asíncronos mediante encadenamiento de promesas para crear un paquete de bienvenida.

**Requisitos**

- `fetchCustomerProfile()` devuelve una promesa que resuelve con un objeto cliente `{ id, name }`.
- Utiliza el `customer.id` recibido para llamar a `fetchSubscription(id)`, que devuelve una promesa con la información de la suscripción.
- Pasa un objeto `{ customer, subscription }` a `fetchWelcomePack()` y resuelve la promesa externa con lo que retorne `fetchWelcomePack`.
- Si algún paso falla, rechaza con `Error("Onboarding failed: <message>")`, donde `<message>` es el mensaje del error original.

**Ejemplo**

```js
const fetchCustomerProfile = () => Promise.resolve({ id: 12, name: "Alex" });
const fetchSubscription = (id) => Promise.resolve({ plan: "pro", userId: id });
const fetchWelcomePack = (data) =>
  Promise.resolve({ ...data, welcomeEmailSent: true });

buildCustomerOnboarding(
  fetchCustomerProfile,
  fetchSubscription,
  fetchWelcomePack
)
  .then((bundle) => console.log(bundle))
  .catch((error) => console.error(error.message));
// {
//   customer: { id: 12, name: 'Alex' },
//   subscription: { plan: 'pro', userId: 12 },
//   welcomeEmailSent: true
// }
```

### Ejercicio 5 · Flujo con async/await (1,5 pts)

En este ejercicio practicaremos la composición de datos asíncronos empleando sintaxis `async/await` y bloques `try/catch`.

#### Conceptos tratados

- Funciones `async` y uso de `await`.
- Manejo de errores con `try/catch`.
- Integración de múltiples fuentes de datos asíncronas.

#### Enunciado

Implementa la función:

```js
async function loadPerformanceReport(fetchMetrics, processMetrics) { ... }
```

**Objetivo**

- Combinar dos fuentes de datos asíncronas con async/await y un manejo de errores estructurado.

**Requisitos**

- La función `loadPerformanceReport` debe devolver un objeto `{ warehouse, stats, average }`.
- Para ello, usa la función asíncrona `fetchMetrics()`, que debe devolver un objeto `{ warehouse, stats }`, donde `stats` es un array de `Number` de mínimo 2 valores. Con la información de `stats`, llama la función asíncrona `processMetrics(stats)` que devuelve la media de los valores en un objeto `{ average }`.
- Si alguna función asíncrona falla, lanza `Error("Failed to load performance report: <message>")`, sustituyendo `<message>` por el error original.

**Ejemplo**

```js
async function demo() {
  const report = await loadPerformanceReport(
    () =>
      Promise.resolve({
        warehouse: "fulfillment-hub",
        stats: [31, 12, 5, 10, 1, 28],
      }),
    (stats) =>
      Promise.resolve({
        average: // ...
      })
  );

  console.log(report);
}

demo();
// {
//   warehouse: 'fulfillment-hub',
//   stats: [31, 12, 5, 10, 1, 28],
//   average: 14.5
// }
```

### Ejercicio 6 · Gestionar un proceso de inventario en segundo plano (1,5 pts)

En este ejercicio practicaremos la gestión de procesos periódicos que corren en segundo plano y controlan su propio estado.

#### Conceptos tratados

- `async/await` aplicado a iteraciones.
- Control y cancelación de tareas periódicas.
- Registro de resultados y errores en procesos concurrentes.

#### Enunciado

Implementa la función:

```js
function createInventoryScheduler(fetchNextRestock, applyRestock, intervalMs = 250) { ... }
```

**Objetivo**

- Implementar un bucle en segundo plano que obtenga lotes de reposición (_restock_) y los procese mientras mantiene el estado actualizado.

**Requisitos**

- La función `createInventoryScheduler` devuelve un objeto con `{ start(), stop(), getStatus() }`.

- `start()` debe programar una tarea repetitiva que:
  - Llame a la función asíncrona `fetchNextRestock()`, que retorna o un array de objetos de actualización de stock `{ sku, quantity }` o `null`, cada intervalo de `intervalMs` ms.
  - Para cada llamada, si `fetchNextRestock()` devuelve una actualización de stock, ejecuta `applyRestock(update)`.
  - Si `applyRestock` devuelve un resultado, registralo como una actualización de estado con `status: 'completed'` y el `sku` y `result` correspondientes.
  - Si `applyRestock` da error, registra la actualización de estado con `status: 'failed'` y el `error` correspondiente.
  - En cualquiera de los casos, los valores no usados deberán ser `null`.
  - Si `fetchNextRestock()` devuelve `null`, detén el bucle automáticamente.
- `stop()` detiene las iteraciones futuras.
- `getStatus()` devuelve un array de las actualizaciones de estado que han habido con la forma `{ sku, status, result, error }`.

**Ejemplo**

```js
const batches = [
  [
    { sku: "A-42", quantity: 10 },
    { sku: "B-11", quantity: 4 },
  ],
  [{ sku: "C-07", quantity: 6 }],
  null,
];

const fetchNextRestock = async () => batches.shift();
const applyRestock = async (update) => {
  if (update.sku === "B-11") {
    throw new Error("Supplier delay");
  }
  return { sku: update.sku, stock: update.quantity };
};

const scheduler = createInventoryScheduler(fetchNextRestock, applyRestock, 100);
scheduler.start();

setTimeout(() => {
  scheduler.stop();
  console.table(scheduler.getStatus());
}, 400);
// ┌─────────┬────────┬────────────┬────────────────────────────────┬──────────────────┐
// │ (index) │  sku   │   status   │             result             │      error       │
// ├─────────┼────────┼────────────┼────────────────────────────────┼──────────────────┤
// │    0    │ 'A-42' │ 'completed'│ { sku: 'A-42', stock: 10 } │      null        │
// │    1    │ 'B-11' │  'failed'  │             null               │ 'Supplier delay' │
// │    2    │ 'C-07' │ 'completed'│ { sku: 'C-07', stock: 6 } │      null        │
// └─────────┴────────┴────────────┴────────────────────────────────┴──────────────────┘
```
