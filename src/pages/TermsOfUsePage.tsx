import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ArrowLeft, Coffee } from 'lucide-react';

export default function TermsOfUsePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 gradient-mesh opacity-30"></div>
      
      <nav className="relative z-50 max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            BrewCall
          </span>
        </Link>
        <LanguageSwitcher />
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('login.backHome')}
        </Link>

        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('footer.termsOfUse')}
          </h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: January 2024</p>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the BrewCall platform ("Service"), you agree to be bound by these Terms of Use. If you disagree with any part of the terms, you may not access the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
              <p>BrewCall provides a digital menu and waiter call system for coffee shops and restaurants. The Service includes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Digital menu creation and management</li>
                <li>QR code generation for tables</li>
                <li>Real-time waiter call system</li>
                <li>Order management dashboard</li>
                <li>Analytics and reporting tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. User Accounts</h2>
              <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
              <p className="mt-2">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are and will remain the exclusive property of BrewCall and its licensors. The Service is protected by copyright, trademark, and other laws of both Morocco and foreign countries.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. User Content</h2>
              <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, images, and other material ("User Content"). You are responsible for the User Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
              <p className="mt-2">By posting User Content on or through the Service, you represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>The User Content is yours (you own it) or you have the right to use it</li>
                <li>The User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Prohibited Uses</h2>
              <p>You may not use the Service:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation</li>
                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Payment Terms</h2>
              <p>If you purchase any products or services through the Service, you agree to pay all fees at the prices in effect for your purchases. You are responsible for all applicable taxes.</p>
              <p className="mt-2">The Company reserves the right to change its pricing at any time. All pricing changes will be effective upon posting to the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <p className="mt-2">Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using our Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Limitation of Liability</h2>
              <p>In no event shall BrewCall, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of Morocco, without regard to its conflict of law provisions.</p>
              <p className="mt-2">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">11. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
              <p className="mt-2">What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">12. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <ul className="list-none pl-0 space-y-2 mt-2">
                <li>Email: <a href="mailto:contact@brewcallapp.com" className="text-violet-400 hover:text-violet-300">contact@brewcallapp.com</a></li>
                <li>Address: Agdal, Rabat, Morocco</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
