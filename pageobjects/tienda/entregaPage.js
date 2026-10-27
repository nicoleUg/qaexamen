import Page from '../page.js'

class EntregaPage extends Page {
    get botonConfirmar() { return $('#checkoutConfirmButton') }

    async fechaDentroDe(dias, tipo) {
        return browser.execute((cantidad, modo) => {
            const fecha = new Date()
            if (modo === 'naturales') fecha.setDate(fecha.getDate() + cantidad)
            else {
                for (let contados = 0; contados < cantidad;) {
                    fecha.setDate(fecha.getDate() + 1)
                    if (fecha.getDay() !== 0) contados++
                }
            }
            return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
        }, dias, tipo)
    }

    async seleccionarDia(calendario, fecha) {
        fecha = this.fechaISO(fecha)
        for (let intento = 0; intento < 3; intento++) {
            const dia = await $(`#${calendario} [data-day="${fecha}"]`)
            if (await dia.isExisting()) {
                if (!(await dia.isEnabled())) throw new Error(`La tienda no permite entregar el ${this.fechaVisible(fecha)}. No se cambia la fecha automáticamente.`)
                await dia.click()
                return
            }
            const primero = await $(`#${calendario} [data-day]`).getAttribute('data-day')
            const direccion = fecha.slice(0, 7) > primero.slice(0, 7) ? 'Next' : 'Prev'
            await $(`#${calendario}${direccion}`).click()
        }
        throw new Error(`Fecha fuera del calendario de entregas: ${fecha}`)
    }

    async completar(destinatario, zona, direccion, franja, notas) {
        // El feature usa español; los valores HTML de la tienda están en inglés.
        const franjas = { 'mañana': 'morning', manana: 'morning', tarde: 'afternoon' }
        const valorFranja = franjas[franja.trim().toLowerCase()]
        if (!valorFranja) throw new Error(`Franja inválida: "${franja}". Use "mañana" o "tarde".`)
        await $('[name="recipient_name"]').setValue(destinatario)
        await $('[name="shipping_zone"]').selectByVisibleText(zona)
        await $('[name="shipping_address"]').setValue(direccion)
        await $(`[name="delivery_slot"][value="${valorFranja}"]`).click()
        await $('[name="order_notes"]').setValue(notas)
    }
    async elegirFecha(fecha) {
        await $('#deliveryCalendarButton').click()
        await this.seleccionarDia('deliveryCalendar', fecha)
        await expect($('#deliveryDateInput')).toHaveValue(this.fechaVisible(fecha))
    }
    async comprobarResumen(total, pago) {
        await expect($('#checkoutTotalText')).toHaveText(total)
        await expect($('#paymentMethodText')).toHaveText(pago)
    }
    async confirmar() {
        await this.botonConfirmar.click()
        await $('#ordersTable').waitForDisplayed()
        await expect($('#statusToast')).toHaveText(expect.stringMatching(/^Pedido PD\d+ confirmado\./))
        return (await $('#statusToast').getText()).match(/PD\d+/)[0]
    }
}
export default new EntregaPage()
