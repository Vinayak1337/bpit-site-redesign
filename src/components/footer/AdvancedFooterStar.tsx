"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Youtube, ExternalLink, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

export default function AdvancedFooter() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  return (
    <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* CSS Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* CSS Animation for stars */}
      <style jsx>{`
        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 
            1541px 1046px #fff, 1651px 1164px #fff, 1286px 1642px #fff, 1364px 1218px #fff,
            1739px 1665px #fff, 1686px 1617px #fff, 1853px 1341px #fff, 1388px 1567px #fff,
            1123px 1253px #fff, 1851px 1238px #fff, 1695px 1449px #fff, 1731px 1868px #fff,
            1251px 1732px #fff, 1441px 1409px #fff, 1532px 1352px #fff, 1796px 1895px #fff,
            1169px 1863px #fff, 1463px 1717px #fff, 1689px 1894px #fff, 1755px 1279px #fff,
            1394px 1516px #fff, 1442px 1565px #fff, 1824px 1341px #fff, 1745px 1750px #fff,
            1318px 1317px #fff, 1892px 1643px #fff, 1165px 1579px #fff, 1693px 1847px #fff,
            1425px 1243px #fff, 1583px 1689px #fff, 1754px 1594px #fff, 1689px 1423px #fff,
            1496px 1267px #fff, 1762px 1533px #fff, 1324px 1567px #fff, 1894px 1743px #fff,
            1167px 1342px #fff, 1845px 1478px #fff, 1634px 1847px #fff, 1583px 1294px #fff,
            1759px 1867px #fff, 1892px 1569px #fff, 1325px 1794px #fff, 1567px 1432px #fff,
            1472px 1673px #fff, 1794px 1264px #fff, 1869px 1892px #fff, 1623px 1567px #fff,
            1345px 1789px #fff, 1892px 1345px #fff, 1567px 1892px #fff, 1234px 1567px #fff,
            987px 1456px #fff, 1678px 987px #fff, 1234px 1678px #fff, 1456px 1234px #fff,
            789px 1567px #fff, 1890px 789px #fff, 1123px 1890px #fff, 1567px 1123px #fff,
            654px 1789px #fff, 1987px 654px #fff, 1345px 1987px #fff, 1789px 1345px #fff,
            432px 1654px #fff, 1876px 432px #fff, 1098px 1876px #fff, 1654px 1098px #fff,
            321px 1543px #fff, 1765px 321px #fff, 1209px 1765px #fff, 1543px 1209px #fff,
            876px 1321px #fff, 1654px 876px #fff, 1432px 1654px #fff, 1321px 1432px #fff,
            543px 1876px #fff, 1987px 543px #fff, 1765px 1987px #fff, 1876px 1765px #fff,
            210px 1432px #fff, 1543px 210px #fff, 1876px 1543px #fff, 1432px 1876px #fff;
          animation: animStar 15s linear infinite;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
        }

        .stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 
            700px 400px #fff, 400px 500px #fff, 300px 300px #fff, 800px 200px #fff,
            200px 600px #fff, 900px 700px #fff, 100px 100px #fff, 600px 800px #fff,
            500px 200px #fff, 1000px 600px #fff, 150px 750px #fff, 850px 150px #fff,
            750px 550px #fff, 350px 850px #fff, 950px 350px #fff, 250px 250px #fff,
            650px 650px #fff, 450px 450px #fff, 1100px 300px #fff, 300px 1100px #fff,
            1200px 800px #fff, 800px 1200px #fff, 1300px 500px #fff, 500px 1300px #fff,
            1400px 200px #fff, 200px 1400px #fff, 1500px 700px #fff, 700px 1500px #fff,
            1600px 400px #fff, 400px 1600px #fff, 1700px 900px #fff, 900px 1700px #fff,
            1800px 300px #fff, 300px 1800px #fff, 1900px 600px #fff, 600px 1900px #fff,
            50px 450px #fff, 450px 50px #fff, 550px 950px #fff, 950px 550px #fff,
            1050px 250px #fff, 250px 1050px #fff, 1150px 750px #fff, 750px 1150px #fff,
            1250px 450px #fff, 450px 1250px #fff, 1350px 850px #fff, 850px 1350px #fff,
            1450px 150px #fff, 150px 1450px #fff, 1550px 650px #fff, 650px 1550px #fff,
            1650px 350px #fff, 350px 1650px #fff, 1750px 750px #fff, 750px 1750px #fff,
            1850px 250px #fff, 250px 1850px #fff, 1950px 550px #fff, 550px 1950px #fff;
          animation: animStar 25s linear infinite;
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
        }

        .stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 
            600px 300px #fff, 300px 600px #fff, 900px 900px #fff, 1200px 200px #fff,
            200px 1200px #fff, 1500px 500px #fff, 500px 1500px #fff, 800px 800px #fff,
            1000px 400px #fff, 400px 1000px #fff, 1300px 700px #fff, 700px 1300px #fff,
            100px 900px #fff, 900px 100px #fff, 1400px 600px #fff, 600px 1400px #fff,
            1600px 800px #fff, 800px 1600px #fff, 1700px 300px #fff, 300px 1700px #fff,
            1800px 700px #fff, 700px 1800px #fff, 1900px 400px #fff, 400px 1900px #fff,
            50px 800px #fff, 800px 50px #fff, 1050px 500px #fff, 500px 1050px #fff,
            1150px 900px #fff, 900px 1150px #fff, 1250px 200px #fff, 200px 1250px #fff,
            1350px 600px #fff, 600px 1350px #fff, 1450px 1000px #fff, 1000px 1450px #fff,
            1550px 300px #fff, 300px 1550px #fff, 1650px 700px #fff, 700px 1650px #fff,
            1750px 100px #fff, 100px 1750px #fff, 1850px 500px #fff, 500px 1850px #fff,
            1950px 900px #fff, 900px 1950px #fff, 150px 1100px #fff, 1100px 150px #fff,
            250px 1300px #fff, 1300px 250px #fff, 350px 1500px #fff, 1500px 350px #fff,
            450px 1700px #fff, 1700px 450px #fff, 550px 1900px #fff, 1900px 550px #fff;
          animation: animStar 35s linear infinite;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>

      {/* White accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-4 left-1/4 w-1/2 h-px bg-white/20"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

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
              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-800/20 rounded-lg border border-white/10 flex-grow">
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
                    <div className="relative overflow-hidden rounded-lg bg-gray-700 ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300 h-full">
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
                    className="bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-300 focus:border-white/50 focus:ring-white/20 text-sm"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-300 focus:border-white/50 focus:ring-white/20 text-sm"
                  />
                </div>
                <div className="flex-grow">
                  <Textarea
                    placeholder="Message"
                    className="bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-300 focus:border-white/50 focus:ring-white/20 resize-none text-sm h-full"
                  />
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-100 transition-colors duration-300 font-semibold text-sm">
                  <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Send
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
                      <span className="relative text-base animated-underline"> {/* Changed to text-base */}
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
            <div className="h-full flex flex-col items-center justify-center text-center"> {/* Added justify-center and text-center */}
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
                      className="flex items-start gap-3 py-3 px-3 relative group rounded justify-center" // Added justify-center
                    >
                      <div className="w-6 h-6 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 flex-shrink-0 mt-1">
                        <contact.icon className="w-3 h-3 text-gray-400 group-hover:text-gray-800 transition-colors duration-300" />
                      </div>
                      <span className="text-base leading-relaxed relative animated-underline text-left"> {/* Changed to text-base */}
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
                    className="bg-gray-700/40 border-gray-500/50 hover:bg-white hover:border-white hover:scale-110 transition-all duration-300 group relative overflow-hidden w-10 h-10"
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
