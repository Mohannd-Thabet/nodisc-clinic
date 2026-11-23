export const demoUsers = [
  {
    id: 'usr-doctor',
    name: 'د. محمد عبد الله الجرباني (المشرف العام / الطبيب الاستشاري)',
    role: 'doctor',
    roleLabel: 'استشاري ورئيس المركز (Super Admin)',
    email: 'dr.aljarbani@nodisc-clinic.com'
  },
  {
    id: 'usr-pharmacy',
    name: 'د. صيدلي نوديسك (مسؤول الصيدلية والمتجر)',
    role: 'pharmacist',
    roleLabel: 'مسؤول الصيدلية والمتجر الطبي',
    email: 'pharmacy@nodisc-clinic.com'
  },
  {
    id: 'usr-reception',
    name: 'أ. عبد الرحمن (منسق الاستقبال والمواعيد)',
    role: 'receptionist',
    roleLabel: 'منسق الاستقبال والحجوزات',
    email: 'reception@nodisc-clinic.com'
  }
];

export const initialAppointments = [
  {
    id: 'APT-1082',
    patientName: 'صادق محمد عبده',
    phone: '771234567',
    serviceTitle: 'استشارة جراحة المخ والأعصاب والعمود الفقري',
    department: 'جراحة المخ والأعصاب',
    date: '2026-11-23',
    shift: 'صباحية (9:00 ص - 2:00 م)',
    type: 'كشفية جديدة',
    status: 'pending_review',
    fileNumber: 'جديد',
    notes: 'ألم حاد في الرقبة يمتد للكتف الأيمن مع تنميل بالأصابع'
  },
  {
    id: 'APT-1081',
    patientName: 'أروى فؤاد المقالح',
    phone: '778901234',
    serviceTitle: 'جلسة تأهيل لفقرات الظهر بنوديسك',
    department: 'مركز نوديسك للتأهيل',
    date: '2026-11-23',
    shift: 'مسائية (4:00 م - 9:00 م)',
    type: 'جلسة علاج طبيعي',
    status: 'confirmed',
    fileNumber: 'NOD-2894',
    notes: 'الجلسة الرابعة في برنامج شد الفقرات وتأهيل الديسك'
  },
  {
    id: 'APT-1080',
    patientName: 'منصور حمود الحاشدي',
    phone: '733445566',
    serviceTitle: 'مراجعة ما بعد استئصال الغضروف المجهري',
    department: 'جراحة المخ والأعصاب',
    date: '2026-11-22',
    shift: 'صباحية (9:00 ص - 2:00 م)',
    type: 'مراجعة دورية',
    status: 'attended',
    fileNumber: 'NOD-1940',
    notes: 'متابعة أسبوعين بعد العملية - تعافي ممتاز وزوال ألم عرق النسا'
  },
  {
    id: 'APT-1079',
    patientName: 'ياسين أحمد غالب',
    phone: '770987654',
    serviceTitle: 'تقييم الألم المزمن والشد الميكانيكي',
    department: 'مركز نوديسك لعلاج الألم',
    date: '2026-11-24',
    shift: 'صباحية (9:00 ص - 2:00 م)',
    type: 'كشفية جديدة',
    status: 'confirmed',
    fileNumber: 'جديد',
    notes: 'آلام أسفل الظهر منذ سنة مع صعوبة الوقوف المطول'
  }
];

export const initialPrescriptions = [
  {
    id: 'RX-904',
    patientName: 'عبد الله صالح الريمي',
    phone: '772345678',
    city: 'صنعاء - مذبح',
    notes: 'مشد قطني تخصصي مقاس XL + فيتامينات أعصاب',
    image: '/assets/images/dept_pharmacy_counter_1795286630165.jpg',
    status: 'new',
    createdAt: 'منذ ساعتين',
    suggestedItems: [
      { name: 'مشد قطني تخصصي لدعم الديسك (مقاس XL)', price: 28000, qty: 1 },
      { name: 'فيتامين B مركب مقوي للأعصاب فورت', price: 8500, qty: 1 }
    ],
    totalYER: 36500
  },
  {
    id: 'RX-903',
    patientName: 'فاطمة عبد العزيز',
    phone: '775678901',
    city: 'صنعاء - شارع حده',
    notes: 'رقبية طبية صلبة فيلادلفيا للرقبة + كمادة باردة حارة',
    image: '/assets/images/dept_pharmacy_counter_1795286630165.jpg',
    status: 'dispensed',
    createdAt: 'أمس',
    suggestedItems: [
      { name: 'رقبية فيلادلفيا صلبة مع فتحة تنفس', price: 16500, qty: 1 },
      { name: 'كمادة هلامية طبية مزدوجة حرارة/برودة', price: 7000, qty: 1 }
    ],
    totalYER: 23500
  }
];

export const initialOrders = [
  {
    id: 'ORD-8921',
    customerName: 'م. مروان الكبسي',
    phone: '774567890',
    city: 'صنعاء - سعوان',
    items: 'حزام شد الفقرات الهوائي المنزلي (1)',
    totalYER: 42000,
    paymentMethod: 'الدفع عند الاستلام',
    fulfillmentStatus: 'قيد التوصيل',
    date: '2026-11-22'
  },
  {
    id: 'ORD-8920',
    customerName: 'جميل عبد الكريم',
    phone: '771122334',
    city: 'صنعاء - شارع تعز',
    items: 'جهاز TENS/EMS الرقمي (1) + وسادة ميموري فوم (1)',
    totalYER: 54000,
    paymentMethod: 'الكريمي حاسب',
    fulfillmentStatus: 'تم التسليم',
    date: '2026-11-21'
  }
];

export const initialSmsLogs = [
  {
    id: 'SMS-401',
    recipient: 'صادق محمد عبده (771234567)',
    type: 'تأكيد موعد كشفية',
    message: 'عزيزي المراجع صادق، تم تأكيد موعدك بعيادة د. محمد الجرباني ومركز نوديسك يوم الخميس 26 نوفمبر، الفترة الصباحية. يرجى إحضار الأشعة السابقة.',
    sentAt: '2026-11-22 10:15 AM',
    status: 'delivered'
  },
  {
    id: 'SMS-400',
    recipient: 'أروى فؤاد المقالح (778901234)',
    type: 'تذكير جلسة تأهيل',
    message: 'تذكير: موعد جلستك الرابعة في مركز نوديسك للتأهيل اليوم الساعة 5:00 عصراً. نتمنى لك دوام العافية.',
    sentAt: '2026-11-22 09:00 AM',
    status: 'delivered'
  }
];

export const initialInboxMessages = [
  {
    id: 'MSG-301',
    sender: 'أحمد القدسي',
    phone: '773322110',
    type: 'مقترح تطويري',
    subject: 'زيادة أوقات العمل في العيادة المسائية',
    message: 'أقترح تمديد الفترة المسائية إلى الساعة 10:00 مساءً لتسهيل الحضور بعد أوقات الدوام الرسمي في صنعاء.',
    date: '2026-11-21',
    status: 'reviewed'
  },
  {
    id: 'MSG-300',
    sender: 'أم محمد الصبري',
    phone: '776655443',
    type: 'استبيان رضا',
    subject: 'شكر وتقدير للدكتور الجرباني',
    message: 'تعامل راقي جداً من الدكتور وطاقم نوديسك وفرحنا كثيراً بتحسن والدنا بعد معاناته من الديسك.',
    date: '2026-11-20',
    status: 'new'
  }
];
