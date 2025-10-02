// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    charts: true,
    reportPageTitle: 'SCB Dashboard - Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    baseUrl: 'https://uat-scb.iapmo.org',   // <-- ganti ke URL sebenarnya
    screenshotOnRunFailure: true,                 // otomatis screenshot saat gagal
    video: true,                                   // rekam video setiap run
    videoCompression: false,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
    
  },
});