import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  X, 
  Home, 
  User, 
  Brain, 
  Activity, 
  Scissors, 
  HeartHandshake, 
  BookOpen, 
  Bell, 
  Calendar, 
  Phone, 
  Briefcase, 
  CheckSquare, 
  MessageSquare,
  Award,
  ShieldCheck,
  Globe,
  Sun,
  Moon,
  MapPin,
  Clock,
  ShoppingBag
} from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose }) {
  const { lang, toggleLanguage, t, isRtl } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const links = [
    { to: '/', label: isAr ? 'الرئيسية' : 'Home', icon: Home },
    { to: '/departments', label: isAr ? 'الأقسام الطبية التخصصية' : 'Medical Departments', icon: Activity },
    { to: '/services-list', label: isAr ? 'الخدمات والإجراءات الطبية' : 'Services & Procedures', icon: Briefcase },
    { to: '/nodisc-pain-rehab', label: isAr ? 'مركز نوديسك لعلاج الألم والتأهيل' : 'NODISC Pain & Rehab', icon: Award },
    { to: '/nodisc-store', label: isAr ? 'متجر نوديسك الطبي' : 'NODISC Medical Store', icon: ShoppingBag, highlightBadge: isAr ? 'جديد' : 'New' },
    { to: '/library', label: isAr ? 'المكتبة الطبية والمقالات' : 'Medical Library', icon: BookOpen },
    { to: '/media-center', label: isAr ? 'المركز الإعلامي وقصص النجاح' : 'Media Center & Stories', icon: Award },
    { to: '/campaigns', label: isAr ? 'الحملات الطبية المجانية' : 'Free Campaigns', icon: Award, highlightBadge: isAr ? 'مجاني' : 'Free' },
    { to: '/booking', label: isAr ? 'حجز موعد واستشارة' : 'Book Appointment', icon: Calendar, highlight: true },
    { to: '/about', label: isAr ? 'عن الطبيب والمركز' : 'About Doctor & Center', icon: User },
    { to: '/survey', label: isAr ? 'الاستبيان الطبي' : 'Patient Survey', icon: CheckSquare },
    { to: '/feedback', label: isAr ? 'الشكاوى والمقترحات' : 'Complaints & Feedback', icon: MessageSquare },
    { to: '/contact', label: isAr ? 'تواصل معنا ومواقع العيادة' : 'Contact & Locations', icon: Phone },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} max-w-xs w-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 transition-transform duration-300`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-primary-700 p-0.5 shrink-0">
              <img src="/assets/full_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm block">
                {isAr ? 'نوديسك كلينك' : 'NODISC Clinic'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium block">
                {isAr ? 'د. محمد عبدالله الجرباني' : 'Dr. Mohammed Al-Jarbani'}
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={idx}
                to={link.to}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  link.highlight
                    ? 'bg-gradient-to-r from-primary-700 to-secondary-500 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${link.highlight ? 'text-white' : 'text-primary-600 dark:text-secondary-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.highlightBadge && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                    {link.highlightBadge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer with Theme & Language Switches */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50 dark:bg-slate-950/50">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleLanguage}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-secondary-500" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span>{isDark ? (isAr ? 'نهاري' : 'Light') : (isAr ? 'ليلي' : 'Dark')}</span>
            </button>
          </div>

          <a
            href="https://wa.me/967772070207"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>{isAr ? 'مراسلة واتساب: 772070207' : 'WhatsApp: 772070207'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
