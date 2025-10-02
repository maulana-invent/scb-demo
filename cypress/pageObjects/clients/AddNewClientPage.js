class AddNewClientPage {
    // selectors: prefer stable selectors; adjust if app changes
    elements = {
      companyLegalName: () => cy.get('#mat-input-0'),
      companyPhone: () => cy.get('#mat-input-1'),
      contactFirstName: () => cy.get('#mat-input-9'),
      contactLastName: () => cy.get('#mat-input-10'),
      contactEmail: () => cy.get('#mat-input-11'),
      contactPhone: () => cy.get('#mat-input-12'),
      clientAddress1: () => cy.get('#mat-input-2'),
      clientAddress2: () => cy.get('#mat-input-3'),
      clientAddressCity: () => cy.get('#mat-input-4'),
      clientAddressCountry: () => cy.get('#mat-select-value-1'),
      clientAddressState: () => cy.get('#mat-select-value-3'),
      clientAddressCode: () => cy.get('#mat-input-5'),
      numberOfEmployee: () => cy.get('#mat-input-6'),
      buildingSizeRadioByLabel: (label) =>
        cy.contains('mat-radio-button', label)          // temukan <mat-radio-button> dengan teks label
          .find('input[type="radio"]'),
      scopeCertification: () => cy.get('#mat-input-13'),
      internalReview: () => cy.get('#mat-button-toggle-8-button > .mat-button-toggle-label-content'),
      internalReviewNote: () => cy.get('#mat-input-20'),
      internalReviewYes: () => cy.contains('#mat-button-toggle-8-button > .mat-button-toggle-label-content', /^Yes$/i),
      internalReviewNo: () => cy.contains('#mat-button-toggle-8-button > .mat-button-toggle-label-content', /^No$/i),
      applicableStandard: () => cy.get('#mat-select-value-17'),
      translatorNeeded: () => cy.get('#mat-button-toggle-34-button > .mat-button-toggle-label-content'),
      translatorNeededYes: () => cy.contains('#mat-button-toggle-34-button > .mat-button-toggle-label-content', /^Yes$/i),
      translatorNeededNo: () => cy.contains('#mat-button-toggle-34-button > .mat-button-toggle-label-content', /^No$/i),
      preferredLanguage: () => cy.get('#mat-input-35'),
      exclusionRequirement: () => cy.get('#mat-button-toggle-36-button > .mat-button-toggle-label-content'),
      exclusionRequirementYes: () => cy.contains('#mat-button-toggle-36-button > .mat-button-toggle-label-content', /^Yes$/i),
      exclusionRequirementNo: () => cy.contains('#mat-button-toggle-36-button > .mat-button-toggle-label-content', /^No$/i),
      exclusionRequirementNote: () => cy.get('#mat-input-47'),
      outsideStandard: () => cy.get('#mat-button-toggle-38-button > .mat-button-toggle-label-content'),
      outsideStandardYes: () => cy.contains('#mat-button-toggle-38-button > .mat-button-toggle-label-content', /^Yes$/i),
      outsideStandardNo: () => cy.contains('#mat-button-toggle-38-button > .mat-button-toggle-label-content', /^No$/i),
      outsideStandardNote: () => cy.get('#mat-input-48'),
      activitesAssociated: () => cy.get('#activityManagement'),
      processesOutsourced: () => cy.get('#outsourceOrganizationManufacturing'),
      locationRegulated: () => cy.get('#mat-button-toggle-40-button > .mat-button-toggle-label-content'),
      locationRegulatedYes: () => cy.contains('#mat-button-toggle-40-button > .mat-button-toggle-label-content', /^Yes$/i),
      locationRegulatedNo: () => cy.contains('#mat-button-toggle-40-button > .mat-button-toggle-label-content', /^No$/i),
      locationRegulatedNote: () => cy.get('#mat-input-49'),
      importExportRequirement: () => cy.get('#mat-button-toggle-42-button > .mat-button-toggle-label-content'),
      importExportRequirementYes: () => cy.contains('#mat-button-toggle-42-button > .mat-button-toggle-label-content', /^Yes$/i),
      importExportRequirementNo: () => cy.contains('#mat-button-toggle-42-button > .mat-button-toggle-label-content', /^No$/i),
      consultantName: () => cy.get('#mat-button-toggle-44-button > .mat-button-toggle-label-content'),
      consultantNameYes: () => cy.contains('#mat-button-toggle-44-button > .mat-button-toggle-label-content', /^Yes$/i),
      consultantNameNo: () => cy.contains('#mat-button-toggle-44-button > .mat-button-toggle-label-content', /^No$/i),
      consultantNameNote: () => cy.get('#mat-input-50'),
      safetyRestriction: () => cy.get('#mat-button-toggle-46-button > .mat-button-toggle-label-content'),
      safetyRestrictionYes: () => cy.contains('#mat-button-toggle-46-button > .mat-button-toggle-label-content', /^Yes$/i),
      safetyRestrictionNo: () => cy.contains('#mat-button-toggle-46-button > .mat-button-toggle-label-content', /^No$/i),
      safetyRestrictionNote: () => cy.get('#mat-input-51'),
      

      // trigger element that opens the material select panel
      siteStructure: () => cy.get('#mat-select-value-19'),
      primaryIAPCode: () => cy.get('#mat-select-value-21'),
      secondaryIAPCode: () => cy.get('#mat-select-value-23'),
      reductionPersent: () => cy.get('#mat-input-40'),
      reductionJustification: () => cy.get('#mat-input-41'),
      completeButton: () => cy.get('.bg-transparent > .mat-focus-indicator'),
      // modal
      confirmContinueBtn: () => cy.contains('button','Continue'),
    }
  
    visit() {
      cy.visit('/admin/clients/add')
      cy.wait(10000)
    }

    selectBuildingSize(sizeLabel) {
        this.elements
          .buildingSizeRadioByLabel(sizeLabel)
          .check({ force: true })      // pastikan ter‑pilih meski ada overlay
          .should('be.checked');
        return this;                  // enable chaining
      }

    setInternalReview(value = 'No', noteText = 'This is note for Internal audit & management review') {
        const val = (value || '').toString().trim().toLowerCase()
    
        if (val === 'yes') {
          // click Yes toggle - use contains to find the mat-button-toggle with text Yes
          this.elements.internalReviewYes()
            .scrollIntoView()
            .click()
    
          // wait for the note to appear, then type (field mandatory)
          this.elements.internalReviewNote()
            .should('be.visible')          // ensures it appeared
            .clear()
            .type(noteText, { force: true })
            .should('have.value', noteText) // confirm typed
        } else if (val === 'no') {
          // click No toggle
          this.elements.internalReviewNo()
            .scrollIntoView()
            .click({ force: true })
    
          // ensure note is not visible / removed
          this.elements.internalReviewNote()
            .should('not.exist') // or 'not.be.visible' depending on implementation
        } else {
          throw new Error(`setInternalReview: unknown value "${value}". Use "Yes" or "No".`)
        }  
    
        return this
      }

      setTranslatorNeeded(value) {
        // Normalisasi nilai masuk
        const normalized = (() => {
          if (typeof value === 'boolean') return value ? 'yes' : 'no';
          return (value || '').toString().trim().toLowerCase();
        })();
      
        // Helper yang meng‑return chain Cypress
        const clickToggle = (getter) => {
          return getter()                                 // ← get elemen
            .should('exist')                              // pastikan ada di DOM
            .scrollIntoView({ ensureScrollable: false }) // scroll bila perlu
            .then($el => {
              // Return agar Cypress menunggu klik selesai
              return cy.wrap($el).click({ force: true, timeout: 10000 });
            });
        };
        
      
        if (normalized === 'yes') {
          return clickToggle(this.elements.translatorNeededYes);
        }
        if (normalized === 'no') {
          return clickToggle(this.elements.translatorNeededNo);
        }
      
        // Jika nilai tidak dikenali, beri pesan jelas
        throw new Error(
          `translatorNeeded: nilai "${value}" tidak dikenali. Gunakan "Yes"/"No" atau true/false.`
        );
      }

      setExclusionRequirement(value = 'No', noteText = 'Design, Calibration, and Purchasing') {
        const val = (value || '').toString().trim().toLowerCase()
    
        if (val === 'yes') {
          // click Yes toggle - use contains to find the mat-button-toggle with text Yes
          this.elements.exclusionRequirementYes()
            .scrollIntoView()
            .click({ force: true })
    
          // wait for the note to appear, then type (field mandatory)
          this.elements.exclusionRequirementNote()
            // .should('be.visible')          // ensures it appeared
            .clear()
            .type(noteText)
            .should('have.value', noteText) // confirm typed
        } else if (val === 'no') {
          // click No toggle
          this.elements.exclusionRequirementNo()
            .scrollIntoView()
            .click({ force: true })
    
          // ensure note is not visible / removed
          this.elements.exclusionRequirementNote()
            .should('not.exist') // or 'not.be.visible' depending on implementation
        } else {
          throw new Error(`setExclusionRequirement: unknown value "${value}". Use "Yes" or "No".`)
        }  
    
        return this
      }
    
      setOutsideStandard(value = 'No', noteText = 'This is note for any outside standard businesss technical resources') {
        const val = (value || '').toString().trim().toLowerCase()
    
        if (val === 'yes') {
          // click Yes toggle - use contains to find the mat-button-toggle with text Yes
          this.elements.outsideStandardYes()
            .scrollIntoView()
            .click()
    
          // wait for the note to appear, then type (field mandatory)
          this.elements.outsideStandardNote()
            .should('be.visible')          // ensures it appeared
            .clear()
            .type(noteText)
            .should('have.value', noteText) // confirm typed
        } else if (val === 'no') {
          // click No toggle
          this.elements.outsideStandardNo()
            .scrollIntoView()
            .click({ force: true })
    
          // ensure note is not visible / removed
          this.elements.outsideStandardNote()
            .should('not.exist') // or 'not.be.visible' depending on implementation
        } else {
          throw new Error(`setOutsideStandard: unknown value "${value}". Use "Yes" or "No".`)
        }  
    
        return this
      }

      selectApplicableStandard(value) {
        // buka dropdown
        cy.wait(10000)
        this.elements.applicableStandard()
        .scrollIntoView().click({ force: true })
    
        // setelah panel terbuka, pilih opsi yang mengandung teks
        cy.contains(value)          // pencarian teks bersifat *contains*
          .click({ force: true });   // force untuk menghindari overlay
          cy.get('.cdk-overlay-backdrop').click();
    
        return this;
      }

    selectSiteStructure(value) {
        // buka dropdown
        this.elements.siteStructure()
        .scrollIntoView().click({ force: true })
    
        // setelah panel terbuka, pilih opsi yang mengandung teks
        cy.contains(value)          // pencarian teks bersifat *contains*
          .click({ force: true });   // force untuk menghindari overlay
    
        return this;
      }
      
    selectActivitesAssociated() {
        this.elements.activitesAssociated().click();
    }

    selectProcessesOutsources() {
      this.elements.processesOutsourced().click();
    }

    setLocationRegulated(value = 'No', noteText = 'This is note for Internal audit & management review') {
      const val = (value || '').toString().trim().toLowerCase()
  
      if (val === 'yes') {
        // click Yes toggle - use contains to find the mat-button-toggle with text Yes
        this.elements.locationRegulatedYes()
          .scrollIntoView()
          .click()
  
        // wait for the note to appear, then type (field mandatory)
        this.elements.locationRegulatedNote()
          .should('be.visible')          // ensures it appeared
          .clear()
          .type(noteText,)
          .should('have.value', noteText) // confirm typed
      } else if (val === 'no') {
        // click No toggle
        this.elements.locationRegulatedNo()
          .scrollIntoView()
          .click({ force: true })
  
        // ensure note is not visible / removed
        this.elements.internalReviewNote()
          .should('not.exist') // or 'not.be.visible' depending on implementation
      } else {
        throw new Error(`setLocationRegulated: unknown value "${value}". Use "Yes" or "No".`)
      }  
  
      return this
    }

    setImportExportRequirement(value) {
      // Normalisasi nilai masuk
      const normalized = (() => {
        if (typeof value === 'boolean') return value ? 'yes' : 'no';
        return (value || '').toString().trim().toLowerCase();
      })();
    
      // Helper yang meng‑return chain Cypress
      const clickToggle = (getter) => {
        return getter()                                 // ← get elemen
          .should('exist')                              // pastikan ada di DOM
          .scrollIntoView({ ensureScrollable: false }) // scroll bila perlu
          .then($el => {
            // Return agar Cypress menunggu klik selesai
            return cy.wrap($el).click({ force: true, timeout: 10000 });
          });
      };
      
    
      if (normalized === 'yes') {
        return clickToggle(this.elements.importExportRequirementYes);
      }
      if (normalized === 'no') {
        return clickToggle(this.elements.importExportRequirementNo);
      }
    
      // Jika nilai tidak dikenali, beri pesan jelas
      throw new Error(
        `importExportRequirement: nilai "${value}" tidak dikenali. Gunakan "Yes"/"No" atau true/false.`
      );
    }

    setConsultantName(value = 'No', noteText = 'Chulk Norris') {
      const val = (value || '').toString().trim().toLowerCase()
  
      if (val === 'yes') {
        // click Yes toggle - use contains to find the mat-button-toggle with text Yes
        this.elements.consultantNameYes()
          .scrollIntoView()
          .click()
  
        // wait for the note to appear, then type (field mandatory)
        this.elements.consultantNameNote()
          .should('be.visible')          // ensures it appeared
          .clear()
          .type(noteText)
          .should('have.value', noteText) // confirm typed
      } else if (val === 'no') {
        // click No toggle
        this.elements.consultantNameNo()
          .scrollIntoView()
          .click({ force: true })
  
        // ensure note is not visible / removed
        this.elements.consultantNameNote()
          .should('not.exist') // or 'not.be.visible' depending on implementation
      } else {
        throw new Error(`setConsultantName: unknown value "${value}". Use "Yes" or "No".`)
      }  
  
      return this
    }

    setSafetyRestriction(value = 'No', noteText = 'This is note for safte Restriction') {
      const val = (value || '').toString().trim().toLowerCase()
  
      if (val === 'yes') {
        // click Yes toggle - use contains to find the mat-button-toggle with text Yes
        this.elements.safetyRestrictionYes()
          .scrollIntoView()
          .click()
  
        // wait for the note to appear, then type (field mandatory)
        this.elements.safetyRestrictionNote()
          .should('be.visible')          // ensures it appeared
          .clear()
          .type(noteText)
          .should('have.value', noteText) // confirm typed
      } else if (val === 'no') {
        // click No toggle
        this.elements.safetyRestrictionNo()
          .scrollIntoView()
          .click({ force: true })
  
        // ensure note is not visible / removed
        this.elements.safetyRestrictionNote()
          .should('not.exist') // or 'not.be.visible' depending on implementation
      } else {
        throw new Error(`setSafetyRestriction: unknown value "${value}". Use "Yes" or "No".`)
      }  
  
      return this
    }

    selectPrimaryIAPCode(value) {
      // buka dropdown
      this.elements.primaryIAPCode().click();
  
      // setelah panel terbuka, pilih opsi yang mengandung teks
      cy.contains(value)          // pencarian teks bersifat *contains*
        .click({ force: true });   // force untuk menghindari overlay
  
      return this;
    }

    selectSecondaryIAPCode(value) {
      // buka dropdown
      this.elements.secondaryIAPCode().click();
  
      // setelah panel terbuka, pilih opsi yang mengandung teks
      cy.contains(value)          // pencarian teks bersifat *contains*
        .click({ force: true });   // force untuk menghindari overlay
  
      return this;
    }

      selectClientAddressCountry(value) {
        // buka dropdown
        this.elements.clientAddressCountry().click();
    
        // setelah panel terbuka, pilih opsi yang mengandung teks
        cy.contains(value)          // pencarian teks bersifat *contains*
          .click({ force: true });   // force untuk menghindari overlay
    
        return this;
      }

      selectClientAddressState(value) {
        // buka dropdown
        this.elements.clientAddressState().click();
    
        // setelah panel terbuka, pilih opsi yang mengandung teks
        cy.contains(value)          // pencarian teks bersifat *contains*
          .click({ force: true });   // force untuk menghindari overlay
    
        return this;
      }
  
    fillRequired(values = {}) {
      if (values.companyLegalName) this.elements.companyLegalName().clear().type(values.companyLegalName)
      if (values.companyPhone) this.elements.companyPhone().clear().type(values.companyPhone)
      if (values.firstName) this.elements.contactFirstName().clear().click().type(values.firstName)
      if (values.lastName) this.elements.contactLastName().clear().click().type(values.lastName)
      if (values.email) this.elements.contactEmail().clear().click().type(values.email)
      if (values.phone) this.elements.contactPhone().clear().click().type(values.phone, 'timeout:100000')
      if (values.siteStructure) this.selectSiteStructure(values.siteStructure)
      return this
    }

    fillAllFields(values = {}) {
        if (values.companyLegalName) this.elements.companyLegalName().clear().type(values.companyLegalName)
        if (values.companyPhone) this.elements.companyPhone().clear().type(values.companyPhone)
        if (values.clientAddress1) this.elements.clientAddress1().clear().type(values.clientAddress1)
        if (values.clientAddress2) this.elements.clientAddress2().clear().type(values.clientAddress2)
        if (values.clientAddressCity) this.elements.clientAddressCity().clear().type(values.clientAddressCity)
        if (values.clientAddressCountry) this.selectClientAddressCountry(values.clientAddressCountry)
        if (values.clientAddressState) this.selectClientAddressState(values.clientAddressState)
        if (values.clientAddressCode) this.elements.clientAddressCode().clear().type(values.clientAddressCode)
        if (values.numberOfEmployee) this.elements.numberOfEmployee().clear().type(values.numberOfEmployee)
        if (values.buildingSize) this.selectBuildingSize(values.buildingSize)
        if (values.firstName) this.elements.contactFirstName().clear().click().type(values.firstName)
        if (values.lastName) this.elements.contactLastName().clear().click().type(values.lastName)
        if (values.email) this.elements.contactEmail().clear().click().type(values.email)
        if (values.phone) this.elements.contactPhone().clear().click().type(values.phone)
        if (values.scopeCertification) this.elements.scopeCertification().clear().type(values.scopeCertification)
        if (values.internalReview) this.setInternalReview(values.internalReview)
        if (values.applicableStandard) this.selectApplicableStandard(values.applicableStandard)
        if (values.translatorNeeded) this.setTranslatorNeeded(values.translatorNeeded)    
        if (values.preferredLanguage) this.elements.preferredLanguage().clear({ force: true} ).type(values.preferredLanguage)
        if (values.exclusionRequirement) this.setExclusionRequirement(values.exclusionRequirement)
        if (values.outsideStandard) this.setOutsideStandard(values.outsideStandard)
        this.selectActivitesAssociated();
        this.selectProcessesOutsources();
        if (values.locationRegulated) this.setLocationRegulated(values.locationRegulated)
        if (values.importExportRequirement) this.setImportExportRequirement(values.importExportRequirement)
        if (values.consultantName) this.setConsultantName(values.consultantName)
        if (values.safetyRestriction) this.setSafetyRestriction(values.safetyRestriction)
        if (values.siteStructure) this.selectSiteStructure(values.siteStructure)
        if (values.primaryIAPCode) this.selectPrimaryIAPCode(values.primaryIAPCode)
        if (values.secondaryIAPCode) this.selectSecondaryIAPCode(values.secondaryIAPCode)
        if (values.reductionPersent) this.elements.reductionPersent().clear({ force: true} ).type(values.reductionPersent)
        if (values.reductionJustification) this.elements.reductionJustification().clear({ force: true} ).type(values.reductionJustification)

        return this
      }
  
    clearField(fieldName) {
      const map = {
        companyLegalName: this.elements.companyLegalName,
        companyPhone: this.elements.companyPhone,
        firstName: this.elements.contactFirstName,
        lastName: this.elements.contactLastName,
        email: this.elements.contactEmail,
        phone: this.elements.contactPhone
      }
      if (map[fieldName]) map[fieldName]().clear()
    }
  
    clickComplete() {
      this.elements.completeButton().should('be.visible').and('not.be.disabled').click({force: true})
    }
  
    confirmContinue() {
      this.elements.confirmContinueBtn().should('be.visible').click({force: true})
    }
  }
  
  export default new AddNewClientPage()
  