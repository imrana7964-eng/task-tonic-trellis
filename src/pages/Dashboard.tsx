import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  BookOpen,
  Coffee,
  Zap,
  CalendarDays
} from "lucide-react";

const scheduleItems = [
  { time: "09:00", subject: "Mathematics", type: "class", color: "bg-primary" },
  { time: "11:00", subject: "Study: Physics", type: "study", color: "bg-secondary" },
  { time: "14:00", subject: "Essay Due: History", type: "deadline", color: "bg-coral" },
  { time: "16:00", subject: "Group Project", type: "meeting", color: "bg-mint" },
  { time: "19:00", subject: "Flashcard Review", type: "study", color: "bg-accent" },
];

const tasks = [
  { id: 1, title: "Complete calculus homework", completed: true, subject: "Math" },
  { id: 2, title: "Read chapter 5", completed: true, subject: "History" },
  { id: 3, title: "Lab report draft", completed: false, subject: "Chemistry" },
  { id: 4, title: "Review lecture notes", completed: false, subject: "Physics" },
  { id: 5, title: "Practice problems set 3", completed: true, subject: "Math" },
];

export default function Dashboard() {
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    if (!isBreak) {
      setIsBreak(true);
      setFocusTime(5 * 60); // 5 minute break
    } else {
      setIsBreak(false);
      setFocusTime(25 * 60); // Back to 25 minutes
    }
  }, [isBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev - 1);
      }, 1000);
    } else if (focusTime === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, focusTime, handleTimerComplete]);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setFocusTime(25 * 60);
  };

  const circumference = 2 * Math.PI * 70;
  const progressOffset = circumference - (progressPercent / 100) * circumference;
  const timerCircumference = 2 * Math.PI * 90;
  const timerProgress = isBreak 
    ? (focusTime / (5 * 60)) * timerCircumference 
    : (focusTime / (25 * 60)) * timerCircumference;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Good Morning, Student! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            You have {totalTasks - completedTasks} tasks remaining today. Keep going!
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Schedule & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* At-a-Glance Schedule */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  Today's Schedule
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", { 
                    weekday: "long", 
                    month: "short", 
                    day: "numeric" 
                  })}
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduleItems.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 border-2 border-transparent hover:border-border transition-all"
                    >
                      <div className="text-sm font-mono font-bold text-muted-foreground w-14">
                        {item.time}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <div className="flex-1 font-medium">{item.subject}</div>
                      <span className="text-xs bg-secondary px-2 py-1 rounded-lg font-medium capitalize">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tasks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Today's Tasks
                </CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div 
                      key={task.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        task.completed 
                          ? "bg-mint/30 line-through text-muted-foreground" 
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                        task.completed 
                          ? "bg-primary border-primary" 
                          : "border-border"
                      }`}>
                        {task.completed && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <span className="flex-1 font-medium">{task.title}</span>
                      <span className="text-xs bg-secondary px-2 py-1 rounded-lg font-medium">
                        {task.subject}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Focus Timer & Progress */}
          <div className="space-y-6">
            {/* Focus Mode Timer */}
            <Card className={isBreak ? "bg-mint/20" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  {isBreak ? (
                    <>
                      <Coffee className="w-5 h-5 text-mint" />
                      Break Time
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-accent" />
                      Focus Mode
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {/* Timer Circle */}
                <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="90"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="90"
                      fill="none"
                      stroke={isBreak ? "hsl(var(--mint))" : "hsl(var(--accent))"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={timerCircumference}
                      strokeDashoffset={timerCircumference - timerProgress}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold font-mono">
                      {formatTime(focusTime)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {isBreak ? "Take a break!" : "Stay focused"}
                    </span>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex gap-3">
                  <Button 
                    variant={isRunning ? "secondary" : "accent"} 
                    size="lg"
                    onClick={() => setIsRunning(!isRunning)}
                  >
                    {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isRunning ? "Pause" : "Start"}
                  </Button>
                  <Button variant="outline" size="lg" onClick={resetTimer}>
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Ring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Daily Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={progressOffset}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">
                      {Math.round(progressPercent)}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Complete
                    </span>
                  </div>
                </div>
                <p className="text-center text-muted-foreground">
                  <span className="font-bold text-foreground">{completedTasks}</span> of{" "}
                  <span className="font-bold text-foreground">{totalTasks}</span> tasks done
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl border-brutal flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4.5 hrs</p>
                    <p className="text-sm text-muted-foreground">Study time today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
