import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const blogPosts = [
    {
    title: 'The Ultimate Guide to Image Optimization for the Web',
    slug: 'ultimate-guide-to-image-optimization',
    description: 'Learn how to optimize your images for faster load times and better user experience. From choosing the right format to advanced compression techniques.',
    image_id: 'blog-4',
    date: 'September 25, 2025',
  },
  {
    title: 'JPG vs. PNG: Which Format Should You Use?',
    slug: 'jpg-vs-png-which-format-to-use',
    description: 'A deep dive into the differences between JPG and PNG. Understand the pros and cons of each to make the right choice for your images.',
    image_id: 'blog-5',
    date: 'September 20, 2025',
  },
  {
    title: 'Top 5 Free Tools for File Compression in 2025',
    slug: 'top-5-free-tools-for-file-compression-in-2025',
    description: 'Discover the best free tools available for compressing your files without compromising on quality. We review the top contenders of 2025.',
    image_id: 'blog-1',
    date: 'September 15, 2025',
  },
  {
    title: 'How to Safely Share Large Files Online',
    slug: 'how-to-safely-share-large-files-online',
    description: 'Sharing large files can be risky. Learn the best practices and tools to share your files securely and protect your privacy.',
    image_id: 'blog-2',
    date: 'September 10, 2025',
  },
  {
    title: 'Why Cloud Hosting is the Future of File Sharing',
    slug: 'why-cloud-hosting-is-the-future-of-file-sharing',
    description: 'From accessibility to collaboration, cloud hosting offers numerous advantages over traditional file sharing methods. Here’s why it’s the future.',
    image_id: 'blog-3',
    date: 'September 5, 2025',
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
          const image = PlaceHolderImages.find((img) => img.id === post.image_id);
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50">
                <div className="relative w-full h-60">
                    {image && (
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                </div>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
