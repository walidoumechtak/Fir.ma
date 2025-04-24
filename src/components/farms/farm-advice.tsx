import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

interface AdviceItem {
  id: string
  text: string
  isCompleted: boolean
  priority: "high" | "medium" | "low"
}

interface FarmAdviceProps {
  advice: AdviceItem
  onToggleCompletion: () => void
}

export function FarmAdvice({ advice, onToggleCompletion }: FarmAdviceProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Info className="h-5 w-5 text-amber-500" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card
      className={`border-l-4 ${advice.isCompleted ? "border-l-green-500" : `border-l-${getPriorityColor(advice.priority)}`} shadow-md`}
    >
      <CardContent className="p-4 flex items-start gap-3">
        <Checkbox id={`advice-${advice.id}`} checked={advice.isCompleted} onCheckedChange={onToggleCompletion} />
        <div className="flex-1">
          <label
            htmlFor={`advice-${advice.id}`}
            className={`text-sm font-medium cursor-pointer ${advice.isCompleted ? "line-through text-gray-500" : "text-gray-700"}`}
          >
            {advice.text}
          </label>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            {getPriorityIcon(advice.priority)}
            <span className="ml-1 capitalize">{advice.priority} priority</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
