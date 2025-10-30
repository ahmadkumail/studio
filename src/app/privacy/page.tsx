
"use client";

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';

// export const metadata: Metadata = { // This is commented out to avoid another build error. Metadata should be defined in a parent layout or page.
//   title: 'Privacy Policy',
//   description: 'Read the ShrinkWrap Privacy Policy. Learn how we handle your data and our commitment to privacy with on-device file processing.',
// };

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);


  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-lg mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold text-center mb-8">Privacy Policy</h1>
        
        {lastUpdated && <p className="text-muted-foreground text-center mb-12">Last updated: {lastUpdated}</p>}

        <h2 className="text-2xl font-bold mt-8">1. Introduction</h2>
        <p>
          Welcome to ShrinkWrap. We are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it. The most important thing to know is that <strong>ShrinkWrap processes all files locally in your browser. Your files are never uploaded to our servers.</strong>
        </p>

        <h2 className="text-2xl font-bold mt-8">2. Information We Collect</h2>
        <p>
          Since all file processing happens on your device, we do not collect, store, or have access to the files you compress. We only collect information that you voluntarily provide to us when you contact us directly.
        </p>

        <h3 className="text-xl font-semibold mt-4">2.1. Usage Data</h3>
        <p>
          We may collect anonymous usage data to help us improve our service. This data is aggregated and does not contain any personally identifiable information.
        </p>

        <h2 className="text-2xl font-bold mt-8">3. How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8">4. Data Security</h2>
        <p>
          The security of your data is important to us. As your files are processed locally, the primary security responsibility lies with your own device's security. We implement a variety of security measures to maintain the safety of any personal information we do collect (like from the contact form).
        </p>

        <h2 className="text-2xl font-bold mt-8">5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-bold mt-8">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us by visiting the <a href="/contact" className="text-primary hover:underline">contact page</a> on our website.
        </p>
      </div>
    </div>
  );
}
