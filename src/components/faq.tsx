import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faq() {
  return (
    <section id="faq" className="bg-gray-50 py-16 md:py-24">
      <div className="container space-y-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="text-green-600">FAQ</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Find answers to common questions about our agri-tech solutions.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does precision farming work?</AccordionTrigger>
              <AccordionContent>
                Precision farming uses data from various sources like soil sensors, satellite imagery, and weather
                stations to provide detailed insights about your fields. This information helps you make targeted
                decisions about planting, irrigation, fertilization, and harvesting, optimizing resource use and
                maximizing yields.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What kind of hardware do I need to get started?</AccordionTrigger>
              <AccordionContent>
                The hardware requirements depend on which solutions you implement. Basic setups might include soil
                sensors, weather stations, and a central hub for data collection. More advanced implementations could
                include automated irrigation systems, drones for aerial imaging, and GPS-guided equipment. Our team will
                work with you to determine the optimal setup for your specific needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How long does it take to see results?</AccordionTrigger>
              <AccordionContent>
                Many customers see immediate benefits from improved operational efficiency and decision-making. For
                yield improvements, results are typically visible within the first growing season, with continuous
                improvements as the system collects more data specific to your farm and refines its recommendations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is training provided for using the platform?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide comprehensive training for all users of our platform. This includes initial setup
                training, ongoing support, and regular updates on new features. Our goal is to ensure you can fully
                leverage the technology to improve your farming operations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What is the return on investment?</AccordionTrigger>
              <AccordionContent>
                ROI varies depending on farm size, crops grown, and which solutions are implemented. However, most
                customers report ROI within 1-2 growing seasons through increased yields, reduced input costs, and labor
                savings. Our team can provide case studies relevant to your specific situation during the consultation
                process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Do you offer solutions for small farms?</AccordionTrigger>
              <AccordionContent>
                We have scalable solutions designed for farms of all sizes. Our modular approach allows small farms to
                start with the most impactful technologies and expand as needed. We believe agri-tech should be
                accessible to all farmers, regardless of operation size.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
