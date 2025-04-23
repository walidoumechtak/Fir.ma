import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="text-green-600">Key Features</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Fir.ma</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Our platform offers unique advantages that set us apart from traditional farming methods.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold">Data-Driven Decisions</h3>
              <p className="mt-2 text-muted-foreground">
                Make informed decisions based on real-time data collected from your fields, weather patterns, and market
                trends.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600" />
                  <span>Soil analysis and nutrient mapping</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600" />
                  <span>Crop performance tracking</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600" />
                  <span>Yield prediction models</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-gray-100">
              <Image
                src="/data-driven-farm.jpg"
                alt="Data dashboard for farming"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="aspect-video bg-gray-100">
              <Image
                src="/mobile-access.jpg"
                alt="Mobile app for farm management"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold">Mobile Accessibility</h3>
              <p className="mt-2 text-muted-foreground">
                Access your farm data and control systems from anywhere with our mobile application.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600" />
                  <span>Real-time notifications</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600" />
                  <span>Remote system control</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 h-4 w-4 text-green-600" />
                  <span>Offline functionality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
