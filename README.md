# Tienda QA

Pruebas en JavaScript, WebdriverIO, POM, Cucumber y Allure.

## Clase base y páginas

La clase base está en `pageobjects/page.js` y se exporta como `Page`.
Todas las páginas de `pageobjects/tienda/` heredan directamente de ella:

```javascript
import Page from '../page.js'

class AccesoPage extends Page {
    // Selectores y acciones del login.
}

export default new AccesoPage()
```

`Page` proporciona `open(path)` y conversión de fechas. La URL de la tienda
está en `baseUrl` de `wdio.conf.js`.

## Ejecutar

```powershell
npm run clean:allure
npm test
npm run reporte
```

Para ejecutar un solo inciso: `npm run test:inciso1`, `test:inciso2`,
`test:inciso3` o `test:inciso4`.

## Parámetros y capturas

Los parámetros se cambian en `features/tienda/*.feature`, sin tablas.
Cada feature tiene su archivo propio en `features/tienda/step_definitions/`.
Cada paso toma una captura. El login captura los campos llenos antes de ingresar.

- Inciso 1: acceso a la tienda.
- Inciso 2: ficha, carrito y confirmación con entrega en 9 días naturales.
- Inciso 3: registro y compra con entrega en 3 días de reparto (lunes a sábado).
- Inciso 4: Mis pedidos, reprogramación a 7 días naturales y cancelación.

La tienda permite entregas entre 2 y 30 días, sin domingos. Un plazo natural
que cae domingo falla explícitamente; no se cambia a otro día automáticamente.
El registro usa correos ficticios `.test` y claves con mayúscula, minúscula,
número y símbolo. La compra mínima es Bs 50; envío Bs 25 y gratis desde Bs 500.
Si cambia producto o cantidad, actualice los importes esperados en el feature.
