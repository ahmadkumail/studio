import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog | File Compression Tips and Insights',
  description: 'Explore the ShrinkWrap blog for tips, tricks, and insights on file compression, image optimization, data privacy, and digital efficiency.',
};

const blogPosts = [
  {
    title: 'Common Image Compression Myths Debunked',
    slug: 'common-image-compression-myths',
    description: 'We bust the most common myths about image compression, from "lossless is always better" to "you need expensive software for quality results."',
    image_id: 'blog-16',
    date: 'September 25, 2025',
    keywords: ['Compression Myths', 'Image Optimization', 'Tech Tips'],
  },
  {
    title: 'A Deep Dive into Image Metadata: What It Is and Why It Matters',
    slug: 'understanding-image-metadata',
    description: 'Learn about EXIF, IPTC, and XMP data. Understand what metadata is, why it\'s useful, and how it impacts privacy and file size.',
    image_id: 'blog-17',
    date: 'September 23, 2025',
    keywords: ['Image Metadata', 'EXIF', 'Data Privacy'],
  },
  {
    title: 'The Practical Guide to Lazy Loading for Faster Websites',
    slug: 'lazy-loading-images-guide',
    description: 'Boost your page speed by implementing lazy loading. This guide explains what it is, how it works, and how to apply it to your images.',
    image_id: 'blog-18',
    date: 'September 22, 2025',
    keywords: ['Lazy Loading', 'Web Performance', 'Core Web Vitals'],
  },
  {
    title: 'Essential Image Optimization for E-commerce Success',
    slug: 'image-optimization-for-ecommerce',
    description: 'For e-commerce, product images are everything. Learn how to optimize them for fast loading times without sacrificing the quality that drives sales.',
    image_id: 'blog-19',
    date: 'September 20, 2025',
    keywords: ['E-commerce', 'Image Optimization', 'Conversion Rate'],
  },
  {
    title: 'Beyond the Basics: Advanced Image Compression Techniques',
    slug: 'advanced-compression-techniques',
    description: 'Move beyond standard compression with techniques like chroma subsampling, color depth reduction, and dithering for ultimate file size savings.',
    image_id: 'blog-20',
    date: 'September 18, 2025',
    keywords: ['Advanced Compression', 'WebP', 'File Formats'],
  },
  {
    title: '5 Common Mistakes People Make When Sharing Files Online',
    slug: '5-common-mistakes-when-sharing-files',
    description: 'Avoid these common pitfalls to ensure your file sharing is secure, efficient, and professional. Learn what not to do when sending your important data.',
    image_id: 'blog-8',
    date: 'September 5, 2025',
    keywords: ['Cybersecurity', 'File Sharing', 'Productivity'],
  },
  {
    title: 'The Future of File Sharing: Trends to Watch in 2025',
    slug: 'future-of-file-sharing-trends-2025',
    description: 'From decentralized networks to AI-driven transfers, discover the exciting trends that will shape the future of how we share files.',
    image_id: 'blog-7',
    date: 'September 1, 2025',
    keywords: ['Tech Trends', 'File Sharing', 'Future Tech'],
  },
  {
    title: 'Cloud Storage vs. Local Storage: Which Is Better for You?',
    slug: 'cloud-vs-local-storage',
    description: 'An in-depth comparison of cloud and local storage solutions. Understand the pros and cons to decide the best way to keep your files safe and accessible.',
    image_id: 'blog-6',
    date: 'August 28, 2025',
    keywords: ['Cloud Storage', 'Data Management', 'Local Storage'],
  },
    {
    title: 'The Ultimate Guide to Image Optimization for the Web',
    slug: 'ultimate-guide-to-image-optimization',
    description: 'Learn how to optimize your images for faster load times and better user experience. From choosing the right format to advanced compression techniques.',
    image_id: 'blog-4',
    date: 'August 25, 2025',
    keywords: ['Web Performance', 'Image Optimization', 'SEO'],
  },
  {
    title: 'JPG vs. PNG: Which Format Should You Use?',
    slug: 'jpg-vs-png-which-format-to-use',
    description: 'A deep dive into the differences between JPG and PNG. Understand the pros and cons of each to make the right choice for your images.',
    image_id: 'blog-5',
    date: 'August 22, 2025',
    keywords: ['File Formats', 'Image Compression', 'Web Design'],
  },
  {
    title: 'Top 5 Free Tools for File Compression in 2025',
    slug: 'top-5-free-tools-for-file-compression-in-2025',
    description: 'Discover the best free tools available for compressing your files without compromising on quality. We review the top contenders of 2025.',
    image_id: 'blog-1',
    date: 'August 19, 2025',
    keywords: ['File Compression', 'Free Tools', 'Productivity'],
  },
  {
    title: 'How to Safely Share Large Files Online',
    slug: 'how-to-safely-share-large-files-online',
    description: 'Sharing large files can be risky. Learn the best practices and tools to share your files securely and protect your privacy.',
    image_id: 'blog-2',
    date: 'August 15, 2025',
    keywords: ['Cybersecurity', 'File Sharing', 'Data Privacy'],
  },
  {
    title: 'Why Cloud Hosting is the Future of File Sharing',
    slug: 'why-cloud-hosting-is-the-future-of-file-sharing',
    description: 'From accessibility to collaboration, cloud hosting offers numerous advantages over traditional file sharing methods. Here’s why it’s the future.',
    image_id: 'blog-3',
    date: 'August 10, 2025',
    keywords: ['Cloud Computing', 'File Sharing', 'Tech Trends'],
  },
   {
    title: 'How AI Is Changing File Storage and Sharing',
    slug: 'how-ai-is-changing-file-storage-and-sharing',
    description: 'Explore how artificial intelligence is revolutionizing the way we store, manage, and share our digital files, from smart organization to predictive transfers.',
    image_id: 'blog-10',
    date: 'September 10, 2025',
    keywords: ['AI', 'Cloud Storage', 'File Sharing'],
  },
   {
    title: 'The Ultimate Guide to File Formats (ZIP, RAR, JPG, and More)',
    slug: 'ultimate-guide-to-file-formats',
    description: 'A comprehensive look at the most common file formats, what they are, and when to use them for maximum efficiency and quality.',
    image_id: 'blog-9',
    date: 'September 8, 2025',
    keywords: ['File Formats', 'Tech Basics', 'Data Management'],
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl">
          The ShrinkWrap Blog
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Tips, tricks, and insights on file compression and digital efficiency.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {blogPosts.map((post) => {
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
              <Card className="h-full flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50">
                <div>
                  <CardHeader>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{post.description}</CardDescription>
                  </CardContent>
                </div>
                <CardContent className="flex-grow-0 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="font-normal">{keyword}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
