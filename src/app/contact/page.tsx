"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    // For this demo, we'll just show a success toast.
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Have a question or want to work with us? Drop us a line.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                    <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <a href="mailto:shrinkwrap13@gmail.com" className="text-muted-foreground hover:text-primary">shrinkwrap13@gmail.com</a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
                <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." required rows={6} />
                </div>
                <Button type="submit" className="w-full">
                    Send Message
                </Button>
                </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
