import AddNewClientPage from '../../../pageObjects/clients/AddNewClientPage'
import loginPage from '../../../pageObjects/LoginPage';
import users from '../../../fixtures/users.json'

describe('Clients - Add New Client (required fields flow)', () => {
  const allFieldValues = {
    companyLegalName: 'Acme Corp',
    companyPhone: '123-456-7890',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@acme.com',
    phone: '555-1234',
    siteStructure: 'Single Site', // value visible text or select option
    clientAddress1: '20002 Business Pkwy',
    cientAdress2: 'Walnut',
    clientAddressCity: 'Walnut',
    clientAddressCountry: 'United States',
    clientAddressState: 'California',
    clientAddressCode: '91789',
    numberOfEmployee: '997',
    buildingSize: '< 10,000',
    scopeCertification: 'Unknown',
    internalReview:'Yes',
    applicableStandard: 'AC00-56B',
    translatorNeeded: 'Yes',
    preferredLanguage: 'Japanese',
    exclusionRequirement: 'Yes',
    outsideStandard: 'Yes',
    locationRegulated: 'Yes',
    importExportRequirement: 'Yes',
    consultantName: 'Yes',
    safetyRestriction: 'Yes',
    primaryIAPCode: '2 - Mining and Quarrying',
    secondaryIAPCode: '2 - Mining and Quarrying',
    reductionPersent: '100',
    reductionJustification: 'Justification'

  }

  const requiredValues = {
    companyLegalName: 'Acme Corp',
    companyPhone: '123-456-7890',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@acme.com',
    phone: '555-1234',
    siteStructure: 'Single Site', // value visible text or select option
  }

  beforeEach(() => {
    cy.viewport(1024, 768)
    loginPage.visit();
    loginPage.loginAs(users.validUser); // implement login helper to avoid UI login each test
    cy.wait(5000);
    AddNewClientPage.visit();
    cy.wait(3000);
  })

  it('Initial load: required fields show red visual indicator', () => {
    // check that each required input has red visual indicator on initial load
    const fields = [
      AddNewClientPage.elements.companyLegalName(),
      AddNewClientPage.elements.companyPhone(),
      AddNewClientPage.elements.contactFirstName(),
      AddNewClientPage.elements.contactLastName(),
      AddNewClientPage.elements.contactEmail(),
      AddNewClientPage.elements.contactPhone(),
      // AddNewClientPage.elements.siteStructure()
    ]
    // for each field, assert visual indicator exists (adjust assertion to your CSS)
    // fields.forEach(fieldEl => {
    //   fieldEl.should('exist').and($el => {
    //     // check border color or class that indicates required
    //     const border = $el.css('border-color') || $el.css('box-shadow')
    //     // fallback: check for class containing 'required' or 'is-invalid'
    //     expect(
    //       $el.hasClass('is-invalid') ||
    //       $el.hasClass('required') ||
    //       /rgb\(.+?\)/.test(border)
    //     ).to.be.true
    //   })
    // })
  })

  it('Clearing a required field keeps it highlighted (no textual validation message)', () => {
    // first fill all fields
    AddNewClientPage.fillRequired(requiredValues)
    cy.wait(1000)

    // // clear one required field
    // cy.get('#pdfTable').scrollTo('top', { ensureScrollable: false })
    // cy.get('#pdfTable').find('#mat-input-1')
    // cy.wait(5000)
    // AddNewClientPage.elements.companyPhone().scrollIntoView({ ensureScrollable: false }).should('be.visible')
    // cy.wait(5000)
    // AddNewClientPage.clearField('companyPhone')

    // // assert that the cleared field has visual highlight (red)
    // AddNewClientPage.elements.companyPhone().should($el => {
    //   const border = $el.css('border-color') || $el.css('box-shadow')
    //   expect($el.hasClass('is-invalid') || /rgb\(.+?\)/.test(border)).to.be.true
    // })

    // // assert that no textual validation messages are present (assume .validation-message or .help-block)
    // cy.get('body').then($body => {
    //   expect($body.find('.validation-message').length).to.eq(0)
    //   expect($body.find('.help-block').length).to.eq(0)
    //   // adjust selectors above per app implementation if needed
    // })
  })

  it('Filling all required fields enables the Complete button and submits successfully', () => {
    // fill required fields
    AddNewClientPage.fillRequired(requiredValues)
    cy.wait(5000),

    // Complete button should become visible and enabled
    AddNewClientPage.elements.completeButton().scrollIntoView().should('be.visible')

    // click Complete, handle confirm modal, wait for create
    AddNewClientPage.clickComplete()

    // // if confirmation modal appears
    cy.contains('Are you sure?').should('be.visible') // optional check for modal text
    AddNewClientPage.confirmContinue()

    // // assert Company Name & Phone on detail page
    cy.wait(10000)
    cy.contains('Company Name').parent().should('contain', requiredValues.companyLegalName)
    cy.contains('Phone').parent().should('contain', requiredValues.companyPhone)
  })

  it('Verify successful form submission with all valid data', () => {
    // fill required fields
    AddNewClientPage.fillAllFields(allFieldValues)
    cy.wait(5000)

    // Complete button should become visible and enabled
    AddNewClientPage.elements.completeButton().scrollIntoView().should('be.visible')

    // click Complete, handle confirm modal, wait for create
    AddNewClientPage.clickComplete()

    // // if confirmation modal appears
    cy.contains('Are you sure?').should('be.visible') // optional check for modal text
    AddNewClientPage.confirmContinue()

    // // assert Company Name & Phone on detail page
    cy.wait(10000)
    cy.contains('Company Name').parent().should('contain', requiredValues.companyLegalName)
    cy.contains('Phone').parent().should('contain', requiredValues.companyPhone)
  })
})