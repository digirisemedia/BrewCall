import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ArrowLeft, Coffee } from 'lucide-react';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 gradient-mesh opacity-30"></div>
      
      <nav className="relative z-50 max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">BrewCall</span>
        </Link>
        <LanguageSwitcher />
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('register.backHome')}
        </Link>

        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('footer.privacy')}
          </h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: January 2024 | Compliant with Moroccan Law 09-08</p>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
              <p>BrewCall ("we," "our," or "us") is committed to protecting your privacy in accordance with Moroccan Law n° 09-08 relating to the protection of individuals with regard to the processing of personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our SaaS platform for coffee shop management. We are registered with the CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
              <p><strong className="text-white">Personal Data:</strong> When you register, we collect your name, email address, and password. For coffee shop accounts, we also collect your shop name, address, phone number, and menu information.</p>
              <p className="mt-2"><strong className="text-white">Usage Data:</strong> We automatically collect information about how you use the Service, including IP addresses, browser type, device information, and interaction data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Provide, maintain, and improve the Service</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Data Storage and Security</h2>
              <p>Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
              <p>We do not sell your personal information. We may share your data with third-party service providers who assist us in operating the Service, subject to confidentiality agreements. We may also disclose data when required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. You may also request a copy of your data or object to certain processing activities. To exercise these rights, contact us at privacy@brewcall.com.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies are required for the Service to function properly.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Data Retention</h2>
              <p>We retain your personal data for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Children's Privacy</h2>
              <p>The Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If we discover that a child has provided us with personal data, we will delete it immediately.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. International Transfers</h2>
              <p>Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through the Service. Your continued use constitutes acceptance of the updated policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">12. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact our Data Protection Officer at privacy@brewcall.com or through our contact page.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
