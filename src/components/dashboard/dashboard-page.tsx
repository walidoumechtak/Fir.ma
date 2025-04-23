"use client"

import { useState } from "react"
import { Droplets, Zap, Thermometer, CloudRain, BarChart, Sprout, Plus, Trash2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  text: string
  completed: boolean
}

export function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Check irrigation system", completed: false },
    { id: "2", text: "Review weather forecast", completed: true },
    { id: "3", text: "Adjust water schedule", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Droplets className="h-8 w-8 text-blue-500" />
            <h3 className="mt-2 text-sm font-medium">Water Savings</h3>
            <p className="text-2xl font-bold text-blue-600">80%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Zap className="h-8 w-8 text-yellow-500" />
            <h3 className="mt-2 text-sm font-medium">Energy Savings</h3>
            <p className="text-2xl font-bold text-yellow-600">75%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Thermometer className="h-8 w-8 text-red-500" />
            <h3 className="mt-2 text-sm font-medium">Soil Moisture</h3>
            <p className="text-2xl font-bold text-red-600">42%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <CloudRain className="h-8 w-8 text-indigo-500" />
            <h3 className="mt-2 text-sm font-medium">Forecast Accuracy</h3>
            <p className="text-2xl font-bold text-indigo-600">92%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <BarChart className="h-8 w-8 text-green-500" />
            <h3 className="mt-2 text-sm font-medium">System Efficiency</h3>
            <p className="text-2xl font-bold text-green-600">88%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <Sprout className="h-8 w-8 text-emerald-500" />
            <h3 className="mt-2 text-sm font-medium">Crop Health</h3>
            <p className="text-2xl font-bold text-emerald-600">+15%</p>
          </CardContent>
        </Card>
      </div>

      {/* To-Do List */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Farm Tasks</h2>
          <div className="text-sm text-muted-foreground">
            {tasks.filter((t) => t.completed).length} of {tasks.length} completed
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <Button onClick={addTask}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.text}
                </label>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">No tasks yet. Add some tasks to get started.</div>
          )}
        </div>
      </div>
    </div>
  )
}
