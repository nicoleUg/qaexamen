import Page from '../page.js'

class RegistroPage extends Page {
    get formulario() { return $('form[name="signup_form"]') }
    get botonCrearCuenta() { return $('[name="create_account"]') }

    async open() {
        await $('#signinSignupLink').click()
        await this.formulario.waitForDisplayed()
    }
    async registrar(nombre, correo, usuario, clave, confirmacion, tipo) {
        await $('[name="full_name"]').setValue(nombre)
        await $('[name="user_mail"]').setValue(correo)
        await $('[name="user_alias"]').setValue(usuario)
        await $('[name="pass_word"]').setValue(clave)
        await $('[name="pass_word_repeat"]').setValue(confirmacion)
        await $('[name="customer_tier"]').selectByVisibleText(tipo)
        await $('[name="accept_rules"]').click()
    }
    async confirmar() {
        await this.botonCrearCuenta.click()
        await $('#signinForm').waitForDisplayed()
        await expect($('#statusToast')).toHaveText(expect.stringContaining('creada'))
    }
}
export default new RegistroPage()
