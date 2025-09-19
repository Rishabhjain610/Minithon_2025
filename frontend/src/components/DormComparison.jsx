import React from "react";

const dorms = [
  {
    id: 1,
    name: "Heritage Hostel",
    location: "Delhi",
    pricePerMonth: 120,
    rating: 4.5,
    amenities: ["WiFi", "Laundry", "AC", "Cafeteria"],
    capacity: 150,
    covidSafety: "High",
  },
  {
    id: 2,
    name: "Green Valley Dorm",
    location: "Bengaluru",
    pricePerMonth: 100,
    rating: 4.7,
    amenities: ["WiFi", "Gym", "Parking", "24/7 Security"],
    capacity: 200,
    covidSafety: "Medium",
  },
  {
    id: 3,
    name: "Lakeview Residency",
    location: "Pune",
    pricePerMonth: 110,
    rating: 4.6,
    amenities: ["WiFi", "Study Room", "Garden", "Laundry"],
    capacity: 100,
    covidSafety: "High",
  },
  {
    id: 4,
    name: "City Central Dorm",
    location: "Mumbai",
    pricePerMonth: 130,
    rating: 4.4,
    amenities: ["WiFi", "AC", "Cafeteria", "Gym"],
    capacity: 170,
    covidSafety: "Low",
  },
];

export default function DormComparison() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Dormitory Comparison - India
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg divide-y divide-gray-200">
          <thead className="bg-amber-600">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                Price (₹/month)
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                Rating
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                Amenities
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                Capacity
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-white font-semibold uppercase"
              >
                COVID Safety
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {dorms.map((dorm, index) => (
              <tr
                key={dorm.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 whitespace-nowrap font-semibold">
                  {dorm.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{dorm.location}</td>
                <td className="px-4 py-3 whitespace-nowrap">₹{dorm.pricePerMonth}</td>
                <td className="px-4 py-3 whitespace-nowrap">{dorm.rating}</td>
                <td className="px-4 py-3 whitespace-nowrap max-w-xs">
                  <ul className="list-disc list-inside">
                    {dorm.amenities.map((amenity, i) => (
                      <li key={i}>{amenity}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{dorm.capacity}</td>
                <td className="px-4 py-3 whitespace-nowrap">{dorm.covidSafety}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center text-gray-600 text-sm">
        * All values are static and for demonstration purposes only.
      </div>
    </div>
  );
}