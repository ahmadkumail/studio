import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function BlogPostPage() {
  const image = PlaceHolderImages.find((img) => img.id === 'blog-8');

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg mx-auto text-foreground">
        <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">October 10, 2025</p>
            <h1 className="text-4xl font-extrabold mt-2">
                5 Common Mistakes People Make When Sharing Files Online
            </h1>
            <div className="mt-4 flex justify-center gap-2">
                <Badge variant="outline">Cybersecurity</Badge>
                <Badge variant="outline">File Sharing</Badge>
                <Badge variant="outline">Productivity</Badge>
            </div>
        </div>

        {image && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden my-8">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}

        <p className="lead">
          File sharing is a routine part of modern work and life. It's so common that we often do it on autopilot, clicking "share" without a second thought. However, this convenience can mask significant risks to our security, privacy, and even our professional reputation. Are you making these common mistakes? Let's find out how to avoid them.
        </p>

        <h2 className="text-2xl font-bold mt-8">1. Using Public, Unprotected Links for Sensitive Data</h2>
        <p>
          This is by far the most common and dangerous mistake. You upload a file to a cloud service, grab the "shareable link," and send it off. The problem? Most default links are "public"—anyone with the link can access the file. These links can be forwarded, accidentally posted online, or even discovered by search engines.
        </p>
        <p>
          <strong>The Fix:</strong> Always use the enhanced security features of your sharing service. Before you send, ask yourself:
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li>Can I restrict access to specific email addresses?</li>
            <li>Can I protect this link with a password?</li>
            <li>Can I set an expiration date so the link automatically deactivates?</li>
        </ul>
        <p>Taking ten extra seconds to add a password or set an expiration date can be the difference between a secure transfer and a major data leak.</p>

        <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            "A public link is like leaving your front door unlocked. It's convenient, but you're inviting trouble."
        </blockquote>

        <h2 className="text-2xl font-bold mt-8">2. Sending Uncompressed, Gigantic Files</h2>
        <p>
            We've all been there: trying to email a folder of high-resolution photos, only to be blocked by a 25MB attachment limit. The clumsy workaround is often to upload the massive folder to a cloud drive and share the link. This clogs up the recipient's download bandwidth and eats into your storage quota.
        </p>
        <p>
            <strong>The Fix:</strong> Compress your files before sharing them. Using an on-device tool like ShrinkWrap allows you to dramatically reduce the size of images without uploading them to a third-party server first. For folders of documents or mixed file types, creating a ZIP archive is a simple and effective solution. A smaller file is faster to upload, faster to download, and more professional to send.
        </p>

        <h2 className="text-2xl font-bold mt-8">3. Emailing Passwords and File Links Together</h2>
        <p>
            You've done the right thing and protected your shared file with a password. Then, in the very same email containing the file link, you write, "P.S. The password is 'Project2025'." This completely defeats the purpose of the password. If that email is intercepted or forwarded, the attacker gets both the lock and the key.
        </p>
        <p>
            <strong>The Fix:</strong> Share the password through a separate, secure channel. This is called "out-of-band" communication. Send the file link via email, but send the password via an encrypted messaging app (like Signal or WhatsApp), a text message, or even a quick phone call. It might seem like overkill, but it's a fundamental security practice.
        </p>

        <h2 className="text-2xl font-bold mt-8">4. Forgetting to Revoke Access</h2>
        <p>
            You grant a contractor access to a project folder. The project ends, but the shared link remains active indefinitely. Months or even years later, that folder contains new, sensitive information that the contractor should not see. This "access creep" is a silent but serious security risk.
        </p>
        <p>
            <strong>The Fix:</strong> Conduct regular "access audits." Every few months, review the sharing settings on your cloud storage. See who has access to what and revoke permissions that are no longer needed. Better yet, make it a habit to set expiration dates on shared links from the very beginning.
        </p>

        <h2 className="text-2xl font-bold mt-8">5. Not Knowing Your Service's Privacy Policy</h2>
        <p>
          Many free online services are not truly free. You pay with your data. Some services may scan the content of your files for marketing purposes or claim ownership rights over the content you upload. Using such a service for confidential business documents or personal photos could be a major privacy violation.
        </p>
        <p>
            <strong>The Fix:</strong> Read the terms of service and privacy policy, especially for free tools. Understand how your data is being used. For maximum privacy, opt for services with end-to-end encryption or use on-device tools where your files are never uploaded to a server in the first place.
        </p>

        <h2 className="text-2xl font-bold mt-8">Conclusion: Share Smarter, Not Harder</h2>
        <p>
          Avoiding these common mistakes doesn't require being a cybersecurity expert. It simply requires a mindful and deliberate approach. By taking a few extra moments to compress your files, set secure permissions, and use the right channels, you can protect your data and make the entire process smoother for everyone involved.
        </p>
      </article>
    </div>
  );
}
