"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useScenarioStore } from "@/hooks/useScenarioStore";

// Import all the icons from the original component
import {
  Factory,
  Leaf,
  Zap,
  Waves,
  Sun,
  Wind,
  Battery,
  Cable,
  PlusCircle,
} from "lucide-react";

const allSteps = [
  {
    id: "location",
    name: "Location",
    supportText: "Select Type",
    icon: Leaf,
  },
  {
    id: "ammonia-plant",
    name: "Ammonia Plant",
    supportText: "Support Text",
    icon: Factory,
  },
  {
    id: "ammonia-storage",
    name: "Ammonia Storage",
    supportText: "Support Text",
    icon: Factory,
  },
  {
    id: "air-separation-unit",
    name: "Air Separation Unit",
    supportText: "Support Text",
    icon: Waves,
  },
  {
    id: "electrolyser",
    name: "Electrolyser",
    supportText: "Support Text",
    icon: Zap,
  },
  {
    id: "hydrogen-storage",
    name: "Hydrogen Storage",
    supportText: "Support Text",
    icon: Factory,
  },
  {
    id: "water-plant",
    name: "Water Plant",
    supportText: "Support Text",
    icon: Waves,
  },
  {
    id: "solar-farm",
    name: "Solar Farm",
    supportText: "Support Text",
    icon: Sun,
  },
  {
    id: "wind-farm",
    name: "Wind Farm",
    supportText: "Support Text",
    icon: Wind,
  },
  {
    id: "battery",
    name: "Battery",
    supportText: "Support Text",
    icon: Battery,
  },
  {
    id: "transmission",
    name: "Transmission",
    supportText: "Support Text",
    icon: Cable,
  },
  {
    id: "grid-connection",
    name: "Grid Connection",
    supportText: "Support Text",
    icon: Zap,
  },
  {
    id: "optional-replacements",
    name: "Optional Replacement Items",
    supportText: "Support Text",
    icon: PlusCircle,
  },
  {
    id: "additional-costs",
    name: "Additional Costs",
    supportText: "Support Text",
    icon: PlusCircle,
  },
];

export default function ProgressTracker() {
  const { isStepCompleted, setCurrentStep, currentStep, stepsOrder } =
    useScenarioStore();

  const steps = allSteps.filter((item) => stepsOrder.includes(item.id));

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the current step
  const scrollToCurrentStep = () => {
    if (scrollContainerRef.current) {
      const currentStepIndex = steps.findIndex(
        (step) => step.id === currentStep,
      );
      if (currentStepIndex !== -1) {
        // Find the DOM element of the current step
        const stepsElements =
          scrollContainerRef.current.querySelectorAll("[data-step-id]");
        const currentStepElement = stepsElements[
          currentStepIndex
        ] as HTMLElement;

        if (currentStepElement) {
          // Calculate the position to scroll to
          const containerWidth = scrollContainerRef.current.clientWidth;
          const stepLeft = currentStepElement.offsetLeft;
          const stepWidth = currentStepElement.offsetWidth;

          // Center the step in the container
          const scrollPosition = stepLeft - containerWidth / 2 + stepWidth / 2;

          scrollContainerRef.current.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: "smooth",
          });
        }
      }
    }
  };

  // Scroll to current step when it changes or on initial load
  useEffect(() => {
    scrollToCurrentStep();
  }, [currentStep, steps]);

  // Function to get step index (1-based) for display
  const getStepNumber = (index: number) => {
    return (index + 1).toString().padStart(2, "0");
  };

  // Function to determine if a step should be shown as active
  const isStepActive = (stepId: string, index: number) => {
    // Find the index of the current step
    const currentIndex = steps.findIndex((step) => step.id === currentStep);

    // A step is active if it's the current step or any step before it that's completed
    return (
      stepId === currentStep ||
      (index <= currentIndex && isStepCompleted(stepId))
    );
  };

  return (
    <div className="w-full p-4 rounded-lg  bg-background  shadow-md">
      <div className="relative w-full mx-auto">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 border border-gray-200"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 border border-gray-200"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none mx-10"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex items-start  relative pt-9">
            {/* Steps */}
            {steps.map((step, index) => {
              const isCompleted = isStepCompleted(step.id);
              const isCurrent = currentStep === step.id;
              const isActive = isStepActive(step.id, index);

              return (
                <div
                  key={step.id}
                  data-step-id={step.id}
                  className="flex flex-col items-center text-center relative"
                  style={{
                    width: `${100 / Math.min(5, steps.length)}%`,
                    maxWidth: "200px",
                    minWidth: "120px",
                  }}
                >
                  {/* Step circle */}
                  <div className="relative mb-2 z-10">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isCompleted
                          ? "bg-primary  text-white"
                          : isCurrent
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                      initial={false}
                      animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                      transition={{
                        duration: 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                      onClick={() => setCurrentStep(step.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">
                          {getStepNumber(index)}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 h-[2px] ${
                        isActive && isStepActive(steps[index + 1].id, index + 1)
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                      style={{
                        width: "calc(100% - 10px)",
                        transform: "translateX(5px)",
                      }}
                    />
                  )}

                  {/* Step text */}
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${isCurrent ? "text-primary" : "text-gray-700"}`}
                    >
                      {step.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
