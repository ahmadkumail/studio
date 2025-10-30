
"use client";

import { useState, useEffect } from 'react';

export default function TermsAndConditionsPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // This code runs only on the client, after the component mounts.
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []); // The empty dependency array ensures this runs only once.

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-lg mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold text-center mb-8">Terms & Conditions</h1>
        
        {/* This conditional rendering is key: The <p> tag is not rendered at all on the server.
            It only renders on the client after `lastUpdated` state is set. */}
        {lastUpdated && <p className="text-muted-foreground text-center mb-12">Last updated: {lastUpdated}</p>}

        <h2 className="text-2xl font-bold mt-8">1. Agreement to Terms</h2>
        <p>
          By using our service, ShrinkWrap, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our service.
        </p>

        <h2 className="text-2xl font-bold mt-8">2. Description of Service</h2>
        <p>
          ShrinkWrap is a tool that compresses image files. All processing is done locally in your browser. No files are uploaded to any server. The service is provided "as is" without any warranties.
        </p>

        <h2 className="text-2xl font-bold mt-8">3. User Responsibilities</h2>
        <p>
          You are solely responsible for the files you process using our service. You agree not to use our service for any illegal or unauthorized purpose. You must not, in the use of the service, violate any laws in your jurisdiction.
        </p>

        <h2 className="text-2xl font-bold mt-8">4. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property of ShrinkWrap and its licensors.
        </p>

        <h2 className="text-2xl font-bold mt-8">5. Limitation of Liability</h2>
        <p>
          In no event shall ShrinkWrap, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the aervice.
        </p>

        <h2 className="text-2xl font-bold mt-8">6. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-bold mt-8">7. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
        </p>

        <h2 className="text-2xl font-bold mt-8">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}
