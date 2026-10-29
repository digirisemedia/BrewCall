import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ArrowLeft, Coffee } from 'lucide-react';

export default function TermsPage() {
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
            {t('footer.terms')}
          </h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: January 2024 | Effective in the Kingdom of Morocco</p>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using BrewCall ("Service"), you accept and agree to be bound by the terms and provision of this agreement. This Service is provided by BrewCall, registered in the Kingdom of Morocco, for use by coffee shop owners and operators ("Users"). By using this service, you comply with Moroccan law n° 09-08 relating to the protection of individuals with regard to the processing of personal data.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
              <p>BrewCall provides a SaaS platform that enables coffee shops to create digital menus, generate QR codes for tables, and manage real-time service requests from customers. The Service includes a customer-facing mobile interface and a staff management dashboard.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Subscription and Payment</h2>
              <p>The Service offers Free, Starter, and Pro subscription plans. Paid subscriptions are billed monthly. You may cancel your subscription at any time. Refunds are processed on a case-by-case basis. All prices are in Moroccan Dirhams (MAD) unless otherwise stated.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Acceptable Use</h2>
              <p>You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. You must not attempt to gain unauthorized access to any part of the Service or related systems.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Content and Data</h2>
              <p>You retain ownership of all content you upload to the Service, including menu items, images, and shop information. By using the Service, you grant us a license to host and display your content as necessary to provide the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Intellectual Property</h2>
              <p>The BrewCall name, logo, and all related trademarks are property of BrewCall. The Service is protected by copyright, trademark, and other laws. You may not copy, modify, or distribute any part of the Service without our written permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
              <p>BrewCall shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. Our total liability shall not exceed the amount paid by you in the last 12 months.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice, for any conduct that we believe violates these Terms or is harmful to other users. Upon termination, your right to use the Service will cease immediately.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes. Your continued use of the Service after changes constitutes acceptance of the new Terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">11. Governing Law</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Morocco. Any disputes shall be resolved in the courts of Casablanca, Morocco.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">12. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at legal@brewcall.com or through our contact page.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
