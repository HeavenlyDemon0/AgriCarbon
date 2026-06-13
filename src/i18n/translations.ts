export type Language = 'en' | 'te' | 'ta';

const translations: Record<string, Record<Language, string>> = {
  // ── Nav ──
  'nav.home': { en: 'Home', te: 'హోమ్', ta: 'முகப்பு' },
  'nav.farm': { en: 'Farm', te: 'పొలం', ta: 'பண்ணை' },
  'nav.plan': { en: 'Plan', te: 'ప్లాన్', ta: 'திட்டம்' },
  'nav.wallet': { en: 'Wallet', te: 'వాలెట్', ta: 'பணப்பை' },
  'nav.more': { en: 'More', te: 'మరిన్ని', ta: 'மேலும்' },

  // ── Landing ──
  'landing.headline': {
    en: 'Turn your soil into income while saving the planet',
    te: 'మీ నేలను ఆదాయంగా మార్చండి, భూమిని కాపాడండి',
    ta: 'உங்கள் மண்ணை வருமானமாக மாற்றுங்கள், பூமியை காப்பாற்றுங்கள்'
  },
  'landing.subtext': {
    en: 'Earn carbon credits, get smart farming advice, and protect your harvest — all in one app.',
    te: 'కార్బన్ క్రెడిట్లు సంపాదించండి, తెలివైన వ్యవసాయ సలహాలు పొందండి.',
    ta: 'கார்பன் கிரெடிட்கள் பெறுங்கள், அறிவார்ந்த விவசாய ஆலோசனை பெறுங்கள்.'
  },
  'landing.getStarted': { en: 'Get Started', te: 'ప్రారంభించండి', ta: 'தொடங்குங்கள்' },
  'landing.seeDemo': { en: 'See Demo', te: 'డెమో చూడండి', ta: 'டெமோ பாருங்கள்' },
  'landing.benefit1.title': { en: 'Carbon Credits', te: 'కార్బన్ క్రెడిట్స్', ta: 'கார்பன் கிரெடிட்கள்' },
  'landing.benefit1.desc': { en: 'Earn money from sustainable farming practices', te: 'సుస్థిర వ్యవసాయం ద్వారా డబ్బు సంపాదించండి', ta: 'நிலையான விவசாயத்தின் மூலம் பணம் சம்பாதியுங்கள்' },
  'landing.benefit2.title': { en: 'Smart Action Plan', te: 'స్మార్ట్ ప్లాన్', ta: 'ஸ்மார்ட் திட்டம்' },
  'landing.benefit2.desc': { en: 'AI-powered daily recommendations for your farm', te: 'మీ పొలానికి AI సూచనలు', ta: 'உங்கள் பண்ணைக்கான AI பரிந்துரைகள்' },
  'landing.benefit3.title': { en: 'Weather Alerts', te: 'వాతావరణ హెచ్చరికలు', ta: 'வானிலை எச்சரிக்கைகள்' },
  'landing.benefit3.desc': { en: 'Stay protected with real-time weather updates', te: 'రియల్-టైమ్ వాతావరణ అప్‌డేట్‌లతో రక్షించబడండి', ta: 'நிகழ்நேர வானிலை புதுப்பிப்புகளுடன் பாதுகாப்பாக இருங்கள்' },

  // ── Auth ──
  'auth.signIn': { en: 'Sign In', te: 'సైన్ ఇన్', ta: 'உள்நுழையவும்' },
  'auth.email': { en: 'Email or Phone', te: 'ఇమెయిల్ లేదా ఫోన్', ta: 'மின்னஞ்சல் அல்லது தொலைபேசி' },
  'auth.password': { en: 'Password', te: 'పాస్‌వర్డ్', ta: 'கடவுச்சொல்' },
  'auth.forgot': { en: 'Forgot Password?', te: 'పాస్‌వర్డ్ మర్చిపోయారా?', ta: 'கடவுச்சொல் மறந்துவிட்டதா?' },
  'auth.noAccount': { en: "Don't have an account?", te: 'ఖాతా లేదా?', ta: 'கணக்கு இல்லையா?' },
  'auth.signUp': { en: 'Sign Up', te: 'సైన్ అప్', ta: 'பதிவு செய்' },
  'auth.welcome': { en: 'Welcome, Farmer!', te: 'స్వాగతం, రైతు!', ta: 'வணக்கம், விவசாயி!' },

  // ── Dashboard ──
  'dash.greeting': { en: 'Hello', te: 'నమస్కారం', ta: 'வணக்கம்' },
  'dash.weather': { en: 'Weather Alert', te: 'వాతావరణ హెచ్చరిక', ta: 'வானிலை எச்சரிக்கை' },
  'dash.today': { en: "Today's Plan", te: 'ఈ రోజు ప్లాన్', ta: 'இன்றைய திட்டம்' },
  'dash.thisWeek': { en: 'This Week', te: 'ఈ వారం', ta: 'இந்த வாரம்' },
  'dash.thisSeason': { en: 'This Season', te: 'ఈ సీజన్', ta: 'இந்த பருவம்' },
  'dash.wallet': { en: 'Carbon Wallet', te: 'కార్బన్ వాలెట్', ta: 'கார்பன் பணப்பை' },
  'dash.viewWallet': { en: 'View Wallet', te: 'వాలెట్ చూడండి', ta: 'பணப்பை பார்க்கவும்' },
  'dash.uploadPhoto': { en: 'Upload Photo', te: 'ఫోటో అప్‌లోడ్', ta: 'புகைப்படம் பதிவேற்று' },
  'dash.report': { en: 'Download Report', te: 'రిపోర్ట్ డౌన్‌లోడ్', ta: 'அறிக்கை பதிவிறக்கம்' },
  'dash.impact': { en: 'Impact Summary', te: 'ప్రభావ సారాంశం', ta: 'தாக்க சுருக்கம்' },
  'dash.credits': { en: 'Credits Earned', te: 'సంపాదించిన క్రెడిట్లు', ta: 'பெற்ற கிரெடிட்கள்' },
  'dash.photoVerify': { en: 'Photo Verify', te: 'ఫోటో వెరిఫై', ta: 'புகைப்பட சரிபார்ப்பு' },

  // ── Plan ──
  'plan.markDone': { en: 'Mark Done ✓', te: 'పూర్తయింది ✓', ta: 'முடிந்தது ✓' },
  'plan.notNow': { en: 'Not Now', te: 'ఇప్పుడు కాదు', ta: 'இப்போது வேண்டாம்' },
  'plan.why': { en: 'Why this matters', te: 'ఇది ఎందుకు ముఖ్యం', ta: 'இது ஏன் முக்கியம்' },
  'plan.cost': { en: 'Cost', te: 'ఖర్చు', ta: 'செலவு' },
  'plan.benefit': { en: 'Benefit', te: 'లాభం', ta: 'நன்மை' },
  'plan.risk': { en: 'Risk', te: 'రిస్క్', ta: 'ஆபத்து' },
  'plan.viewDetails': { en: 'View Details', te: 'వివరాలు చూడండి', ta: 'விவரங்கள் பாருங்கள்' },

  // ── Wallet ──
  'wallet.earned': { en: 'Earned', te: 'సంపాదించినవి', ta: 'சம்பாதித்தவை' },
  'wallet.pending': { en: 'Pending', te: 'పెండింగ్', ta: 'நிலுவை' },
  'wallet.redeemed': { en: 'Redeemed', te: 'రిడీమ్ చేసినవి', ta: 'மீட்கப்பட்டவை' },

  // ── Verification ──
  'verify.title': { en: 'Verify Practice', te: 'ప్రాక్టీస్ వెరిఫై', ta: 'நடைமுறை சரிபார்ப்பு' },
  'verify.upload': { en: 'Upload Photo', te: 'ఫోటో అప్‌లోడ్', ta: 'புகைப்படம் பதிவேற்று' },
  'verify.voice': { en: 'Voice Confirm', te: 'వాయిస్ కన్ఫర్మ్', ta: 'குரல் உறுதிப்படுத்தல்' },
  'verify.practice': { en: 'Practice Type', te: 'ప్రాక్టీస్ రకం', ta: 'நடைமுறை வகை' },
  'verify.submit': { en: 'Submit', te: 'సబ్మిట్', ta: 'சமர்ப்பிக்கவும்' },
  'verify.success': { en: 'Submitted Successfully! 🎉', te: 'విజయవంతంగా సబ్మిట్ అయింది! 🎉', ta: 'வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! 🎉' },

  // ── Common ──
  'common.back': { en: 'Back', te: 'వెనుకకు', ta: 'பின்னால்' },
  'common.close': { en: 'Close', te: 'మూసివేయండి', ta: 'மூடு' },
  'common.before': { en: 'Before', te: 'ముందు', ta: 'முன்' },
  'common.after': { en: 'After', te: 'తర్వాత', ta: 'பின்' },
  'common.share': { en: 'Share', te: 'షేర్', ta: 'பகிர்' },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}

export const languageNames: Record<Language, string> = {
  en: 'EN',
  te: 'తెలుగు',
  ta: 'தமிழ்',
};
