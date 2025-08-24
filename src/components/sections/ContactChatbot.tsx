import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Bot, User, Sparkles, MessageCircle, Zap } from "lucide-react";
import SplitText from "../../../react_bits/SplitText/SplitText";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

const steps = [
  {
    id: "name",
    prompt:
      "👋 Hey there! I'm **DK**, your AI assistant. I'm here to help you connect with Dinesh. What should I call you?",
    placeholder: "Enter your name...",
  },
  {
    id: "email",
    prompt:
      "Nice to meet you, **NAME**! 🎉 What's the best email to reach you at?",
    placeholder: "your.email@example.com",
  },
  {
    id: "message",
    prompt:
      "Perfect! ✨ Now, what would you like to discuss? Whether it's about projects, collaborations, or just saying hi - I'm all ears! 🚀",
    placeholder: "Tell me about your project or question...",
  },
] as const;

type StepId = (typeof steps)[number]["id"];

export const ContactChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "bot",
      text: steps[0].prompt,
      timestamp: new Date(),
    },
  ]);
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTypingIndicator]);

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setShowTypingIndicator(true);
    setTimeout(() => {
      setShowTypingIndicator(false);
      callback();
    }, delay);
  };

  const nextPrompt = (id: StepId) => {
    const addMessage = (text: string) => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text,
          timestamp: new Date(),
        },
      ]);
    };

    if (id === "name") {
      simulateTyping(() => {
        addMessage(steps[1].prompt.replace("NAME", values.name ?? "there"));
      });
    } else if (id === "email") {
      simulateTyping(() => {
        addMessage(steps[2].prompt);
      });
    } else {
      simulateTyping(() => {
        addMessage(
          "🎯 Awesome! I've got everything I need. Dinesh will get back to you soon!"
        );
        setTimeout(() => {
          addMessage("Thanks for reaching out! 🙏 Your message means a lot.");
        }, 1500);
      }, 800);
      toast.success("Message sent! DK will make sure Dinesh sees this.", {
        icon: "🤖",
      });
    }
  };

  const onSubmit = () => {
    const text = input.trim();
    if (!text) return;

    const current = steps[stepIndex].id;
    if (current === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      toast.error(
        "Hmm, that doesn't look like a valid email. Mind double-checking? 📧"
      );
      return;
    }

    // Add user message
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        role: "user",
        text,
        timestamp: new Date(),
      },
    ]);

    const newValues = { ...values } as any;
    newValues[current] = text;
    setValues(newValues);
    setInput("");

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setTimeout(() => nextPrompt(current), 600);
    } else {
      setTimeout(() => nextPrompt(current), 600);
    }
  };

  const formatMessage = (text: string) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start"
    >
      <div className="flex items-center space-x-2 bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center space-x-1">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className="text-xs text-muted-foreground">DK is typing...</span>
      </div>
    </motion.div>
  );

  return (
    <section id="contact" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container max-w-4xl relative">
        <motion.header
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <SplitText
                text="Chat with DK"
                className="text-3xl md:text-4xl font-bold gradient-text-animated"
                splitType="chars"
                delay={60}
                duration={0.8}
                from={{
                  opacity: 0,
                  y: 50,
                  rotationX: -90,
                }}
                to={{
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                }}
              />
              <p className="text-sm text-muted-foreground">Your AI Assistant</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Ready to connect? DK will help you get in touch with Dinesh! ✨
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="glass-dark border-primary/20 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-background animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      DK Assistant
                    </h3>
                    <p className="text-xs text-green-400 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Online & Ready to Help</span>
                    </p>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    <Zap
                      className="w-4 h-4 text-primary animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="max-h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background/50 to-background/80">
                <AnimatePresence mode="popLayout">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1,
                        layout: { duration: 0.2 },
                      }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-end space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        {/* Avatar */}
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-accent to-primary"
                              : "bg-gradient-to-br from-primary to-accent"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </motion.div>

                        {/* Message Bubble */}
                        <motion.div
                          className={`px-4 py-3 rounded-2xl relative ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-md"
                              : "bg-muted/80 backdrop-blur-sm border border-primary/10 rounded-bl-md"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <div
                            className={`text-sm leading-relaxed ${message.role === "user" ? "text-white" : "text-foreground"}`}
                            dangerouslySetInnerHTML={{
                              __html: formatMessage(message.text),
                            }}
                          />
                          <div
                            className={`text-xs mt-1 opacity-70 ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>

                          {/* Message tail */}
                          <div
                            className={`absolute bottom-0 w-3 h-3 ${
                              message.role === "user"
                                ? "right-0 bg-gradient-to-br from-primary to-accent transform rotate-45 translate-x-1/2 translate-y-1/2"
                                : "left-0 bg-muted/80 transform rotate-45 -translate-x-1/2 translate-y-1/2"
                            }`}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {showTypingIndicator && <TypingIndicator />}
                </AnimatePresence>
                <div ref={endRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-primary/20 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        steps[stepIndex]?.placeholder || "Type your message..."
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && !e.shiftKey && onSubmit()
                      }
                      className="pr-12 bg-background/50 border-primary/20 focus:border-primary/40 rounded-full"
                      disabled={isTyping}
                    />
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      animate={{ rotate: input ? 0 : 180 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      onClick={onSubmit}
                      disabled={!input.trim() || isTyping}
                      className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-center mt-3 space-x-2">
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Powered by DK AI</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactChatbot;
