import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image
          // src="/farm-back.jpg"
          src="/back2.png"
          alt="Agricultural field with modern technology"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      </div>
      <div className="container relative z-10 flex flex-col items-center justify-center space-y-4 py-32 text-center md:py-48 lg:py-56">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Revolutionizing Agriculture with Technology
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-white/90 md:text-xl">
            Smart solutions for modern farming. Increase yields, reduce costs, and farm sustainably with our
            cutting-edge agri-tech platform.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="text-white bg-transparent border-white hover:bg-white/10">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
