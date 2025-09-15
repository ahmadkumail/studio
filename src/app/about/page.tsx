import { Building, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl">
            About ShrinkWrap
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-muted-foreground">
            We're on a mission to make file compression smarter, faster, and more accessible for everyone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="inline-block p-4 bg-primary/10 rounded-lg">
              <Building className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Our Company</h2>
            <p className="text-muted-foreground">
              Founded in 2024, ShrinkWrap was born from a simple idea: file compression should be intelligent. We harness the power of AI to provide optimal settings, ensuring you get the best balance of quality and size every time.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-block p-4 bg-primary/10 rounded-lg">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
            <p className="text-muted-foreground">
              We are a passionate team of developers, designers, and AI enthusiasts dedicated to building high-quality tools that solve real-world problems. We believe in the power of collaboration and innovation to create beautiful and functional software.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-block p-4 bg-primary/10 rounded-lg">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to empower creators, developers, and businesses by providing a file compression tool that is not only powerful but also incredibly easy to use. We strive to push the boundaries of what's possible with on-device processing and AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
