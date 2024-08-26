const PricingSection = () => (
  <section className="py-12 bg-gray-100">
    <h2 className="text-2xl font-bold text-center mb-8">Nos Offres</h2>
    <div className="flex justify-center space-x-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-1/3">
        <h3 className="text-xl font-semibold mb-2">Gratuit</h3>
        <p className="mb-4">Accès limité, idéal pour un usage occasionnel.</p>
        <p className="text-lg font-bold"><strong>0€</strong> / mois</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-1/3">
        <h3 className="text-xl font-semibold mb-2">Pro</h3>
        <p className="mb-4">Accès illimité et téléchargements rapides.</p>
        <p className="text-lg font-bold"><strong>10€</strong> / mois</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-1/3">
        <h3 className="text-xl font-semibold mb-2">Entreprise</h3>
        <p className="mb-4">Solution personnalisée pour les entreprises.</p>
        <p className="text-lg font-bold"><strong>30€</strong> / mois</p>
      </div>
    </div>
  </section>
);

export default PricingSection;