
import { Users, Shield, Cpu, Heart } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission and values behind ShrinkWrap.',
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
            We are a team of developers, designers, and privacy advocates who believe that powerful tools should be simple, private, and accessible to everyone. We got tired of compromising between insecure online tools and clunky desktop software, so we decided to build a better solution. That simple idea is what started ShrinkWrap.
          </p>
        </div>

        <div className="mt-24 border-t pt-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Philosophy</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              In a world where your data is the product, we chose a different path. We built ShrinkWrap on three core principles that guide every decision we make.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Privacy is Paramount</h3>
                <p className="text-muted-foreground">
                  Your files are yours. Period. We designed ShrinkWrap to process everything directly on your device. Nothing is ever uploaded to a server. This isn't just a feature; it's our promise. We can't see your files, and we don't want to.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <Cpu className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Intelligent, Not Complicated</h3>
                <p className="text-muted-foreground">
                  File compression can be confusing. What quality setting is best? Our AI-powered suggestion engine removes the guesswork. We leverage technology to give you expert results without needing to be an expert yourself.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Free and Accessible</h3>
                <p className="text-muted-foreground">
                  Powerful tools shouldn't be locked behind expensive subscriptions. We believe everyone deserves access to high-quality software, which is why ShrinkWrap is free to use. No sign-ups, no hidden fees, just a great tool for everyone.
                </p>
              </div>
            </div>
        </div>

        <div className="mt-24 border-t pt-20">
          <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">The ShrinkWrap Story</h2>
              <div className="prose prose-lg max-w-3xl mx-auto mt-6 text-muted-foreground text-left">
                <p>
                  ShrinkWrap started as a side project born from frustration. As web developers and designers, we were tired of the tedious cycle of compressing images. The online tools were convenient but raised serious privacy concerns, while desktop software was often clunky and over-complicated.
                </p>
                <p>
                  We asked a simple question: "Can we build something that has the power of desktop software but the privacy and simplicity of a modern web tool?"
                </p>
                <p>
                  This question led us down the path of exploring browser-based processing and the potential of AI to simplify complex decisions. After months of development and testing, ShrinkWrap was born—a tool that embodies our commitment to privacy, intelligence, and accessibility. We're a small, passionate team dedicated to making the web a faster, more private place, one compressed file at a time.
                </p>
                <p>
                  We're constantly working to improve ShrinkWrap and would love to hear your feedback. Please don't hesitate to <Link href="/contact" className="text-primary hover:underline">get in touch</Link>.
                </p>
              </div>
              <div className="mt-12">
                <div className="inline-block p-6 bg-primary/10 rounded-lg">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mt-6">Built by Creators, for Creators</h3>
                <p className="text-muted-foreground max-w-xl mx-auto mt-2">
                  We are web professionals, photographers, and developers who use our own tool every day. We understand the need for speed, quality, and privacy because we live it.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
