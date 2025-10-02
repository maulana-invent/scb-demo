  class DashboardPage {
    verifyDashboardPage() {
      // Contoh assertion memastikan dashboard muncul
      cy.url().should('include', '/home');
      cy.contains('Dashboard').should('be.visible'); // Contoh teks di halaman dashboard
    }
  }

  export default new DashboardPage;