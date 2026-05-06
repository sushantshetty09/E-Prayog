import React, { createContext, useContext, useState, useCallback } from 'react';

export type Lang = 'en' | 'kn' | 'hi';

export interface Translations {
  // Navbar
  navHome: string; navTools: string; navAbout: string;
  navExperiments: string; navTutor: string; navDashboard: string;
  navLogin: string; navLogout: string; navProfile: string;
  // Home hero
  heroBadge: string; heroDesc: string;
  heroCta: string; heroCtaAi: string;
  // Home sections
  statsExperiments: string; statsSubjects: string; statsLabs: string; statsAi: string;
  subjectsHeading: string; subjectsSubheading: string; labsLabel: string;
  featuresHeading: string;
  feat1Title: string; feat1Desc: string;
  feat2Title: string; feat2Desc: string;
  feat3Title: string; feat3Desc: string;
  feat4Title: string; feat4Desc: string;
  feat5Title: string; feat5Desc: string;
  feat6Title: string; feat6Desc: string;
  ctaHeading: string; ctaSubheading: string; ctaBtn: string;
  // Tutor page
  tutorTitle: string; tutorSubtitle: string;
  tutorPlaceholder: string; tutorSend: string; tutorClear: string;
  tutorWelcome: string; tutorDisclaimer: string;
  tutorQ1: string; tutorQ2: string; tutorQ3: string;
  tutorQ4: string; tutorQ5: string; tutorQ6: string;
  // AI Floating
  aiGreeting: string; aiGreetingLab: string; aiGeneral: string;
  aiAskPlaceholder: string; aiAskLabPlaceholder: string;
  aiDisclaimer: string; aiError: string; aiRateLimit: string;
}

const T: Record<Lang, Translations> = {
  en: {
    navHome: 'Home', navTools: 'Tools', navAbout: 'About',
    navExperiments: 'Experiments', navTutor: 'AI Tutor', navDashboard: 'Dashboard',
    navLogin: 'Log In', navLogout: 'Log Out', navProfile: 'Profile',
    heroBadge: '✦ Karnataka PUC Virtual Science Lab',
    heroDesc: '42 interactive virtual science experiments for Karnataka PUC students. Powered by AI, built with Canvas & SVG — learn by doing, digitally.',
    heroCta: 'Explore Labs →', heroCtaAi: 'AI Tutor',
    statsExperiments: 'Experiments', statsSubjects: 'Subjects', statsLabs: 'Karnataka PUC Labs', statsAi: 'AI Powered',
    subjectsHeading: '5 Subjects, 42 Labs',
    subjectsSubheading: 'Every experiment aligned with the Karnataka Pre-University Course curriculum.',
    labsLabel: 'Labs',
    featuresHeading: 'Why E-Prayog?',
    feat1Title: 'Interactive 2D Simulations', feat1Desc: 'Rich Canvas & SVG labs for every experiment — no 3D required.',
    feat2Title: 'AI Lab Tutor', feat2Desc: 'Context-aware Gemini AI that knows your current experiment.',
    feat3Title: 'Karnataka PUC Syllabus', feat3Desc: 'Every lab aligned with 1st and 2nd PUC curriculum.',
    feat4Title: 'Real-time Calculations', feat4Desc: 'Live physics engine with error analysis and graphing.',
    feat5Title: 'Mobile Responsive', feat5Desc: 'Learn on any device — phone, tablet, or laptop.',
    feat6Title: 'Viva Questions', feat6Desc: 'Prepare for practical exams with curated viva Q&A.',
    ctaHeading: 'Ready to experiment?', ctaSubheading: 'Start your virtual lab journey — no chemicals, no equipment, just learning.', ctaBtn: 'Start Learning →',
    tutorTitle: 'AI Lab Tutor', tutorSubtitle: 'Powered by Gemini AI • Karnataka PUC Syllabus',
    tutorPlaceholder: 'Ask anything about Karnataka PUC Science...', tutorSend: 'Send', tutorClear: 'Clear chat',
    tutorWelcome: 'Namaskara! 🙏 I am your E-Prayog AI Tutor. Ask me anything about your Karnataka PUC Science practicals — Physics, Chemistry, Biology, Math, or Computer Science.',
    tutorDisclaimer: '✦ Powered by Gemini AI — always verify important information',
    tutorQ1: "What is Ohm's Law?", tutorQ2: 'Explain photosynthesis', tutorQ3: 'What is the mirror formula?',
    tutorQ4: 'Difference between mitosis and meiosis', tutorQ5: 'What is Wheatstone bridge?', tutorQ6: 'Explain acid-base titration',
    aiGreeting: "👋 Namaskara! I'm your E-Prayog AI Tutor. Ask me about any Karnataka PUC experiment!",
    aiGreetingLab: "👋 Namaskara! I see you're working on **{lab}** ({subject}). Ask me anything about this experiment!",
    aiGeneral: 'Gemini AI • General mode',
    aiAskPlaceholder: 'Ask about any experiment…', aiAskLabPlaceholder: 'Ask about {lab}…',
    aiDisclaimer: '✦ Powered by Gemini AI — verify important info',
    aiError: '⚠️ Connection issue. Please try again.', aiRateLimit: '⚠️ Rate limit exceeded. Please wait a minute.',
  },

  kn: {
    navHome: 'ಮುಖಪುಟ', navTools: 'ಪರಿಕರಗಳು', navAbout: 'ಬಗ್ಗೆ',
    navExperiments: 'ಪ್ರಯೋಗಗಳು', navTutor: 'AI ಶಿಕ್ಷಕ', navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navLogin: 'ಲಾಗಿನ್', navLogout: 'ಲಾಗ್ ಔಟ್', navProfile: 'ಪ್ರೊಫೈಲ್',
    heroBadge: '✦ ಕರ್ನಾಟಕ PUC ವರ್ಚುವಲ್ ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ',
    heroDesc: 'ಕರ್ನಾಟಕ PUC ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ 42 ಸಂವಾದಾತ್ಮಕ ವರ್ಚುವಲ್ ವಿಜ್ಞಾನ ಪ್ರಯೋಗಗಳು. AI ಮತ್ತು Canvas & SVG ನಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ — ಡಿಜಿಟಲ್ ರೀತಿಯಲ್ಲಿ ಕಲಿಯಿರಿ.',
    heroCta: 'ಪ್ರಯೋಗಾಲಯ ನೋಡಿ →', heroCtaAi: 'AI ಶಿಕ್ಷಕ',
    statsExperiments: 'ಪ್ರಯೋಗಗಳು', statsSubjects: 'ವಿಷಯಗಳು', statsLabs: 'ಕರ್ನಾಟಕ PUC ಲ್ಯಾಬ್ಸ್', statsAi: 'AI ಚಾಲಿತ',
    subjectsHeading: '5 ವಿಷಯಗಳು, 42 ಪ್ರಯೋಗಗಳು',
    subjectsSubheading: 'ಕರ್ನಾಟಕ ಪದವಿಪೂರ್ವ ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಹೊಂದಿಕೊಂಡ ಪ್ರತಿ ಪ್ರಯೋಗ.',
    labsLabel: 'ಪ್ರಯೋಗಗಳು',
    featuresHeading: 'ಇ-ಪ್ರಯೋಗ ಏಕೆ?',
    feat1Title: 'ಸಂವಾದಾತ್ಮಕ 2D ಸಿಮ್ಯುಲೇಷನ್', feat1Desc: 'ಪ್ರತಿ ಪ್ರಯೋಗಕ್ಕೂ ಸಮೃದ್ಧ Canvas & SVG ಲ್ಯಾಬ್‌ಗಳು.',
    feat2Title: 'AI ಪ್ರಯೋಗಾಲಯ ಶಿಕ್ಷಕ', feat2Desc: 'ನಿಮ್ಮ ಪ್ರಯೋಗ ತಿಳಿದ Gemini AI ಸಹಾಯಕ.',
    feat3Title: 'ಕರ್ನಾಟಕ PUC ಪಠ್ಯಕ್ರಮ', feat3Desc: '1ನೇ ಮತ್ತು 2ನೇ PUC ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಹೊಂದಿಕೊಂಡ ಪ್ರಯೋಗಗಳು.',
    feat4Title: 'ರಿಯಲ್-ಟೈಮ್ ಲೆಕ್ಕಾಚಾರ', feat4Desc: 'ದೋಷ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಗ್ರಾಫಿಂಗ್ ಸಹಿತ ಭೌತಶಾಸ್ತ್ರ ಎಂಜಿನ್.',
    feat5Title: 'ಮೊಬೈಲ್ ಸ್ನೇಹಿ', feat5Desc: 'ಯಾವುದೇ ಸಾಧನದಲ್ಲಿ ಕಲಿಯಿರಿ — ಫೋನ್, ಟ್ಯಾಬ್ಲೆಟ್ ಅಥವಾ ಲ್ಯಾಪ್‌ಟಾಪ್.',
    feat6Title: 'ವಿವಾ ಪ್ರಶ್ನೆಗಳು', feat6Desc: 'ಆಯ್ದ ವಿವಾ Q&A ನೊಂದಿಗೆ ಪ್ರಾಯೋಗಿಕ ಪರೀಕ್ಷೆಗೆ ಸಿದ್ಧರಾಗಿ.',
    ctaHeading: 'ಪ್ರಯೋಗ ಮಾಡಲು ಸಿದ್ಧರಾ?', ctaSubheading: 'ವರ್ಚುವಲ್ ಲ್ಯಾಬ್ ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ — ರಾಸಾಯನಿಕ ಇಲ್ಲ, ಉಪಕರಣ ಇಲ್ಲ, ಕೇವಲ ಕಲಿಕೆ.', ctaBtn: 'ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ →',
    tutorTitle: 'AI ಪ್ರಯೋಗಾಲಯ ಶಿಕ್ಷಕ', tutorSubtitle: 'Gemini AI ಚಾಲಿತ • ಕರ್ನಾಟಕ PUC ಪಠ್ಯಕ್ರಮ',
    tutorPlaceholder: 'ಕರ್ನಾಟಕ PUC ವಿಜ್ಞಾನದ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...', tutorSend: 'ಕಳುಹಿಸಿ', tutorClear: 'ಚಾಟ್ ಅಳಿಸಿ',
    tutorWelcome: 'ನಮಸ್ಕಾರ! 🙏 ನಾನು ನಿಮ್ಮ ಇ-ಪ್ರಯೋಗ AI ಶಿಕ್ಷಕ. ಕರ್ನಾಟಕ PUC ವಿಜ್ಞಾನ ಪ್ರಾಯೋಗಿಕ — ಭೌತಶಾಸ್ತ್ರ, ರಸಾಯನಶಾಸ್ತ್ರ, ಜೀವಶಾಸ್ತ್ರ, ಗಣಿತ ಅಥವಾ ಕಂಪ್ಯೂಟರ್ ವಿಜ್ಞಾನ — ಏನಾದರೂ ಕೇಳಿ!',
    tutorDisclaimer: '✦ Gemini AI ಚಾಲಿತ — ಮಹತ್ವದ ಮಾಹಿತಿಯನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ',
    tutorQ1: "ಓಮ್ ನಿಯಮ ಏನು?", tutorQ2: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ವಿವರಿಸಿ', tutorQ3: 'ದರ್ಪಣ ಸೂತ್ರ ಏನು?',
    tutorQ4: 'ಮೈಟೋಸಿಸ್ ಮತ್ತು ಮಿಯೋಸಿಸ್ ವ್ಯತ್ಯಾಸ', tutorQ5: 'ವೀಟ್‌ಸ್ಟೋನ್ ಬ್ರಿಜ್ ತತ್ತ್ವ', tutorQ6: 'ಆಮ್ಲ-ಕ್ಷಾರ ಅನುಮಾಪನ ವಿವರಿಸಿ',
    aiGreeting: "👋 ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಇ-ಪ್ರಯೋಗ AI ಶಿಕ್ಷಕ. ಯಾವುದೇ ಕರ್ನಾಟಕ PUC ಪ್ರಯೋಗದ ಬಗ್ಗೆ ಕೇಳಿ!",
    aiGreetingLab: "👋 ನಮಸ್ಕಾರ! ನೀವು **{lab}** ({subject}) ಮೇಲೆ ಕೆಲಸ ಮಾಡುತ್ತಿರುವಿರಿ. ಈ ಪ್ರಯೋಗದ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ!",
    aiGeneral: 'Gemini AI • ಸಾಮಾನ್ಯ ಮೋಡ್',
    aiAskPlaceholder: 'ಯಾವುದೇ ಪ್ರಯೋಗದ ಬಗ್ಗೆ ಕೇಳಿ…', aiAskLabPlaceholder: '{lab} ಬಗ್ಗೆ ಕೇಳಿ…',
    aiDisclaimer: '✦ Gemini AI ಚಾಲಿತ — ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಿ',
    aiError: '⚠️ ಸಂಪರ್ಕ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', aiRateLimit: '⚠️ ದರ ಮಿತಿ ಮೀರಿದೆ. ದಯವಿಟ್ಟು ಒಂದು ನಿಮಿಷ ಕಾಯಿರಿ.',
  },

  hi: {
    navHome: 'होम', navTools: 'टूल्स', navAbout: 'बारे में',
    navExperiments: 'प्रयोग', navTutor: 'AI शिक्षक', navDashboard: 'डैशबोर्ड',
    navLogin: 'लॉग इन', navLogout: 'लॉग आउट', navProfile: 'प्रोफ़ाइल',
    heroBadge: '✦ कर्नाटक PUC वर्चुअल साइंस लैब',
    heroDesc: 'कर्नाटक PUC छात्रों के लिए 42 इंटरेक्टिव वर्चुअल विज्ञान प्रयोग। AI, Canvas & SVG द्वारा संचालित — डिजिटल तरीके से सीखें।',
    heroCta: 'लैब देखें →', heroCtaAi: 'AI शिक्षक',
    statsExperiments: 'प्रयोग', statsSubjects: 'विषय', statsLabs: 'कर्नाटक PUC लैब्स', statsAi: 'AI संचालित',
    subjectsHeading: '5 विषय, 42 लैब्स',
    subjectsSubheading: 'कर्नाटक प्री-यूनिवर्सिटी पाठ्यक्रम के अनुसार हर प्रयोग।',
    labsLabel: 'लैब्स',
    featuresHeading: 'E-Prayog क्यों?',
    feat1Title: 'इंटरेक्टिव 2D सिमुलेशन', feat1Desc: 'हर प्रयोग के लिए Canvas & SVG लैब्स।',
    feat2Title: 'AI लैब शिक्षक', feat2Desc: 'आपके वर्तमान प्रयोग को जानने वाला Gemini AI।',
    feat3Title: 'कर्नाटक PUC पाठ्यक्रम', feat3Desc: '1st और 2nd PUC पाठ्यक्रम के अनुसार हर लैब।',
    feat4Title: 'रियल-टाइम गणना', feat4Desc: 'त्रुटि विश्लेषण और ग्राफिंग के साथ लाइव इंजन।',
    feat5Title: 'मोबाइल फ्रेंडली', feat5Desc: 'किसी भी डिवाइस पर सीखें — फोन, टैबलेट या लैपटॉप।',
    feat6Title: 'वाइवा प्रश्न', feat6Desc: 'चुने हुए Q&A से प्रैक्टिकल परीक्षा की तैयारी करें।',
    ctaHeading: 'प्रयोग के लिए तैयार?', ctaSubheading: 'वर्चुअल लैब यात्रा शुरू करें — कोई रसायन नहीं, कोई उपकरण नहीं, बस सीखना।', ctaBtn: 'सीखना शुरू करें →',
    tutorTitle: 'AI लैब शिक्षक', tutorSubtitle: 'Gemini AI द्वारा संचालित • कर्नाटक PUC पाठ्यक्रम',
    tutorPlaceholder: 'कर्नाटक PUC विज्ञान के बारे में कुछ भी पूछें...', tutorSend: 'भेजें', tutorClear: 'चैट साफ करें',
    tutorWelcome: 'नमस्कार! 🙏 मैं आपका E-Prayog AI शिक्षक हूँ। कर्नाटक PUC विज्ञान प्रैक्टिकल के बारे में — भौतिकी, रसायन, जीव विज्ञान, गणित या कंप्यूटर विज्ञान — कुछ भी पूछें!',
    tutorDisclaimer: '✦ Gemini AI द्वारा संचालित — महत्वपूर्ण जानकारी हमेशा सत्यापित करें',
    tutorQ1: "ओम का नियम क्या है?", tutorQ2: 'प्रकाश संश्लेषण समझाएं', tutorQ3: 'दर्पण सूत्र क्या है?',
    tutorQ4: 'माइटोसिस और मेयोसिस में अंतर', tutorQ5: 'व्हीटस्टोन ब्रिज का सिद्धांत', tutorQ6: 'अम्ल-क्षार अनुमापन समझाएं',
    aiGreeting: "👋 नमस्कार! मैं आपका E-Prayog AI शिक्षक हूँ। किसी भी कर्नाटक PUC प्रयोग के बारे में पूछें!",
    aiGreetingLab: "👋 नमस्कार! आप **{lab}** ({subject}) पर काम कर रहे हैं। इस प्रयोग के बारे में कुछ भी पूछें!",
    aiGeneral: 'Gemini AI • सामान्य मोड',
    aiAskPlaceholder: 'किसी भी प्रयोग के बारे में पूछें…', aiAskLabPlaceholder: '{lab} के बारे में पूछें…',
    aiDisclaimer: '✦ Gemini AI द्वारा संचालित — जानकारी सत्यापित करें',
    aiError: '⚠️ कनेक्शन समस्या। कृपया पुनः प्रयास करें।', aiRateLimit: '⚠️ दर सीमा पार हो गई। कृपया एक मिनट प्रतीक्षा करें।',
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en', setLang: () => {}, t: T.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('eprayog-lang')) as Lang | null;
  const [lang, setLangState] = useState<Lang>(stored ?? 'en');
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('eprayog-lang', l);
  }, []);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
export { T };
