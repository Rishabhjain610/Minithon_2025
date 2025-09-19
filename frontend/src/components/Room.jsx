import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Room = ({
    name,
    location,
    rating,
    reviewsCount,
    price,
    description,
    available = true,
    onBookNow,
    coordinates = [-6.9175, 107.6191],
    amenities = ["Free WiFi", "Air Conditioning", "Kitchen", "Parking", "Swimming Pool"],
    photos = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    testimonials = [
        {
            name: "John Doe",
            avatar: "JD",
            rating: 5,
            comment: "The traditional Javanese design combined with modern amenities made our stay unforgettable. Highly recommended!",
            date: "2023-10-15"
        },
        {
            name: "Anna Smith",
            avatar: "AS",
            rating: 5,
            comment: "Clean, comfortable, and the artistic Limasan roof was breathtaking. Will definitely come back!",
            date: "2023-09-28"
        },
        {
            name: "Michael Johnson",
            avatar: "MJ",
            rating: 4,
            comment: "Great value for money. The staff was exceptionally helpful and the location was perfect for exploring the area.",
            date: "2023-11-02"
        }
    ],
    sustainabilityFeatures = [
        {
            icon: "♻️",
            title: "Eco-Friendly",
            description: "We use renewable energy and sustainable materials throughout our property."
        },
        {
            icon: "💧",
            title: "Water Conservation",
            description: "Rainwater harvesting and low-flow fixtures help conserve water resources."
        },
        {
            icon: "🌿",
            title: "Local Sourcing",
            description: "We source 80% of our products from local artisans and farmers."
        },
        {
            icon: "🚫",
            title: "Zero Plastic",
            description: "We've eliminated single-use plastics from our operations."
        }
    ],
    culturalHighlights = [
        {
            title: "Traditional Architecture",
            description: "Experience authentic Javanese Limasan roof design with modern comforts."
        },
        {
            title: "Cultural Workshops",
            description: "Join our batik making or traditional cooking classes during your stay."
        },
        {
            title: "Local Experiences",
            description: "We can arrange guided tours to nearby temples and cultural sites."
        }
    ],
    similarDorms = [
        {
            id: 1,
            name: "Javanese Heritage House",
            location: "Yogyakarta, Indonesia",
            price: "$45/month",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            name: "Bamboo Eco Lodge",
            location: "Ubud, Bali",
            price: "$55/month",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            name: "Traditional Joglo House",
            location: "Surakarta, Indonesia",
            price: "$40/month",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
    ],
    contactInfo = {
        phone: "+62 123 456 7890",
        email: "info@glugulimasan.com",
        address: "Tanon Kidul, Gedangan, Colombia"
    }
}) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [queryForm, setQueryForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });
    const [weather, setWeather] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [manualLocation, setManualLocation] = useState('');
    const [showManualInput, setShowManualInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const initMap = () => {
            if (typeof window !== 'undefined' && window.L) {
                const L = window.L;

                // Fix for default marker icons in Leaflet
                delete L.Icon.Default.prototype._getIconUrl;
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                });

                const mapInstance = L.map('map').setView(coordinates, 15);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapInstance);

                const markerInstance = L.marker(coordinates)
                    .addTo(mapInstance)
                    .bindPopup(name)
                    .openPopup();

                setMap(mapInstance);
                setMarker(markerInstance);
            } else {
                // Fallback for when Leaflet is not available
                const mapElement = document.getElementById('map');
                if (mapElement) {
                    mapElement.innerHTML = `
            <div class="h-full w-full bg-blue-50 flex items-center justify-center">
              <div class="text-center p-4">
                <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p class="mt-2 text-gray-600">Map could not be loaded</p>
                <p class="text-sm text-gray-500">Location: ${location}</p>
              </div>
            </div>
          `;
                }
            }
        };

        // Load Leaflet dynamically
        if (typeof window !== 'undefined' && !window.L) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
            link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
            link.crossOrigin = '';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
            script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
            script.crossOrigin = '';
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }

        // Fetch weather data
        fetchWeatherData();

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    // Auto-advance photo carousel
    useEffect(() => {
        if (activeTab === 'description') {
            const timer = setInterval(() => {
                setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [activeTab, photos.length]);

    const fetchWeatherData = async () => {
        try {
            // In a real app, you would use a weather API with the coordinates
            // This is a mock response for demonstration
            const mockWeather = {
                temperature: 28,
                condition: "Sunny",
                humidity: 65,
                forecast: ["Sunny", "Partly Cloudy", "Clear"]
            };
            setWeather(mockWeather);
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance.toFixed(1);
    };

    const getCoordinatesFromAddress = async (address) => {
        try {
            // Using Nominatim OpenStreetMap geocoding API
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
            }
            throw new Error("Location not found");
        } catch (error) {
            setLocationError("Could not find coordinates for this address");
            return null;
        }
    };

    const handleManualLocationSubmit = async (e) => {
        e.preventDefault();
        if (!manualLocation.trim()) {
            setLocationError("Please enter a location");
            return;
        }

        setLocationError(null);
        setIsLoading(true);

        const coords = await getCoordinatesFromAddress(manualLocation);
        if (coords) {
            const userLat = coords.lat;
            const userLng = coords.lng;
            setUserLocation([userLat, userLng]);

            // Calculate distance
            const dist = calculateDistance(userLat, userLng, coordinates[0], coordinates[1]);
            setDistance(dist);

            // Add user marker to map
            if (map && window.L) {
                const L = window.L;

                // Clear any existing user markers
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker && layer !== marker) {
                        map.removeLayer(layer);
                    }
                });

                L.marker([userLat, userLng], {
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })
                })
                    .addTo(map)
                    .bindPopup("Your location")
                    .openPopup();

                // Draw a line between user and property
                const polyline = L.polyline([
                    [userLat, userLng],
                    coordinates
                ], { color: 'blue', dashArray: '5, 10' }).addTo(map);

                // Adjust map view to show both points
                const bounds = L.latLngBounds([userLat, userLng], coordinates);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
        setIsLoading(false);
    };

    const locateMe = () => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser");
            setShowManualInput(true);
            return;
        }

        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                setUserLocation([userLat, userLng]);

                // Calculate distance
                const dist = calculateDistance(userLat, userLng, coordinates[0], coordinates[1]);
                setDistance(dist);

                // Add user marker to map
                if (map && window.L) {
                    const L = window.L;

                    // Clear any existing user markers
                    map.eachLayer((layer) => {
                        if (layer instanceof L.Marker && layer !== marker) {
                            map.removeLayer(layer);
                        }
                    });

                    L.marker([userLat, userLng], {
                        icon: L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        })
                    })
                        .addTo(map)
                        .bindPopup("Your location")
                        .openPopup();

                    // Draw a line between user and property
                    const polyline = L.polyline([
                        [userLat, userLng],
                        coordinates
                    ], { color: 'blue', dashArray: '5, 10' }).addTo(map);

                    // Adjust map view to show both points
                    const bounds = L.latLngBounds([userLat, userLng], coordinates);
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
            },
            (error) => {
                let errorMessage;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied. Please enter your location manually.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable. Please enter your location manually.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out. Please enter your location manually.";
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = "An unknown error occurred. Please enter your location manually.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred. Please enter your location manually.";
                }
                setLocationError(errorMessage);
                setShowManualInput(true);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    };

    const openDirections = () => {
        if (userLocation) {
            window.open(`https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${coordinates[0]},${coordinates[1]}`);
        } else {
            setLocationError("Please locate yourself first to get directions");
            setShowManualInput(true);
        }
    };

    const openPhotoModal = (index) => {
        setSelectedPhoto(index);
    };

    const closePhotoModal = () => {
        setSelectedPhoto(null);
    };

    const navigatePhoto = (direction) => {
        setSelectedPhoto((prev) => {
            if (direction === 'next') {
                return (prev + 1) % photos.length;
            } else {
                return (prev - 1 + photos.length) % photos.length;
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQueryForm({
            ...queryForm,
            [name]: value
        });
    };

    const handleSubmitQuery = (e) => {
        e.preventDefault();
        alert('Thank you for your query! We will get back to you soon.');
        setQueryForm({
            name: '',
            email: '',
            phone: '',
            message: '',
            checkIn: '',
            checkOut: '',
            guests: 1
        });
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    return (
        <div className="w-full px-4 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Main content with map on left and details on right */}
            <div className="flex flex-col lg:flex-row">
                {/* Map Section - Left Side */}
                <div className="lg:w-1/2 relative order-2 lg:order-1">
                    <div id="map" className="h-96 lg:h-full bg-blue-50 z-0"></div>

                    <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-10">
                        <button
                            onClick={locateMe}
                            className="flex items-center text-blue-600 font-medium"
                        >
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            Locate Me
                        </button>

                        {showManualInput && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-1">Or enter your location:</p>
                                <form onSubmit={handleManualLocationSubmit} className="flex">
                                    <input
                                        type="text"
                                        value={manualLocation}
                                        onChange={(e) => setManualLocation(e.target.value)}
                                        placeholder="Enter your city or address"
                                        className="flex-grow px-2 py-1 text-sm border rounded-l focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-blue-500 text-white px-2 py-1 rounded-r text-sm disabled:bg-blue-300"
                                    >
                                        {isLoading ? '...' : 'Calculate'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {distance && (
                            <div className="mt-2 text-sm">
                                <p className="font-semibold">Distance: {distance} km</p>
                                <button
                                    onClick={openDirections}
                                    className="text-blue-500 underline text-xs mt-1"
                                >
                                    Get Directions
                                </button>
                            </div>
                        )}

                        {locationError && (
                            <div className="mt-2 text-xs text-red-500 max-w-xs">
                                {locationError}
                            </div>
                        )}
                    </div>

                    {weather && (
                        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
                            <h3 className="font-semibold text-gray-800">Current Weather</h3>
                            <div className="flex items-center mt-1">
                                <span className="text-2xl font-bold mr-2">{weather.temperature}°C</span>
                                <span className="text-gray-600">{weather.condition}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Humidity: {weather.humidity}%</p>
                        </div>
                    )}
                </div>

                {/* Room Details Section - Right Side */}
                <div className="lg:w-1/2 p-6 order-1 lg:order-2">
                    {/* Hero Section */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                        <div className="flex items-center text-gray-600 mb-4">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>{location}</span>
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="flex items-center mr-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                                <span className="ml-2 font-semibold">{rating}</span>
                                <span className="mx-2">•</span>
                                <span>{reviewsCount} reviews</span>
                            </div>
                        </div>

                        {/* Photo Carousel */}
                        <div className="relative h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                            <div
                                className="h-full w-full bg-cover bg-center transition-all duration-500"
                                style={{ backgroundImage: `url(${photos[currentPhotoIndex]})` }}
                            ></div>

                            {/* Navigation Arrows */}
                            <button
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                                onClick={prevPhoto}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>

                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                                onClick={nextPhoto}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>

                            {/* Photo Indicators */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                                {photos.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full ${index === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'} hover:bg-opacity-100 transition-colors duration-300`}
                                        onClick={() => setCurrentPhotoIndex(index)}
                                    ></button>
                                ))}
                            </div>

                            {/* Photo Counter */}
                            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                                {currentPhotoIndex + 1} / {photos.length}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'description' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'amenities' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('amenities')}
                        >
                            Amenities
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'sustainability' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('sustainability')}
                        >
                            Eco-Friendly
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === 'reviews' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'description' && (
                        <div>
                            <p className="text-gray-700 mb-6">{description}</p>

                            {/* Cultural Highlights */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Experience</h3>
                                <div className="space-y-3">
                                    {culturalHighlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="bg-amber-100 p-2 rounded-full mr-3 mt-1">
                                                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{highlight.title}</h4>
                                                <p className="text-gray-600 text-sm">{highlight.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Photo Gallery Preview */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">All Photos</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {photos.map((photo, index) => (
                                        <div
                                            key={index}
                                            className="h-24 bg-cover bg-center rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                                            style={{ backgroundImage: `url(${photo})` }}
                                            onClick={() => openPhotoModal(index)}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'amenities' && (
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4">
                                {amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'sustainability' && (
                        <div className="mb-6">
                            <div className="bg-green-50 p-4 rounded-lg mb-4">
                                <h3 className="text-lg font-semibold text-green-800 mb-2">Our Sustainability Commitment</h3>
                                <p className="text-green-700">We're committed to sustainable tourism practices that minimize our environmental impact while providing an authentic cultural experience.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {sustainabilityFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                                        <span className="text-2xl mr-3">{feature.icon}</span>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{feature.title}</h4>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-4 mb-6">
                            {testimonials.slice(0, 2).map((testimonial, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                                            <span className="font-semibold text-amber-800">{testimonial.avatar}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{testimonial.name}</h4>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                ))}
                                                <span className="ml-2 text-xs text-gray-500">{testimonial.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{testimonial.comment}</p>
                                </div>
                            ))}
                            <button className="mt-3 w-full py-3 bg-white border border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors duration-300">
                                View All {reviewsCount} Reviews
                            </button>
                        </div>
                    )}

                    {/* Price and booking */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="mb-4 sm:mb-0">
                            <p className="text-2xl font-bold text-gray-900">{price}/month</p>
                            <p className={`text-sm ${available ? 'text-green-600' : 'text-red-600'}`}>
                                {available ? 'Available' : 'Not Available'}
                            </p>
                        </div>

                        <button
                            onClick={onBookNow}
                            disabled={!available}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${available
                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            BOOK NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="p-6 border-t border-gray-200">
                {/* Virtual Tour Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Virtual Tour</h2>
                    <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                            <p className="mt-2 text-gray-600">360° Virtual Tour Available</p>
                            <button className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300">
                                Launch Virtual Tour
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div className="bg-amber-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Phone</h3>
                                <p className="text-gray-600">{contactInfo.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div className="bg-amber-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Email</h3>
                                <p className="text-gray-600">{contactInfo.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <div className="bg-amber-100 p-3 rounded-full mr-4">
                                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 极2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Address</h3>
                                <p className="text-gray-600">{contactInfo.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Dorms Section */}
                <div className="p-6 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Dorms You May Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {similarDorms.map((dorm) => (
                            <div key={dorm.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div
                                    className="h-48 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${dorm.image})` }}
                                ></div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1">{dorm.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{dorm.location}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-amber-600 font-bold">{dorm.price}</span>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 极 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81极-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">{dorm.rating}</span>
                                        </div>
                                    </div>
                                    <button className="mt-3 w-full py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Query Form Section */}
                <div className="bg-amber-50 p-8 rounded-lg border border-amber-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Have Questions? Send Us a Message</h2>
                    <form onSubmit={handleSubmitQuery} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={queryForm.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={queryForm.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" 极="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={queryForm.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="guests" className="block text-sm font-medium text-gray-极 mb-1">Number of Guests</label>
                            <select
                                id="guests"
                                name="guests"
                                value={queryForm.guests}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                            <input
                                type="date"
                                id="checkIn"
                                name="checkIn"
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                            <input
                                type="date"
                                id="checkOut"
                                name="checkOut"
                                value={queryForm.checkOut}
                                onChange={handleInputChange}
                                className="w-full px-4极 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={queryForm.message}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                required
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Photo Modal */}
            {selectedPhoto !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden">
                        <div className="relative">
                            <button
                                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition-colors duration-300"
                                onClick={closePhotoModal}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>

                            <button
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white极-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition-colors duration-300"
                                onClick={() => navigatePhoto('prev')}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>

                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-70 transition-colors duration-300"
                                onClick={() => navigatePhoto('next')}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" 极Width="2" d="M9 5l7 极-7 7"></path>
                                </svg>
                            </button>

                            <img
                                src={photos[selectedPhoto]}
                                alt={`Room photo ${selectedPhoto + 1}`}
                                className="w-full h-96 object-cover"
                            />

                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                <div className="极 space-x-2">
                                    {photos.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-3 h-3 rounded-full ${index === selectedPhoto ? 'bg-white' : 'bg-white bg-opacity-50'} hover:bg-opacity-100 transition-colors duration-300`}
                                            onClick={() => setSelectedPhoto(index)}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Room;