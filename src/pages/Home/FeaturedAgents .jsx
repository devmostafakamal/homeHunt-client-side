const FeaturedAgents = () => {
  const agents = [
    {
      _id: "1",
      name: "Abdullah Al Mamun",
      email: "abdullah@example.com",
      soldCount: 25,
      photoURL: "https://i.ibb.co/99c5LkXL/real-estate-2.jpg",
    },
    {
      _id: "2",
      name: "Maya Khan",
      email: "maya@example.com",
      soldCount: 18,
      photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      _id: "3",
      name: "Rafiqul Islam",
      email: "rafiqul@example.com",
      soldCount: 30,
      photoURL: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500" // duration in milliseconds
      data-aos-delay="300"
    >
      <section className="mb-10 mt-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          🌟 Featured Agents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="p-4 shadow rounded text-center transform transition duration-300 hover:scale-105"
            >
              <img
                src={agent.photoURL}
                alt={agent.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <h3 className="text-lg font-semibold mt-3">{agent.name}</h3>
              <p className="text-gray-600">
                Properties Sold: {agent.soldCount}
              </p>
              <a
                href={`mailto:${agent.email}`}
                className="btn btn-sm btn-primary mt-3 inline-block"
              >
                Contact
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedAgents;
