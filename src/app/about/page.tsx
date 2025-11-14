
import { Users, Shield, Cpu, Heart } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Our Mission at ShrinkWrap',
  description: 'Learn about the team and the values behind ShrinkWrap. Discover our commitment to privacy, smart design, and building genuinely free and useful tools for everyone.',
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-5xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Who We Are
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-muted-foreground">
            We're a small group of developers, designers, and privacy advocates who believe powerful tools should be simple, private, and accessible to everyone. We got tired of the trade-off between shady online tools and clunky desktop software, so we decided to build something better. That simple idea is how ShrinkWrap got started.
          </p>
        </div>

        <div className="mt-24 border-t pt-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Guiding Principles</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              In a world where your data is often the product, we've taken a different path. ShrinkWrap is built on three core ideas that guide every decision we make.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Your Privacy Comes First</h3>
                <p className="text-muted-foreground">
                  Your files are your business. Period. We built ShrinkWrap to process everything directly on your device. Nothing is ever uploaded to a server. This isn't just a feature; it's a promise. We can't see your files, and we never want to.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <Cpu className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Smart, Not Complicated</h3>
                <p className="text-muted-foreground">
                  File compression can be confusing. What quality setting is best? Our AI suggestion engine removes the guesswork. We use technology to give you expert results without you needing to be an expert yourself.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Genuinely Free & Accessible</h3>
                <p className="text-muted-foreground">
                  Great tools shouldn't be locked behind expensive paywalls. We believe everyone deserves access to high-quality software, which is why ShrinkWrap will always be free. No sign-ups, no hidden fees, just a great tool for everyone.
                </p>
              </div>
            </div>
        </div>

        <div className="mt-24 border-t pt-20">
          <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">The ShrinkWrap Story</h2>
              <div className="prose prose-lg max-w-3xl mx-auto mt-6 text-muted-foreground text-left">
                <p>
                  ShrinkWrap started as a side project born from our own frustration. As web developers and designers, we were constantly dealing with the tedious cycle of compressing images. The online tools were fast but raised serious privacy flags, while the desktop software we used felt outdated and overly complicated.
                </p>
                <p>
                  We started asking a simple question: "Can we build something with the power of a desktop app but the privacy and ease of a modern web tool?"
                </p>
                <p>
                  That question led us down a rabbit hole of browser-based processing and using AI to simplify complex decisions. After months of coding and countless tests, ShrinkWrap was born. It's a tool that embodies our commitment to privacy, intelligence, and accessibility. We're a small, passionate team dedicated to making the web a little faster and more private, one compressed file at a time.
                </p>
                <p>
                  We're always working to make ShrinkWrap better and would love to hear your thoughts. Please don't hesitate to <Link href="/contact" className="text-primary hover:underline">get in touch</Link>.
                </p>
              </div>
              <div className="mt-12">
                <div className="inline-block p-6 bg-primary/10 rounded-lg">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mt-6">Built by Creators, for Creators</h3>
                <p className="text-muted-foreground max-w-xl mx-auto mt-2">
                  We're web professionals, photographers, and developers who use our own tool every single day. We get the need for speed, quality, and privacy because we live it.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
