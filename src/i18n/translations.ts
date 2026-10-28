export type Language = 'en' | 'fr' | 'ar';

export const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧', dir: 'ltr' as const },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷', dir: 'ltr' as const },
  { code: 'ar' as Language, name: 'العربية', flag: '🇲🇦', dir: 'rtl' as const },
];

export const translations = {
  en: {
    'login.welcome': 'Welcome back',
    'login.subtitle': 'Sign in to your BrewCall account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signIn': 'Sign In',
    'login.backHome': 'Back to home',
    'login.invalid': 'Invalid email or password',
    'login.quickDemo': 'Quick Demo Access',
    'register.continueGoogle': 'Continue with Google',
    'register.continueApple': 'Continue with Apple',
    'register.or': 'or',
    'register.haveAccount': "Don't have an account?",
    'register.createAccount': 'Create Account',
    'landing.shopOwner': 'Shop Owner',
    'currency.symbol': 'MAD',
  },
  fr: {
    'login.welcome': 'Bon retour',
    'login.subtitle': 'Connectez-vous à votre compte BrewCall',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.signIn': 'Se Connecter',
    'login.backHome': 'Retour',
    'login.invalid': 'Email ou mot de passe invalide',
    'login.quickDemo': 'Accès Démo',
    'register.continueGoogle': 'Continuer avec Google',
    'register.continueApple': 'Continuer avec Apple',
    'register.or': 'ou',
    'register.haveAccount': "Pas encore de compte ?",
    'register.createAccount': 'Créer un Compte',
    'landing.shopOwner': 'Propriétaire',
    'currency.symbol': 'DH',
  },
  ar: {
    'login.welcome': 'مرحباً بعودتك',
    'login.subtitle': 'سجل دخولك إلى حساب BrewCall',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.signIn': 'دخول',
    'login.backHome': 'العودة',
    'login.invalid': 'بريد أو كلمة مرور غير صحيحة',
    'login.quickDemo': 'وصول تجريبي',
    'register.continueGoogle': 'المتابعة مع Google',
    'register.continueApple': 'المتابعة مع Apple',
    'register.or': 'أو',
    'register.haveAccount': 'ليس لديك حساب؟',
    'register.createAccount': 'إنشاء حساب',
    'landing.shopOwner': 'صاحب المقهى',
    'currency.symbol': 'د.م',
  },
};

export type TranslationKey = keyof typeof translations.en;
