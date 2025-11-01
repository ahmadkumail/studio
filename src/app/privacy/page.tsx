
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn about our commitment to your privacy. ShrinkWrap processes all files locally in your browser, ensuring your data never leaves your computer.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-lg mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold text-center mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground text-center mb-12">Last updated: September 22, 2025</p>

        <h2 className="text-2xl font-bold mt-8">1. The ShrinkWrap Privacy Promise</h2>
        <p>
          Your privacy is not just a policy for us; it is the core principle of ShrinkWrap. We designed this tool from the ground up to ensure that you are the sole controller of your data. The most important thing you need to know is: <strong>your files are never uploaded to our servers.</strong> All compression and processing happen exclusively in your browser on your own device.
        </p>

        <h2 className="text-2xl font-bold mt-8">2. What Information We Collect (and What We Don't)</h2>
        <p>
          Because all file processing happens on your computer, we do not—and cannot—collect, see, store, or access the files you are compressing. They remain your property at all times.
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li><strong>Information You Provide:</strong> If you voluntarily contact us via email or our contact form, we will collect the information you provide, such as your name and email address, solely for the purpose of responding to your inquiry.</li>
            <li><strong>Anonymous Usage Analytics:</strong> We may collect non-personally identifiable usage data, such as which features are most popular or what compression levels are selected. This anonymous, aggregated data helps us understand how our tool is used so we can improve it. It is never linked to you or your files.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">3. How We Use Information</h2>
        <p>
          The limited information we collect is used strictly to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide, operate, and maintain our website.</li>
          <li>Improve and personalize your experience.</li>
          <li>Understand and analyze usage patterns to enhance functionality.</li>
          <li>Communicate with you for customer service or to respond to your questions.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">4. Data Security</h2>
        <p>
          Since your files are processed locally, their security is tied to your own device's security measures. For the contact information we do collect, we implement industry-standard security measures to maintain its safety. However, no method of electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>
        
        <h2 className="text-2xl font-bold mt-8">5. Third-Party Services</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, so long as those parties agree to keep this information confidential.
        </p>

        <h2 className="text-2xl font-bold mt-8">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-bold mt-8">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us by visiting the <a href="/contact" className="text-primary hover:underline">contact page</a> on our website.
        </p>
      </div>
    </div>
  );
}
