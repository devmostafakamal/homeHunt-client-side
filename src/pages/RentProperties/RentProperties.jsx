import React from "react";

const RentProperties = () => {
  const properties = [
    {
      id: 1,
      name: "Luxury Family Home",
      price: "$5,800",
      address: "132 Greene Ave",
      type: "House",
      image: "/assets/home-1.jpg",
      featured: false,
    },
    {
      id: 2,
      name: "Gorgeous Villa Bay",
      price: "$4,800",
      address: "18 Grattan St, Brooklyn",
      type: "Villa",
      image: "/assets/home-2.jpg",
      featured: false,
    },
    {
      id: 3,
      name: "Spacious Family Home",
      price: "$550",
      address: "538 Hart St, Brooklyn",
      type: "House",
      image: "/assets/home-3.jpg",
      featured: false,
    },
    {
      id: 4,
      name: "House on the Hollywood",
      price: "$4,600",
      address: "374 Johnson Ave",
      type: "House",
      image: "/assets/home-4.jpg",
      featured: true,
    },
    {
      id: 5,
      name: "Selway Apartments",
      price: "$120",
      address: "777 S Alameda St",
      type: "Apartment",
      image: "/assets/home-5.jpg",
      featured: false,
    },
    {
      id: 6,
      name: "Comfortable Villa Green",
      price: "$5,800",
      address: "178 Broadway, Brooklyn",
      type: "Villa",
      image: "/assets/home-1.jpg",
      featured: true,
    },
  ];

  return (
    <div className="max-w-[1402px] mx-auto p-6 mt-30">
      <h1 className="text-3xl font-semibold mb-6">Properties For Rent</h1>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-8">
        <button className="py-2 px-4 bg-gray-200 rounded-full hover:bg-blue-400">
          Houses
        </button>
        <button className="py-2 px-4 bg-gray-200 rounded-full hover:bg-blue-400">
          Villa
        </button>
        <button className="py-2 px-4 bg-gray-200 rounded-full hover:bg-blue-400">
          Office
        </button>
        <button className="py-2 px-4 bg-gray-200 rounded-full hover:bg-blue-400">
          Apartments
        </button>
      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className=" shadow-lg rounded-lg overflow-hidden  relative  transform transition duration-300 
             hover:-translate-y-3 origin-bottom"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-auto object-cover"
            />

            <div className="flex justify-between items-center absolute bottom-2 left-2 right-2 p-6 rounded-lg bg-white">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold truncate">
                  {property.name}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  {property.address}
                </p>
              </div>

              <div className="flex items-center border px-4 py-2 rounded-lg ml-4 whitespace-nowrap">
                <span className="text-lg font-semibold">{property.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentProperties;
