import Page from '../page.js'

class ProductosPage extends Page {
    get buscador() { return $('#catalogSearchInput') }
    get cantidad() { return $('.item-sheet__qty-input') }
    get botonAgregar() { return $('.item-sheet__add-btn') }

    async consultarFicha(codigo) {
        await this.buscador.setValue(codigo)
        const enlace = await $(`a[href="/catalogo/${codigo}"]`)
        await enlace.waitForDisplayed()
        await enlace.click()
        await $('.item-sheet').waitForDisplayed()
    }
    async comprobarFicha(codigo, nombre, precio) {
        await expect($('.item-sheet__code')).toHaveText(codigo)
        await expect($('.item-sheet__title')).toHaveText(nombre)
        await expect($('.item-sheet__price')).toHaveText(precio)
    }
    async elegirCantidad(cantidad) { await this.cantidad.setValue(cantidad) }
    async agregar(cantidad) {
        await this.botonAgregar.click()
        await expect($('#cartBadgeText')).toHaveText(cantidad)
        await expect($('.item-sheet__in-cart')).toHaveText(`${cantidad} ${cantidad === '1' ? 'unidad' : 'unidades'}`)
    }
}
export default new ProductosPage()
