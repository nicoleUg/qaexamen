import { Given, When, Then } from '@wdio/cucumber-framework'
import Acceso from '../../../pageobjects/tienda/accesoPage.js'

Given('estoy en la página de ingreso de la tienda con datos restablecidos', async () => {
    await Acceso.open()
    await browser.takeScreenshot()
})

When('ingreso {string} y {string} en la tienda', async (usuario, clave) => {
    await Acceso.completarCredenciales(usuario, clave)
    await browser.takeScreenshot()
    await Acceso.ingresar()
})

Then('debería ver el catálogo y el nombre {string}', async (nombre) => {
    await Acceso.comprobarSesion(nombre)
    await browser.takeScreenshot()
})
