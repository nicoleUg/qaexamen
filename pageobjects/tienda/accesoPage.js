import Page from '../page.js'

class AccesoPage extends Page {
    get usuario() { return $('#signinUserInput') }
    get clave() { return $('#signinPassInput') }
    get botonIngresar() { return $('#signinSubmitButton') }

    async open() {
        await super.open('/ingresar?reset=true')
        await this.usuario.waitForDisplayed()
    }
    async completarCredenciales(usuario, clave) {
        await this.usuario.setValue(usuario)
        await this.clave.setValue(clave)
    }
    async ingresar() {
        await this.botonIngresar.click()
        await $('#headerCatalogLink').waitForDisplayed()
    }
    async comprobarSesion(nombre) {
        await expect($('#headerUserText')).toHaveText(nombre)
        await expect($('h1')).toHaveText('Catálogo')
        await $('#catalogTable').waitForDisplayed()
    }
}
export default new AccesoPage()
