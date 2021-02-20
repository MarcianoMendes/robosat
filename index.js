const puppeteer = require('puppeteer');

async function robo()
{
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    const usuario = 'usuario';
    const senha = 'senha';
    const campoUsuario = '#Body_ctl00_tbxUsername';
    const campoSenha = '#Body_ctl00_tbxUserPassword';
    await page.goto('https://tributario.sef.sc.gov.br/tax.NET/Login.aspx?ReturnUrl=%2ftax.net%2fdefault.aspx');
    await page.waitFor(1000);
    await page.type(campoUsuario, usuario);
    await page.waitFor(1000);
    await page.type(campoSenha, senha);
    await page.waitFor(1000);
    await Promise.all([
        page.waitForNavigation(),
        page.click('#Body_ctl00_btnLogin'),
      ])
    //await page.close();
}

robo();