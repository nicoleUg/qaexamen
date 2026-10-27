export default class Page {
    async open(path) {
        await browser.url(path)
    }

    fechaISO(fecha) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) return fecha.split('/').reverse().join('-')
        if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha
        throw new Error(`Use una fecha DD/MM/AAAA: ${fecha}`)
    }

    fechaVisible(fecha) {
        return this.fechaISO(fecha).split('-').reverse().join('/')
    }
}
