import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, User, Sparkles, MessageCircle } from "lucide-react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { hapticButtonPress, hapticSuccess } from "@/lib/haptic";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
  const [mode, setMode] = useState<"chat" | "form">("chat");
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

    const newValues = { ...values };
    (newValues as Record<string, string>)[current] = text;
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
      <div className="container relative">
        <SectionHeading
          text={mode === "chat" ? "Chat with DK" : "Contact Dinesh"}
          subtitle={
            mode === "chat"
              ? "Quick guided chat to send your message."
              : "Reach me directly via socials or the form."
          }
        />
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex rounded-full border border-primary/30 overflow-hidden">
            <button
              className={`px-4 py-2 text-sm ${
                mode === "chat"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground"
              }`}
              onClick={() => {
                hapticButtonPress();
                setMode("chat");
              }}
            >
              Chatbot
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                mode === "form"
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-foreground"
              }`}
              onClick={() => {
                hapticButtonPress();
                setMode("form");
              }}
            >
              Contact Form
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="glass-dark border-primary/20 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              {mode === "form" ? (
                <div className="relative overflow-hidden">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                    <div
                      className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-bounce"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>

                  <div className="relative p-8 space-y-8">
                    {/* Header Section */}
                    <motion.div
                      className="text-center space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <motion.div
                          className="hidden md:flex w-12 h-12 rounded-full bg-primary items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary">
                            Want to work with me?
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Let's talk about your next project
                          </p>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center gap-4">
                        {[
                          {
                            name: "GitHub",
                            href: "https://github.com/dineshydk",
                            icon: GitHubLogoIcon,
                          },
                          {
                            name: "LinkedIn",
                            href: "https://www.linkedin.com/in/dineshydk/",
                            icon: LinkedInLogoIcon,
                          },
                          {
                            name: "Email",
                            href: "mailto:dineshkrishnayeturi@gmail.com",
                            icon: EnvelopeClosedIcon,
                          },
                        ].map((social, index) => (
                          <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative px-4 py-2 rounded-full border border-primary/30 hover:border-primary/60 transition-all duration-300 overflow-hidden"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => hapticButtonPress()}
                          >
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-2 text-sm font-medium">
                              <social.icon className="w-4 h-4 hidden md:block" />
                              {social.name}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Name Field */}
                        <motion.div
                          className="space-y-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <label className="text-sm font-medium text-primary flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Your Name
                          </label>
                          <div className="relative group">
                            <Input
                              placeholder="What should I call you?"
                              value={values.name ?? ""}
                              onChange={(e) =>
                                setValues({ ...values, name: e.target.value })
                              }
                              className="h-12 bg-background/50 border-2 border-primary/20 focus:border-primary/60 rounded-xl transition-all duration-300 group-hover:border-primary/40 focus:shadow-lg focus:shadow-primary/20"
                            />
                            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                          className="space-y-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <label className="text-sm font-medium text-primary flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Email Address
                          </label>
                          <div className="relative group">
                            <Input
                              placeholder="your.awesome@email.com"
                              type="email"
                              value={values.email ?? ""}
                              onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                              }
                              className="h-12 bg-background/50 border-2 border-primary/20 focus:border-primary/60 rounded-xl transition-all duration-300 group-hover:border-primary/40 focus:shadow-lg focus:shadow-primary/20"
                            />
                            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Message Field */}
                      <motion.div
                        className="space-y-2"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <label className="text-sm font-medium text-primary flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Your Message
                        </label>
                        <div className="relative group">
                          <textarea
                            placeholder="Tell me about your project, ideas, or just say hi! I'm excited to hear from you... 🚀"
                            value={values.message ?? ""}
                            onChange={(e) =>
                              setValues({ ...values, message: e.target.value })
                            }
                            rows={6}
                            className="w-full p-4 bg-background/50 border-2 border-primary/20 focus:border-primary/60 rounded-xl transition-all duration-300 group-hover:border-primary/40 focus:shadow-lg focus:shadow-primary/20 resize-none focus:outline-none"
                          />
                          <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        className="flex justify-center pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <motion.button
                          onClick={() => {
                            hapticSuccess(); // More satisfying heavy vibration
                            if (
                              !values.name ||
                              !values.email ||
                              !values.message
                            ) {
                              toast.error("Please fill in all fields! ✨");
                              return;
                            }
                            if (
                              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
                            ) {
                              toast.error(
                                "Please enter a valid email address! 📧"
                              );
                              return;
                            }
                            toast.success(
                              "🎉 Message sent! I'll get back to you soon!"
                            );
                          }}
                          className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="relative flex items-center gap-3">
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            Send Message
                          </span>
                        </motion.button>
                      </motion.div>

                      {/* Footer Note */}
                      <motion.div
                        className="text-center pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <p className="text-xs text-muted-foreground">
                          🔒 Your information is secure and will only be used to
                          contact you back
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-muted/40 p-4 border-b border-primary/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        DK
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          DK Assistant
                        </h3>
                        <p className="text-xs text-muted-foreground">Online</p>
                      </div>
                      <div className="ml-auto" />
                    </div>
                  </div>

                  {/* Messages Area (fixed height, scrolls instead of growing) */}
                  <div className="h-[420px] md:h-[500px] overflow-y-auto p-6 space-y-4 bg-background/60">
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
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
                                <span className="text-[10px] font-bold text-white">
                                  DK
                                </span>
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
                  <div className="p-4 border-t border-primary/20 bg-background/60 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={
                            steps[stepIndex]?.placeholder ||
                            "Type your message..."
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && !e.shiftKey && onSubmit()
                          }
                          className="pr-12 bg-background/50 border-primary/20 focus:border-primary/40 rounded-full"
                          disabled={false}
                        />
                        {null}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <Button
                          onClick={onSubmit}
                          disabled={!input.trim()}
                          className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-lg"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>

                    {/* Footer note */}
                    <div className="flex items-center justify-center mt-3">
                      <div className="text-xs text-muted-foreground">
                        Powered by DK
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactChatbot;
