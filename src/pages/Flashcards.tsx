import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  BookOpen,
  Trash2,
  Shuffle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

const sampleCards: Flashcard[] = [
  {
    id: 1,
    front: "What is the Pythagorean theorem?",
    back: "a² + b² = c², where c is the hypotenuse of a right triangle and a & b are the other two sides.",
  },
  {
    id: 2,
    front: "What is photosynthesis?",
    back: "The process by which plants convert sunlight, water, and CO₂ into glucose and oxygen.",
  },
  {
    id: 3,
    front: "Who wrote 'Romeo and Juliet'?",
    back: "William Shakespeare, written around 1594-1596.",
  },
  {
    id: 4,
    front: "What is Newton's First Law?",
    back: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.",
  },
];

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>(sampleCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [notes, setNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const generateCards = async () => {
    if (!notes.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-flashcards", {
        body: { notes: notes.trim() }
      });

      if (error) {
        throw new Error(error.message || "Failed to generate flashcards");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.flashcards && Array.isArray(data.flashcards)) {
        const newCards: Flashcard[] = data.flashcards.map((card: { front: string; back: string }, index: number) => ({
          id: Date.now() + index,
          front: card.front,
          back: card.back,
        }));
        
        setCards((prev) => [...prev, ...newCards]);
        setNotes("");
        toast({
          title: "Flashcards Generated! 🎉",
          description: `Created ${newCards.length} new flashcards from your notes.`,
        });
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteCard = (id: number) => {
    const newCards = cards.filter((c) => c.id !== id);
    setCards(newCards);
    if (currentIndex >= newCards.length) {
      setCurrentIndex(Math.max(0, newCards.length - 1));
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <span className="w-12 h-12 bg-secondary rounded-xl border-brutal flex items-center justify-center">
              🧠
            </span>
            AI Flashcard Lab
          </h1>
          <p className="text-muted-foreground text-lg">
            Paste your notes and let AI create study cards for you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Card Generator */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Generate Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your notes here... The AI will extract key concepts and create flashcards for you!

Example: 'The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration. The process involves glycolysis, the Krebs cycle, and oxidative phosphorylation.'"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={generateCards}
                  disabled={!notes.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Cards with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Card List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Your Cards ({cards.length})
                  </span>
                  <Button variant="ghost" size="sm" onClick={shuffleCards}>
                    <Shuffle className="w-4 h-4" />
                    Shuffle
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {cards.map((card, index) => (
                    <div 
                      key={card.id}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                        index === currentIndex 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsFlipped(false);
                      }}
                    >
                      <span className="truncate flex-1 font-medium">{card.front}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCard(card.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Flashcard Display */}
          <div className="space-y-6">
            {cards.length > 0 ? (
              <>
                {/* Main Flashcard */}
                <div 
                  className="flip-card h-[400px] cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className={`flip-card-inner relative w-full h-full ${isFlipped ? "flipped" : ""}`}>
                    {/* Front */}
                    <Card className="flip-card-front absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
                      <CardContent className="text-center p-8">
                        <p className="text-sm text-primary-foreground/70 mb-4 uppercase tracking-wider font-medium">
                          Question
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-primary-foreground">
                          {currentCard.front}
                        </p>
                        <p className="text-primary-foreground/60 mt-6 text-sm">
                          Click to reveal answer
                        </p>
                      </CardContent>
                    </Card>

                    {/* Back */}
                    <Card className="flip-card-back absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-accent/80">
                      <CardContent className="text-center p-8">
                        <p className="text-sm text-accent-foreground/70 mb-4 uppercase tracking-wider font-medium">
                          Answer
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-accent-foreground">
                          {currentCard.back}
                        </p>
                        <p className="text-accent-foreground/60 mt-6 text-sm">
                          Click to see question
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Card Navigation */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="lg" onClick={prevCard}>
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </Button>
                  <span className="text-lg font-mono font-bold px-4">
                    {currentIndex + 1} / {cards.length}
                  </span>
                  <Button variant="default" size="lg" onClick={nextCard}>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Study Actions */}
                <div className="flex justify-center gap-3">
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Flip Card
                  </Button>
                  <Button variant="accent">
                    <Plus className="w-4 h-4" />
                    Add New Card
                  </Button>
                </div>
              </>
            ) : (
              <Card className="h-[400px] flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-xl font-bold mb-2">No Cards Yet!</p>
                  <p className="text-muted-foreground">
                    Paste some notes on the left to generate flashcards.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
