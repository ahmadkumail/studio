import { MetadataRoute } from 'next';

const blogPosts = [
  { slug: '5-common-mistakes-when-sharing-files' },
  { slug: 'future-of-file-sharing-trends-2025' },
  { slug: 'cloud-vs-local-storage' },
  { slug: 'ultimate-guide-to-image-optimization' },
  { slug: 'jpg-vs-png-which-format-to-use' },
  { slug: 'top-5-free-tools-for-file-compression-in-2025' },
  { slug: 'how-to-safely-share-large-files-online' },
  { slug: 'why-cloud-hosting-is-the-future-of-file-sharing' },
  { slug: 'how-ai-is-changing-file-storage-and-sharing' },
  { slug: 'ultimate-guide-to-file-formats' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://shrinkwrap.app';

  const staticPages = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
    },
  ];

  const blogPages = blogPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogPages];
}
