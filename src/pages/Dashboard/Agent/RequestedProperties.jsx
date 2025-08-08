import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: offers = [], refetch } = useQuery({
    queryKey: ["agent-offers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleAccept = async (offerId, propertyId) => {
    try {
      const res = await axiosSecure.patch(`/offers/accept/${offerId}`, {
        propertyId,
      });
      if (res.data?.accepted?.modifiedCount > 0) {
        Swal.fire("Accepted", "Offer has been accepted", "success");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to accept offer", "error");
    }
  };

  const handleReject = async (offerId) => {
    try {
      const res = await axiosSecure.patch(`/offers/reject/${offerId}`);
      if (res.data?.modifiedCount > 0) {
        Swal.fire("Rejected", "Offer has been rejected", "info");
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to reject offer", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Requested Offers</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Buyer</th>
              <th>Offer</th>
              <th>Buy Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{offer.title}</td>
                <td>{offer.location}</td>
                <td>
                  <p>{offer.buyerName}</p>
                  <p className="text-xs text-gray-500">{offer.buyerEmail}</p>
                </td>
                <td>${offer.offerAmount}</td>
                <td>{offer.buyingDate}</td>
                <td className="capitalize">{offer.status}</td>
                <td>
                  {offer.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAccept(offer._id, offer.propertyId)
                        }
                        className="btn btn-xs btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(offer._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
