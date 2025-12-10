# PJP PAC 3

En aquesta PAC es practiquen les tècniques de programació asíncrona a JavaScript: _callbacks_, promeses i _async/await_, així com les diferents combinacions entre elles.

## Competències

En aquesta PAC es desenvolupen les següents competències del Màster:

- [CB10] Que els estudiants tinguin les habilitats d'aprenentatge que els permetin continuar estudiant d'una manera que haurà de ser en gran mesura autodirigida o autònoma.
- [CG2] Resoldre problemes, identificant, analitzant i definint-ne els elements significatius.
- [CE3] Utilitzar de manera adequada els llenguatges de programació i les millors eines de desenvolupament per a l'anàlisi, el disseny i la implementació de llocs i aplicacions web en funció de les necessitats del projecte.
- [CE5] Aplicar de la manera més adequada els patrons d'arquitectura de programari més convenient per a cada problema.

## Objectius

Els objectius concrets d'aquesta PAC són:

- Aprendre a utilitzar JavaScript i les seves característiques bàsiques.
- Contribuir a conèixer a fons el llenguatge JavaScript per poder fer-lo servir en el desenvolupament d'aplicacions Web.
- Utilitzar les tècniques de programació asíncrona que ofereix JavaScript.

## Lliurament de la PAC

Un cop hagis realitzat les activitats pràctiques proposades en aquest enunciat, **el lliurament es realitzarà a través de l'apartat de l'aula virtual de la UOC**.

## Puntuació

El fet de treballar amb tests per verificar la funcionalitat del codi us permetrà tenir una idea de la vostra pròpia nota abans del lliurament.

La puntuació dels exercicis pràctics es basa en dos criteris: **Funcionalitat** i **Implementació**. S'espera que els exercicis funcionin correctament (passin els tests) i que la implementació (el codi) tingui una qualitat adequada.

Alguns detalls a tenir en compte:

- Es penalitzarà qualsevol intent de _hardcodejar_ els tests per forçar que passin. Aquesta tècnica consisteix a canviar la implementació perquè retorni únicament el valor esperat pel test (qualsevol altre test fallaria).
- Els tests automàtics estan dissenyats per detectar exercicis erronis o incomplets per a casos concrets. El fet que un test passi no garanteix que l'exercici estigui realitzat correctament, és a dir, que cobreixi tots els casos.
- Un exercici els tests del qual no passen es puntuarà amb un 0 llevat que hi hagi problemes amb els tests.
- A més de passar els tests, el professorat avaluarà el vostre codi en base als següents criteris:
- Llegibilitat, senzillesa i qualitat del codi.
- Coneixements de programació. Per exemple, no utilitzar les estructures de control adequades, com ara utilitzar un bucle per construir una sentència condicional o viceversa.

## Requisits mínims

- Tenir instal·lat Visual Studio Code (o qualsevol altre IDE).
- Estudi de la introducció i repàs a JavaScript (Activitat 1 del Repte 2).
- Estudi dels conceptes de JavaScript (Activitats 2 i 3 del Repte 2).
- Estudi de la introducció a l'assincronia en JavaScript (Activitat 1 del Repte 3).
- Estudi dels conceptes d'assincronia de JavaScript (Activitat 2 del Repte 3).

## Activitats del repte - 0,5 punts

Recorda que aquest repte té associades dues activitats d'avaluació que també has de realitzar. En particular, són les activitats 1.2 i 2.2, que trobaràs a l'aula virtual.

## Exercicis pràctics - 9,5 punts

Per realitzar els exercicis pràctics t'has de dirigir a la següent ruta, dins del repositori: `src/pec3/pec3.js`.
En aquest fitxer hauràs d'implementar les funcions que t'indiquem als exercicis que veuràs més avall.

D'altra banda, els tests que et permetran saber si la solució que proposes per als exercicis és correcta són al fitxer `src/pec3/pec3.test.js`.
**No has d'editar aquest fitxer**.
Tingues en compte que els tests són condicions que han de complir les funcions que implementaràs en els exercicis, per la qual cosa et poden servir d'ajuda per corregir-los.

### Preparant l'entorn

Un cop fet **clone** del repositori, has d'instal·lar les dependències del projecte.

```
npm install
```

A continuació, per llançar els tests has d'executar la següent ordre:

```
npm test
```

La instrucció anterior llançarà els tests cada vegada que desis el fitxer `src/pec3/pec3.js`, que és precisament on implementaràs els exercicis d'aquesta PAC.

Tal com t'indiquem a la PAC 1, la primera vegada que executis `npm test` i es llencin els tests, molt possiblement fallaran tots, ja que no hi ha cap exercici implementat. A mesura que vagis treballant en els exercicis i guardis el fitxer, pot ser que algun test llanci algun error. Revisa el missatge d'error que s'imprimeix per conèixer el format i entendre com es notifiquen els errors.

Si tens algun problema amb els tests, no dubtis a preguntar al fòrum "Dudas PAC 3 | Dubtes PAC 3" de l'aula.

### Exercici 1 · Resumir articles del cistella de la compra amb un callback (2 pts)

En aquest exercici practicarem l'ús de _callbacks_ per gestionar l'asincronia en JavaScript.

#### Conceptes tractats

- Ús de funcions _callback_
- Manipulació d'arrays i objectes.
- Validació de paràmetres d'entrada.

#### Enunciat

Implementa la funció:

```js
function summarizeCartItems(cartItems, callback) { ... }
```

**Objectiu**

- Validar una llista d'articles del cistella de la compra (`cartItems`) i obtenir totals útils fent servir un callback (`callback(error, summary)`).

**Requisits**

- Si l'entrada és vàlida, calcula la quantitat total, el preu total i la llista ordenada d'identificadors i compon l'objecte `summary` amb l'estructura: `{ totalItems, totalPrice, itemIds }`. Invoca el callback amb l'error a `null` i l'objecte `summary`.
- Si l'entrada és invàlida, invoca el callback amb `error` sent un string que descrigui l'error i `summary` sent `null`.
- L'entrada és vàlida si `cartItems` és un array no buit d'objectes amb l'estructura: `{ id: Number, price: Number, quantity: Number }`, on `quantity` i `price` són positius.

**Exemple**

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

### Exercici 2 · Promesa que executa un callback (2 pts)

En aquest exercici practicarem l'ús de promeses simples i temporitzadors per simular retards en una API.

#### Conceptes tractats

- Gestió asíncrona mitjançant promeses.
- Temporitzadors (`setTimeout`).
- Comunicació combinada de promeses i callbacks.

#### Enunciat

Implementa la funció:

```js
function fetchUserRecommendations(userId, callback) { ... }
```

**Objectiu**

- Retornar una promesa que simuli l'entrega de recomanacions personalitzades i que, a més, notifiqui mitjançant un callback.

**Requisits**

- La funció ha de retornar una promesa que es resol després de 200 ms.
- Abans de resoldre, executa `callback(null, payload)`, on `payload` és un objecte `{ userId, recommendations }` i `recommendations` és un array amb tres cadenes de text.
- Si `userId` no és un enter positiu, crida `callback(error, null)`, on `error` és `Error("Invalid user id")` i rebutja la promesa retornada amb el mateix error.

**Exemple**

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

### Exercici 3 · Promesa amb lògica de resolució i rebuig (1 pts)

En aquest exercici practicarem la creació de promeses que gestionen fluxos d'èxit i error amb regles de negoci.

#### Conceptes tractats

- Control de flux amb promeses.
- Validació de paràmetres numèrics.
- Gestió d'errors mitjançant `Promise.reject`.

#### Enunciat

Implementa la funció:

```js
function authorizeOrderPayment(amount) { ... }
```

**Objectiu**

- Implementar un flux de control amb promeses que verifiqui o rebutgi una petició de pagament segons el seu valor.

**Requisits**

- Retorna una promesa que es resol amb `{ status: "approved", amount }` quan `amount` sigui un nombre positiu menor o igual a 2500.
- Rebutja amb `Error("Order total too high")` si la quantitat supera 2500.
- Rebutja amb `Error("Invalid order amount")` si la quantitat no és un nombre o és menor o igual a zero.

**Exemple**

```js
authorizeOrderPayment(1999)
  .then(console.log)
  .catch((error) => console.error(error.message));
// { status: 'approved', amount: 1999 }

authorizeOrderPayment(9000).catch((error) => console.error(error.message));
// "Order total too high"
```

### Exercici 4 · Encadenar diferents promeses (1,5 pts)

En aquest exercici practicarem com coordinar crides asíncrones dependents utilitzant encadenament de promeses.

#### Conceptes tractats

- Encadenament de promeses.
- Propagació i transformació d'errors.

#### Enunciat

Implementa la funció:

```js
function buildCustomerOnboarding(fetchCustomerProfile, fetchSubscription, fetchWelcomePack) { ... }
```

**Objectiu**

- Connectar tres passos asíncrons mitjançant encadenament de promeses per crear un paquet de benvinguda.

**Requisits**

- `fetchCustomerProfile()` retorna una promesa que es resol amb un objecte client `{ id, name }`.
- Utilitza el `customer.id` rebut per cridar `fetchSubscription(id)`, que retorna una promesa amb la informació de la subscripció.
- Passa un objecte `{ customer, subscription }` a `fetchWelcomePack()` i resol la promesa externa amb el que retorni `fetchWelcomePack`.
- Si algun pas falla, rebutja amb `Error("Onboarding failed: <message>")`, on `<message>` és el missatge de l'error original.

**Exemple**

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

### Exercici 5 · Flux amb async/await (1,5 pts)

En aquest exercici practicarem la composició de dades asíncrones emprant sintaxi `async/await` i blocs `try/catch`.

#### Conceptes tractats

- Funcions `async` i ús de `await`.
- Gestió d'errors amb `try/catch`.
- Integració de múltiples fonts de dades asíncrones.

#### Enunciat

Implementa la funció:

```js
async function loadPerformanceReport(fetchMetrics, processMetrics) { ... }
```

**Objectiu**

- Combinar dues fonts de dades asíncrones amb async/await i una gestió d'errors estructurada.

**Requisits**

- La funció `loadPerformanceReport` ha de retornar un objecte `{ warehouse, stats, average }`.
- Per fer-ho, utilitza la funció asíncrona `fetchMetrics()`, que ha de retornar un objecte `{ warehouse, stats }`, on `stats` és un array de `Number` amb mínim 2 valors. Amb la informació de `stats`, crida la funció asíncrona `processMetrics(stats)` que retorna la mitjana dels valors en un objecte `{ average }`.
- Si alguna funció asíncrona falla, llença `Error("Failed to load performance report: <message>")`, substituint `<message>` pel missatge original de l'error.

**Exemple**

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

### Exercici 6 · Gestionar un procés d'inventari en segon pla (1,5 pts)

En aquest exercici practicarem la gestió de processos periòdics que corren en segon pla i controlen el seu propi estat.

#### Conceptes tractats

- `async/await` aplicat a iteracions.
- Control i cancel·lació de tasques periòdiques.
- Registre de resultats i errors en processos concurrents.

#### Enunciat

Implementa la funció:

```js
function createInventoryScheduler(fetchNextRestock, applyRestock, intervalMs = 250) { ... }
```

**Objectiu**

- Implementar un bucle en segon pla que obtingui lots de reposició (_restock_) i els processi mentre manté l'estat actualitzat.

**Requisits**

- La funció `createInventoryScheduler` retorna un objecte amb `{ start(), stop(), getStatus() }`.

- `start()` ha de programar una tasca repetitiva que:
  - Cridi la funció asíncrona `fetchNextRestock()`, que retorna o bé un array d'objectes d'actualització d'stock `{ sku, quantity }` o `null`, cada interval de `intervalMs` ms.
  - Per cada crida, si `fetchNextRestock()` retorna una actualització d'stock, executa `applyRestock(update)`.
  - Si `applyRestock()` retorna un resultat, registra'l com una actualització d'estat amb `status: 'completed'` i el `sku` i `result` corresponents.
  - Si `applyRestock()` dóna error, registra l'actualització d'estat amb `status: 'failed'` i l'`error` corresponent.
  - En qualsevol dels casos, els valors no utilitzats han de ser `null`.
  - Si `fetchNextRestock()` retorna `null`, atura el bucle automàticament.
- `stop()` atura les iteracions futures.
- `getStatus()` retorna un array de les actualitzacions d'estat que hi ha hagut amb la forma `{ sku, status, result, error }`.

**Exemple**

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
