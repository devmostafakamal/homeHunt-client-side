import { useEffect, useState } from "react";

const bannerImages = [
  "/assets/estate-3.jpg",
  "/assets/real-estate-2.jpg",
  "/assets/real-estate.jpg",
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
              index === current
                ? "opacity-100 scale-105"
                : "opacity-0 scale-100"
            } bg-cover bg-center`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0  bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center text-white px-4">
        <div>
          <h1 className="text-5xl font-bold mb-4">Welcome to Houzez</h1>
          <p className="text-xl max-w-2xl  mx-auto">
            Packed with new features and improvements, it is the biggest
            all-in-one solution for real estate companies and professionals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">
            <div className="p-6 md:p-4 rounded-lg backdrop-blur-sm bg-blue-400">
              <h3 className="font-bold text-xl mb-2 ">Easy to get started</h3>
              <p className="text-sm">
                Launch your site in minutes without experience.
              </p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-2">Highly customizable</h3>
              <p className="text-sm">Tailor everything to your expectations.</p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-2">Drag-and-drop based</h3>
              <p className="text-sm">Build pages easily using visual tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
