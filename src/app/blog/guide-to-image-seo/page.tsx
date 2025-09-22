
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Beyond Compression: A Strategic Guide to Image SEO',
  description: 'Unlock higher search rankings by mastering image SEO. Learn how to optimize alt text, file names, and dimensions to boost your online visibility.',
};

export default function BlogPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto text-foreground">
        <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">September 21, 2025</p>
            <h1 className="text-4xl font-extrabold mt-2">
                Beyond Compression: A Strategic Guide to Image SEO
            </h1>
            <div className="mt-4 flex justify-center gap-2">
                <Badge variant="outline">Image SEO</Badge>
                <Badge variant="outline">Alt Text</Badge>
                <Badge variant="outline">Google Images</Badge>
            </div>
        </div>

        <p className="lead">
          When we talk about image optimization, the conversation often begins and ends with compression. Reducing file size for faster load times is absolutely critical, as we've discussed in our <Link href="/blog/core-web-vitals-and-image-size" className="text-primary hover:underline">Core Web Vitals guide</Link>. But true image optimization goes far beyond just file size. It involves a strategic approach to help search engines like Google understand, index, and rank your images. This practice, known as Image SEO, can drive significant organic traffic to your site, often from untapped sources like Google Images.
        </p>

        <h2 className="text-2xl font-bold mt-8">Why Does Image SEO Matter?</h2>
        <p>
          Google Images is one of the world's largest search engines. People use it to find products, get ideas, and learn visually. If your images aren't optimized, you're missing out on this massive potential audience. Furthermore, well-optimized images enhance the user experience and accessibility of your main content, which are themselves powerful ranking signals.
        </p>
        <p>
            A comprehensive Image SEO strategy involves several key components, each one providing another clue to search engines about your content's relevance and context.
        </p>
        
        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            "Image SEO is about telling search engines a story. Your image is the illustration, and your file name, alt text, and context are the words."
        </blockquote>

        <h2 className="text-2xl font-bold mt-8">1. The Perfect File Name: Your First Clue</h2>
        <p>
            Before you even upload your image, you have your first opportunity to optimize. A file name like `IMG_8432.jpg` tells a search engine absolutely nothing. A descriptive, keyword-rich file name is a foundational piece of Image SEO.
        </p>
        <p><strong>Best Practices:</strong></p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Be Descriptive:</strong> Clearly describe what is in the image.</li>
            <li><strong>Use Keywords Naturally:</strong> Incorporate your target keyword where it makes sense.</li>
            <li><strong>Use Hyphens:</strong> Use hyphens (`-`) to separate words, not underscores (`_`) or spaces.</li>
        </ul>
        <p>
            For example, if you have a picture of a chocolate cake for a recipe blog, change the filename from `DSC1001.jpg` to `dark-chocolate-fudge-cake-recipe.jpg`. This immediately gives Google context about the image's subject matter.
        </p>
        
        <h2 className="text-2xl font-bold mt-8">2. Alt Text: The Most Important Signal</h2>
        <p>
            The `alt` attribute, or alternative text, is the single most important part of Image SEO. Its primary purpose is accessibility: it's what screen readers announce to visually impaired users, describing the image to them. However, it's also what search engines "read" to understand the content of an image.
        </p>
        <p><strong>How to Write Great Alt Text:</strong></p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Be Specific and Concise:</strong> Describe the image as if you were explaining it to someone who can't see it. Aim for under 125 characters.</li>
            <li><strong>Include Your Keyword:</strong> If it fits naturally, include your target keyword. But don't stuff it!</li>
            <li><strong>Don't Start With "Image of..." or "Picture of...":</strong> It's redundant. The `<img>` tag already tells the browser and screen reader it's an image.</li>
        </ul>
        <pre><code className="language-html">{`<!-- GOOD ALT TEXT -->
<img src="dark-chocolate-fudge-cake-recipe.jpg" alt="A slice of dark chocolate fudge cake with glossy ganache dripping down the side.">

<!-- BAD ALT TEXT (Keyword stuffing) -->
<img src="cake.jpg" alt="cake chocolate cake recipe fudge cake best cake">`}</code></pre>
        <p>Good alt text serves both accessibility and SEO, making it a win-win.</p>

        <h2 className="text-2xl font-bold mt-8">3. Image Compression and Sizing: The User Experience Factors</h2>
        <p>
            As discussed, site speed is a major ranking factor. Large images slow down your site, hurting your Core Web Vitals and, consequently, your ranking.
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Compress Ruthlessly:</strong> Use a tool like <Link href="/" className="text-primary hover:underline">ShrinkWrap</Link> to reduce the file size of every image before uploading.</li>
            <li><strong>Resize Correctly:</strong> Serve images at the correct display dimensions. Don't upload a 3000px wide image for a 600px container.</li>
            <li><strong>Use Next-Gen Formats:</strong> Serve images in formats like WebP, which offer superior compression and quality compared to JPG and PNG.</li>
        </ul>
        <p>These steps ensure your images don't just look good, but also contribute to a fast, positive user experience that Google rewards.</p>

        <h2 className="text-2xl font-bold mt-8">4. Context and Placement: Where Your Image Lives</h2>
        <p>
            Search engines don't just analyze the image itself; they analyze the content surrounding it. An image's placement on the page provides strong contextual clues.
        </p>
        <p>
            An image of a car will rank better for "red sports car" if it's placed within an article reviewing that car, surrounded by text, headings (H1, H2), and captions that also discuss red sports cars. An image in isolation has far less context and is harder for Google to understand and rank appropriately. Always place your images near relevant text.
        </p>

        <h2 className="text-2xl font-bold mt-8">5. Image Sitemaps: Tell Google What to Crawl</h2>
        <p>
            For image-heavy sites, like photography portfolios or e-commerce stores, an image sitemap can be very beneficial. A sitemap is a file that lists all the pages on your site. An image sitemap does the same, but specifically for your images.
        </p>
        <p>
            By including image information in your sitemap, you can explicitly tell Google where your important images are, what they are about, and ensure they are crawled and indexed. This is particularly useful for images loaded via JavaScript, which might otherwise be missed by Google's crawlers.
        </p>

        <h2 className="text-2xl font-bold mt-8">Conclusion: A Checklist for Perfect Image SEO</h2>
        <p>
          Image SEO is a powerful but often neglected aspect of a holistic SEO strategy. By moving beyond just compression, you can turn your images from simple page assets into valuable traffic drivers.
        </p>
        <p>Before you upload your next image, run through this checklist:</p>
        <ol className="list-decimal list-inside space-y-2">
            <li>Is the file name descriptive and keyword-rich?</li>
            <li>Have I written specific, helpful alt text?</li>
            <li>Has the image been compressed to the smallest possible file size?</li>
            <li>Is it resized to the correct dimensions?</li>
            <li>Am I placing it within relevant, contextual content on the page?</li>
        </ol>
        <p>
          By making this checklist a part of your content workflow, you'll be well on your way to mastering Image SEO and unlocking a new stream of organic traffic.
        </p>
      </article>
    </div>
  );
}
