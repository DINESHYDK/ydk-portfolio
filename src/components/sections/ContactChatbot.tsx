import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Message { id: string; role: "bot" | "user"; text: string }

const steps = [
  { id: "name", prompt: "Hi! I’m your assistant. What’s your name?" },
  { id: "email", prompt: "Nice to meet you, NAME! What email can I reach you at?" },
  { id: "message", prompt: "Got it. What would you like to talk about?" },
] as const;

type StepId = typeof steps[number]["id"];

export const ContactChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([{ id: crypto.randomUUID(), role: "bot", text: steps[0].prompt }]);
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<{ name?: string; email?: string; message?: string }>({});
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const nextPrompt = (id: StepId) => {
    if (id === "name") {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "bot", text: steps[1].prompt.replace("NAME", values.name ?? "there") }]);
    } else if (id === "email") {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "bot", text: steps[2].prompt }]);
    } else {
      // done
      toast.success("Thanks! I’ll get back to you soon.");
    }
  };

  const onSubmit = () => {
    const text = input.trim();
    if (!text) return;

    const current = steps[stepIndex].id;
    if (current === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);

    const newValues = { ...values } as any;
    newValues[current] = text;
    setValues(newValues);
    setInput("");

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setTimeout(() => nextPrompt(current), 400);
    } else {
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "bot", text: `Great! Here’s what I’ll send:` },
          { id: crypto.randomUUID(), role: "bot", text: `Name: ${newValues.name}` },
          { id: crypto.randomUUID(), role: "bot", text: `Email: ${newValues.email}` },
          { id: crypto.randomUUID(), role: "bot", text: `Message: ${newValues.message}` },
        ]);
      }, 400);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container max-w-3xl">
        <header className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Get in touch</h2>
          <p className="text-muted-foreground mt-2">Have a project in mind? Let’s chat.</p>
        </header>

        <Card className="glass border">
          <CardContent className="p-0">
            <div className="max-h-[420px] overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your response…"
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              />
              <Button onClick={onSubmit}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactChatbot;
