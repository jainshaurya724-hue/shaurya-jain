/* ============================================================
   SMART BHARAT — script.js
   Modules:
   1.  i18n (English / Hindi toggle)
   2.  Loader
   3.  Theme toggle
   4.  Sticky nav
   5.  Mobile menu
   6.  Smooth scroll
   7.  Scroll reveal
   8.  Active nav link
   9.  Animated counters
   10. Services Finder (data + filter + search)
   11. Scheme Recommender
   12. Document Requirement Checker
   13. Report Civic Issue form
   14. Complaint Status Tracker
   15. Emergency Contacts
   16. FAQ accordion
   17. AI Chat Modal
   18. Floating chat button
   19. Back to top
   20. Toast utility
   ============================================================ */

'use strict';

/* ─── DATA ──────────────────────────────────────────────── */

/* Government Services */
const SERVICES = [
  { id:'aadhar',   cat:'identity', icon:'🪪', name:'Aadhaar Card',        desc:'Apply, update or download your Aadhaar card from UIDAI.', link:'https://uidai.gov.in' },
  { id:'passport', cat:'identity', icon:'📘', name:'Passport',            desc:'Apply for a new passport or renew your existing one.', link:'https://passportindia.gov.in' },
  { id:'voter',    cat:'identity', icon:'🗳️', name:'Voter ID Card',       desc:'Register, update or download your Voter ID card.', link:'https://voterportal.eci.gov.in' },
  { id:'pan',      cat:'finance',  icon:'💳', name:'PAN Card',            desc:'Apply for a new PAN or make corrections to existing PAN.', link:'https://incometaxindiaefiling.gov.in' },
  { id:'ration',   cat:'finance',  icon:'🌾', name:'Ration Card',         desc:'Apply for or update your ration card for subsidised food.', link:'https://nfsa.gov.in' },
  { id:'dl',       cat:'identity', icon:'🚗', name:'Driving Licence',     desc:'Apply, renew or update your driving licence online.', link:'https://parivahan.gov.in' },
  { id:'birth',    cat:'identity', icon:'👶', name:'Birth Certificate',   desc:'Apply for a birth certificate for newborns or corrections.', link:'https://crsorgi.gov.in' },
  { id:'income',   cat:'finance',  icon:'📄', name:'Income Certificate',  desc:'Get income certificate from your district office.', link:'https://serviceonline.gov.in' },
  { id:'caste',    cat:'identity', icon:'📋', name:'Caste Certificate',   desc:'Apply for OBC / SC / ST caste certificate online.', link:'https://serviceonline.gov.in' },
  { id:'esi',      cat:'health',   icon:'🏥', name:'ESI Card',            desc:'Apply for ESIC health insurance card for employees.', link:'https://esic.in' },
  { id:'ayushman', cat:'health',   icon:'💊', name:'Ayushman Bharat',     desc:'Check eligibility and get your PM-JAY health card.', link:'https://pmjay.gov.in' },
  { id:'scholar',  cat:'education',icon:'🎓', name:'National Scholarship', desc:'Apply for central and state government scholarships.', link:'https://scholarships.gov.in' },
  { id:'marks',    cat:'education',icon:'📝', name:'Board Marksheet',     desc:'Download authenticated marksheets from DigiLocker.', link:'https://digilocker.gov.in' },
  { id:'land',     cat:'property', icon:'🏡', name:'Land Records',        desc:'Check land ownership and mutation records online.', link:'https://bhulekh.gov.in' },
  { id:'patta',    cat:'property', icon:'📜', name:'Property Patta',      desc:'Apply for property title (patta) from revenue dept.', link:'https://serviceonline.gov.in' },
  { id:'msme',     cat:'finance',  icon:'🏭', name:'MSME Registration',   desc:'Register your small or medium enterprise under MSME.', link:'https://udyamregistration.gov.in' },
];

/* Government Schemes Database */
const SCHEMES = [
  { tag:'Agriculture', name:'PM-KISAN', desc:'₹6,000/year direct benefit transfer to farmer families.', eligibility:['farmer'], income:['bpl','1lakh','3lakh'], link:'https://pmkisan.gov.in' },
  { tag:'Education',   name:'PM Scholarship', desc:'Scholarships for children of ex-servicemen for professional courses.', eligibility:['student'], income:['bpl','1lakh','3lakh','6lakh'], link:'https://desw.gov.in' },
  { tag:'Health',      name:'Ayushman Bharat PM-JAY', desc:'Health insurance cover up to ₹5 lakh per family per year.', eligibility:['all'], income:['bpl','1lakh','3lakh'], link:'https://pmjay.gov.in' },
  { tag:'Housing',     name:'PM Awas Yojana', desc:'Affordable housing for urban and rural families below poverty line.', eligibility:['all'], income:['bpl','1lakh','3lakh'], link:'https://pmaymis.gov.in' },
  { tag:'Employment',  name:'MGNREGS',   desc:'100 days guaranteed wage employment per year for rural households.', eligibility:['all'], income:['bpl','1lakh','3lakh'], link:'https://nrega.nic.in' },
  { tag:'Women',       name:'Beti Bachao Beti Padhao', desc:'Government scheme to address declining child sex ratio and promote girls education.', eligibility:['female'], income:['all'], link:'https://wcd.nic.in' },
  { tag:'Pension',     name:'PM Vaya Vandana Yojana', desc:'Pension scheme for senior citizens giving guaranteed 7.4% return.', eligibility:['senior'], income:['all'], link:'https://licindia.in' },
  { tag:'Finance',     name:'PM Mudra Yojana', desc:'Loans up to ₹10 lakh to non-corporate small businesses.', eligibility:['business','selfemployed'], income:['all'], link:'https://mudra.org.in' },
  { tag:'Employment',  name:'PM Skill India', desc:'Free skill development training across 40+ sectors.', eligibility:['unemployed','student'], income:['all'], link:'https://skillindia.gov.in' },
  { tag:'Agriculture', name:'Fasal Bima Yojana', desc:'Crop insurance scheme to provide financial support to farmers from crop failure.', eligibility:['farmer'], income:['all'], link:'https://pmfby.gov.in' },
];

/* Document Requirements */
const DOC_SERVICES = [
  { id:'aadhaar',  icon:'🪪', name:'Aadhaar Card',
    docs:['Proof of Identity (Birth Certificate / PAN / Passport)', 'Proof of Address (Electricity Bill / Rent Agreement)', 'Mobile Number for OTP verification'],
    note:'Visit nearest Aadhaar Seva Kendra. Appointment can be booked at uidai.gov.in' },
  { id:'passport', icon:'📘', name:'Passport',
    docs:['Aadhaar Card', 'PAN Card or Birth Certificate', 'Address Proof (utility bill within 3 months)', 'Old Passport (for renewal)', '10th Marksheet (for date of birth proof)'],
    note:'Online application at passportindia.gov.in. Appointment required at PSK.' },
  { id:'voter',    icon:'🗳️', name:'Voter ID',
    docs:['Proof of Age (Aadhaar / Birth Certificate)', 'Proof of Residence (utility bill / bank statement)', '2 Passport size photographs'],
    note:'Apply online at voterportal.eci.gov.in or at nearest Electoral Registration Office.' },
  { id:'pan',      icon:'💳', name:'PAN Card',
    docs:['Proof of Identity (Aadhaar / Passport)', 'Proof of Address (Aadhaar / Utility Bill)', 'Proof of Date of Birth (Birth Certificate / Matriculation Certificate)', '2 Passport size photographs'],
    note:'Apply online at incometaxindiaefiling.gov.in. PAN delivered within 15 working days.' },
  { id:'ration',   icon:'🌾', name:'Ration Card',
    docs:['Aadhaar Card of all family members', 'Proof of Residence', 'Income Certificate', 'Bank Account Details', 'Passport size photographs'],
    note:'Apply at District Supply Office or online at your state food department portal.' },
  { id:'dl',       icon:'🚗', name:'Driving Licence',
    docs:['Aadhaar Card', 'Proof of Age (Birth Certificate / 10th Certificate)', 'Proof of Address', 'Medical Certificate (Form 1-A)', 'Existing Learner Licence (for permanent DL)'],
    note:'Apply at sarathi.parivahan.gov.in. Slot booking for driving test available online.' },
];

/* Emergency Contacts */
const EMERGENCY = [
  { icon:'🚨', name:'Police',         number:'100', desc:'Law & order emergencies', color:'#DC2626' },
  { icon:'🚑', name:'Ambulance',      number:'108', desc:'Medical emergencies', color:'#DC2626' },
  { icon:'🚒', name:'Fire Brigade',   number:'101', desc:'Fire & rescue services', color:'#EA580C' },
  { icon:'🆘', name:'Disaster Mgmt',  number:'108', desc:'National Disaster helpline', color:'#7C3AED' },
  { icon:'👩', name:'Women Helpline', number:'1091', desc:'Women in distress', color:'#BE185D' },
  { icon:'👧', name:'Child Helpline', number:'1098', desc:'Children in distress (CHILDLINE)', color:'#0369A1' },
  { icon:'💚', name:'Mental Health',  number:'iCall: 9152987821', desc:'Free mental health counselling', color:'#15803D' },
  { icon:'🏦', name:'Cyber Crime',    number:'1930', desc:'Online fraud & cyber crime', color:'#1D4ED8' },
  { icon:'🏥', name:'Health Helpline',number:'104',  desc:'Health advice & medicine info', color:'#0F766E' },
  { icon:'⚡', name:'Senior Citizen', number:'14567', desc:'Senior citizen helpline', color:'#B45309' },
  { icon:'🚂', name:'Railway',        number:'139',  desc:'Railway enquiry & emergency', color:'#7C3AED' },
  { icon:'✈️', name:'Air Emergency',  number:'112',  desc:'Universal emergency number', color:'#DC2626' },
];

/* Complaint Tracker Data */
const COMPLAINTS = {
  'SB2024-00123': {
    type: '🚧 Pothole / Road Damage', location: 'MG Road, Sector 15, Gurugram',
    status: 'resolved', submitted: '12 Jan 2025',
    timeline: [
      { icon:'📨', title:'Complaint Registered',     date:'12 Jan 2025, 10:30 AM', note:'Your complaint has been received and assigned ID SB2024-00123.', done:true },
      { icon:'🔍', title:'Under Review',             date:'13 Jan 2025, 2:00 PM',  note:'Complaint verified by ward officer.', done:true },
      { icon:'🛠️', title:'Work In Progress',         date:'16 Jan 2025, 9:00 AM',  note:'Road repair team assigned. Work started.', done:true },
      { icon:'✅', title:'Resolved',                 date:'20 Jan 2025, 5:00 PM',  note:'Pothole filled and road repaired. Issue closed.', done:true },
    ]
  },
  'SB2024-00456': {
    type: '💡 Street Light Not Working', location: 'Gandhi Nagar, Ward 7, Jaipur',
    status: 'progress', submitted: '18 Jan 2025',
    timeline: [
      { icon:'📨', title:'Complaint Registered',     date:'18 Jan 2025, 6:15 PM',  note:'Your complaint has been received and assigned ID SB2024-00456.', done:true },
      { icon:'🔍', title:'Under Review',             date:'19 Jan 2025, 11:00 AM', note:'Complaint verified by JDA.', done:true },
      { icon:'🛠️', title:'Work In Progress',         date:'22 Jan 2025, 8:30 AM',  note:'Electrician team assigned. Parts ordered.', done:true, current:true },
      { icon:'⏳', title:'Pending Resolution',        date:'Expected: 28 Jan 2025', note:'Parts expected to arrive shortly.', done:false },
    ]
  },
  'SB2024-00789': {
    type: '🗑️ Garbage Dumping', location: 'Nehru Park, Behind AIIMS, Delhi',
    status: 'pending', submitted: '25 Jan 2025',
    timeline: [
      { icon:'📨', title:'Complaint Registered',     date:'25 Jan 2025, 3:45 PM',  note:'Your complaint SB2024-00789 has been received.', done:true, current:true },
      { icon:'🔍', title:'Under Review',             date:'Pending',               note:'Awaiting assignment to ward sanitation officer.', done:false },
      { icon:'🛠️', title:'Action Planned',           date:'Pending',               note:'', done:false },
      { icon:'✅', title:'Resolution',               date:'Pending',               note:'', done:false },
    ]
  }
};

/* FAQ Data */
const FAQS = [
  { q:'How do I apply for an Aadhaar card?', a:'Visit your nearest Aadhaar Seva Kendra with proof of identity and address. You can book an appointment at uidai.gov.in. For children under 5, only Proof of Relationship with parents is required.' },
  { q:'What documents do I need for a passport?', a:'You need Aadhaar, PAN / Birth Certificate, address proof (utility bill within 3 months), and 2 passport size photos. For renewal, carry your old passport. Apply online at passportindia.gov.in and book a PSK appointment.' },
  { q:'How long does a Voter ID take?', a:'After successful submission on voterportal.eci.gov.in, the Voter ID is typically issued within 30 days. You will receive an SMS once it is dispatched or you can download the e-EPIC (digital voter card) immediately.' },
  { q:'What is PM-KISAN and who is eligible?', a:'PM-KISAN gives ₹6,000 per year in three instalments directly to farmer bank accounts. Any land-owning farmer family is eligible, except government employees, taxpayers, and professionals. Register at pmkisan.gov.in.' },
  { q:'How do I check my complaint status?', a:'Use the "Track Complaint" section on this page and enter your complaint ID (format: SBxxxx-xxxxx). You can also call your municipal corporation helpline or the national civic helpline 1800-111-956.' },
  { q:'How do I get an income certificate?', a:'Apply at your Tehsildar office or online at your state\'s ServiceOnline portal. You need Aadhaar, ration card, bank statement, and a self-declaration of income. Processing typically takes 7–15 working days.' },
  { q:'What is Ayushman Bharat PM-JAY?', a:'PM-JAY is the world\'s largest health insurance scheme covering ₹5 lakh per family per year for hospitalisation. Eligible families are listed in the SECC database. Check eligibility at pmjay.gov.in or call 14555.' },
  { q:'How do I report a road pothole or civic issue?', a:'Use the "Report a Civic Issue" section on this page. You can also report on your local municipal corporation app (e.g. 311 app, MyCMC), or call 1533 (national civic helpline). Include photos and a precise location.' },
];

/* AI Responses */
const AI_RESPONSES = {
  'aadhaar': `**Aadhaar Card Application:**\n\n📍 Visit the nearest Aadhaar Seva Kendra\n\n📋 Required documents:\n• Proof of Identity (Passport / PAN)\n• Proof of Address (Electricity Bill)\n• Mobile number for OTP\n\n🌐 Book appointment at **uidai.gov.in**\n\nDelivery: 3–4 weeks via post.`,
  'passport': `**Passport Application:**\n\n🌐 Apply online at **passportindia.gov.in**\n\n📋 Required documents:\n• Aadhaar Card\n• PAN Card or Birth Certificate\n• Address Proof (within 3 months)\n• 2 passport size photos\n\n📍 Visit nearest PSK/POPSK after booking appointment.\n\nFresh passport: 1–3 weeks (Tatkal available).`,
  'pm kisan': `**PM-KISAN Scheme:**\n\n💰 ₹6,000 per year in 3 instalments directly to farmer's bank account.\n\n✅ Eligibility:\n• Land-owning farmer families\n• NOT eligible: Government employees, taxpayers, professionals\n\n📝 Register at **pmkisan.gov.in**\n\nCheck status with Aadhaar or Account number on the portal.`,
  'ration card': `**Ration Card Application:**\n\n📋 Required documents:\n• Aadhaar of all family members\n• Proof of Residence\n• Income Certificate\n• Bank Account Details\n• Passport size photographs\n\n📍 Apply at District Supply Office or online at your state food department portal.\n\n⏱️ Processing time: 15–30 days.`,
  'pension': `**Pension Schemes Available:**\n\n1. **National Pension System (NPS)** — For all citizens aged 18–70. Tax benefits under 80C.\n\n2. **Atal Pension Yojana** — For unorganised sector workers. ₹1,000–5,000/month pension.\n\n3. **EPFO Pension (EPS-95)** — For organised sector employees.\n\n4. **PM Vaya Vandana Yojana** — For senior citizens 60+. Guaranteed 7.4% returns.\n\n💡 Visit **npscra.nsdl.co.in** to open NPS account.`,
  'default': `👋 Namaste! I'm Smart Bharat AI.\n\nI can help you with:\n• 🪪 Identity documents (Aadhaar, Passport, PAN)\n• 🌾 Government schemes (PM-KISAN, PM-JAY, Mudra)\n• 📋 Document requirements\n• 🗳️ Voter ID, Driving Licence, Ration Card\n• 💰 Financial schemes and subsidies\n\nJust type your question and I'll guide you!`,
};

/* i18n Translations */
const i18n = {
  en: {
    nav_services:'Services', nav_schemes:'Schemes', nav_report:'Report Issue',
    nav_tracker:'Track Complaint', nav_emergency:'Emergency', nav_faq:'FAQ', nav_ai:'AI Chat',
    hero_eyebrow:'🇮🇳 Powered by Artificial Intelligence',
    hero_h1a:'Smart', hero_h1b:' Bharat',
    hero_sub:'Your AI-powered civic companion. Find government services, check schemes, report issues and get instant help — all in one place.',
    hero_cta1:'🤖 Ask AI Assistant', hero_cta2:'Explore Services',
    stat1:'Govt Schemes', stat2:'Services Listed', stat3:'States Covered', stat4:'AI Support',
    sec_services_eyebrow:'Find What You Need', sec_services_title:'Government Services Finder',
    sec_services_sub:'Search and find the right government service instantly.',
    service_search_ph:'Search: Aadhaar, Passport, Ration Card…',
    cat_all:'All', cat_identity:'Identity', cat_finance:'Finance', cat_health:'Health', cat_education:'Education', cat_property:'Property',
    sec_schemes_eyebrow:'Personalised for You', sec_schemes_title:'Government Scheme Recommender',
    sec_schemes_sub:'Answer a few questions and we\'ll show schemes you\'re eligible for.',
    sf_age:'Age', sf_gender:'Gender', sf_income:'Annual Income', sf_category:'Category',
    sf_state:'State', sf_occupation:'Occupation', sf_marital:'Marital Status',
    sf_submit:'🔍 Find My Schemes',
    sec_docs_eyebrow:'No More Guesswork', sec_docs_title:'Document Requirement Checker',
    sec_docs_sub:'Select a service to see exactly which documents you need.',
    docs_placeholder:'Select a service to see required documents',
    sec_report_eyebrow:'Be the Change', sec_report_title:'Report a Civic Issue',
    sec_report_sub:'Report potholes, broken lights, garbage, water issues and more directly to authorities.',
    r_name:'Full Name *', r_phone:'Mobile Number *', r_type:'Issue Type *',
    r_priority:'Priority', r_address:'Location / Address *', r_desc:'Description *', r_submit:'📨 Submit Report',
    sec_tracker_eyebrow:'Stay Informed', sec_tracker_title:'Complaint Status Tracker',
    sec_tracker_sub:'Enter your complaint ID to check the current status.',
    track_btn:'Track Status', tracker_hint:'Try sample IDs:',
    sec_emergency_eyebrow:'Always Available', sec_emergency_title:'Emergency Contacts',
    sec_emergency_sub:'Important emergency helplines — available 24×7.',
    sec_faq_eyebrow:'Got Questions?', sec_faq_title:'Frequently Asked Questions',
    chat_title:'Smart Bharat AI',
    footer_tag:'AI-Powered Civic Companion for every Indian citizen.',
    footer_services:'Services', footer_help:'Help', footer_social:'Connect',
    footer_copy:'© 2025 Smart Bharat. Built for the people of India. 🇮🇳',
    footer_privacy:'Privacy Policy', footer_terms:'Terms of Use',
  },
  hi: {
    nav_services:'सेवाएं', nav_schemes:'योजनाएं', nav_report:'समस्या रिपोर्ट',
    nav_tracker:'शिकायत ट्रैक', nav_emergency:'आपातकाल', nav_faq:'प्रश्न', nav_ai:'AI चैट',
    hero_eyebrow:'🇮🇳 कृत्रिम बुद्धिमत्ता द्वारा संचालित',
    hero_h1a:'स्मार्ट', hero_h1b:' भारत',
    hero_sub:'हर भारतीय नागरिक का AI सहायक। सरकारी सेवाएं खोजें, योजनाएं देखें, समस्याएं रिपोर्ट करें — सब एक जगह।',
    hero_cta1:'🤖 AI सहायक से पूछें', hero_cta2:'सेवाएं देखें',
    stat1:'सरकारी योजनाएं', stat2:'सूचीबद्ध सेवाएं', stat3:'राज्य कवर', stat4:'AI सहायता',
    sec_services_eyebrow:'आवश्यक खोजें', sec_services_title:'सरकारी सेवाएं खोजें',
    sec_services_sub:'तुरंत सही सरकारी सेवा खोजें।',
    service_search_ph:'खोजें: आधार, पासपोर्ट, राशन कार्ड…',
    cat_all:'सभी', cat_identity:'पहचान', cat_finance:'वित्त', cat_health:'स्वास्थ्य', cat_education:'शिक्षा', cat_property:'संपत्ति',
    sec_schemes_eyebrow:'आपके लिए व्यक्तिगत', sec_schemes_title:'सरकारी योजना खोजक',
    sec_schemes_sub:'कुछ प्रश्नों के उत्तर दें और हम आपकी पात्र योजनाएं दिखाएंगे।',
    sf_age:'आयु', sf_gender:'लिंग', sf_income:'वार्षिक आय', sf_category:'श्रेणी',
    sf_state:'राज्य', sf_occupation:'व्यवसाय', sf_marital:'वैवाहिक स्थिति',
    sf_submit:'🔍 मेरी योजनाएं खोजें',
    sec_docs_eyebrow:'अनुमान नहीं', sec_docs_title:'दस्तावेज़ जाँचक',
    sec_docs_sub:'सेवा चुनें और देखें कि कौन से दस्तावेज़ चाहिए।',
    docs_placeholder:'दस्तावेज़ देखने के लिए सेवा चुनें',
    sec_report_eyebrow:'बदलाव लाएं', sec_report_title:'नागरिक समस्या रिपोर्ट करें',
    sec_report_sub:'गड्ढे, टूटी लाइट, कचरा, पानी की समस्या — सीधे अधिकारियों को रिपोर्ट करें।',
    r_name:'पूरा नाम *', r_phone:'मोबाइल नंबर *', r_type:'समस्या का प्रकार *',
    r_priority:'प्राथमिकता', r_address:'स्थान / पता *', r_desc:'विवरण *', r_submit:'📨 रिपोर्ट सबमिट करें',
    sec_tracker_eyebrow:'जानकारी पाएं', sec_tracker_title:'शिकायत स्थिति ट्रैकर',
    sec_tracker_sub:'शिकायत ID दर्ज करें और वर्तमान स्थिति देखें।',
    track_btn:'स्थिति देखें', tracker_hint:'नमूना ID आज़माएं:',
    sec_emergency_eyebrow:'हमेशा उपलब्ध', sec_emergency_title:'आपातकालीन संपर्क',
    sec_emergency_sub:'महत्वपूर्ण हेल्पलाइन — 24×7 उपलब्ध।',
    sec_faq_eyebrow:'प्रश्न हैं?', sec_faq_title:'अक्सर पूछे जाने वाले प्रश्न',
    chat_title:'स्मार्ट भारत AI',
    footer_tag:'हर भारतीय नागरिक का AI सहायक।',
    footer_services:'सेवाएं', footer_help:'सहायता', footer_social:'जुड़ें',
    footer_copy:'© 2025 Smart Bharat. भारत के लोगों के लिए बनाया गया। 🇮🇳',
    footer_privacy:'गोपनीयता नीति', footer_terms:'उपयोग की शर्तें',
  }
};

/* ─── UTILITIES ─────────────────────────────────────────── */

/** Show a toast notification */
function showToast(msg, ms = 3000) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => { el.hidden = true; }, 300);
  }, ms);
}

/** Format AI response text (bold / bullets) */
function formatAI(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n• /g, '<br>• ')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}


/* ─── 1. i18n ────────────────────────────────────────────── */
let currentLang = localStorage.getItem('sb-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('sb-lang', lang);
  document.getElementById('langLabel').textContent = lang === 'en' ? 'हि' : 'EN';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (i18n[lang][key] !== undefined) el.placeholder = i18n[lang][key];
  });
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'hi' : 'en');
  showToast(currentLang === 'hi' ? '🇮🇳 हिंदी में बदल गया' : '🇮🇳 Switched to English');
});

applyLang(currentLang); // apply on load


/* ─── 2. LOADER ─────────────────────────────────────────── */
(function() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  document.body.classList.add('no-scroll');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('out');
      document.body.classList.remove('no-scroll');
      setTimeout(() => { loader.hidden = true; }, 550);
    }, 1600);
  });
})();


/* ─── 3. THEME TOGGLE ───────────────────────────────────── */
(function() {
  const html = document.documentElement;
  const btn  = document.getElementById('themeBtn');
  const saved = localStorage.getItem('sb-theme');
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (sysDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => apply(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  function apply(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('sb-theme', t);
    btn.textContent = t === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} mode`);
  }
})();


/* ─── 4. STICKY NAV ─────────────────────────────────────── */
(function() {
  const nav = document.getElementById('navbar');
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ─── 5. MOBILE MENU ────────────────────────────────────── */
(function() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileNav');
  function setOpen(open) {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  }
  btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
})();


/* ─── 6. SMOOTH SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});


/* ─── 7. SCROLL REVEAL ──────────────────────────────────── */
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();


/* ─── 8. ACTIVE NAV LINK ────────────────────────────────── */
(function() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => obs.observe(s));
})();


/* ─── 9. ANIMATED COUNTERS ──────────────────────────────── */
(function() {
  const counters = document.querySelectorAll('.hstat-n[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.getAttribute('data-target');
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString('en-IN');
        if (current >= target) clearInterval(timer);
      }, 20);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();


/* ─── 10. SERVICES FINDER ───────────────────────────────── */
(function() {
  const grid       = document.getElementById('servicesGrid');
  const searchInput = document.getElementById('serviceSearch');
  const tabs        = document.querySelectorAll('.cat-tab');
  let activeCat     = 'all';
  let searchQuery   = '';

  function renderServices() {
    const filtered = SERVICES.filter(s => {
      const matchCat    = activeCat === 'all' || s.cat === activeCat;
      const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery) || s.desc.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (!filtered.length) {
      grid.innerHTML = '<p style="color:var(--text-muted);padding:2rem;grid-column:1/-1">No services found. Try a different search.</p>';
      return;
    }

    grid.innerHTML = filtered.map(s => `
      <div class="svc-card reveal in" data-cat="${s.cat}">
        <span class="svc-icon" aria-hidden="true">${s.icon}</span>
        <p class="svc-name">${s.name}</p>
        <p class="svc-desc">${s.desc}</p>
        <a href="${s.link}" target="_blank" rel="noopener noreferrer" class="svc-link">Apply Online →</a>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      activeCat = tab.getAttribute('data-cat');
      renderServices();
    });
  });

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderServices();
  });

  document.getElementById('serviceSearchBtn').addEventListener('click', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderServices();
  });

  renderServices();
})();


/* ─── 11. SCHEME RECOMMENDER ────────────────────────────── */
(function() {
  const form    = document.getElementById('schemeForm');
  const results = document.getElementById('schemeResults');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    // Filter matching schemes
    const matched = SCHEMES.filter(s => {
      const occMatch  = s.eligibility.includes('all') || s.eligibility.includes(data.occupation) || (data.age === '60+' && s.eligibility.includes('senior')) || (data.gender === 'female' && s.eligibility.includes('female'));
      const incMatch  = s.income.includes('all') || s.income.includes(data.income);
      return occMatch && incMatch;
    });

    results.hidden = false;
    if (!matched.length) {
      results.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem">No schemes found for the selected profile. Try changing the filters.</p>';
      return;
    }

    results.innerHTML = `
      <h3>✅ ${matched.length} scheme(s) found for your profile</h3>
      <div class="scheme-result-grid">
        ${matched.map(s => `
          <div class="scheme-card">
            <span class="scheme-card-tag">${s.tag}</span>
            <h4>${s.name}</h4>
            <p>${s.desc}</p>
            <a href="${s.link}" target="_blank" rel="noopener noreferrer">Apply / Know More →</a>
          </div>
        `).join('')}
      </div>
    `;

    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();


/* ─── 12. DOCUMENT CHECKER ──────────────────────────────── */
(function() {
  const grid   = document.getElementById('docServiceGrid');
  const result = document.getElementById('docsResult');

  grid.innerHTML = DOC_SERVICES.map(s => `
    <button class="doc-svc-btn" data-id="${s.id}" aria-label="${s.name}">
      <span aria-hidden="true">${s.icon}</span>
      <p>${s.name}</p>
    </button>
  `).join('');

  grid.querySelectorAll('.doc-svc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.doc-svc-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const svc = DOC_SERVICES.find(s => s.id === btn.getAttribute('data-id'));
      if (!svc) return;

      result.innerHTML = `
        <h3>${svc.icon} ${svc.name}</h3>
        <div class="doc-list">
          ${svc.docs.map(d => `<div class="doc-item">${d}</div>`).join('')}
        </div>
        <div class="doc-note">💡 ${svc.note}</div>
      `;
    });
  });
})();


/* ─── 13. REPORT FORM ───────────────────────────────────── */
(function() {
  const form = document.getElementById('reportForm');
  if (!form) return;

  const rules = {
    rName:    [{ test: v => v.length >= 2,                       msg:'Please enter your full name.' }],
    rPhone:   [{ test: v => /^[\d\s\+\-]{8,15}$/.test(v),       msg:'Enter a valid mobile number.' }],
    rType:    [{ test: v => v !== '',                            msg:'Please select an issue type.' }],
    rAddress: [{ test: v => v.length >= 10,                      msg:'Please enter a detailed address.' }],
    rDesc:    [{ test: v => v.length >= 20,                      msg:'Please describe the issue in at least 20 characters.' }],
  };

  function validate(id) {
    const el  = document.getElementById(id);
    const err = document.getElementById(id + 'Err');
    if (!el || !err) return true;
    const v = el.value.trim();
    for (const { test, msg } of (rules[id] || [])) {
      if (!test(v)) { err.textContent = msg; el.classList.add('err'); return false; }
    }
    err.textContent = ''; el.classList.remove('err'); return true;
  }

  Object.keys(rules).forEach(id => {
    document.getElementById(id)?.addEventListener('blur', () => validate(id));
    document.getElementById(id)?.addEventListener('input', () => { document.getElementById(id)?.classList.remove('err'); const e = document.getElementById(id+'Err'); if(e) e.textContent=''; });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(id => validate(id)).every(Boolean);
    if (!ok) { form.querySelector('.err')?.focus(); return; }

    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Submitting…'; btn.disabled = true;

    const id = 'SB' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    setTimeout(() => {
      form.reset();
      const success = document.getElementById('reportSuccess');
      success.hidden = false;
      success.innerHTML = `✅ Complaint registered! Your ID is <strong>${id}</strong>. You will receive an SMS confirmation shortly. Use this ID to track status.`;
      btn.textContent = orig; btn.disabled = false;
      showToast(`✅ Report submitted! ID: ${id}`);
      setTimeout(() => { success.hidden = true; }, 8000);
    }, 1000);
  });
})();


/* ─── 14. TRACKER ───────────────────────────────────────── */
(function() {
  const input  = document.getElementById('trackerId');
  const btn    = document.getElementById('trackBtn');
  const result = document.getElementById('trackerResult');

  function track(id) {
    const data = COMPLAINTS[id.trim().toUpperCase()];
    if (!data) {
      result.hidden = false;
      result.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted)">❌ Complaint ID <strong>${id}</strong> not found. Please check the ID and try again.<br><small>Try: SB2024-00123</small></div>`;
      return;
    }

    const statusClass = data.status;
    const statusLabel = { pending:'⏳ Pending', progress:'🔄 In Progress', resolved:'✅ Resolved' }[data.status];
    const statusBadge = `<span class="status-badge ${statusClass}">${statusLabel}</span>`;

    result.hidden = false;
    result.innerHTML = `
      <div class="tracker-id-row">
        <div>
          <p class="tracker-id">🆔 ${id.trim().toUpperCase()}</p>
          <p style="font-size:.82rem;color:var(--text-muted)">📅 Submitted: ${data.submitted}</p>
          <p style="font-size:.88rem;margin-top:4px"><strong>${data.type}</strong></p>
          <p style="font-size:.82rem;color:var(--text-muted)">📍 ${data.location}</p>
        </div>
        ${statusBadge}
      </div>
      <div class="timeline">
        ${data.timeline.map(t => `
          <div class="tl-item">
            <div class="tl-dot ${t.done ? (t.current ? 'current' : 'done') : 'pending'}">${t.done ? (t.current ? '●' : '✓') : '○'}</div>
            <div class="tl-body">
              <p class="tl-title">${t.icon} ${t.title}</p>
              <p class="tl-date">${t.date}</p>
              ${t.note ? `<p class="tl-note">${t.note}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    result.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  btn.addEventListener('click', () => track(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') track(input.value); });

  document.querySelectorAll('.sample-id').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-id');
      track(input.value);
    });
  });
})();


/* ─── 15. EMERGENCY CONTACTS ────────────────────────────── */
(function() {
  const grid = document.getElementById('emergencyGrid');
  grid.innerHTML = EMERGENCY.map(e => `
    <div class="emg-card reveal in">
      <span class="emg-icon" aria-hidden="true">${e.icon}</span>
      <p class="emg-name">${e.name}</p>
      <p class="emg-number">${e.number}</p>
      <p class="emg-desc">${e.desc}</p>
      <a class="emg-call" href="tel:${e.number.replace(/[^0-9]/,'')}">📞 Call Now</a>
    </div>
  `).join('');
})();


/* ─── 16. FAQ ACCORDION ─────────────────────────────────── */
(function() {
  const list = document.getElementById('faqList');
  list.innerHTML = FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
        ${f.q}
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-a" id="faq-a-${i}" role="region">
        <div class="faq-a-inner">${f.a}</div>
      </div>
    </div>
  `).join('');

  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-q');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
})();


/* ─── 17. AI CHAT MODAL ─────────────────────────────────── */
(function() {
  const modal    = document.getElementById('chatModal');
  const backdrop = document.getElementById('chatBackdrop');
  const msgs     = document.getElementById('chatMessages');
  const form     = document.getElementById('chatForm');
  const input    = document.getElementById('chatInput');

  function openChat() {
    modal.hidden = false; backdrop.hidden = false;
    document.body.classList.add('no-scroll');
    if (!msgs.children.length) addBotMsg(AI_RESPONSES['default']);
    setTimeout(() => input.focus(), 100);
  }
  function closeChat() {
    modal.hidden = true; backdrop.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  document.getElementById('chatNavBtn').addEventListener('click', openChat);
  document.getElementById('heroAiBtn').addEventListener('click', openChat);
  document.getElementById('floatChat').addEventListener('click', () => { modal.hidden ? openChat() : closeChat(); });
  document.getElementById('chatClose').addEventListener('click', closeChat);
  backdrop.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeChat(); });

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerHTML = `
      <div class="msg-av" aria-hidden="true">${role === 'bot' ? '🤖' : '👤'}</div>
      <div class="msg-bubble">${role === 'bot' ? formatAI(text) : escapeHtml(text)}</div>
    `;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addBotMsg(text) { addMsg(text, 'bot'); }
  function addUserMsg(text) { addMsg(text, 'user'); }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'msg bot typing';
    div.id = 'typing-indicator';
    div.innerHTML = `<div class="msg-av" aria-hidden="true">🤖</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function hideTyping() { document.getElementById('typing-indicator')?.remove(); }

  function getBotReply(text) {
    const t = text.toLowerCase();
    for (const key of Object.keys(AI_RESPONSES)) {
      if (key !== 'default' && t.includes(key)) return AI_RESPONSES[key];
    }
    return AI_RESPONSES['default'];
  }

  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addUserMsg(text);
    input.value = '';
    showTyping();
    setTimeout(() => {
      hideTyping();
      addBotMsg(getBotReply(text));
    }, 900 + Math.random() * 600);
  });

  // Quick reply buttons
  document.getElementById('chatQuick').addEventListener('click', e => {
    const btn = e.target.closest('.quick-btn');
    if (!btn) return;
    input.value = btn.getAttribute('data-msg');
    form.dispatchEvent(new Event('submit'));
  });
})();


/* ─── 18. FLOATING CHAT BUTTON ──────────────────────────── */
// Handled inside chat modal module above.


/* ─── 19. BACK TO TOP ───────────────────────────────────── */
(function() {
  const btn = document.getElementById('btt');
  window.addEventListener('scroll', () => { btn.classList.toggle('show', window.scrollY > 400); }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
