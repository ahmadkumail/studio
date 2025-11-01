
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the Terms and Conditions for using ShrinkWrap. Understand your rights and responsibilities when using our free, on-device file compression service.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="prose prose-lg mx-auto text-foreground">
        <h1 className="text-4xl font-extrabold text-center mb-8">Terms & Conditions</h1>
        
        <p className="text-muted-foreground text-center mb-12">Last updated: September 22, 2025</p>

        <h2 className="text-2xl font-bold mt-8">1. Agreement to Terms</h2>
        <p>
          By accessing or using our service, ShrinkWrap ("the Service"), you agree to be bound by these Terms & Conditions ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8">2. Description of Service</h2>
        <p>
          ShrinkWrap is a free, web-based tool that compresses image files. A core feature of our Service is that all file processing is performed locally in your web browser. <strong>No files, images, or user data are ever uploaded to, processed by, or stored on our servers.</strong> The Service is provided on an "as is" and "as available" basis without any warranties, express or implied.
        </p>

        <h2 className="text-2xl font-bold mt-8">3. User Responsibilities and Conduct</h2>
        <p>
          You are solely responsible for the content of the files you process using our Service. You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You must not use the Service to process any files that infringe upon the intellectual property rights of others or violate any laws in your jurisdiction.
        </p>

        <h2 className="text-2xl font-bold mt-8">4. Intellectual Property</h2>
        <p>
          The Service and all its original content (excluding any data you process), features, and functionality are and will remain the exclusive property of ShrinkWrap and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
        </p>

        <h2 className="text-2xl font-bold mt-8">5. Disclaimer and Limitation of Liability</h2>
        <p>
          Your use of the Service is at your sole risk. ShrinkWrap does not warrant that the results of using the service will be accurate, reliable, or meet your requirements.
        </p>
        <p>
          In no event shall ShrinkWrap, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; or (ii) any bugs, viruses, or other harmful code that may be transmitted through the service by any third party.
        </p>
        
        <h2 className="text-2xl font-bold mt-8">6. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-bold mt-8">7. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by updating the "Last updated" date on this page. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2 className="text-2xl font-bold mt-8">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}
