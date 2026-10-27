import AllureEspanol from './reporters/allureEspanol.mjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const directorio = path.dirname(fileURLToPath(import.meta.url))

export const config = {
    runner: 'local',
    specs: ['./features/tienda/*.feature'],
    maxInstances: 1,
    baseUrl: 'https://tienda-qa.pages.dev',
    capabilities: [{
        browserName: 'chrome',
        'wdio:enforceWebDriverClassic': true,
        'goog:chromeOptions': {
            binary: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: process.env.CI
                ? ['--headless=new', '--window-size=1920,1080', '--disable-extensions']
                : ['--start-maximized', '--disable-extensions']
        }
    }],
    logLevel: 'error',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    framework: 'cucumber',
    reporters: ['spec', [AllureEspanol, {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
    }]],
    cucumberOpts: {
        import: [],
        tags: '', timeout: 60000, strict: true,
        ignoreUndefinedDefinitions: false
    },
    beforeSession: function (configuracion, capacidades, archivos) {
        configuracion.cucumberOpts.import = archivos.map(archivo => {
            const nombre = path.basename(archivo).replace('.feature', 'Steps.js')
            return path.join(directorio, 'features', 'tienda', 'step_definitions', nombre)
        })
    },
    afterStep: async function (paso, escenario, resultado) {
        if (!resultado.passed) await browser.takeScreenshot()
    }
}
