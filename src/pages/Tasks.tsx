import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  GripVertical,
  Trash2,
  Calendar,
  Flag,
  Edit2,
  X,
  Check
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  subject: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  status: "todo" | "inProgress" | "done";
}

const initialTasks: Task[] = [
  { id: 1, title: "Complete calculus homework", subject: "Math", priority: "high", dueDate: "Dec 23", status: "todo" },
  { id: 2, title: "Read chapter 5 - Civil War", subject: "History", priority: "medium", dueDate: "Dec 24", status: "todo" },
  { id: 3, title: "Lab report draft", subject: "Chemistry", priority: "high", dueDate: "Dec 22", status: "inProgress" },
  { id: 4, title: "Practice presentation", subject: "Business", priority: "low", dueDate: "Dec 26", status: "inProgress" },
  { id: 5, title: "Essay outline", subject: "English", priority: "medium", dueDate: "Dec 21", status: "done" },
  { id: 6, title: "Study for quiz", subject: "Physics", priority: "high", dueDate: "Dec 20", status: "done" },
];

const columns = [
  { id: "todo", title: "To Do", color: "bg-secondary" },
  { id: "inProgress", title: "In Progress", color: "bg-accent" },
  { id: "done", title: "Done", color: "bg-mint" },
];

const priorityColors = {
  low: "bg-mint text-foreground",
  medium: "bg-accent text-foreground",
  high: "bg-coral text-foreground",
};

const subjectColors: Record<string, string> = {
  Math: "bg-primary",
  History: "bg-secondary",
  Chemistry: "bg-coral",
  Business: "bg-accent",
  English: "bg-lavender",
  Physics: "bg-mint",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getTasksByStatus = (status: string) => 
    tasks.filter((task) => task.status === status);

  const moveTask = (taskId: number, newStatus: "todo" | "inProgress" | "done") => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      subject: "General",
      priority: "medium",
      status: "todo",
    };
    
    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setShowAddTask(false);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: "todo" | "inProgress" | "done") => {
    if (draggedTask) {
      moveTask(draggedTask.id, status);
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="w-12 h-12 bg-coral rounded-xl border-brutal flex items-center justify-center">
                📋
              </span>
              Task Manager
            </h1>
            <p className="text-muted-foreground text-lg">
              Drag and drop tasks to organize your assignments
            </p>
          </div>
          <Button variant="hero" onClick={() => setShowAddTask(true)}>
            <Plus className="w-5 h-5" />
            Add Task
          </Button>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <Card className="mb-6 animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="What do you need to do?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTask()}
                  autoFocus
                />
                <Button variant="accent" onClick={addTask}>
                  <Check className="w-4 h-4" />
                  Add
                </Button>
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Kanban Board */}
        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="space-y-4"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id as "todo" | "inProgress" | "done")}
            >
              {/* Column Header */}
              <div className={`${column.color} rounded-xl border-brutal p-4 shadow-brutal`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg">{column.title}</h2>
                  <span className="w-8 h-8 bg-card rounded-lg border-2 border-border flex items-center justify-center font-bold">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3 min-h-[200px]">
                {getTasksByStatus(column.id).map((task) => (
                  <Card
                    key={task.id}
                    variant="interactive"
                    className={`cursor-grab active:cursor-grabbing ${
                      column.id === "done" ? "opacity-75" : ""
                    }`}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <GripVertical className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold mb-2 ${
                            column.id === "done" ? "line-through" : ""
                          }`}>
                            {task.title}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {/* Subject Tag */}
                            <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                              subjectColors[task.subject] || "bg-muted"
                            } text-foreground border border-border`}>
                              {task.subject}
                            </span>
                            {/* Priority */}
                            <span className={`text-xs px-2 py-1 rounded-lg font-medium flex items-center gap-1 ${
                              priorityColors[task.priority]
                            }`}>
                              <Flag className="w-3 h-3" />
                              {task.priority}
                            </span>
                            {/* Due Date */}
                            {task.dueDate && (
                              <span className="text-xs px-2 py-1 rounded-lg font-medium bg-muted flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {task.dueDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:text-destructive"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getTasksByStatus(column.id).length === 0 && (
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center text-muted-foreground">
                    <p>Drop tasks here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
