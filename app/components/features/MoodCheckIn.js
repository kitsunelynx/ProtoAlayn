import React, { useState } from 'react';
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { ArrowLeft, Calendar } from 'lucide-react';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow hover:bg-blue-700",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline:
          "border border-gray-600 bg-transparent text-gray-300 shadow-sm hover:bg-gray-800",
        secondary:
          "bg-gray-700 text-white shadow-sm hover:bg-gray-600",
        ghost: "text-gray-300 hover:bg-gray-800 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="rounded-xl border border-gray-700 bg-gray-900 text-gray-100 shadow-lg"
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="flex flex-col space-y-1.5 p-6"
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className="text-gray-100 font-semibold leading-none tracking-tight"
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className="p-6 pt-0" {...props} />
))
CardContent.displayName = "CardContent"

const MoodCheckIn = () => {
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const moodOptions = [
    { name: "Happy", emoji: "😊", color: "bg-green-900/40 hover:bg-green-800/60", textColor: "text-green-100" },
    { name: "Sad", emoji: "😢", color: "bg-blue-900/40 hover:bg-blue-800/60", textColor: "text-blue-100" },
    { name: "Neutral", emoji: "😐", color: "bg-gray-800/40 hover:bg-gray-700/60", textColor: "text-gray-100" },
    { name: "Energetic", emoji: "😄", color: "bg-yellow-900/40 hover:bg-yellow-800/60", textColor: "text-yellow-100" },
    { name: "Stressed", emoji: "😟", color: "bg-red-900/40 hover:bg-red-800/60", textColor: "text-red-100" }
  ];

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      const newEntry = {
        mood,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };
      setMoodHistory([newEntry, ...moodHistory]);
      setMood('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-gray-300 hover:text-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-center">How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleMoodSubmit} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {moodOptions.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => handleMoodSelect(option.name)}
                    className={`
                      ${option.color}
                      ${mood === option.name ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900' : ''}
                      p-4 rounded-xl transition-all duration-200 transform hover:scale-105
                      flex flex-col items-center gap-2 backdrop-blur-sm
                    `}
                  >
                    <span className="text-3xl md:text-4xl">{option.emoji}</span>
                    <span className={`${option.textColor} text-sm font-medium`}>{option.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit"
                  disabled={!mood}
                  className="w-full sm:w-auto"
                >
                  Save Mood
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {moodHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                Your Mood History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moodHistory.map((entry, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {moodOptions.find(m => m.name === entry.mood)?.emoji}
                      </span>
                      <span className="font-medium text-sm md:text-base">{entry.mood}</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      <div>{entry.date}</div>
                      <div>{entry.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { Button, buttonVariants, Card, CardHeader, CardTitle, CardContent };
export default MoodCheckIn;