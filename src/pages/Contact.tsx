import { useEffect } from "react";
import { ContactChatbot } from "@/components/sections/ContactChatbot";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact — Dinesh Krishna";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Get in touch with Dinesh Krishna.");
  }, []);

  return (
    <div className="relative min-h-screen">
      <main className="container py-16 animate-fade-in">
        <h1 className="sr-only">Contact — Dinesh Krishna</h1>
        <ContactChatbot />
      </main>
    </div>
  );
};

export default Contact;
