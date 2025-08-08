const TipsForBuyersSellers = () => {
  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        💡 Tips for Buyers & Sellers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded shadow">
          <h3 className="font-semibold mb-2">For Buyers</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Set a realistic budget before searching.</li>
            <li>Check property documents carefully.</li>
            <li>Visit the property multiple times.</li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 rounded shadow">
          <h3 className="font-semibold mb-2">For Sellers</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Stage your property to look appealing.</li>
            <li>Set competitive pricing.</li>
            <li>Be transparent about property conditions.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TipsForBuyersSellers;
