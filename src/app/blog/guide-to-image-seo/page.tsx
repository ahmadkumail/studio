
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beyond Compression: A Guide to SEO for Images',
  description: 'Boost your search rankings with image SEO. This guide covers everything from writing effective alt text and optimizing file names to image sitemaps and structured data.',
};

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto text-foreground">
        <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">September 21, 2025</p>
            <h1 className="text-4xl font-extrabold mt-2">
                Beyond Compression: A Guide to SEO for Images
            </h1>
            <div className="mt-4 flex justify-center gap-2">
                <Badge variant="outline">Image SEO</Badge>
                <Badge variant="outline">Alt Text</Badge>
                <Badge variant="outline">Search Engine Optimization</Badge>
            </div>
        </div>

        <p className="lead">
          You've chosen the perfect image, resized it, and run it through a tool like <Link href="/" className="text-primary hover:underline">ShrinkWrap</Link> to get the file size down. Your work is done, right? Not if you want to get the maximum SEO value out of it. Image optimization is more than just compression; it's about providing search engines with the context they need to understand your images and rank them in image search results. This guide will take you beyond compression and into the world of true image SEO.
        </p>

        <h2 className="text-2xl font-bold mt-8">1. The Almighty Alt Text: Your Top Priority</h2>
        <p>
          The `alt` attribute, or alternative text, is the single most important piece of image SEO. It's a short, descriptive piece of text that serves two main purposes:
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Accessibility:</strong> Screen readers use alt text to describe the image to visually impaired users. This is its primary and most important function.</li>
            <li><strong>Search Engine Context:</strong> Search engine crawlers can't "see" images. Alt text provides them with the textual context needed to understand what the image is about, helping it to rank in Google Images.</li>
        </ul>
        <p><strong>How to write good alt text:</strong></p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Be descriptive and specific:</strong> Instead of `alt="dog"`, write `alt="Golden retriever puppy playing with a red ball in a grassy park"`.</li>
            <li><strong>Incorporate your target keyword naturally:</strong> If your article is about "custom kitchen renovations," a good alt text would be `alt="A modern custom kitchen renovation with white marble countertops and a large island"`.</li>
            <li><strong>Keep it concise:</strong> Aim for under 125 characters.</li>
            <li><strong>Don't keyword-stuff:</strong> `alt="dog puppy doggo good-boy"` is bad. It's unhelpful and can get you penalized.</li>
        </ul>

        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            "Good alt text serves humans first and search engines second. If it helps a visually impaired user understand the image, it's good SEO."
        </blockquote>

        <h2 className="text-2xl font-bold mt-8">2. The Descriptive File Name</h2>
        <p>
            Before you even upload your image, give it a descriptive, keyword-rich file name. An image named `IMG_4087.jpg` gives search engines zero information. An image named `chocolate-chip-cookie-recipe.jpg` tells them exactly what the image is about before they even look at the alt text.
        </p>
        <p>
            Use hyphens to separate words, and try to make the file name a short, logical description of the image content. This is a simple but powerful signal.
        </p>
        
        <h2 className="text-2xl font-bold mt-8">3. Image Sitemaps: Help Google Find Your Images</h2>
        <p>
          While Google can often discover images by crawling your pages, you can give it an explicit road map by creating an image sitemap. This is a specific type of XML sitemap that lists all the images on your site.
        </p>
        <p>
          Using an image sitemap is especially useful for:
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li>Images that are loaded via JavaScript, which might be harder for Google to discover.</li>
            <li>Ensuring Google knows about all the images on your site and their locations.</li>
            <li>Providing additional metadata, like a caption or title, for each image.</li>
        </ul>
        <p>Many SEO plugins for platforms like WordPress can generate an image sitemap for you automatically.</p>

        <h2 className="text-2xl font-bold mt-8">4. Context is King: Place Images Near Relevant Text</h2>
        <p>
          Search engines don't just analyze the image itself; they analyze the content surrounding it. The text on the page, the page title, and the headings all provide clues about the image's subject matter.
        </p>
        <p>
            For the best results, place your image immediately after or within the most relevant text. If you have a section about "installing new cabinets," your image of the new cabinets should be right there, not several paragraphs down in an unrelated section.
        </p>

        <h2 className="text-2xl font-bold mt-8">5. Structured Data for Rich Results</h2>
        <p>
          For certain types of content, you can use structured data (like Schema.org) to make your images eligible for "rich results" in search. For example, if you have a recipe page, you can use Recipe schema to mark up your images, which might allow them to appear with a star rating or cooking time directly in the search results.
        </p>
        <p>This is a more advanced technique, but it can make your content stand out and significantly increase click-through rates from image search.</p>

        <h2 className="text-2xl font-bold mt-8">Conclusion: A Holistic Approach</h2>
        <p>
          Image SEO is a holistic process. It starts with a well-compressed, fast-loading image file and extends to everything that provides context and meaning to that image. By combining technical optimization (compression, file size) with on-page SEO best practices (alt text, file names, context), you give your images the best possible chance to rank well.
        </p>
        <p>
            Don't treat your images as an afterthought. Treat them as valuable assets that can drive significant organic traffic to your site.
        </p>
      </article>
    </div>
  );
}
