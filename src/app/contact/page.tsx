
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleDirectMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const feedback = formData.get('feedback-message') as string;
    
    const mailtoLink = `mailto:shrinkwrap13@gmail.com?subject=ShrinkWrap App Feedback&body=${encodeURIComponent(feedback)}`;
    
    window.location.href = mailtoLink;
    
    setIsFeedbackOpen(false);
    (e.target as HTMLFormElement).reset();

    toast({
      title: "Opening Email Client...",
      description: "Please send the pre-filled email to complete your feedback submission.",
    });
  };


  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <a href="mailto:shrinkwrap13@gmail.com" className="block w-full text-left group">
              <div className="flex items-start gap-6 p-6 border rounded-lg bg-card/50 hover:border-primary transition-all duration-300">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Email Us</h3>
                  <p className="mt-2 text-muted-foreground">
                    For general inquiries, support, or feedback, please send us an email. We aim to respond within 24 hours.
                  </p>
                  <p className="mt-4 inline-block font-semibold text-primary underline">
                    shrinkwrap13@gmail.com
                  </p>
                </div>
              </div>
            </a>
            
            <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
              <DialogTrigger asChild>
                <div className="w-full text-left group cursor-pointer">
                  <div className="flex items-start gap-6 p-6 border rounded-lg bg-card/50 hover:border-primary transition-all duration-300">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-full group-hover:scale-110 transition-transform">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Feedback</h3>
                      <p className="mt-2 text-muted-foreground">
                        Have a suggestion or an idea to improve ShrinkWrap? We are all ears! Your feedback is valuable to us.
                      </p>
                      <p className="mt-4 inline-block font-semibold text-primary underline">
                        Share your thoughts
                      </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Feedback</DialogTitle>
                  <DialogDescription>
                    We appreciate you taking the time to help us improve ShrinkWrap.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-message" className="sr-only">Feedback</Label>
                    <Textarea id="feedback-message" name="feedback-message" placeholder="Your feedback here..." required rows={5} />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Feedback</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

          </div>

          <div>
            <Card className="shadow-2xl shadow-primary/10">
              <CardHeader>
                  <CardTitle className="text-3xl font-bold">Send a Direct Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleDirectMessageSubmit} className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="name" className="font-semibold">Name</Label>
                      <Input id="name" type="text" placeholder="Your Name" required className="py-6"/>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required className="py-6"/>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="message" className="font-semibold">Message</Label>
                      <Textarea id="message" placeholder="Type your message here..." required rows={6} />
                  </div>
                  <Button type="submit" className="w-full text-lg py-6 font-bold">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                  </Button>
                  </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
