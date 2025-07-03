 "use client" // Only if this component needs client-side features in a framework like Next.js App Router

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Youtube, ExternalLink, Send } from "lucide-react"
import { Button } from "@/components/ui/button" // Ensure correct path based on your project
import { Input } from "@/components/ui/input"     // Ensure correct path based on your project
import { Textarea } from "@/components/ui/textarea" // Ensure correct path based on your project

const services = [
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "Academics", href: "#" },
  { name: "Placements", href: "#" },
]

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-1.jpg-H7576eK0ahJF5ShoW0fNIj1zvJ7QYx.jpeg",
    alt: "BPIT Campus Building with Courtyard",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-2.jpg-IIb9apDXZrKuieCbUr7JTPlWJ9ecWV.jpeg",
    alt: "BPIT Campus Parking Area - Aerial View",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-3.jpg-mVSTu2MfREN5HfawjC4CGNJgh5dCR4.jpeg",
    alt: "BPIT Campus Parking and Surroundings",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gallery-4.jpg-YWbtObTN9XddjSQVHqwYAhLC1oKwQj.jpeg",
    alt: "BPIT Main Building Architecture",
  },
]

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/bpitindia/", label: "Instagram" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/bhagwan-parshuram-institute-of-technology-bpit-50358a178/",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://x.com/BpitIndia", label: "Twitter" },
  { icon: Youtube, href: "https://www.youtube.com/@bpitcampus", label: "YouTube" },
]

const contactInfo = [
  {
    icon: MapPin,
    text: "BPIT, Rohini, Delhi",
    href: "https://www.google.com/maps/place/Bhagwan+Parshuram+Institute+of+Technology/@28.7366529,77.1097591,17z/data=!3m1!4b1!4m6!3m5!1s0x390d013045aab491:0xb6a504893549c54f!8m2!3d28.7366482!4d77.112334!16s%2Fm%2F06zmzs2?authuser=0&entry=ttu",
    type: "link",
  },
  {
    icon: Phone,
    text: "011-2757 1080, 011-2757 2900",
    href: "tel:01127571080",
    type: "link",
  },
  {
    icon: Mail,
    text: "bpitindia@yahoo.com",
    href: "mailto:bpitindia@yahoo.com",
    type: "link",
  },
]

export default function AdvancedFooterSolidBlue() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  return (
    <footer className="relative bg-black/90 text-white overflow-hidden"> {/* Changed background to solid blue */}
      {/* Removed CSS Stars Background and Animation */}

      {/* White accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-4 left-1/4 w-1/2 h-px bg-white/20"></div>

      {/* Gradient Overlay - Removed as it might make solid color less clear if it's black to transparent */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div> */}

      <div className="relative z-10 w-full max-w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="h-full flex flex-col items-center">
              <h3 className="font-bold mb-4 sm:mb-6 text-white text-center text-xl sm:text-2xl lg:text-3xl">Gallery</h3>
              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-700/10 rounded-lg border border-white/10 flex-grow"> {/* Adjusted background color for consistency */}
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative group cursor-pointer h-full"
                    onHoverStart={() => setHoveredImage(index)}
                    onHoverEnd={() => setHoveredImage(null)}
                    animate={{
                      scale: hoveredImage === null ? 1 : hoveredImage === index ? 1.6 : 0.85,
                      opacity: hoveredImage === null ? 1 : hoveredImage === index ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      transformOrigin: "center",
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-black/50 ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300 h-full"> {/* Adjusted background color for consistency */}
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-full md:ml-8 lg:ml-12"
          >
            <div className="h-full flex flex-col">
              <h3 className="font-bold mb-4 sm:mb-6 text-white text-center text-xl sm:text-2xl lg:text-3xl">Quick Connect</h3>
              <form className="space-y-3 flex-grow flex flex-col mx-auto w-full">
                <div>
                  <Input
                    placeholder="Name"
                    className="bg-gray-700/10 border-bg-gray-800 text-white placeholder:text-gray-300 focus:border-white/50 focus:ring-white/20 text-sm"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700/10 border-bg-gray-800 text-white placeholder:text-gray-300 focus:border-white/50 focus:ring-white/20 text-sm"
                  />
                </div>
                <div className="flex-grow">
                  <Textarea
                    placeholder="Message"
                    className="bg-gray-700/10 border-bg-gray-800 text-white placeholder:text-gray-300 focus:border-white/50 focus:ring-white/20 resize-none text-sm h-full"
                  />
                </div>
                <Button className="w-full bg-white text-black/75 hover:bg-gray-100 transition-colors duration-300 font-semibold text-sm">
                  <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h3 className="font-bold mb-4 sm:mb-6 text-white text-xl sm:text-2xl lg:text-3xl">Services</h3>
              <div className="space-y-3 flex-grow w-full">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={service.href}
                      className="flex items-center gap-2 py-3 px-3 relative group rounded justify-center"
                    >
                      <div className="w-1 h-4 bg-white/40 group-hover:bg-white transition-colors duration-300"></div>
                      <span className="relative text-base animated-underline">
                        {service.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h3 className="font-bold mb-4 sm:mb-6 text-white text-xl sm:text-2xl lg:text-3xl">Contact Us</h3>
              <div className="space-y-3 flex-grow w-full">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={contact.href}
                      target={contact.type === "link" ? "_blank" : undefined}
                      rel={contact.type === "link" ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-3 py-3 px-3 relative group rounded justify-center"
                    >
                      <div className="w-6 h-6 bg-gray-700/10 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 flex-shrink-0 mt-1">
                        <contact.icon className="w-3 h-3 text-gray-200 group-hover:text-gray-800 transition-colors duration-300" />
                      </div>
                      <span className="text-base leading-relaxed relative animated-underline text-left">
                        {contact.text}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/20 relative"
        >
          {/* Single straight line instead of three dots */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5 bg-white/60"></div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-2 text-white text-xl sm:text-2xl">Connect With Us</h4>
              <p className="text-gray-300 text-base">Stay updated with our latest news and events</p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gray-700/10 border-bg-gray-800 hover:bg-white hover:border-white hover:scale-110 transition-all duration-300 group relative overflow-hidden w-10 h-10"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:border-gray-400 transition-colors duration-300"></div>
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-800 transition-colors duration-300 relative z-10" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 pt-8 border-t border-white/20 relative"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          <div className="text-center text-white relative z-10">
            <p className="font-medium text-base">
              © {new Date().getFullYear()} All Rights Reserved | BPIT | Powered By BPIT
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}