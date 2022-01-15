/* eslint-disable no-undef */
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('The crypto app', () => {
  it('loads successfully', () => {
      cy.visit('http://localhost:3000')
  })
})

// check if a button exists
describe('does my button exist', () => {
  it("Last hour button should show on page load", () => {
    cy.contains('Last Hour').should('exist')
    cy.get('.btnLastHour').should('exist').and('contain','Last Hour');
    cy.get('.btnLast10Hours').click();
  })
})

// check if graph changes when clicking on bitcoin
describe ('do i get bitcoin infos when clicking on bitcoin', () => {
  it('show bitcoin currency', () => {
    cy.get('.bitcoinBtn').should('exist');
    cy.get('.bitcoinBtn').click()
  })
})

// check if the currencie array is empty
describe ('is the currency array empty ?' , ()=> {
  it('get the currencies from binance with limit =60', function () {
    cy.request({
        method: 'GET',
        url: 'https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m&limit=60',
    }).its('body').then((res) => {
         const data = res[59]
         // eslint-disable-next-line no-unused-expressions
         expect(data).not.to.be.empty
    }) 
})
})
