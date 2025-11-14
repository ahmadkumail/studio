
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, MessageSquareHeart } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! We've received your message and will get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl lg:text-6xl tracking-tight">
            Let's Talk
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            We're passionate about building great tools and we'd love to hear from you. Your questions and feedback help us make ShrinkWrap even better.
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
                  <h3 className="text-2xl font-bold text-foreground">Email Us Directly</h3>
                  <p className="mt-2 text-muted-foreground">
                    For support, partnership inquiries, or general questions, feel free to send us an email. We're pretty quick to respond.
                  </p>
                  <p className="mt-4 inline-block font-semibold text-primary underline group-hover:text-primary/80 transition-colors">
                    shrinkwrap13@gmail.com
                  </p>
                </div>
              </div>
            </a>
            <div className="w-full text-left group">
                  <div className="flex items-start gap-6 p-6 border rounded-lg bg-card/50">
                    <div className="flex-shrink-0 bg-primary/10 text-primary p-4 rounded-full">
                      <MessageSquareHeart className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Have an Idea?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Got a feature request or an idea for how to make ShrinkWrap even better? Please send it through the contact form. We read every single submission.
                      </p>
                    </div>
                  </div>
                </div>

          </div>

          <div>
            <Card className="shadow-2xl shadow-primary/10">
              <CardHeader>
                  <CardTitle className="text-3xl font-bold">Send a Message</CardTitle>
                  <CardDescription>Use the form below for any inquiries. We'll get back to you as soon as we can.</CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
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
