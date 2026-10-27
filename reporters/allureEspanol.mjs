import AllureReporter from '@wdio/allure-reporter'

// WDIO convierte los pasos en TestStats y pierde su tipo y archivo.
// Restauramos el tipo usando la suite actual para que Allure reconozca
// también Dado/Cuando/Entonces y agrupe las capturas dentro del escenario.
class AllureEspanol extends AllureReporter {
    onTestStart(prueba) {
        const escenario = this.currentSuites[this.currentSuites.length - 1]
        if (escenario?.type === 'scenario') {
            prueba.type = 'step'
            prueba.file = escenario.file
        }
        super.onTestStart(prueba)
    }
}

export default AllureEspanol
