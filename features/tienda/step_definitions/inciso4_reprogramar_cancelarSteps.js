import { Given, When, Then } from '@wdio/cucumber-framework'
import Acceso from '../../../pageobjects/tienda/accesoPage.js'
import Entrega from '../../../pageobjects/tienda/entregaPage.js'
import Pedidos from '../../../pageobjects/tienda/pedidosPage.js'

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

When('voy a Mis pedidos', async () => {
    await Pedidos.open()
    await browser.takeScreenshot()
})

When('abro la reprogramación del pedido {string}', async function (codigo) {
    this.codigoPedido = codigo
    await Pedidos.abrirReprogramacion(codigo)
    await browser.takeScreenshot()
})

When('elijo la nueva entrega dentro de {int} días {string}', async function (dias, tipo) {
    if (!['naturales', 'reparto'].includes(tipo)) throw new Error('Use naturales o reparto')
    this.fechaEntrega = await Entrega.fechaDentroDe(dias, tipo)
    await Pedidos.elegirNuevaFecha(this.fechaEntrega)
    await browser.takeScreenshot()
})

When('guardo la reprogramación', async () => {
    await Pedidos.guardar()
    await browser.takeScreenshot()
})

Then('debería ver la fecha elegida, {string} reprogramaciones y estado {string} en el pedido seleccionado', async function (usadas, estado) {
    await Pedidos.comprobarReprogramacion(this.codigoPedido, this.fechaEntrega, usadas, estado)
    await browser.takeScreenshot()
})

When('solicito cancelar el pedido seleccionado', async function () {
    await Pedidos.solicitarCancelacion(this.codigoPedido)
    await browser.takeScreenshot()
})

When('acepto cancelar el pedido', async () => {
    await Pedidos.aceptarCancelacion()
    await browser.takeScreenshot()
})

Then('el pedido seleccionado debería estar {string}', async function (estado) {
    await Pedidos.comprobarEstado(this.codigoPedido, estado)
    await browser.takeScreenshot()
})
