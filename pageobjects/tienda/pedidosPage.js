import Page from '../page.js'
import EntregaPage from './entregaPage.js'

class PedidosPage extends Page {
    celda(codigo, campo) { return $(`tr[data-order="${codigo}"] [data-field="${campo}"]`) }
    async open() {
        await $('#headerOrdersLink').click()
        await $('#ordersTable').waitForDisplayed()
        await expect($('h1')).toHaveText('Mis pedidos')
    }
    async comprobar(codigo, fecha, cantidad, total, estado) {
        await expect(this.celda(codigo, 'deliver-on')).toHaveText(this.fechaVisible(fecha))
        await expect(this.celda(codigo, 'units-count')).toHaveText(cantidad)
        await expect(this.celda(codigo, 'amount-due')).toHaveText(total)
        await expect(this.celda(codigo, 'order-state')).toHaveText(estado)
    }
    async abrirReprogramacion(codigo) {
        await $(`[name="reschedule_${codigo}"]`).click()
        await $('#rescheduleDialog').waitForDisplayed()
    }
    async elegirNuevaFecha(fecha) {
        await $('#rescheduleCalendarButton').click()
        await EntregaPage.seleccionarDia('rescheduleCalendar', fecha)
        await expect($('#rescheduleDateInput')).toHaveValue(this.fechaVisible(fecha))
    }
    async guardar() {
        await $('#rescheduleSaveButton').click()
        await $('#rescheduleDialog').waitForDisplayed({ reverse: true })
    }
    async comprobarReprogramacion(codigo, fecha, usadas, estado) {
        await expect(this.celda(codigo, 'deliver-on')).toHaveText(this.fechaVisible(fecha))
        await expect(this.celda(codigo, 'resched-used')).toHaveText(usadas)
        await expect(this.celda(codigo, 'order-state')).toHaveText(estado)
    }
    async solicitarCancelacion(codigo) {
        await $(`[name="cancel_order_${codigo}"]`).click()
        await $('#orderCancelDialog').waitForDisplayed()
        await expect($('#orderCancelMessage')).toHaveText(expect.stringContaining(codigo))
    }
    async aceptarCancelacion() { await $('#orderCancelConfirmButton').click() }
    async comprobarEstado(codigo, estado) { await expect(this.celda(codigo, 'order-state')).toHaveText(estado) }
}
export default new PedidosPage()
