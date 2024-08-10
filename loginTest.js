const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

// Configuración de WebDriver para Chrome
const options = new chrome.Options();
options.addArguments('start-maximized'); // Inicia el navegador maximizado

// Función para tomar capturas de pantalla
async function takeScreenshot(driver, stepName) {
    const screenshot = await driver.takeScreenshot();
    const filePath = path.join(__dirname, 'screenshots', `${stepName}.png`);
    fs.writeFileSync(filePath, screenshot, 'base64');
}

async function runTest(email, password, stepPrefix) {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    
    try {
        // Navegar a la página de inicio de sesión
        await driver.get('https://66b7caec059d03847868f7f1--taupe-bunny-2326f6.netlify.app/');
        await takeScreenshot(driver, `${stepPrefix}_homepage`);

        // Encontrar campos de entrada y enviar datos
        await driver.findElement(By.id('email')).sendKeys(email);
        await takeScreenshot(driver, `${stepPrefix}_email-entered`);
        
        await driver.findElement(By.id('password')).sendKeys(password);
        await takeScreenshot(driver, `${stepPrefix}_password-entered`);

        // Enviar formulario
        await driver.findElement(By.css('button[type="submit"]')).click();
        await takeScreenshot(driver, `${stepPrefix}_form-submitted`);

        // Esperar y verificar la alerta
        await driver.wait(until.elementLocated(By.css('.swal2-popup')), 5000);
        await takeScreenshot(driver, `${stepPrefix}_alert-displayed`);
    } finally {
        // Cerrar el navegador
        await driver.quit();
    }
}

(async function loginTest() {
    // Crear directorio para capturas de pantalla si no existe
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    // Ejecutar la primera prueba con datos incorrectos
    await runTest('samuelruizjs@gmail.com', 'password123', 'test1');

    // Ejecutar la segunda prueba con datos correctos
    await runTest('karinaadames@gmail.com', 'password123', 'test2');
})();
