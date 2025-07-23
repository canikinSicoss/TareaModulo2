import Image from "next/image"
import { Button } from "/components/ui/button"
import { ChevronDown, Monitor, FolderOpen, Users, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-4 py-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">
              <span className="bg-yellow-400 text-black px-1">H</span>
              <span className="bg-yellow-400 text-black px-1">E</span>
              <span className="bg-yellow-400 text-black px-1">N</span>
              <span className="bg-yellow-400 text-black px-1">R</span>
              <span className="bg-yellow-400 text-black px-1">Y</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Para estudiantes</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Para empresas</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
              Ingresar
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6">Aplicar</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Comienza o acelera tu carrera en tecnología
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed">
                Estudia Desarrollo Full Stack, Data Science o Data Analytics.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Monitor className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 text-lg">Online, en vivo y flexible</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 text-lg">Basado en proyectos</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 text-lg">Basado en cohortes</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 text-lg">Garantía de Empleo</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 text-lg">
                Aplicar
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Estudiante trabajando en su computadora"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Bootcamp <span className="text-purple-600">#1</span> de Latam
          </h2>
        </div>
      </main>
    </div>
  )
}
