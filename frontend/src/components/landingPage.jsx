import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Bed, Bath, Square, Heart, Home, Key, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import Chatbot from "./Chatbot"

const video = "https://res.cloudinary.com/dkpgnq7ym/video/upload/v1758253860/HeroSectionVideo_gfz0dw.mp4";

export default function LandingPage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [location, setLocation] = useState("mumbai")
    const [priceRange, setPriceRange] = useState(10000)

    const navigate = useNavigate();

    const cityCoordinates = {
        mumbai: { lat: 19.076, lng: 72.8777 },
        pune: { lat: 18.5204, lng: 73.8567 },
        delhi: { lat: 28.7041, lng: 77.1025 },
    };

    const properties = [
        {
            id: 1,
            image: "/img1.jpeg",
            price: "₹6,000",
            priceNumber: 6000,
            title: "Shiv Sagar Dormitory",
            beds: 2,
            baths: 1,
            area: "1 bedroom",
            tag: "RENT",
            city: "mumbai",
        },
        {
            id: 2,
            image: "/img2.jpeg",
            price: "₹25,000",
            priceNumber: 250000,
            title: "Renovated luxury villa Anna with a pool",
            beds: 4,
            baths: 3,
            area: "5 bedrooms",
            tag: "RENT",
            city: "pune",
        },
        {
            id: 2,
            image: "/img3.jpeg",
            price: "₹30,000",
            priceNumber: 30000,
            title: "Renovated villa Anna with a pool",
            beds: 5,
            baths: 2,
            area: "7 bedrooms",
            tag: "RENT",
            city: "pune",
        },
        {
            id: 3,
            image: "/img4.jpg",
            price: "₹10,500",
            priceNumber: 10500,
            title: "Luxury apartment with two bedrooms",
            beds: 2,
            baths: 2,
            area: "2 bedrooms",
            tag: "RENT",
            city: "delhi",
        },
        {
            id: 4,
            image: "/img5.jpg",
            price: "₹19,000",
            priceNumber: 19000,
            title: "New apartment suitable for a young family",
            beds: 3,
            baths: 2,
            area: "3 bedrooms",
            tag: "RENT",
            city: "mumbai",
        },
        {
            id: 5,
            image: "/img6.jpeg",
            price: "₹43,000",
            priceNumber: 43000,
            title: "Modern house in peaceful neighborhood",
            beds: 3,
            baths: 2,
            area: "3 bedrooms",
            tag: "RENT",
            city: "mumbai",
        },
        {
            id: 6,
            image: "/img7.jpeg",
            price: "₹50,000",
            priceNumber: 500000,
            title: "Spacious office with 12 separated rooms",
            beds: 12,
            baths: 8,
            area: "12 bedrooms",
            tag: "RENT",
            city: "pune",
        },
    ]

    // Filter properties based on location and priceRange
    const filteredProperties = properties.filter(
        (property) =>
            property.city.toLowerCase() === location.toLowerCase() &&
            property.priceNumber <= priceRange
    )

    const blogPosts = [
        {
            id: 1,
            image: "/couple-looking-at-home-buyer-checklist.jpg",
            title: "Will 2024 Be a Home Buyer's Market?",
            date: "Feb 15, 2024",
            excerpt:
                "Will interest rates keep rising? Will home prices continue to climb? Here's what experts are saying about the housing market in 2024 and what it means for buyers.",
        },
        {
            id: 2,
            image: "/real-estate-agent-showing-documents.jpg",
            title: "What does the latest interest rate rise mean for home buyers?",
            date: "Feb 10, 2024",
            excerpt:
                "The Bank Rate is up to 5.25% but the schedule for future rate rises is still unclear. We explore what this means for mortgage rates and home buyers.",
        },
        {
            id: 3,
            image: "/modern-home-office-workspace.jpg",
            title: "UK Competition Rulebook: Should You Use One?",
            date: "Feb 8, 2024",
            excerpt:
                "Competition for properties can be intense in today's market. Here's how to make your offer stand out and what tools can help you succeed.",
        },
    ]

    const testimonials = [
        {
            id: 1,
            name: "Alex R.",
            avatar: "/professional-man-headshot.png",
            rating: 5,
            title: "A Dream Home Awaits!",
            text: "I had a fantastic experience with Realty! Real Estate Agency when buying my first home. Their team made the entire process smooth and stress-free. They listened to my needs and helped me find the perfect home within my budget. Their expertise and guidance were invaluable, and I couldn't be happier with my new home!",
        },
        {
            id: 2,
            name: "Maria V.",
            avatar: "/professional-woman-headshot.png",
            rating: 5,
            title: "Smooth Selling Process",
            text: "Selling my property was a breeze thanks to Realty! Real Estate Agency. Their marketing strategy and professional approach helped me get the best price for my home. The team was responsive, knowledgeable, and made the entire process stress-free.",
        },
        {
            id: 3,
            name: "Ben K.",
            avatar: "/young-professional-man-headshot.png",
            rating: 5,
            title: "Finding the Perfect Rental",
            text: "I was impressed by the professionalism and efficiency of the Realty team. They helped me find the perfect rental property that suited my needs and budget. Their attention to detail and customer service was exceptional.",
        },
    ]

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const handleCardClick = (property) => {
        // Add the city coordinates data to the property
        const extendedProperty = {
            ...property,
            cityCoordinates,
        };
        // Navigate to Room.jsx page and pass the property data via location state
        navigate("/room", { state: { property: extendedProperty } });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Responsive Heights */}
            <section className="relative h-[500px] sm:h-[600px] md:h-[650px] lg:h-[730px] overflow-hidden">
                <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-25 md:h-30 lg:h-40 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="text-white max-w-full sm:max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                            Find the perfect dormitory
                            <br />
                            that <span className="text-yellow-400">suits your lifestyle.</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                            Discover the perfect property that fits your unique
                            <br className="hidden sm:block" />
                            style and needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Section - Responsive, Centered */}
            <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 md:-mt-16 relative z-20">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/* Location Filter */}
                    <div className="flex flex-col w-full sm:w-1/2 md:w-2/5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>
                        <Select
                            className="bg-white w-full"
                            defaultValue="mumbai"
                            onValueChange={(value) => setLocation(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="bg-white" value="mumbai">
                                    Mumbai
                                </SelectItem>
                                <SelectItem className="bg-white" value="pune">
                                    Pune
                                </SelectItem>
                                <SelectItem className="bg-white" value="delhi">
                                    Delhi
                                </SelectItem>
                                <SelectItem className="bg-white" value="bangalore">
                                    Bangalore
                                </SelectItem>
                                <SelectItem className="bg-white" value="chennai">
                                    Chennai
                                </SelectItem>
                                <SelectItem className="bg-white" value="kolkata">
                                    Kolkata
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="flex flex-col w-full sm:w-1/2 md:w-3/5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price Range (₹)
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="15000"
                                max="70000"
                                step="1000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-base font-semibold text-gray-700 min-w-[110px] text-right">
                                ₹{priceRange.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Featured Properties - Responsive Grid */}
            <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Properties</h2>
                        <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0">
                            Explore all →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredProperties.length > 0 ? filteredProperties.map((property) => (
                            <Card key={property.id} onClick={() => handleCardClick(property)} className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <img
                                        src={property.image || "/placeholder.svg"}
                                        alt={property.title}
                                        className="w-full h-60 object-cover"
                                    />
                                    {/* <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white text-gray-900 text-xs">{property.tag}</Badge> */}
                                    <Button size="icon" variant="ghost" className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/80 hover:bg-white w-8 h-8">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardContent className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xl sm:text-2xl font-bold text-gray-900">{property.price}</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 line-clamp-2">{property.title}</h3>
                                    <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Bed className="h-4 w-4" />
                                            <span>{property.beds}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath className="h-4 w-4" />
                                            <span>{property.baths}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Square className="h-4 w-4" />
                                            <span className="text-xs sm:text-sm">{property.area}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Home className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                                <p className="text-sm sm:text-base text-gray-600">Try adjusting your filters to see more results</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Our Services - Responsive Grid */}
            <section id="services" className="py-8 sm:py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 md:mb-16">
                        Our Services
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Home className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                Room Listings
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Easily browse and compare available rooms with real-time pricing, detailed amenities, and high-quality images.
                                Find your ideal accommodation quickly with our immersive listings and smart filters.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <Key className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                Digital Bookings & Management
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Book, modify, or inquire about your stay effortlessly with our centralized online platform,
                                complete with an easy-to-use contact form and responsive support from dormitory staff.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                Facility Gallery & Location Info
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Explore a rich gallery of rooms and common areas, and access interactive maps highlighting the dormitory location,
                                nearby amenities, and convenient transport options for a seamless move-in experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Testimonials - Responsive Layout */}
            <section className="py-8 sm:py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 md:mb-16">What Our Customers Say</h2>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent flex-shrink-0">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex-1 mx-4 sm:mx-8">
                                <Card className="p-4 sm:p-6 md:p-8">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6 gap-4">
                                        <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                                            <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                                            <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center sm:text-left">
                                            <h4 className="font-semibold text-base sm:text-lg">{testimonials[currentTestimonial].name}</h4>
                                            <div className="flex items-center justify-center sm:justify-start mt-1">
                                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">{testimonials[currentTestimonial].title}</h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center sm:text-left">{testimonials[currentTestimonial].text}</p>
                                </Card>
                            </div>

                            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent flex-shrink-0">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex justify-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentTestimonial ? "bg-yellow-400" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ - Responsive */}
            <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
                        FAQ
                    </h2>
                    <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
                        Navigating Dormitory Booking: Your Questions, Our Answers
                    </p>

                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="item-1" className="bg-white rounded-lg px-4 sm:px-6">
                            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                                How do I book a room in the dormitory?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm sm:text-base">
                                You can browse available rooms, check amenities and pricing, and book your preferred room directly through our online platform using the 'Book Now' option.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="bg-white rounded-lg px-4 sm:px-6">
                            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                                What documents are required for booking?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm sm:text-base">
                                Typically, you’ll need valid ID proof (like Aadhaar or college ID) and, if required, a proof of admission or employment. Check our booking page for specific requirements.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="bg-white rounded-lg px-4 sm:px-6">
                            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                                Can I see photos and details of rooms before booking?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm sm:text-base">
                                Yes! Our gallery features high-quality images and detailed descriptions of each room and common area, so you can make an informed choice.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="bg-white rounded-lg px-4 sm:px-6">
                            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                                Is there a contact point for questions or assistance?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm sm:text-base">
                                Absolutely. Use our inquiry form or the support contact provided on the site—we’re here to help you with bookings, payments, or other issues.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="bg-white rounded-lg px-4 sm:px-6">
                            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                                What amenities and facilities are included?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm sm:text-base">
                                Facilities such as WiFi, laundry, mess, common lounges, security services, and cleaning are included as per each dormitory’s offering. Check the room details or amenities list for information.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6" className="bg-white rounded-lg px-4 sm:px-6">
                            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                                Still have a question?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm sm:text-base">
                                If your question isn’t listed here, feel free to contact our team with your specific query. We’re committed to smooth, transparent, and supportive dormitory experiences.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="text-center mt-6 sm:mt-8">
                        <Link to="/contact">
                            <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 sm:px-8 sm:py-3">
                                Contact us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}