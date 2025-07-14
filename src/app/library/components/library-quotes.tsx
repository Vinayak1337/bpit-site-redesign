import { Quote } from "lucide-react"

const quotes = [
  {
    text: "The only thing that you absolutely have to know, is the location of the library.",
    author: "Albert Einstein",
    image: "/placeholder.svg?height=120&width=120",
    role: "Theoretical Physicist",
  },
  {
    text: "I do believe something very magical can happen when you read a good book.",
    author: "J.K. Rowling",
    image: "/placeholder.svg?height=120&width=120",
    role: "Author",
  },
]

export function LibraryQuotes() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Words of Wisdom</h2>
          <p className="text-gray-600 text-lg">Inspiring thoughts about learning and knowledge</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <Quote className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">"{quote.text}"</blockquote>
                  <div className="flex items-center space-x-4">
                    <img
                      src={quote.image || "/placeholder.svg"}
                      alt={quote.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">{quote.author}</div>
                      <div className="text-blue-600 text-sm">{quote.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
