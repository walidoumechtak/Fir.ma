import { BarChart3, Cloud, Droplets, Sun, Users, Leaf } from "lucide-react"

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="container space-y-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="text-green-600">Our Services</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Comprehensive Agri-Tech Solutions
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            We provide end-to-end solutions to optimize your farming operations and maximize productivity.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-green-100 p-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Precision Farming</h3>
            <p className="text-center text-muted-foreground">
              Optimize resource usage with data-driven insights and precision application technologies.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-green-100 p-3">
              <Cloud className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Weather Forecasting</h3>
            <p className="text-center text-muted-foreground">
              Advanced weather prediction models tailored specifically for agricultural planning.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-green-100 p-3">
              <Droplets className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Smart Irrigation</h3>
            <p className="text-center text-muted-foreground">
              Automated irrigation systems that optimize water usage based on soil moisture and plant needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-green-100 p-3">
              <Sun className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Crop Monitoring</h3>
            <p className="text-center text-muted-foreground">
              Real-time monitoring of crop health, growth stages, and early disease detection.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Farm Management</h3>
            <p className="text-center text-muted-foreground">
              Comprehensive farm management software to streamline operations and improve efficiency.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="rounded-full bg-green-100 p-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Sustainable Practices</h3>
            <p className="text-center text-muted-foreground">
              Solutions to reduce environmental impact while maintaining or improving productivity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
