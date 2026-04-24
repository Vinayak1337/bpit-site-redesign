"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const libraryImages = [
  {
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80",
    alt: "Main Library Hall",
    title: "BPIT Library",
    description: "Discover knowledge, explore resources, and enhance your learning journey",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
    alt: "Digital Library Section",
    title: "Digital Resources",
    description: "Access thousands of e-books, journals, and online databases",
  },
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
    alt: "Reading Area",
    title: "Study Spaces",
    description: "Quiet and comfortable spaces for focused learning",
  },
  {
    src: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1920&q=80",
    alt: "Book Collection",
    title: "Extensive Collection",
    description: "Over 50,000 books across various disciplines",
  },
]

export function LibraryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % libraryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + libraryImages.length) % libraryImages.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {libraryImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">{image.title}</h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light">{image.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {libraryImages.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className="p-3 flex items-center justify-center"
            onClick={() => setCurrentSlide(index)}
          >
            <span
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
