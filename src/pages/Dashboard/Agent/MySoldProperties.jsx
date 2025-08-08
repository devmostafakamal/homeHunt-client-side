import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";

const MySoldProperties = () => {
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sold-properties?agentEmail=${user.email.toLowerCase()}`
      );
      return res.data;
    },
  });
  useEffect(() => {
    const fetchTotalSold = async () => {
      const res = await axiosSecure.get(
        `/agent-total-sales?email=${user?.email}`
      );
      setTotalSoldAmount(res.data.totalAmount);
    };

    if (user?.email) {
      fetchTotalSold();
    }
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
        {soldProperties.length === 0 ? (
          <p className="text-gray-600">No sold properties found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="table w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Property Title</th>
                  <th>Location</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Sold Price ($)</th>
                </tr>
              </thead>
              <tbody>
                {soldProperties.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>
                    <td>{property.title}</td>
                    <td>{property.location}</td>
                    <td>{property.buyerName}</td>
                    <td>{property.buyerEmail}</td>
                    <td>${property.soldPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="bg-green-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-green-800">
          🏠 Total Property Sold Amount: ৳ {totalSoldAmount}
        </h2>
      </div>
    </>
  );
};

export default MySoldProperties;
