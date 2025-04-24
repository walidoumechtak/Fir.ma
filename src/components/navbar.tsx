import Link from "next/link"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Leaf className="h-6 w-6 text-green-600" /> */}
            <span className="inline-block font-bold">
              <Image 
                src="/firma.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#services"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="#features"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#faq"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
            <Link
              href="#contact"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href="/login">
              <Button variant="ghost" size="sm">
              Log in
              </Button>
            </Link>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
