import Image from "next/image"

export default function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container space-y-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="text-green-600">Testimonials</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Hear from farmers who have transformed their operations with our technology.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Image
                src="/avatar1.png"
                alt="Farmer portrait"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold">John Deere</h3>
                <p className="text-sm text-muted-foreground">Wheat Farmer, Kansas</p>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              "Since implementing Fir.ma's precision farming solution, we've seen a 30% increase in yield while
              reducing water usage by 25%. The ROI has been incredible."
            </p>
          </div>
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Image
                src="/avatar2.png"
                alt="Farmer portrait"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold">Maria Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Vineyard Owner, California</p>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              "The weather forecasting and smart irrigation systems have been game-changers for our vineyard. We've been
              able to produce higher quality grapes with less labor."
            </p>
          </div>
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Image
                src="/avatar3.png"
                alt="Farmer portrait"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold">Robert Chen</h3>
                <p className="text-sm text-muted-foreground">Rice Farmer, Thailand</p>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              "The farm management software has simplified our operations tremendously. What used to take days now takes
              minutes, and we have better visibility into our entire operation."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
