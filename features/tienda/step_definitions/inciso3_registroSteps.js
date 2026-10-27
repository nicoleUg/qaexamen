import { Given, When, Then } from '@wdio/cucumber-framework'
import Acceso from '../../../pageobjects/tienda/accesoPage.js'
import Registro from '../../../pageobjects/tienda/registroPage.js'
import Productos from '../../../pageobjects/tienda/productosPage.js'
import Carrito from '../../../pageobjects/tienda/carritoPage.js'
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

When('abro el registro de la tienda', async () => {
    await Registro.open()
    await browser.takeScreenshot()
})

When('registro {string}, {string}, {string}, {string}, {string} y {string} en la tienda', async (nombre, correo, usuario, clave, confirmacion, tipo) => {
    await Registro.registrar(nombre, correo, usuario, clave, confirmacion, tipo)
    await browser.takeScreenshot()
})

When('confirmo mi cuenta de la tienda', async () => {
    await Registro.confirmar()
    await browser.takeScreenshot()
})

When('consulto la ficha del producto {string}', async (codigo) => {
    await Productos.consultarFicha(codigo)
    await browser.takeScreenshot()
})

Then('debería ver {string}, {string} y el precio {string}', async (codigo, nombre, precio) => {
    await Productos.comprobarFicha(codigo, nombre, precio)
    await browser.takeScreenshot()
})

When('selecciono {string} unidades del producto', async (cantidad) => {
    await Productos.elegirCantidad(cantidad)
    await browser.takeScreenshot()
})

When('agrego {string} unidades al carrito', async (cantidad) => {
    await Productos.agregar(cantidad)
    await browser.takeScreenshot()
})

When('voy al carrito de compra', async () => {
    await Carrito.open()
    await browser.takeScreenshot()
})

Then('debería ver {string} con {string} unidades y un total de {string}', async (codigo, cantidad, total) => {
    await Carrito.comprobar(codigo, cantidad, total)
    await browser.takeScreenshot()
})

When('continúo con el pedido', async () => {
    await Carrito.continuar()
    await browser.takeScreenshot()
})

When('completo la entrega para {string}, en {string}, dirección {string}, franja {string} y notas {string}', async (destinatario, zona, direccion, franja, notas) => {
    await Entrega.completar(destinatario, zona, direccion, franja, notas)
    await browser.takeScreenshot()
})

When('elijo una entrega dentro de {int} días {string}', async function (dias, tipo) {
    if (!['naturales', 'reparto'].includes(tipo)) throw new Error('Use naturales o reparto')
    this.fechaEntrega = await Entrega.fechaDentroDe(dias, tipo)
    await Entrega.elegirFecha(this.fechaEntrega)
    await browser.takeScreenshot()
})

Then('debería ver el total {string} y el pago {string}', async (total, pago) => {
    await Entrega.comprobarResumen(total, pago)
    await browser.takeScreenshot()
})

When('confirmo el pedido', async function () {
    this.codigoPedido = await Entrega.confirmar()
    await browser.takeScreenshot()
})

Then('debería ver mi pedido con la fecha elegida, {string} unidades, total {string} y estado {string}', async function (cantidad, total, estado) {
    await Pedidos.comprobar(this.codigoPedido, this.fechaEntrega, cantidad, total, estado)
    await browser.takeScreenshot()
})
