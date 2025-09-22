import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const Advertisement = () => {
  const { data: advertised = [], isLoading } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await axios.get(
        "https://homehunt-server-azure.vercel.app/properties/advertised"
      );
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center">Loading advertisements...</p>;
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1500" // duration in milliseconds
      data-aos-delay="300"
    >
      <div className="my-10 ">
        <h2 className="text-3xl font-bold text-center mb-6">
          🏠 Advertisement Section
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advertised.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-md p-4 overflow-hidden "
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded transform transition duration-300 ease-in-out hover:scale-105"
              />
              <div className="mt-3 space-y-1">
                <p className="text-lg font-semibold text-gray-800">
                  📍 {property.location}
                </p>
                <p className="text-sm text-gray-600">
                  💰 Price Range: {property.priceRange}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  ✅ {property.verificationStatus}
                </p>
                <Link to={`/property-details/${property._id}`}>
                  <button className="mt-2 btn btn-sm btn-primary">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
