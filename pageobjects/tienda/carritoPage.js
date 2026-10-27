import Page from '../page.js'

class CarritoPage extends Page {
    get botonContinuar() { return $('#cartCheckoutButton') }
    async open() {
        await $('#headerCartLink').click()
        await $('#cartLinesTable').waitForDisplayed()
    }
    async comprobar(codigo, cantidad, total) {
        const fila = await $(`#cartLinesTable tr[data-line="${codigo}"]`)
        await expect(fila).toBeDisplayed()
        await expect(fila.$('input[type="number"]')).toHaveValue(cantidad)
        await expect($('#summaryTotalText')).toHaveText(total)
    }
    async continuar() {
        await this.botonContinuar.click()
        await $('form[name="checkout_form"]').waitForDisplayed()
    }
}
export default new CarritoPage()
