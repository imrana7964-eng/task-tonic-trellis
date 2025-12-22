import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Target,
  BookOpen,
  Calendar,
  Flame
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 },
  { day: "Fri", hours: 3.9 },
  { day: "Sat", hours: 6.2 },
  { day: "Sun", hours: 4.0 },
];

const subjectData = [
  { name: "Mathematics", hours: 8, color: "hsl(217, 91%, 60%)" },
  { name: "Physics", hours: 6, color: "hsl(270, 67%, 85%)" },
  { name: "Chemistry", hours: 5, color: "hsl(16, 100%, 70%)" },
  { name: "History", hours: 4, color: "hsl(45, 100%, 60%)" },
  { name: "English", hours: 3, color: "hsl(160, 60%, 80%)" },
];

const stats = [
  { label: "Total Study Hours", value: "29.7", icon: Clock, color: "bg-primary" },
  { label: "Current Streak", value: "12 days", icon: Flame, color: "bg-coral" },
  { label: "Tasks Completed", value: "47", icon: Target, color: "bg-mint" },
  { label: "Flashcards Reviewed", value: "156", icon: BookOpen, color: "bg-accent" },
];

export default function Analytics() {
  const totalHours = subjectData.reduce((acc, s) => acc + s.hours, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="w-12 h-12 bg-primary rounded-xl border-brutal flex items-center justify-center text-primary-foreground">
              <BarChart3 className="w-6 h-6" />
            </span>
            Study Analytics
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and balance your workload
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} variant="interactive">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl border-brutal flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Study Hours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                This Week's Study Time
              </CardTitle>
              <Button variant="ghost" size="sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% vs last week
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      fontWeight={600}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "3px solid hsl(var(--border))",
                        borderRadius: "12px",
                        boxShadow: "4px 4px 0px 0px hsl(var(--border))",
                      }}
                      formatter={(value: number) => [`${value} hours`, "Study Time"]}
                    />
                    <Bar 
                      dataKey="hours" 
                      fill="hsl(var(--primary))" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Subject Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                Time Per Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center">
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="hours"
                    >
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--border))" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "3px solid hsl(var(--border))",
                        borderRadius: "12px",
                        boxShadow: "4px 4px 0px 0px hsl(var(--border))",
                      }}
                      formatter={(value: number) => [`${value} hours`, "Study Time"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-1/2 space-y-3">
                  {subjectData.map((subject) => (
                    <div key={subject.name} className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-md border-2 border-border"
                        style={{ backgroundColor: subject.color }}
                      />
                      <span className="flex-1 font-medium text-sm">{subject.name}</span>
                      <span className="text-sm text-muted-foreground font-mono">
                        {Math.round((subject.hours / totalHours) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Subject Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectData.map((subject) => {
                const percentage = (subject.hours / totalHours) * 100;
                return (
                  <div key={subject.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-muted-foreground font-mono">
                        {subject.hours} hrs
                      </span>
                    </div>
                    <div className="h-4 bg-muted rounded-full border-2 border-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: subject.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-secondary/30 rounded-xl border-2 border-border">
              <p className="font-medium mb-1">💡 Suggestion</p>
              <p className="text-sm text-muted-foreground">
                You're spending less time on English. Consider adding a 30-minute daily reading session to balance your workload!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
