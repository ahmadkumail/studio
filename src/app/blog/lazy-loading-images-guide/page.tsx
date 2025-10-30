
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lazy Loading Images: A Practical Guide to Boosting Web Performance',
  description: 'A complete guide to lazy loading images. Learn how native `loading="lazy"` works, how to implement it, and best practices for improving Core Web Vitals and user experience.',
};

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto text-foreground">
        <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">September 22, 2025</p>
            <h1 className="text-4xl font-extrabold mt-2">
              Lazy Loading Images: A Practical Guide
            </h1>
            <div className="mt-4 flex justify-center gap-2">
                <Badge variant="outline">Web Performance</Badge>
                <Badge variant="outline">Core Web Vitals</Badge>
                <Badge variant="outline">Technical SEO</Badge>
            </div>
        </div>

        <p className="lead">
          In the quest for faster websites, few techniques offer a better return on investment than lazy loading images. It’s a simple concept with a profound impact on page load times, data consumption, and user experience. This guide will demystify lazy loading, explain how it works, and show you how to implement it correctly to boost your site's performance.
        </p>

        <h2 className="text-2xl font-bold mt-8">What is Lazy Loading?</h2>
        <p>
          By default, when you visit a webpage, your browser tries to download every single asset immediately, including all the images, from the top of the page to the very bottom. This is inefficient. If a user never scrolls down to your footer, why should they waste time and data downloading the images located there?
        </p>
        <p>
          <strong>Lazy loading</strong> is a technique that defers the loading of non-critical resources (like images) until they are actually needed. In practice, this means an image is only downloaded from the server right before it is about to enter the user's viewport (the visible part of the screen).
        </p>

        <h2 className="text-2xl font-bold mt-8">Why is Lazy Loading So Important?</h2>
        <p>Implementing lazy loading has several key benefits:</p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Faster Initial Page Load:</strong> By not loading below-the-fold images, the browser has fewer resources to download and render initially. This dramatically improves key performance metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP).</li>
            <li><strong>Reduced Data Consumption:</strong> Users on mobile devices or with limited data plans save bandwidth, as they only download the images they actually see. This creates a better, more cost-effective user experience.</li>
            <li><strong>Lower Server Load:</strong> Your server has to handle fewer requests, which can reduce operational costs and improve its ability to serve all users quickly.</li>
            <li><strong>Improved Core Web Vitals:</strong> Properly implemented lazy loading is a core recommendation from Google for improving site speed and your Core Web Vitals score, which can positively impact your SEO rankings.</li>
        </ul>

        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            "Lazy loading shifts from a 'just-in-case' to a 'just-in-time' resource loading strategy."
        </blockquote>

        <h2 className="text-2xl font-bold mt-8">How to Implement Lazy Loading: The Modern Way</h2>
        <p>
            In the past, lazy loading required complex JavaScript libraries. Today, it's built directly into the browser, making it incredibly easy to implement.
        </p>
        <p>
            The magic is the `loading` attribute on the `<img>` tag. You can set it to one of two values:
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li>`loading="eager"`: This is the default behavior. The image is loaded immediately, regardless of its position on the page.</li>
            <li>`loading="lazy"`: This defers the loading of the image until the user scrolls near it.</li>
        </ul>
        <p>Here’s what it looks like in practice:</p>
        <pre className="bg-muted p-4 rounded-md text-sm"><code>
{`<img src="my-image.jpg" alt="A descriptive alt text" width="800" height="600" loading="lazy">`}
        </code></pre>

        <h2 className="text-2xl font-bold mt-8">Crucial Best Practice: Avoid Lazy-Loading Above-the-Fold Images</h2>
        <p>
            This is the most common mistake people make. You should **never** apply `loading="lazy"` to images that are visible in the viewport when the page first loads. This typically includes your main hero image, logo, or any other banner image at the top of the page.
        </p>
        <p>
            Why? The Largest Contentful Paint (LCP) is a critical Core Web Vital that measures when the largest visual element on the page becomes visible. This is often the main banner image. If you lazy-load this image, you are telling the browser to *delay* loading the most important visual element, which will harm your LCP score and make the page feel slower to the user.
        </p>
        <p>
            <strong>The Rule of Thumb:</strong>
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li>For images **above the fold** (visible on load): Use `loading="eager"` or omit the attribute entirely.</li>
            <li>For images **below the fold** (require scrolling): Use `loading="lazy"`.</li>
        </ul>
        <p>
            Frameworks like Next.js with its `<Image>` component often handle this logic automatically, but it's essential to understand the principle when working with standard HTML.
        </p>
        
        <h2 className="text-2xl font-bold mt-8">Don't Forget `width` and `height` Attributes</h2>
        <p>
            When using lazy loading, it is absolutely critical to specify the `width` and `height` attributes on your `<img>` tags.
        </p>
        <p>
            If you don't, the browser won't know how much space to reserve for the image before it loads. When the user scrolls and the image finally downloads, the page content will suddenly jump and reflow to make room for it. This is called Cumulative Layout Shift (CLS), another Core Web Vital. A high CLS score indicates a poor, jarring user experience.
        </p>
        <p>
            By providing the dimensions, the browser can allocate the correct amount of space in the layout from the very beginning, even before the image has loaded, preventing any layout shift.
        </p>

        <h2 className="text-2xl font-bold mt-8">Conclusion: A Simple Change, A Powerful Result</h2>
        <p>
          Native browser lazy loading is a gift to web developers and site owners. It's a simple, powerful, and now-standard technique for dramatically improving web performance. By strategically applying `loading="lazy"` to your below-the-fold images and ensuring you provide dimensions to prevent layout shift, you can create a faster, more efficient, and more user-friendly experience—all with a single attribute. Combine this with optimized, compressed images from a tool like <Link href="/" className="text-primary hover:underline">ShrinkWrap</Link>, and you'll be well on your way to a lightning-fast website.
        </p>
      </article>
    </div>
  );
}
