const puppeteer = require('puppeteer');

async function limparCampo(page,campo)
{
  await page.focus(campo);
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
}

async function robo()
{
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    const {usuario,senha,datainicial,datafinal,cnpj} = require('./parametros.json');
    const campoUsuario = '#Body_ctl00_tbxUsername';
    const campoSenha = '#Body_ctl00_tbxUserPassword';
    const campoDataInicial = '#ctl00_ctl00_Main_Main_txtPerInicial';
    const campoDataFinal = '#ctl00_ctl00_Main_Main_txtPerFinal';
    const campoCnpj ='#ctl00_ctl00_Main_Main_txtCpfCnpjDestinatario';
    await page.goto('https://tributario.sef.sc.gov.br/tax.NET/Login.aspx?ReturnUrl=%2ftax.net%2fdefault.aspx');
    await page.type(campoUsuario, usuario);
    await page.type(campoSenha, senha);
    await Promise.all([
        page.waitForNavigation(),
        page.click('#Body_ctl00_btnLogin'),
      ]);
    
    await page.goto('http://tributario.sef.sc.gov.br/tax.NET/tax.Net.NFE/Nfe_ConsultaOnlineCC.aspx');
    await limparCampo(page,campoDataInicial);
    await page.type(campoDataInicial,datainicial);
    await limparCampo(page,campoDataFinal);
    await page.type(campoDataFinal,datafinal);
    await page.type(campoCnpj,cnpj);
    await Promise.all([
        page.waitForNavigation(),
        page.click('#ctl00_ctl00_Main_Main_btnPesquisar'),
      ]);
      
    await page.close();
    //await page.waitFor(10000);
}

robo();
