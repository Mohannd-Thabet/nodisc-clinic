export interface SiteConfig {
  brand: {
    nameAr: string;
    nameEn: string;
    tagline: string;
    shortAbout: string;
    vision: string;
    mission: string;
    logoUrl: string | null; // Replace with official logo URL when approved
    prototypeNotice: string;
    heroImage: string;
    clinicGallery: { url: string; caption: string }[];
  };
  theme: {
    petrolPrimary: string;
    petrolDark: string;
    skyAccent: string;
    canvasBg: string;
    note: string;
  };
  contact: {
    city: string;
    address: string;
    landmark: string;
    phones: { label: string; value: string; isDemoPlaceholder?: boolean }[];
    whatsappDisplay: string;
    whatsappUrl: string | null; // null shows prototype informational popover instead of dead external link
    email: string;
    workingDays: string;
    workingPeriods: { label: string; time: string }[];
    directionsUrl: string | null;
    directionsNote: string;
  };
  currency: {
    code: string;
    symbolAr: string;
    exchangeRatesFromYER: Record<string, { label: string; symbol: string; rate: number }>;
  };
  payment: {
    codLabel: string;
    codFeeYER: number;
    deliveryFeeYER: number;
    freeDeliveryThresholdYER: number;
    ePaymentLabel: string;
    ePaymentFeeYER: number;
    ePaymentNetworks: { id: string; name: string; accountHint: string }[];
    collectionNote: string;
  };
  bookingRules: {
    visitTypes: string[];
    periods: string[];
    unavailableDatesDemo: string[]; // Dates simulated as unavailable for prototype testing
    capacityPolicyNote: string;
  };
  prescriptionRules: {
    allowedExtensions: string[];
    maxFileSizeMB: number;
    helperText: string;
  };
  reviewsPolicy: {
    moderationNotice: string;
    allowPublicRating: boolean;
  };
  features: {
    showCareersPage: boolean;
    allowGeneralCareerInterest: boolean;
    showSurveyPage: boolean;
    showDualPaymentPreview: boolean;
    showFloatingContactButton: boolean;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    nameAr: 'نوديسك كلينك',
    nameEn: 'NODISC Clinic',
    tagline: 'صرح تخصصي متكامل لجراحة المخ والأعصاب والعمود الفقري وعلاج الألم والتأهيل والمتجر الطبي',
    shortAbout:
      'منظومة طبية متخصصة تجمع التقييم الجراحي الدقيق للدكتور محمد عبد الله الجرباني، ومركز نوديسك لعلاج الألم والتأهيل الحركي المتقدم، وبرامج العلاج الطبيعي والمتجر الطبي في مركز ابن سيناء بصنعاء.',
    vision:
      'تقديم رعاية تخصصية متقدمة لمشكلات العمود الفقري والانزلاق الغضروفي والمخ والأعصاب وفق أحدث المعايير الدولية والبروتوكولات التحفظية والجراحية.',
    mission:
      'تقديم حلول متكاملة تبدأ بالتشخيص الدقيق وقراءة الرنين، مروراً بالشد الميكانيكي وعلاج الألم بدون جراحة، والجراحة الميكروسكوبية، والتأهيل الحركي حتى الشفاء التام.',
    logoUrl: '/assets/full_logo.jpg',
    prototypeNotice:
      'نموذج تصوري تفاعلي شامل — عيادة الدكتور محمد الجرباني ومركز نوديسك الطبي المتكامل (صنعاء).',
    heroImage: '/src/assets/images/hero_nodisc_clinic_1795286630066.jpg',
    clinicGallery: [
      {
        url: '/src/assets/images/hero_nodisc_clinic_1795286630066.jpg',
        caption: 'الاستقبال الرئيسي وصالة انتظار المراجعين',
      },
      {
        url: '/src/assets/images/dept_neurosurgery_suite_1795286629702.jpg',
        caption: 'عيادة استشارات جراحة المخ والأعصاب والعمود الفقري — د. محمد الجرباني',
      },
      {
        url: '/src/assets/images/dept_pain_clinic_1795286628900.jpg',
        caption: 'مركز نوديسك لعلاج الألم والتأهيل واستعادة الوظيفة الحركية',
      },
      {
        url: '/src/assets/images/dept_rehab_gym_1795286629619.jpg',
        caption: 'صالة التأهيل الحركي والعلاج الطبيعي',
      },
      {
        url: '/src/assets/images/dept_pharmacy_counter_1795286630165.jpg',
        caption: 'صيدلية ومتجر نوديسك للمستلزمات الطبية والدعامات',
      },
    ],
  },
  theme: {
    petrolPrimary: '#1B4965',
    petrolDark: '#143344',
    skyAccent: '#4DA6D1',
    canvasBg: '#F8FAFC',
    note: 'الهوية البصرية الرسمية المعتمدة (الأزرق الطبي الملكي، السماوي، ولمسات الذهب الطبي).',
  },
  contact: {
    city: 'صنعاء — اليمن',
    address: 'مركز ابن سيناء الطبي — عيادة د. محمد الجرباني ومركز نوديسك',
    landmark: 'صنعاء — برج ابن سيناء التخصصي',
    phones: [
      { label: 'هاتف العيادة والحجوزات', value: '784545908', isDemoPlaceholder: false },
      { label: 'واتساب وتنسيق الحالات', value: '772070207', isDemoPlaceholder: false },
    ],
    whatsappDisplay: '772070207',
    whatsappUrl: 'https://wa.me/967772070207',
    email: 'info@nodisc-clinic.com',
    workingDays: 'السبت إلى الخميس',
    workingPeriods: [
      { label: 'الفترة الصباحية', time: '09:00 صباحًا – 02:00 ظهرًا' },
      { label: 'الفترة المسائية', time: '04:00 عصرًا – 09:00 مساءً' },
    ],
    directionsUrl: 'https://maps.app.goo.gl/hSCBc8ByMq4txKhR9',
    directionsNote: 'مركز ابن سيناء الطبي — افتح الموقع في خرائط Google',
  },
  currency: {
    code: 'YER',
    symbolAr: 'ر.ي',
    exchangeRatesFromYER: {
      YER: { label: 'ريال يمني (افتراضي)', symbol: 'ر.ي', rate: 1 },
      SAR: { label: 'ريال سعودي (معاينة)', symbol: 'ر.س', rate: 0.007 },
      USD: { label: 'دولار أمريكي (معاينة)', symbol: '$', rate: 0.00188 },
    },
  },
  payment: {
    codLabel: 'نقدًا عند التسليم',
    codFeeYER: 0,
    deliveryFeeYER: 1500,
    freeDeliveryThresholdYER: 35000,
    ePaymentLabel: 'دفع إلكتروني تجريبي',
    ePaymentFeeYER: 0,
    ePaymentNetworks: [
      { id: 'kuraimi', name: 'الكريمي حاسب', accountHint: 'حساب: 784545908' },
      { id: 'onecash', name: 'محفظة ون كاش (OneCash)', accountHint: 'رقم: 772070207' },
      { id: 'flousak', name: 'محفظة فلوسك (Flousak)', accountHint: 'رقم: 772070207' },
      { id: 'jawali', name: 'محفظة جوالي (Jawali)', accountHint: 'رقم: 772070207' },
      { id: 'jeeb', name: 'محفظة جيب (Jeeb)', accountHint: 'رقم: 772070207' },
    ],
    collectionNote: 'أسماء شبكات الدفع والرسوم وأرقام التحصيل قابلة للاستبدال ببيانات المركز المعتمدة.',
  },
  bookingRules: {
    visitTypes: ['استشارة أولى', 'متابعة حالة', 'مراجعة أشعة وتقارير', 'جلسة علاجية / تقييم'],
    periods: ['الفترة الصباحية (09:00 – 01:30)', 'الفترة المسائية (04:00 – 08:30)'],
    unavailableDatesDemo: ['2026-11-27', '2026-12-04'], // أمثلة لأيام غير متاحة (الجمعة / إجازة تجريبية)
    capacityPolicyNote:
      'تُحتسب السعة المتبقية للحملات تلقائيًا من عدد المقاعد المعتمدة لكل يوم حملة، ويمكن تعديل قاعدة الاحتساب من إعدادات المركز.',
  },
  prescriptionRules: {
    allowedExtensions: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxFileSizeMB: 10,
    helperText: 'يُقبل إرفاق صورة واضحة للوصفة (JPG, PNG, WEBP) أو ملف PDF بحد أقصى 10 ميجابايت.',
  },
  reviewsPolicy: {
    moderationNotice:
      'تخضع جميع التعليقات والتقييمات لمراجعة الفريق التحريري قبل النشر لضمان خصوصية المرضى ودقة المحتوى الطبي.',
    allowPublicRating: true,
  },
  features: {
    showCareersPage: true,
    allowGeneralCareerInterest: true,
    showSurveyPage: true,
    showDualPaymentPreview: true,
    showFloatingContactButton: true,
  },
};
