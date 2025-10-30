
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import type { Metadata } from 'next';

// Since this is a client component, we can't export metadata. 
// It should be defined in a parent layout or via the `generateMetadata` function in a server component.

export default function ContactPage() {
  const { toast } = useToast();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: message,
    });
    (e.target as HTMLFormElement).reset();
    setIsFeedbackOpen(false); // Close dialog on successful submission
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
            Let's Talk
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            We are passionate about building the best tools and would love to hear from you. Your questions and feedback are what help us improve.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <a href="mailto:shrinkwrap13@gmail.com" className="block w-full text-left group">
              <div className="flex items-start gap-6 p-6 border rounded-lg bg-card/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-full">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Email Directly</h3>
                  <p className="mt-2 text-muted-foreground">
                    For support questions, partnership inquiries, or general questions, please send us an email. We're quick to respond.
                  </p>
                  <p className="mt-4 inline-block font-semibold text-primary underline group-hover:text-primary/80 transition-colors">
                    shrinkwrap13@gmail.com
                  </p>
                </div>
              </div>
            </a>
            
            <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
              <DialogTrigger asChild>
                <div className="w-full text-left group cursor-pointer">
                  <div className="flex items-start gap-6 p-6 border rounded-lg bg-card/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-full">
                      <ThumbsUp className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Share an Idea</h3>
                      <p className="mt-2 text-muted-foreground">
                        Have a feature request or an idea for how to make ShrinkWrap even better? We are all ears. Your insights are incredibly valuable.
                      </p>
                      <p className="mt-4 inline-block font-semibold text-primary underline group-hover:text-primary/80 transition-colors">
                        Give us your feedback
                      </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Feedback or Idea</DialogTitle>
                  <DialogDescription>
                    Your perspective helps us shape the future of ShrinkWrap. What's on your mind?
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => handleSubmit(e, "Thank you for your invaluable feedback!")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-message" className="sr-only">Feedback</Label>
                    <Textarea id="feedback-message" name="feedback-message" placeholder="e.g., I wish there was a feature to..." required rows={5} />
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
                  <CardTitle className="text-3xl font-bold">Send a Message</CardTitle>
                  <CardDescription>Use the form below for any inquiries. We'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "Thanks for reaching out! We'll be in touch soon.")} className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="name" className="font-semibold">Full Name</Label>
                      <Input id="name" type="text" placeholder="Your Name" required className="py-6"/>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required className="py-6"/>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="message" className="font-semibold">Your Message</Label>
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
