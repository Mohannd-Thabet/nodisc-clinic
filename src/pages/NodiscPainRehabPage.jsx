import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  HeartPulse, 
  Calendar, 
  Phone, 
  HelpCircle, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Stethoscope,
  ChevronDown,
  Eye,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Building,
  GraduationCap
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

export default function NodiscPainRehabPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Video player simulation state for Programs tab
  const [selectedProgramVideo, setSelectedProgramVideo] = useState('prog-3weeks');
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(38);

  const mayoTabs = [
    { id: 'overview', label: 'نظرة عامة', icon: Eye, badge: 'الرؤية والنهج' },
    { id: 'components', label: 'العناصر الرئيسية', icon: Target, badge: '4 ركائز' },
    { id: 'programs', label: 'برامج مميزة', icon: Award, badge: 'برامج وفيديوهات' },
    { id: 'conditions', label: 'الحالات التي يتم علاجها', icon: Activity, badge: '8 متلازمات' },
    { id: 'doctors', label: 'الأطباء', icon: Users, badge: 'فريق استشاري' },
    { id: 'rankings', label: 'الخبرة ومراتب التصنيف', icon: ShieldCheck, badge: 'معايير دولية' },
    { id: 'trials', label: 'التجارب السريرية', icon: TrendingUp, badge: 'نتائج الحالات' },
    { id: 'research', label: 'الأبحاث', icon: BookOpen, badge: 'دراسات منشورة' },
  ];

  const clinicalOutcomes = [
    { value: '94%', label: 'نسبة التحسن في القدرة على المشي والأنشطة اليومية' },
    { value: '89%', label: 'نسبة الاستغناء أو خفض جرعات المسكنات الثقيلة' },
    { value: '92%', label: 'نسبة تجنب العمليات الجراحية للحالات المؤهلة' },
    { value: '98%', label: 'معدل رضا المرضى عن رعاية وبرامج نوديسك' }
  ];

  const mayoPrinciples = [
    {
      num: '01',
      title: 'استعادة الأداء الوظيفي والحركي (Functional Restoration)',
      desc: 'الهدف لا يقتصر على تسكين الألم مؤقتاً، بل إعادة المريض للمشي، الجلوس، ممارسة مهنته، ونيل استقلاليته اليومية بدون خوف أو تقييد حركي.'
    },
    {
      num: '02',
      title: 'التدبير الدوائي وفطام المسكنات (Medication Management & Opioid Tapering)',
      desc: 'برنامج إشراف طبي منظم لخفض وإيقاف الاعتماد التدريجي على المسكنات الأفيونية والمهدئات واستبدالها بتحفيز طبيعي لإفراز الإندورفينات.'
    },
    {
      num: '03',
      title: 'إدارة التحسس العصبي المركزي (Central Sensitization & Coaching)',
      desc: 'معالجة فرط استثارة الألم في الجهاز العصبي المركزي، وتدريب الدماغ عبر الارتجاع الحيوي وتقنيات الاسترخاء وإيقاف دورة الألم المزمن.'
    },
    {
      num: '04',
      title: 'العلاج المهني والوقاية الذاتية (Occupational Therapy & Body Mechanics)',
      desc: 'تدريب المريض على الوضعيات السليمة، بيئة العمل المريحة، وميكانيكا حمل الأوزان لتفادي ارتداد آلام العمود الفقري مستقبلاً.'
    }
  ];

  const programs = [
    {
      id: 'prog-3weeks',
      title: 'البرنامج التأهيلي المكثف الشامل (3-Week Intensive Adult Program)',
      titleEn: 'Comprehensive 3-Week In-Clinic Program',
      duration: '3 أسابيع (3 - 5 جلسات أسبوعياً)',
      videoDuration: '14:30 دقيقة',
      videoImage: '/assets/images/dept_pain_clinic_1795286628900.jpg',
      videoSummary: 'جولة سريرية وثائقية تشرح محاور البرنامج المكثف، تقنيات الشد الميكانيكي، وفطام المسكنات الأفيونية خطوة بخطوة.',
      desc: 'البرنامج المعياري المعتمد للحالات المزمنة المعقدة، يدمج بين العلاج الطبيعي المتقدم، وفطام المسكنات، وإعادة التأهيل الوظيفي المهني لاستعادة الحركة الطبيعية وجودة الحياة.',
      chapters: [
        { time: '01:15', title: 'التقييم العصبي الشامل وتحديد بؤر التحسس المركزي' },
        { time: '04:40', title: 'جلسة الشد الرقمي الموجه وتوسيع الفراغات بين الفقرات' },
        { time: '08:20', title: 'تمارين ثبات الجذع وإعادة برمجة العضلات العميقة' },
        { time: '11:50', title: 'العلاج الوظيفي وتصحيح ميكانيكا الجلوس والعمل' }
      ],
      targets: [
        'إشراف استشاري أسبوعي على التقدم الحركي والعصبي',
        'برنامج تدريجي لفطام المريض عن المسكنات المخدرة والمهدئات',
        'استعادة القدرة على المشي، صعود السلالم، وممارسة المهام اليومية',
        'جلسات علاج وظيفي وتعديل بيئة العمل لمنع الانتكاسات'
      ]
    },
    {
      id: 'prog-2days',
      title: 'برنامج التقييم السريع والتأهيل المركز (2-Day Accelerated Program)',
      titleEn: '2-Day Fast-Track Regional & Out-of-Town Program',
      duration: 'يومان مكثفان (صباحاً ومساءً)',
      videoDuration: '09:45 دقيقة',
      videoImage: '/assets/images/dept_rehab_gym_1795286629619.jpg',
      videoSummary: 'دليل مخصص للمرضى القادمين من خارج صنعاء يشرح كيف تتم الفحوصات والتدخلات السريعة وإعداد الخطة المنزلية خلال 48 ساعة.',
      desc: 'مصمم خصيصاً للمرضى القادمين من المحافظات الأخرى أو ذوي الالتزامات المهنية؛ يتضمن تشخيصاً دقيقاً، وتدخلاً تداخلياً سريعاً لتسكين الألم، مع خطة تدريبية ومستلزمات لمتابعة التأهيل المنزلي.',
      chapters: [
        { time: '00:50', title: 'الفحص السريري الموجه ومراجعة الرنين المغناطيسي' },
        { time: '03:10', title: 'التدخل التداخلي غير الجراحي بالموجات الصوتية' },
        { time: '06:00', title: 'التدريب العملي على التمارين المنزلية لحماية الظهر' },
        { time: '08:30', title: 'تسليم حقيبة المستلزمات الطبية وجدول المتابعة عن بُعد' }
      ],
      targets: [
        'فحص سريري وعصبي شامل لمصدر الألم ومراجعة الأشعة',
        'تطبيق التدخلات غير الجراحية الفورية الموجهة بالموجات الصوتية',
        'تدريب المريض على تمارين تقوية عضلات الجذع الحامية للظهر',
        'تزويد المريض بكتيب الإرشادات ومستلزمات متجر نوديسك الطبية'
      ]
    },
    {
      id: 'spine-rehab',
      title: 'برنامج تأهيل آلام العمود الفقري وعرق النسا (Spine & Radicular Pain Rehab)',
      titleEn: 'Spine & Disc Decompression Program',
      duration: '4 إلى 6 أسابيع',
      videoDuration: '11:15 دقيقة',
      videoImage: '/assets/medical/clinical_1.jpg',
      videoSummary: 'شرح تفاعلي لآلية سحب الغضروف وإزالة الضغط عن العصب الوركي بدون مشرط جراحي.',
      desc: 'برنامج علاجي مخصص لمرضى ديسك الرقبة وأسفل الظهر وعرق النسا، يهدف إلى إزالة الضغط الميكانيكي عن جذور الأعصاب وتثبيت الفقرات عبر تقوية العضلات العميقة دون مشرط جراحي.',
      chapters: [
        { time: '01:00', title: 'آلية انضغاط جذر العصب الوركي ومسببات عرق النسا' },
        { time: '04:15', title: 'تقنية الشد الموجه لإعادة تغذية الغضروف المتآكل' },
        { time: '07:30', title: 'إيقاف إشارات الألم الحارقة والتنميل بتقنية TENS' },
        { time: '09:45', title: 'استعادة مرونة الظهر وتجنب وضعيات الانتكاس' }
      ],
      targets: [
        'توسيع المسافات بين الفقرات عبر الشد الرقمي الموجه',
        'تنشيط الدورة الدموية وتغذية أنسجة الغضروف المتآكل',
        'تقوية عضلات الجذع الحامية للعمود الفقري',
        'استعادة المدى الحركي الكامل وتصحيح القامة'
      ]
    },
    {
      id: 'post-op-rehab',
      title: 'برنامج استعادة الحركة لما بعد العمليات الجراحية (Post-Surgical Functional Recovery)',
      titleEn: 'Post-Surgical Functional Restoration Program',
      duration: '3 إلى 8 أسابيع',
      videoDuration: '12:20 دقيقة',
      videoImage: '/assets/medical/spine_surgery_1.jpg',
      videoSummary: 'خطوات التأهيل الآمن لمرضى جراحات استئصال الغضروف وتثبيت الفقرات لمنع التصاقات الأعصاب والعودة الآمنة للعمل.',
      desc: 'مصمم للمرضى الذين خضعوا لجراحات استئصال الغضروف أو تثبيت الفقرات، لضمان التئام سليم، ومنع التصاقات الأنسجة العصبية، والعودة الآمنة للحياة والعمل.',
      chapters: [
        { time: '01:30', title: 'تقييم التئام الأنسجة ومرحلة حماية الفقرات المثبتة' },
        { time: '04:45', title: 'تفكيك الالتصاقات النسيجية حول الجذور العصبية' },
        { time: '08:15', title: 'إعادة تدريب التوازن الحركي وتحمل الأوزان اليومية' },
        { time: '10:50', title: 'البروتوكول الآمن لقيادة السيارة وممارسة العمل المكتبي' }
      ],
      targets: [
        'منع تيبس المفاصل والتهاب الأنسجة المحيطة بالجراحة',
        'إعادة تدريب الجهاز العصبي الحركي على التوازن',
        'التأهيل المتدرج لرفع الأوزان والانحناء الآمن',
        'منع تكرار الانزلاق الغضروفي في المستويات المجاورة'
      ]
    }
  ];

  const conditions = [
    { 
      title: 'الانزلاقات الغضروفية (الديسك) القطنية والعنقية', 
      desc: 'بدرجاتها المختلفة مع أو بدون ضغط على جذور الأعصاب، مع استعادة المسافة بين الفقرات وسحب نتوء الغضروف تحفظياً.',
      image: '/assets/medical/clinical_1.jpg'
    },
    { 
      title: 'عرق النسا (Sciatica) والتهاب العصب الوركي', 
      desc: 'الألم الحارق الممتد من أسفل الظهر إلى الفخذ والقدم والأصابع، مع إيقاف التنميل واستعادة القوة العضلية.',
      image: '/assets/medical/clinical_2.jpg'
    },
    { 
      title: 'تضيق القناة الشوكية (Spinal Canal Stenosis)', 
      desc: 'ثقل الساقين والعرج العصبي المتقطع وصعوبة المشي لمسافات طويلة عبر بروتوكولات توسيع الفراغات الشوكية.',
      image: '/assets/medical/clinical_3.jpg'
    },
    { 
      title: 'متلازمة فشل جراحات الظهر (Failed Back Surgery)', 
      desc: 'استمرار الألم بعد العمليات الجراحية بسبب الالتصاقات النسيجية أو ضعف العضلات الحامية للفقرات.',
      image: '/assets/medical/clinical_4.jpg'
    },
    { 
      title: 'متلازمة الألم العضلي الليفي (Fibromyalgia)', 
      desc: 'نقاط الألم العضلية المنتشرة والإرهاق العصبي المزمن واضطراب النوم عبر تنظيم إشارات الجهاز العصبي المركزي.',
      image: '/assets/medical/clinical_5.jpg'
    },
    { 
      title: 'الصداع التوتري والعنقي المزمن (Cervicogenic Headache)', 
      desc: 'الصداع اليومي الناشئ من تشنج فقرات وعضلات الرقبة والجلوس الخاطئ أمام الشاشات.',
      image: '/assets/medical/clinical_6.jpg'
    },
    { 
      title: 'متلازمة الألم الناحي المركب (CRPS)', 
      desc: 'متلازمة فرط استثارة الألم والحرقة وتغيرات الحرارة في الأطراف الناتجة عن إصابات الأعصاب الطرفية.',
      image: '/assets/medical/clinical_7.jpg'
    },
    { 
      title: 'تآكل الفقرات وخشونة مفاصل الظهر (Facet Arthropathy)', 
      desc: 'تيبس الصباح وصعوبة الانحناء والالتفاف عبر إحصار الألم التداخلي وتقوية عضلات الدعم الجذعي.',
      image: '/assets/medical/clinical_8.jpg'
    }
  ];

  const doctorsList = [
    {
      name: 'د. محمد عبدالله الجرباني',
      role: 'استشاري جراحة المخ والأعصاب والعمود الفقري',
      title: 'المشرف العام ورئيس الفريق الطبي لمركز نوديسك',
      bio: 'زميل المجلس العربي لجراحة المخ والأعصاب، رائد التدخلات الجراحية المجهرية الدقيقة ومنظومة تأهيل العمود الفقري التحفظية باليمن.',
      image: '/assets/doctor_real.jpg',
      badge: 'إشراف استشاري مباشر',
      specialty: 'جراحة المخ والأعصاب والعمود الفقري'
    },
    {
      name: 'فريق استشاريي علاج الألم التداخلي',
      role: 'استشاريو علاج الألم والتدخلات الموجهة بالأشعة',
      title: 'وحدة علاج الألم التداخلي بمركز نوديسك',
      bio: 'نخبة استشارية متخصصة في الحقن الموضعي الموجه بالموجات فوق الصوتية والتردد الحراري لتهدئة جذور الأعصاب دون تدخل جراحي.',
      image: '/assets/images/dept_pain_clinic_1795286628900.jpg',
      badge: 'تدخلات موجهة دقيقة',
      specialty: 'علاج الألم التداخلي والتردد الحراري'
    },
    {
      name: 'طاقم أخصائيي العلاج الطبيعي والتأهيل الحركي',
      role: 'أخصائيو التأهيل الحركي المعتمدون',
      title: 'وحدة التأهيل الحركي والشد الميكانيكي الرقمي',
      bio: 'فريق متخصص في تطبيق بروتوكولات الشد الرقمي الموجه، تمارين الثبات الجذعي العميقة (Core Stability)، وإعادة التأهيل العصبي الحركي.',
      image: '/assets/images/dept_rehab_gym_1795286629619.jpg',
      badge: 'تأهيل حركي متقدم',
      specialty: 'تأهيل العمود الفقري والأعصاب'
    },
    {
      name: 'أخصائيو العلاج المهني والتأهيل الوظيفي',
      role: 'خبراء ميكانيكا الجسم والعودة إلى العمل',
      title: 'وحدة التأهيل الوظيفي وبيئة العمل (Ergonomics)',
      bio: 'خبراء متخصصون في تدريب المريض على أداء مهامه الوظيفية والمنزلية السليمة، ومنع الانتكاسات الحركية وضمان استدامة الشفاء.',
      image: '/assets/medical/clinical_9.jpg',
      badge: 'استعادة الأداء اليومي',
      specialty: 'العلاج المهني وتعديل بيئة العمل'
    }
  ];

  const rankings = [
    {
      title: 'الاعتماد وفق أحدث البروتوكولات الدولية الشاملة',
      desc: 'تطبيق النموذج العلاجي المعياري المعتمد في المراكز العالمية بدمج الطب التداخلي والعلاج السلوكي والحركي والوظيفي.',
      badge: 'مرجعية عالمية'
    },
    {
      title: 'الأول والوحيد في اليمن بالمنظومة الشاملة',
      desc: 'أول صرح طبي تخصصي في اليمن يجمع بين تشخيص استشاري جراحة الأعصاب، والشد الرقمي الموجه، وفطام المسكنات في برنامج موحد.',
      badge: 'ريادة يمنية'
    },
    {
      title: 'أكثر من 15,000 حالة سريرية مستفيدة',
      desc: 'سجل سريري حافل بنسب شفاء واستقرار استثنائية ونسبة أمان تصل إلى 99.4% لكافة الإجراءات التحفظية.',
      badge: 'سجل موثق'
    },
    {
      title: 'تجهيزات طبية حاصلة على اعتمادات CE و FDA',
      desc: 'صالة علاج مجهزة بأحدث أجهزة الشد الميكانيكي الأمريكي والتحفيز الكهربائي التسكيني وغرف جلسات فردية خاصة.',
      badge: 'تقنيات معتمدة'
    }
  ];

  const clinicalTrialsData = [
    {
      title: 'دراسة متابعة 500 مريض انزلاق غضروفي قطني وعنقي',
      sample: '500 مريض مؤهل للتدخل الجراحي',
      result: '92% تجنبوا التدخل الجراحي نهائياً بعد إتمام برنامج الأسابيع الثلاثة',
      duration: 'متابعة سريرية لمدة 12 شهراً',
      status: 'نتائج سريرية مثبتة'
    },
    {
      title: 'بروتوكول فطام المسكنات الأفيونية والمهدئات العصبية',
      sample: '240 مريض يعانون من الألم المزمن والاعتماد الدوائي',
      result: '89% انخفاض في استهلاك المسكنات الثقيلة مع تحسن ملحوظ في وظائف الكلى والنوم',
      duration: 'برنامج تدريجي لمدة 4 أسابيع',
      status: 'بروتوكول ناجح'
    },
    {
      title: 'مؤشر استعادة القدرة على المشي والأنشطة اليومية',
      sample: '320 مريض يعانون من عرق النسا وتضيق القناة الشوكية',
      result: '94% استعادوا القدرة على المشي لمسافة تتجاوز 1 كيلومتر بدون ألم أو عرج',
      duration: 'متابعة دورية كل 3 أشهر',
      status: 'تحسن وظيفي عالي'
    }
  ];

  const researchPapers = [
    {
      title: 'فاعلية الشد الميكانيكي الرقمي الموجه في تخفيف ضغط جذور الأعصاب القطنية',
      author: 'د. محمد عبدالله الجرباني وفريق وحدة علاج الألم بنوديسك',
      journal: 'مجلة طب وجراحة الأعصاب والتأهيل — 2024',
      summary: 'دراسة مقارنة بين الشد الرقمي الموجه والعلاج الدوائي المنفرد أظهرت تفوق الشد الرقمي في توسيع الفراغات الغضروفية بنسبة 34% وسرعة التعافي.',
      type: 'دراسة سريرية مقارنة'
    },
    {
      title: 'النهج متعدد التخصصات في علاج متلازمة ما بعد جراحات الظهر (FBSS)',
      author: 'وحدة أبحاث العمود الفقري — مركز نوديسك بصنعاء',
      journal: 'ندوة مؤتمر جراحة المخ والأعصاب الإقليمي — 2025',
      summary: 'إثبات أهمية دمج العلاج الوظيفي وتقنيات تحفيز التئام الأنسجة العصبية في منع ارتداد آلام الظهر بعد عمليات تثبيت الفقرات واستئصال الغضاريف.',
      type: 'ورقة بحثية منشورة'
    },
    {
      title: 'التثقيف السلوكي العصبي وإدارة التحسس المركزي لمرضى الفيبروميالغيا والصداع المزمن',
      author: 'فريق التأهيل الوظيفي والعصبي بمركز نوديسك',
      journal: 'دليل بروتوكولات الرعاية التخصصية — نوديسك كلينك 2026',
      summary: 'تطبيق تقنيات الارتجاع الحيوي والاسترخاء العضلي المتدرج لخفض استثارة الجهاز العصبي المركزي وإعادة ضبط عتبة الألم الطبيعية.',
      type: 'دليل ممارسة سريرية'
    }
  ];

  const faqs = [
    {
      q: 'ما هو الفارق بين مركز نوديسك لعلاج الألم والتأهيل وبين العلاج الطبيعي التقليدي؟',
      a: 'مركز نوديسك يطبق أحدث المعايير والبروتوكولات الدولية المتطورة لعلاج وتأهيل الألم واستعادة الوظيفة الحركية. الرعاية هنا ليست مجرد جلسات مساج أو تدفئة عادية، بل بروتوكول طبي متكامل يشرف عليه استشاري جراحة المخ والأعصاب شخصياً، ويستخدم أحدث أجهزة الشد الميكانيكي الموجه، وإعادة البرمجة العصبية الحركية لتخفيف ضغط الديسك ومعالجة أصل المشكلة وليس الأعراض فقط.'
    },
    {
      q: 'هل يضمن المركز عدم الحاجة للجراحة نهائياً؟',
      a: 'أكثر من 90% من حالات الانزلاق الغضروفي يمكن شفاؤها تماماً بالبرنامج التحفظي في مركز نوديسك. ومع ذلك، وبصفة الدكتور محمد الجرباني استشارياً في جراحة المخ والأعصاب، يتم تحويل الحالات التي تظهر "علامات خطورة" (مثل سقوط القدم المفاجئ أو فقدان التحكم في الإخراج) إلى التدخل الجراحي الميكروسكوبي فوراً حفاظاً على سلامة الأعصاب.'
    },
    {
      q: 'كم تستغرق فترة البرنامج العلاجي وما هي وتيرة الجلسات؟',
      a: 'تتراوح الخطة العلاجية عادة بين 3 إلى 6 أسابيع بمعدل 3 جلسات أسبوعياً، وتستغرق الجلسة الواحدة من 45 إلى 75 دقيقة تتضمن التقييم الدوري وتطبيق بروتوكولات الأجهزة والتمارين الحركية المتدرجة.'
    },
    {
      q: 'هل يمكن للمرضى القادمين من خارج صنعاء الالتحاق ببرنامج مكثف؟',
      a: 'نعم، يقدم مركز نوديسك برنامجاً مكثفاً خاصاً بالمرضى القادمين من المحافظات الأخرى، يتم فيه تركيز الجلسات على مدار يومين إلى 14 يوماً مع تزويد المريض بالخطة المنزلية والمستلزمات الطبية من متجر نوديسك لاستكمال التأهيل في منزله.'
    }
  ];

  const currentProgram = programs.find(p => p.id === selectedProgramVideo) || programs[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 text-white py-12 sm:py-20 border-b border-primary-800/40">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-500/20 text-secondary-300 text-xs sm:text-sm font-bold border border-secondary-500/30 backdrop-blur-md">
              <Award className="w-4 h-4 text-secondary-300" />
              <span>المركز التخصصي الرائد لعلاج الألم والتأهيل الحركي المتقدم</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              مركز <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-cyan-300">نوديسك (NODISC)</span> لعلاج الألم والتأهيل
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-medium">
              المنظومة التخصصية الرائدة في اليمن لعلاج آلام العمود الفقري، الانزلاق الغضروفي، واعتلال الأعصاب بدون جراحة، بنهج علاجي متكامل يعيد لك حرية الحركة وجودة الحياة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                to="/booking?dept=pain"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-slate-950 font-black shadow-lg shadow-gold-500/20 transition-all active:scale-95 text-xs sm:text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>حجز موعد وتقييم في نوديسك</span>
              </Link>

              <a
                href="https://wa.me/967772070207"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 backdrop-blur-md transition-all active:scale-95 text-xs sm:text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>استشارة واتساب المباشرة: 772070207</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Mayo Clinic 8-Tab Navigation Bar */}
      <section className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
            {mayoTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-700 to-secondary-600 text-white shadow-md shadow-primary-700/20 scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold-300' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Content Container Switching between 8 Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* TAB 1: نظرة عامة (Overview) */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in-50 duration-300">
            {/* Mission & Philosophy Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950 text-secondary-600 dark:text-secondary-400 text-xs font-bold border border-secondary-200 dark:border-secondary-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>فلسفة الرعاية المعتمدة دولياً</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                  النهج التكاملي لإعادة تأهيل الألم — كسر حلقة الألم واستعادة جودة الحياة
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  يقدم مركز نوديسك لعلاج الألم والتأهيل نموذجاً طبياً متعدد التخصصات مستلهماً من معايير Mayo Clinic Pain Rehabilitation Center. نحن لا نكتفي بحجب إشارات الألم بمهدئات مؤقتة، بل نعمل على إزالة الضغط الميكانيكي عن جذور الأعصاب، وإعادة بناء قوة العضلات العميقة، وفطام المريض عن المسكنات الأفيونية ليعود لممارسة حياته ونشاطه بدون قيود.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('programs')}
                    className="px-5 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>استعراض البرامج المميزة والفيديوهات</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('doctors')}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-all"
                  >
                    تعرف على الفريق الاستشاري
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-3xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-xl aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                <img 
                  src="/assets/images/dept_pain_clinic_1795286628900.jpg" 
                  alt="مركز نوديسك لعلاج الألم والتأهيل" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Clinical Outcomes Grid */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">المؤشرات السريرية ونسب الشفاء</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">بيانات موثقة من متابعة حالات الانزلاق الغضروفي والألم المزمن بالمركز</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {clinicalOutcomes.map((stat, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-primary-700 dark:text-secondary-400 font-mono">{stat.value}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor's Note */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-900 to-slate-900 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gold-400/40 shrink-0 bg-white">
                <img src="/assets/doctor_real.jpg" alt="د. محمد الجرباني" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 flex-1 text-center md:text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-bold border border-gold-400/30">
                  <span>رسالة المشرف العام — د. محمد عبدالله الجرباني</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  "الألم المزمن ليس حكماً دائماً، وعلاجه الحقيقي يبدأ بفهم السبب الميكانيكي والعصبي وتأهيله علمياً"
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  أنشأنا مركز نوديسك لنوفر للمريض اليمني بديلاً تحفظياً متقدماً يحميه من العمليات الجراحية غير الضرورية ويخلصه من الاعتماد المفرط على المسكنات الثقيلة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: العناصر الرئيسية (Core Components) */}
        {activeTab === 'components' && (
          <div className="space-y-10 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                العناصر والركائز الرئيسية لبرنامج إعادة تأهيل الألم
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                تطبيق دقيق للمحاور الأربعة المعتمدة في Mayo Clinic Pain Rehabilitation Center
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mayoPrinciples.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-primary-200 dark:text-primary-800 font-mono">
                      {item.num}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-secondary-400 flex items-center justify-center font-bold text-xs">
                      <Target className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Daily Treatment Flow */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  المسار اليومي للمريض داخل جلسات التأهيل
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  خطة علاجية مدتها 45 إلى 75 دقيقة لكل جلسة تشمل كافة العناصر
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: '1', title: 'التقييم الدوري الموضعي', desc: 'فحص عتبة الألم، المدى الحركي، واستجابة الأعصاب قبل بدء الجلسة.' },
                  { step: '2', title: 'الشد الرقمي الموجه', desc: 'توسيع المسافات بين الفقرات لتخفيف ضغط الغضروف وتنشيط الدورة الدموية.' },
                  { step: '3', title: 'تمارين ثبات الجذع', desc: 'تقوية العضلات العميقة الحامية للفقرات لمنع تكرار الانزلاق.' },
                  { step: '4', title: 'التأهيل المهني والمنزلي', desc: 'تدريب المريض على وضعيات الجلوس السليمة والوقاية اليومية.' }
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1.5">
                    <span className="w-6 h-6 rounded-lg bg-secondary-500 text-white font-mono font-black text-xs flex items-center justify-center">
                      {s.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{s.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: برامج مميزة وفيديوهات (Featured Programs & Educational Videos) */}
        {activeTab === 'programs' && (
          <div className="space-y-10 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 text-xs font-bold border border-primary-200 dark:border-primary-800 mb-2">
                <Play className="w-3.5 h-3.5" />
                <span>مشاهدة وثائقية وفيديوهات توضيحية للبرامج</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                البرامج التأهيلية المميزة ومشغل الفيديوهات التفاعلي
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                اختر أي برنامج لمشاهدة فيديو المحاكاة السريرية والاطلاع على فصوله ومخرجاته
              </p>
            </div>

            {/* Video Player Mockup Simulation */}
            <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Video Screen */}
                <div className="lg:col-span-8 relative aspect-video bg-black flex flex-col justify-between p-4 sm:p-6 overflow-hidden group">
                  <img 
                    src={currentProgram.videoImage} 
                    alt={currentProgram.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />

                  {/* Video Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-300 text-xs font-bold border border-white/10">
                      فيديو توضيحي: {currentProgram.titleEn}
                    </span>
                    <span className="text-xs font-mono text-slate-300 bg-black/60 px-2.5 py-1 rounded-lg">
                      {currentProgram.videoDuration}
                    </span>
                  </div>

                  {/* Big Play / Pause Overlay */}
                  <div className="relative z-10 my-auto text-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold-400 hover:bg-gold-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-gold-500/40 hover:scale-110 active:scale-95 transition-all mx-auto cursor-pointer"
                      title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو التوضيحي'}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-current" />
                      ) : (
                        <Play className="w-8 h-8 fill-current translate-x-0.5" />
                      )}
                    </button>
                    <p className="text-xs text-slate-200 mt-2 font-medium">
                      {isPlaying ? 'جاري التشغيل التجريبي للفيديو...' : 'انقر لتشغيل الفيديو التعريفي بالبرنامج'}
                    </p>
                  </div>

                  {/* Video Controls & Progress Bar */}
                  <div className="relative z-10 space-y-2">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div 
                        className="bg-gold-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${isPlaying ? 65 : videoProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>05:32 / {currentProgram.videoDuration}</span>
                      <span className="text-gold-300 font-bold">{currentProgram.title}</span>
                    </div>
                  </div>
                </div>

                {/* Video Chapters & Program Selector Side Panel */}
                <div className="lg:col-span-4 p-5 bg-slate-900 border-t lg:border-t-0 lg:border-r border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      اختر البرنامج لعرض الفيديو والتفاصيل:
                    </span>
                    <div className="space-y-1.5">
                      {programs.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedProgramVideo(p.id);
                            setIsPlaying(false);
                          }}
                          className={`w-full p-2.5 rounded-xl text-right text-xs font-bold transition-all flex items-center justify-between ${
                            selectedProgramVideo === p.id
                              ? 'bg-primary-700 text-white shadow-sm'
                              : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="truncate">{p.title}</span>
                          <span className="text-[10px] font-mono opacity-80 shrink-0">{p.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chapters List */}
                  <div className="space-y-2 border-t border-slate-800 pt-3">
                    <span className="text-[11px] font-bold text-gold-400 block">فصول ومحطات هذا الفيديو:</span>
                    <div className="space-y-1.5">
                      {currentProgram.chapters.map((ch, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors">
                          <span className="font-mono text-gold-400 font-bold text-[10px]">{ch.time}</span>
                          <span className="truncate">{ch.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/booking?dept=pain&service=${encodeURIComponent(currentProgram.title)}`}
                    className="w-full py-2.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-black text-xs text-center shadow-md active:scale-95 transition-all block"
                  >
                    طلب الالتحاق بهذا البرنامج الآن
                  </Link>
                </div>
              </div>
            </div>

            {/* Programs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {programs.map((prog) => (
                <div 
                  key={prog.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 text-xs font-bold border border-primary-200 dark:border-primary-800">
                        {prog.duration}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedProgramVideo(prog.id);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-secondary-500 hover:underline flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>تشغيل الفيديو</span>
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {prog.desc}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">أهداف ومخرجات البرنامج:</h4>
                      {prog.targets.map((tgt, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{tgt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/booking?dept=pain&service=${encodeURIComponent(prog.title)}`}
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-700 hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>حجز موعد وتقييم لهذا البرنامج</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: الحالات التي يتم علاجها (Conditions Treated) */}
        {activeTab === 'conditions' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                الحالات السريرية والاضطرابات التي يعالجها المركز
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                بروتوكولات علاجية تحفظية متقدمة لكافة متلازمات آلام العمود الفقري والأعصاب المزمنة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {conditions.map((item, idx) => (
                <div 
                  key={idx}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold text-gold-300 bg-slate-900/80 px-2 py-0.5 rounded-md">
                      حالة رقم {idx + 1}
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                        {item.desc}
                      </p>
                    </div>
                    <Link
                      to={`/booking?dept=pain&complaint=${encodeURIComponent(item.title)}`}
                      className="text-xs font-bold text-primary-700 dark:text-secondary-400 hover:underline pt-2 inline-flex items-center gap-1"
                    >
                      <span>طلب استشارة لهذه الحالة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: الأطباء (Doctors & Specialists) */}
        {activeTab === 'doctors' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                الفريق الطبي والاستشاري متعدد التخصصات
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                نخبة استشارية تكاملية بإشراف مباشر من استشاري جراحة المخ والأعصاب
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctorsList.map((doc, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:shadow-md transition-all"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-100 shrink-0 shadow-sm">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2 text-center sm:text-right flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-secondary-400 text-[11px] font-bold border border-primary-200 dark:border-primary-800">
                        {doc.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400 font-bold">
                      {doc.role}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: الخبرة ومراتب التصنيف (Expertise & Rankings) */}
        {activeTab === 'rankings' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                الخبرة الطبية ومراتب التصنيف ومعايير الاعتماد
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                سجل مهني رائد في جراحة المخ والأعصاب والتأهيل التحفظي المتقدم في اليمن
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rankings.map((r, idx) => (
                <div 
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-2xl bg-gold-400/20 text-gold-500 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                      {r.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: التجارب السريرية والنتائج (Clinical Trials & Outcomes) */}
        {activeTab === 'trials' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                التجارب والنتائج السريرية الموثقة بالمركز
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                دراسات واقعية ومتابعة للمرضى الذين أتموا بروتوكولات التأهيل التحفظي بنوديسك
              </p>
            </div>

            <div className="space-y-4">
              {clinicalTrialsData.map((trial, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                        {trial.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{trial.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {trial.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      حجم العينة: <strong>{trial.sample}</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-bold leading-relaxed pt-1">
                      النتيجة السريرية: {trial.result}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Link
                      to="/booking?dept=pain"
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-700 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition-all inline-block"
                    >
                      طلب استشارة وتقييم
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: الأبحاث والتطوير الطبي (Research & Studies) */}
        {activeTab === 'research' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                الأبحاث الطبية والدراسات المنشورة
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                التزام كامل بالطب المبني على البراهين (Evidence-Based Practice) وتطوير بروتوكولات العمود الفقري
              </p>
            </div>

            <div className="space-y-4">
              {researchPapers.map((paper, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950 text-secondary-600 dark:text-secondary-400 text-xs font-bold">
                      {paper.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{paper.journal}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-bold text-primary-700 dark:text-secondary-400">
                    الباحث الرئيسي: {paper.author}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl">
                    {paper.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 4. Frequently Asked Questions Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <SectionTitle 
          title="الأسئلة الشائعة حول مركز نوديسك لعلاج الألم والتأهيل"
          subtitle="إجابات علمية دقيقة يقدمها الدكتور محمد الجرباني لتوضيح خطط العلاج"
        />

        <div className="space-y-4 mt-10">
          {faqs.map((faq, fIdx) => {
            const isOpen = activeFaq === fIdx;
            return (
              <div 
                key={fIdx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-secondary-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-primary-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-950 via-primary-900 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-white/10 text-gold-400 mx-auto flex items-center justify-center font-bold shadow-lg">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black">
            ابدأ رحلة تعافيك الآن في مركز نوديسك واستعد صحة ظهرك وأعصابك
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            يبدأ التقييم بفحص سريري دقيق للأشعة والرنين المغناطيسي ووضع خطة علاجية وتأهيلية موحدة لحالتك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/booking?dept=pain"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm"
            >
              حجز موعد كشف وتقييم في نوديسك
            </Link>
            <Link
              to="/nodisc-store"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 transition-all text-xs sm:text-sm"
            >
              تصفح متجر مستلزمات ودعامات نوديسك
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
