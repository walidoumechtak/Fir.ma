import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Contact() {
  return (
    <section id="contact" className="bg-green-600 py-16 md:py-24 text-white">
      <div className="container grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Farm?</h2>
          <p className="max-w-[600px] md:text-xl">
            Get in touch with our team to schedule a consultation and discover how our agri-tech solutions can benefit
            your specific operation.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>contact@firma.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>+92 303 7894439</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>123 Farm Road, Agriville, CA 94123</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg text-black">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium">
                  First name
                </label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium">
                  Last name
                </label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="farm-size" className="text-sm font-medium">
                Farm Size (acres)
              </label>
              <Input id="farm-size" type="number" placeholder="100" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about your farming operation and needs"
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
