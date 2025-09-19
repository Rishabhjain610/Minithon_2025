"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

    const properties = [
        {
            id: 1,
            image: "/modern-apartment.png",
            price: "850.00 EUR",
            title: "Cozy spacious and adorable apartment in city centre",
            beds: 2,
            baths: 1,
            area: "1 bedroom",
            tag: "RENT",
        },
        {
            id: 2,
            image: "/luxury-villa-pool.png",
            price: "350,000.00 EUR",
            title: "Renovated luxury villa Anna with a pool",
            beds: 4,
            baths: 3,
            area: "5 bedrooms",
            tag: "RENT",
        },
        {
            id: 3,
            image: "/placeholder-3up0s.png",
            price: "950.00 EUR",
            title: "Luxury apartment with two bedrooms",
            beds: 2,
            baths: 2,
            area: "2 bedrooms",
            tag: "RENT",
        },
        {
            id: 4,
            image: "/placeholder-vm96o.png",
            price: "145,000.00 EUR",
            title: "New apartment suitable for a young family",
            beds: 3,
            baths: 2,
            area: "3 bedrooms",
            tag: "RENT",
        },
        {
            id: 5,
            image: "/placeholder-vswv1.png",
            price: "700.00 EUR",
            title: "Modern house in peaceful neighborhood",
            beds: 3,
            baths: 2,
            area: "3 bedrooms",
            tag: "RENT",
        },
        {
            id: 6,
            image: "/spacious-office-with-12-separated-rooms.jpg",
            price: "7,500,000.00 EUR",
            title: "Spacious office with 12 separated rooms",
            beds: 12,
            baths: 8,
            area: "12 bedrooms",
            tag: "RENT",
        },
    ]

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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] overflow-hidden">
                {/* <video
                    key={currentVideo}
                    src={video}
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                ></video> */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                            Find a modern property
                            <br />
                            that <span className="text-yellow-400">suits you.</span>
                        </h1>
                        <p className="text-xl text-gray-200 leading-relaxed">
                            Discover the perfect property that fits your unique
                            <br />
                            style and needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Property Search */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <Tabs defaultValue="rent" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-md">
                            <TabsTrigger value="rent">Rent</TabsTrigger>
                            <TabsTrigger value="buy">Buy</TabsTrigger>
                            <TabsTrigger value="sell">Sell</TabsTrigger>
                        </TabsList>

                        <TabsContent value="rent" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <Input placeholder="London, UK" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Property</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="House" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="condo">Condo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="3" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="bg-black text-white hover:bg-gray-800">Search</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="buy" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <Input placeholder="London, UK" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Property</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="House" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="condo">Condo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="3" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="bg-black text-white hover:bg-gray-800">Search</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="sell" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <Input placeholder="London, UK" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type of Property</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="House" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="condo">Condo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Rooms</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="3" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="bg-black text-white hover:bg-gray-800">Search</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Featured Properties */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
                        <Button variant="link" className="text-gray-600 hover:text-gray-900">
                            Explore all →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <img
                                        src={property.image || "/placeholder.svg"}
                                        alt={property.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-white text-gray-900">{property.tag}</Badge>
                                    <Button size="icon" variant="ghost" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">{property.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
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
                                            <span>{property.area}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Services */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Home className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Buy a property</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your journey to find the perfect home starts here. Our experienced advisors are here to guide you
                                through every step of the home buying process, from initial search to closing day.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Key className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rent a property</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Whether you're looking for a cozy apartment or a spacious family home, we have a wide range of rental
                                properties to suit every lifestyle and budget. Let us help you find your perfect rental.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sell a property</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ready to sell your property? Our comprehensive marketing strategies and expert negotiation skills will
                                help you achieve the best possible price for your home in the shortest time frame.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Chatbot />
            {/* Latest Blog */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Latest Blog</h2>
                        <Button variant="link" className="text-gray-600 hover:text-gray-900">
                            Read all →
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                                <CardContent className="p-6">
                                    <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                                    <Button variant="link" className="p-0 h-auto text-gray-900 hover:text-yellow-600">
                                        Read more →
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">What Our Customers Say</h2>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex-1 mx-8">
                                <Card className="p-8">
                                    <div className="flex items-center mb-6">
                                        <Avatar className="h-16 w-16 mr-4">
                                            <AvatarImage src={testimonials[currentTestimonial].avatar || "/placeholder.svg"} />
                                            <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                                            <div className="flex items-center mt-1">
                                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{testimonials[currentTestimonial].title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{testimonials[currentTestimonial].text}</p>
                                </Card>
                            </div>

                            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
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

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">FAQ</h2>
                    <p className="text-center text-gray-600 mb-12">Navigating Real Estate: Your Questions, Our Answers</p>

                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                            <AccordionTrigger className="text-left font-semibold">
                                How do I start the process of buying a property?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                The first step is to get pre-approved for a mortgage to understand your budget. Then, work with our
                                experienced agents to identify your needs and preferences, and we'll help you find properties that match
                                your criteria.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                            <AccordionTrigger className="text-left font-semibold">
                                What documents do I need when applying for a mortgage?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                You'll typically need proof of income, bank statements, tax returns, employment verification, and
                                information about your debts and assets. Our team can provide you with a complete checklist.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                            <AccordionTrigger className="text-left font-semibold">
                                How long does the home-buying process typically take?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                The process typically takes 30-45 days from the time your offer is accepted, though this can vary based
                                on financing, inspections, and other factors. We'll keep you informed every step of the way.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                            <AccordionTrigger className="text-left font-semibold">
                                How can I prepare my home for sale?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                Start with decluttering and deep cleaning, make necessary repairs, consider staging, and work with our
                                team to price your home competitively. We'll provide a detailed preparation checklist.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                            <AccordionTrigger className="text-left font-semibold">
                                What should I do if I'm interested in a property based on your website?
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                Contact us immediately to schedule a viewing. Popular properties move quickly, so don't hesitate to
                                reach out. We can arrange a showing at your convenience and answer any questions you have.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
                            <AccordionTrigger className="text-left font-semibold">Still have a question?</AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                                If you have any other questions not covered here, please don't hesitate to contact our team. We're here
                                to help and provide personalized assistance for your real estate needs.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="text-center mt-8">
                        <Button className="bg-black text-white hover:bg-gray-800">Contact us</Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe</h2>
                    <p className="text-gray-600 mb-8">Stay updated with the latest properties and real estate news</p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input type="email" placeholder="Enter your email" className="flex-1" />
                        <Button className="bg-black text-white hover:bg-gray-800">Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}