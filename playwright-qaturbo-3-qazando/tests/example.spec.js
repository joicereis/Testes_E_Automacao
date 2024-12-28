// @ts-check
const { test, expect } = require('@playwright/test');
const { link } = require('fs');

test('Login com sucesso @login', async ({ page }) => {
  //abre o navegador no link abaixo
  await page.goto('https://automationpratice.com.br/');
  //busca pelo elemento tipo link de nome ' Login' e clica
  await page.getByRole('link', { name: ' Login' }).click();
  //localiza o elemento com o id 'user' e preenche com o texto 'teste@gmail.com'
  await page.locator('#user').fill('teste@gmail.com');
  //localiza o elemento com o id 'password' e preenche com o texto '123456'
  await page.locator('#password').fill('123456');
  //localiza o elemento de tipo button de nome 'login' e clica sobre ele
  await page.getByRole('button', { name: 'login' }).click();
  //carrega a página com a url /my-account
  await expect(page).toHaveURL('https://automationpratice.com.br/my-account');
  //espera que se localize e exiba o texto 'Olá, teste@gmail.com'
  await expect(page.getByText('Olá, teste@gmail.com')).toBeVisible();
  //espera que se localize e exiba o elemento de tipo button com o nome 'OK'
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
});

test('Login com sucesso utilizando outro email valido @login @email', async ({ page }) => {
  await page.goto('https://automationpratice.com.br/');
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').fill('tst@gmail.com');
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page).toHaveURL('https://automationpratice.com.br/my-account');
  await expect(page.getByText('Olá, tst@gmail.com')).toBeVisible();
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
});

test('Exibir texto de alerta quando credenciais forem nulas @emailesenhanulo', async({page}) => {
  await page.goto('https://automationpratice.com.br/');
  await page.getByRole('link', { name: ' Login' }).click();
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByText('E-mail inválido.')).toBeVisible();
});

test('Exibir texto de alerta quando o email for nulo @emailnulo', async({page}) => {
  await page.goto('https://automationpratice.com.br/');
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByText('E-mail inválido.')).toBeVisible();
});

test('Exibir texto de alerta quando o email nao estiver cadastrado @emailnaocadastrado', async({page}) => {
  await page.goto('https://automationpratice.com.br/');
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').fill('abc');
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByText('E-mail inválido.')).toBeVisible();
});

test('Exibir texto de alerta quando o email for valido e senha nula @login @senhanula', async({page}) =>{
  await page.goto('https://automationpratice.com.br/');
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').fill('tst@gmail.com');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByText('Senha inválida.')).toBeVisible();
});

test('Exibir texto de alerta quando o email valido e senha invalida @login @senhainvalida', async({page}) =>{
  await page.goto('https://automationpratice.com.br/');
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').fill('tst@gmail.com');
  await page.locator('#password').fill('12345');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByText('Senha inválida.')).toBeVisible();
});
  
