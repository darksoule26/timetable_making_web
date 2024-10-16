import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Calendar, Clock, Sun, Moon, Sunrise, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeGroup, setActiveGroup] = useState(null)

  const yearGroups = [
    { name: "Second Year A", route: "sya", color: "from-purple-500 to-pink-500" },
    { name: "Second Year B", route: "syb", color: "from-yellow-400 to-orange-500" },
    { name: "Third Year A", route: "tya/teachers", color: "from-green-400 to-blue-500" },
    { name: "Third Year B", route: "tyb/teachers", color: "from-red-500 to-pink-500" },
    { name: "Fourth Year A", route: "fya", color: "from-indigo-500 to-purple-500" },
    { name: "Fourth Year B", route: "fyb", color: "from-blue-400 to-teal-500" },
  ]

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) setGreeting('Good morning')
      else if (hour < 18) setGreeting('Good afternoon')
      else setGreeting('Good evening')
    }

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }

    updateGreeting()
    updateTime()

    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeIcon = () => {
    const hour = new Date().getHours()
    if (hour < 6) return <Moon className="h-6 w-6 text-indigo-300" />
    if (hour < 18) return <Sun className="h-6 w-6 text-yellow-400" />
    return <Sunrise className="h-6 w-6 text-orange-400" />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Time Table Maker
          </h1>
          <div className="hidden md:flex items-center space-x-4">
            {getTimeIcon()}
            <span className="text-gray-300">{currentTime}</span>
          </div>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <div className={`md:hidden bg-gray-800 p-4 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col space-y-2">
          <a href="#" className="text-white hover:text-purple-400 transition">About</a>
          <a href="#" className="text-white hover:text-purple-400 transition">Contact</a>
          <a href="#" className="text-white hover:text-purple-400 transition">Privacy Policy</a>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <h2 
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeIn"
          >
            {greeting}, Time Lord!
          </h2>
          <p 
            className="text-center text-gray-300 mb-12 animate-fadeIn animation-delay-200"
          >
            Embark on your scheduling adventure. Choose your year group below:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearGroups.map((group, index) => (
              <div
                key={group.route}
                className={`animate-fadeIn`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <Link 
                  to={`/${group.route}`}
                  onMouseEnter={() => setActiveGroup(group.name)}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <Button
                    className={`h-32 text-lg font-semibold w-full bg-gradient-to-r ${group.color} text-white shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <Calendar className="mr-2 h-6 w-6" />
                    {group.name}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Plan Perfect
              </h3>
              <p className="text-gray-400">Mastering the art of scheduling</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition">About</a>
              <a href="#" className="hover:text-purple-400 transition">Contact</a>
              <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} PlanPerfect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {activeGroup && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-6 py-3 rounded-full shadow-lg animate-slideUp"
        >
          Ready to organize {activeGroup}?
        </div>
      )}
    </div>
  )
}