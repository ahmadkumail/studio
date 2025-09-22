
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Core Web Vitals: How Image Size Impacts Your Google Ranking',
  description: 'A deep dive into Google\'s Core Web Vitals (LCP, FID, CLS) and how properly sized and compressed images are critical for passing these performance metrics and boosting SEO.',
};

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto text-foreground">
        <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">September 19, 2025</p>
            <h1 className="text-4xl font-extrabold mt-2">
                Core Web Vitals: How Image Size Impacts Your Google Ranking
            </h1>
            <div className="mt-4 flex justify-center gap-2">
                <Badge variant="outline">Core Web Vitals</Badge>
                <Badge variant="outline">Page Speed</Badge>
                <Badge variant="outline">Google Ranking</Badge>
            </div>
        </div>

        <p className="lead">
          For years, "page speed" was a vague goal for SEO. We knew it was important, but how Google measured it was something of a black box. That changed with the introduction of Core Web Vitals, a specific set of metrics that Google uses to measure a webpage's real-world user experience. Passing these vitals is no longer optional if you want to rank well. And one of the biggest factors influencing your scores? Image size.
        </p>

        <h2 className="text-2xl font-bold mt-8">What are the Core Web Vitals?</h2>
        <p>
          Core Web Vitals are a trio of metrics that measure a page's loading performance, interactivity, and visual stability.
        </p>
        <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Largest Contentful Paint (LCP):</strong> This measures how long it takes for the largest single element (usually a hero image or a large block of text) to become visible in the viewport. A good LCP is <strong>2.5 seconds or less.</strong>
            </li>
            <li>
              <strong>First Input Delay (FID):</strong> This measures the time from when a user first interacts with your page (e.g., clicks a button) to the time when the browser is actually able to respond to that interaction. A good FID is <strong>100 milliseconds or less.</strong>
            </li>
            <li>
              <strong>Cumulative Layout Shift (CLS):</strong> This measures the visual stability of your page. Have you ever tried to click a button, only to have an ad load and push the button down, causing you to click the wrong thing? That's layout shift. A good CLS score is <strong>0.1 or less.</strong>
            </li>
        </ul>

        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            "Core Web Vitals are Google's way of measuring a user's delight or frustration. Your image strategy is central to passing the test."
        </blockquote>

        <h2 className="text-2xl font-bold mt-8">How Images Directly Wreck Your Vitals (and How to Fix It)</h2>
        <p>
          Unoptimized images are a primary culprit for poor Core Web Vitals scores, especially LCP and CLS.
        </p>
        
        <h3 className="text-xl font-bold mt-6">Fixing a Poor Largest Contentful Paint (LCP)</h3>
        <p>
            The LCP element on most pages is a large hero image. If this image file is massive, the browser has to spend precious seconds downloading it, leading to a terrible LCP score.
        </p>
        <p><strong>The Fixes:</strong></p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Aggressive Compression:</strong> Your LCP image *must* be as small as possible. Use a tool like <Link href="/" className="text-primary hover:underline">ShrinkWrap</Link> to compress your hero image significantly. Every kilobyte you shave off counts directly towards a better LCP time.</li>
            <li><strong>Use Next-Gen Formats:</strong> Convert your LCP image to WebP. A WebP image will be much smaller than a comparable JPG, leading to a faster download and a better LCP score.</li>
            <li><strong>Preload Your LCP Image:</strong> You can give the browser a hint to download the LCP image as soon as possible by using a `<link rel="preload">` tag in your HTML head.</li>
        </ul>

        <h3 className="text-xl font-bold mt-6">Fixing a Poor Cumulative Layout Shift (CLS)</h3>
        <p>
            Layout shift often happens when an image loads and suddenly pushes content down the page. This occurs when the browser doesn't know how much space to reserve for the image before it has downloaded it.
        </p>
        <p><strong>The Fix:</strong></p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Always Specify Image Dimensions:</strong> The number one rule to prevent image-related layout shift is to always include `width` and `height` attributes on your `<img>` tags (or the equivalent properties in a Next.js Image component). When you provide these attributes, the browser knows the image's aspect ratio and can reserve the correct amount of space for it in the layout *before* it downloads.</li>
            <li><strong>Example:</strong> Instead of `<img src="my-image.jpg">`, use `<img src="my-image.jpg" width="800" height="400">`. This simple addition can completely solve your CLS problems.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">How Images Indirectly Affect First Input Delay (FID)</h2>
        <p>
            While less direct, large images can also contribute to a poor FID. When the browser is busy downloading and processing huge image files, its main thread can be blocked. If a user tries to interact with the page during this time, the browser can't respond immediately, leading to a noticeable delay and a poor FID score.
        </p>
        <p>
            By properly compressing your images, you free up the browser's main thread to handle user interactions more quickly, contributing to a snappier, more responsive experience.
        </p>

        <h2 className="text-2xl font-bold mt-8">Conclusion: Optimization is Not Optional</h2>
        <p>
          In the age of Core Web Vitals, image optimization is no longer a "nice-to-have." It is a fundamental, non-negotiable part of technical SEO. Failing to properly size, compress, and define dimensions for your images will directly lead to poor user experience, lower Google rankings, and less traffic.
        </p>
        <p>
            Start with your Largest Contentful Paint image. Compress it, use a modern format, and preload it. Then, audit all your images to ensure they have explicit width and height attributes. By making image optimization a core part of your content workflow, you'll be well on your way to acing your Core Web Vitals and climbing the search rankings.
        </p>
      </article>
    </div>
  );
}
