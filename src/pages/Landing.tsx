import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Calendar, 
  ListTodo, 
  BarChart3, 
  Timer, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Plan your day with an intuitive dashboard that keeps you on track.",
    color: "bg-primary",
  },
  {
    icon: Brain,
    title: "AI Flashcard Lab",
    description: "Paste your notes and watch AI transform them into study cards.",
    color: "bg-secondary",
  },
  {
    icon: ListTodo,
    title: "Task Manager",
    description: "Organize assignments with a Kanban board that makes studying fun.",
    color: "bg-accent",
  },
  {
    icon: Timer,
    title: "Focus Mode",
    description: "Beat procrastination with built-in Pomodoro-style focus sessions.",
    color: "bg-mint",
  },
  {
    icon: BarChart3,
    title: "Study Analytics",
    description: "Track your progress and balance your workload across subjects.",
    color: "bg-coral",
  },
  {
    icon: Sparkles,
    title: "Gamification",
    description: "Earn points and streaks to stay motivated throughout the semester.",
    color: "bg-lavender",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Computer Science Major",
    quote: "StudyBuddy helped me go from stressed to organized in just one week!",
    avatar: "🎓",
  },
  {
    name: "Alex K.",
    role: "Pre-Med Student",
    quote: "The AI flashcards are a game-changer for memorizing complex terms.",
    avatar: "🔬",
  },
  {
    name: "Jordan T.",
    role: "Business Major",
    quote: "Finally, a study app that's actually fun to use!",
    avatar: "📊",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary border-brutal rounded-full px-4 py-2 mb-8 animate-float">
              <Star className="w-4 h-4 text-accent" fill="currentColor" />
              <span className="text-sm font-semibold">Loved by 10,000+ students</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Master Your{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Schedule</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
              ,<br />
              Not Just Your Syllabus
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              The all-in-one study companion that helps you plan, focus, and succeed. 
              AI-powered flashcards, smart task management, and analytics that actually help.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="heroSecondary" size="xl" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Works on all devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Ace Your Classes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed specifically for students who want to study smarter, not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                variant="interactive"
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl border-brutal flex items-center justify-center mb-4 group-hover:animate-wiggle`}>
                  <feature.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Students{" "}
              <span className="text-accent">Love</span>{" "}
              StudyBuddy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Ready to Transform Your Study Game?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter with StudyBuddy.
          </p>
          <Link to="/auth">
            <Button variant="accent" size="xl">
              Start Studying Smarter
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t-[3px] border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 StudyBuddy. Made with 💛 for students everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
