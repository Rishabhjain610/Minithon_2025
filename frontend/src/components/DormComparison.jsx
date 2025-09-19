import { useState } from 'react';

const DormComparison = ({ dorms, currentDorm, onClose }) => {
  const [selectedDorms, setSelectedDorms] = useState([currentDorm.id]);
  
  const toggleDormSelection = (dormId) => {
    if (selectedDorms.includes(dormId)) {
      if (selectedDorms.length > 1) {
        setSelectedDorms(selectedDorms.filter(id => id !== dormId));
      }
    } else {
      if (selectedDorms.length < 3) {
        setSelectedDorms([...selectedDorms, dormId]);
      }
    }
  };

  const featuresToCompare = [
    { name: 'Price', key: 'price' },
    { name: 'Rating', key: 'rating' },
    { name: 'Location', key: 'location' },
    { name: 'Free WiFi', key: 'wifi', check: true },
    { name: 'Air Conditioning', key: 'ac', check: true },
    { name: 'Kitchen', key: 'kitchen', check: true },
    { name: 'Parking', key: 'parking', check: true },
    { name: 'Swimming Pool', key: 'pool', check: true },
  ];

  const getDormFeature = (dorm, feature) => {
    if (feature.check) {
      return dorm.amenities?.includes(feature.name) ? '✓' : '✗';
    }
    return dorm[feature.key];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Compare Dorms</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Select dorms to compare (max 3)</h3>
            <div className="flex flex-wrap gap-3">
              {dorms.map(dorm => (
                <button
                  key={dorm.id}
                  onClick={() => toggleDormSelection(dorm.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedDorms.includes(dorm.id)
                      ? 'bg-amber-100 border-amber-500 text-amber-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  } ${dorm.id === currentDorm.id ? 'font-semibold' : ''}`}
                >
                  {dorm.name} {dorm.id === currentDorm.id && '(Current)'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  {dorms
                    .filter(dorm => selectedDorms.includes(dorm.id))
                    .map(dorm => (
                      <th key={dorm.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {dorm.name}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {featuresToCompare.map((feature, index) => (
                  <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature.name}
                    </td>
                    {dorms
                      .filter(dorm => selectedDorms.includes(dorm.id))
                      .map(dorm => (
                        <td key={dorm.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getDormFeature(dorm, feature)}
                        </td>
                      ))
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormComparison;