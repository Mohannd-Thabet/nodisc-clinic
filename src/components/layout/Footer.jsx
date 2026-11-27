import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Activity, 
  MessageCircle,
  Stethoscope,
  Heart,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { lang, t, isRtl } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 md:pb-12 border-t border-slate-800 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Identity & Official Presentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-primary-700 p-0.5 shrink-0 shadow-md shadow-primary-900/30">
                <img 
                  src="/assets/full_logo.jpg" 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-white text-base leading-tight">
                    {isAr ? 'نوديسك كلينك' : 'NODISC Clinic'}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-primary-900/80 text-gold-300 border border-primary-700">
                    {isAr ? 'NODISC Clinic' : 'د. محمد الجرباني'}
                  </span>
                </div>
                <p className="text-xs text-primary-300 font-medium mt-0.5">
                  {isAr 
                    ? 'د. محمد عبدالله الجرباني — استشاري جراحة المخ والأعصاب'
                    : 'Dr. Mohammed Al-Jarbani — Consultant Neurosurgeon'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? "نوديسك كلينك (NODISC Clinic) — صرح طبي تخصصي متكامل لجراحة المخ والأعصاب والعمود الفقري وعلاج الألم والتأهيل الحركي المتقدم، بإشراف د. محمد عبدالله الجرباني بمركز ابن سينا الطبي بصنعاء."
                : "NODISC Clinic — Comprehensive specialized center for neurosurgery, spine care, advanced pain rehabilitation and physical therapy in Sana'a, led by Dr. Mohammed Abdullah Al-Jarbani."}
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=100094729868998"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-[#1877F2] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-md shadow-blue-600/30 hover:scale-110 active:scale-95"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/neurospine1j/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-md shadow-pink-600/30 hover:scale-110 active:scale-95"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCWkvXXy17cm--SVUqVrJFbg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-[#FF0000] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-md shadow-red-600/30 hover:scale-110 active:scale-95"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Specialties & Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-secondary-400" />
              {t('common.specialtiesTitle')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/spine-care" className="hover:text-secondary-400 transition-colors">
                  {isAr ? "الانزلاقات الغضروفية (الديسك) القطنية والعنقية" : "Lumbar & Cervical Disc Herniations"}
                </Link>
              </li>
              <li>
                <Link to="/neurosurgery" className="hover:text-secondary-400 transition-colors">
                  {isAr ? "جراحات وأورام الدماغ وقاع الجمجمة" : "Brain & Skull Base Tumor Surgeries"}
                </Link>
              </li>
              <li>
                <Link to="/spine-care" className="hover:text-secondary-400 transition-colors">
                  {isAr ? "تضيق القناة الشوكية وتثبيت الفقرات" : "Spinal Stenosis & Vertebral Fusion"}
                </Link>
              </li>
              <li>
                <Link to="/brain-neurology" className="hover:text-secondary-400 transition-colors">
                  {isAr ? "علاج الصرع واضطرابات الشحنات والصداع" : "Epilepsy, Headache & Neurological Care"}
                </Link>
              </li>
              <li>
                <Link to="/nodisc-pain-rehab" className="hover:text-secondary-400 transition-colors font-semibold text-secondary-300">
                  {isAr ? "مركز نوديسك لعلاج الألم والتأهيل" : "NODISC Pain Rehab Center"}
                </Link>
              </li>
              <li>
                <Link to="/physiotherapy" className="hover:text-secondary-400 transition-colors">
                  {isAr ? "نوديسك للعلاج الطبيعي والتأهيل الحركي" : "NODISC Physical Therapy"}
                </Link>
              </li>
              <li>
                <Link to="/nodisc-store" className="hover:text-secondary-400 transition-colors font-semibold text-emerald-400">
                  {isAr ? "متجر نوديسك للمستلزمات الطبية والدعامات" : "NODISC Medical Store & Braces"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">
              {t('common.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/departments" className="hover:text-secondary-400 transition-colors font-semibold text-secondary-300">
                  {isAr ? 'الأقسام الطبية التخصصية' : 'Specialized Departments'}
                </Link>
              </li>
              <li>
                <Link to="/services-list" className="hover:text-secondary-400 transition-colors">
                  {isAr ? 'الخدمات والإجراءات الطبية' : 'Medical Services & Procedures'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary-400 transition-colors">
                  {isAr ? 'عن الطبيب والفريق الطبي' : 'About Doctor & Medical Team'}
                </Link>
              </li>
              <li>
                <Link to="/media-center" className="hover:text-secondary-400 transition-colors font-semibold text-gold-300">
                  {isAr ? 'قصص النجاح والأخبار المعتمدة' : 'Success Stories & Clinic News'}
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-secondary-400 transition-colors">
                  {isAr ? 'المكتبة الطبية التثقيفية' : 'Educational Medical Library'}
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-secondary-400 transition-colors font-semibold text-emerald-400">
                  {isAr ? 'الحملات الطبية المجانية' : 'Free Medical Campaigns'}
                </Link>
              </li>
              <li>
                <Link to="/nodisc-store" className="hover:text-secondary-400 transition-colors">
                  {isAr ? 'متجر نوديسك الطبي' : 'NODISC Medical Store'}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-secondary-400 transition-colors font-bold text-secondary-300">
                  {isAr ? 'حجز موعد واستشارة' : 'Book Appointment & Consultation'}
                </Link>
              </li>
              <li>
                <Link to="/survey" className="hover:text-secondary-400 transition-colors">
                  {isAr ? 'استبيان تقييم الخدمة' : 'Patient Experience Survey'}
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-secondary-400 transition-colors">
                  {isAr ? 'صندوق الشكاوى والمقترحات' : 'Complaints & Feedback Box'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-sm mb-4">
              {t('common.contactInfo')}
            </h4>

            {/* Direct Call Phone */}
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-secondary-400 shrink-0" />
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">{isAr ? 'الاتصال:' : 'Phone:'}</span>
                <a href="tel:+967784545908" className="hover:text-white font-bold text-sm text-secondary-300" dir="ltr">
                  784545908
                </a>
              </div>
            </div>

            {/* Direct WhatsApp with Official Green Icon */}
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <div className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-3 h-3 fill-current" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">{isAr ? 'واتساب:' : 'WhatsApp:'}</span>
                <a 
                  href="https://wa.me/967772070207" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 font-bold text-sm text-[#25D366]" 
                  dir="ltr"
                >
                  772070207
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>{t('common.locationAddress')} – {t('common.centerName')}</span>
            </div>

            {/* Working Shifts */}
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t('common.morningShift')}<br />{t('common.eveningShift')}</span>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/hSCBc8ByMq4txKhR9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-300 text-xs font-semibold transition-colors border border-slate-700"
              >
                <MapPin className="w-3.5 h-3.5" />
                {isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('common.rights')}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-400">
            <span className="font-bold text-slate-300">
              {isAr ? 'تصميم وبرمجة: م/مهند البحيري' : 'Designed & Developed by: Eng. Mohannad Al-Buhairi'}
            </span>
            <a
              href="tel:+967777319732"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-700 hover:border-emerald-500 font-bold transition-all shadow-xs"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+967 777319732</span>
            </a>
          </div>

          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-primary-400" />
            <span>
              {isAr
                ? 'رعاية طبية تخصصية قائمة على الدليل العلمي والبروتوكولات الدولية'
                : 'Specialized evidence-based healthcare & international protocols'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
