pipeline {
    agent any
    tools { nodejs 'NodeJS'; jdk 'Java21' }
    options { skipDefaultCheckout(true); disableConcurrentBuilds(); timeout(time: 20, unit: 'MINUTES') }
    environment { CI = 'true' }
    stages {
        stage('Preparar y obtener codigo') {
            steps {
                cleanWs()
                checkout scm
                // No mezclar resultados guardados en Git con los de esta ejecucion.
                dir('allure-results') { deleteDir() }
                dir('allure-report') { deleteDir() }
            }
        }
        stage('Comprobar herramientas') {
            steps {
                bat 'node --version'
                bat 'call npm.cmd --version'
                bat 'java -version'
            }
        }
        stage('Instalar dependencias') {
            steps { bat 'call npm.cmd ci --no-audit --no-fund' }
        }
        stage('Ejecutar pruebas de Tienda QA') {
            steps { bat 'call npm.cmd test' }
        }
    }
    post {
        always {
            script {
                if (fileExists('allure-results')) {
                    bat 'powershell.exe -NoProfile -NonInteractive -Command "if (@(Get-ChildItem allure-results/*-result.json -ErrorAction SilentlyContinue).Count -eq 0) { throw \'No se generaron resultados de pruebas Allure\' }"'
                    allure commandline: 'Allure-2.35.1', jdk: 'Java21', includeProperties: false, results: [[path: 'allure-results']], reportBuildPolicy: 'ALWAYS'
                    archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: false
                } else {
                    echo 'No hay resultados Allure; revisar el error de preparacion en la consola.'
                }
            }
        }
        success { echo 'Pruebas completadas. Abrir Allure Report en este build.' }
        failure { echo 'La ejecucion fallo. Consultar consola y reporte Allure si esta disponible.' }
    }
}
