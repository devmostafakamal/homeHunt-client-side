import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

const AllProperties = () => {
  const axiosSecure = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified");
      return res.data;
    },
  });
  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchTerm)
  );

  const filteredAndSortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseFloat(a.priceRange.split("-")[0]);
    const priceB = parseFloat(b.priceRange.split("-")[0]);

    if (sortOrder === "asc") return priceA - priceB;
    if (sortOrder === "desc") return priceB - priceA;
    return 0;
  });
  // console.log(filteredProperties);
  // console.log(properties);
  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <input
            type="text"
            placeholder="Search by location"
            className="input input-bordered w-full max-w-xs mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

        <div className="text-right">
          <select
            className="select select-bordered w-[120px] max-w-xs mb-4"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {filteredAndSortedProperties.map((p) => (
          <div key={p._id} className="card bg-base-100 shadow-xl p-4 space-y-3">
            <img
              src={p.image}
              className="rounded-lg h-48 w-full object-cover"
              alt="Property"
            />
            <h2 className="text-xl font-bold">{p.title}</h2>
            <p>
              <strong>Location:</strong> {p.location}
            </p>
            <p>
              <strong>Agent:</strong> {p.agentName}
            </p>
            <img
              src={p.agentImage}
              className="h-10 w-10 rounded-full object-cover"
              alt="Agent"
            />
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 badge ${
                  p.verificationStatus === "verified"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {p.verificationStatus}
              </span>
            </p>
            <p>
              <strong>Price Range:</strong> {p.priceRange}
            </p>
            <Link
              to={`/property-details/${p._id}`}
              className="btn btn-outline btn-sm btn-primary"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllProperties;
