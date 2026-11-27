import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Coins,
  Globe,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Banknote,
  Sun,
  Moon,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useStore } from '../../context/StoreContext';
import { storeCategories } from '../../data/storeProducts';

const paymentMethods = [
  { id: 'kuraimi', nameAr: 'الكريمي حاسب', nameEn: 'Al-Kuraimi', logo: '/assets/wallets/kuraimi.jpg' },
  { id: 'jawali', nameAr: 'محفظة جوالي', nameEn: 'Jawali', logo: '/assets/wallets/jawali.jpg' },
  { id: 'jeeb', nameAr: 'محفظة جيب', nameEn: 'Jeeb', logo: '/assets/wallets/jeeb.jpg' },
  { id: 'onecash', nameAr: 'ون كاش', nameEn: 'OneCash', logo: '/assets/wallets/onecash.jpg' },
  { id: 'flousak', nameAr: 'فلوسك', nameEn: 'Flousak', logo: '/assets/wallets/flousak.jpg' },
];

export default function StoreFooter() {
  const { lang, toggleLanguage, isRtl } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const { currency, setCurrency } = useStore();
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28 md:pb-12">
        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Identity with Logo, Contact, Currency, Theme & Language Switchers */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-emerald-500/40 bg-white shrink-0 p-0.5">
                <img
                  src="/assets/nodisc_photo.jpg"
                  alt={isAr ? 'شعار متجر نوديسك' : 'NODISC Store Logo'}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-black text-white text-base">
                  {isAr ? 'متجر نوديسك الطبي' : 'NODISC Medical Store'}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  {isAr ? 'الصيدلية والمستلزمات الطبية' : 'Pharmacy & Supplies'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{isAr ? 'صنعاء — شارع تعز — مركز ابن سينا الطبي' : 'Sana\'a — Taiz St — Ibn Sina Center'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span dir="ltr">784545908 / 772070207</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary-400 shrink-0" />
                <span>{isAr ? 'السبت – الخميس: 9 ص – 9 م' : 'Sat – Thu: 9 AM – 9 PM'}</span>
              </div>
            </div>

            {/* Currency (YER / SAR / USD), Theme & Language Switchers */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center rounded-xl bg-slate-900 border border-slate-700 p-1">
                <Coins className="w-3.5 h-3.5 text-gold-400 mx-1.5" />
                {[
                  { code: 'YER', label: isAr ? 'ر.ي' : 'YER' },
                  { code: 'SAR', label: isAr ? 'ر.س' : 'SAR' },
                  { code: 'USD', label: '$' },
                ].map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-colors ${
                      currency === c.code
                        ? 'bg-gold-400 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-white text-xs font-bold transition-colors"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
                <span>{isDark ? (isAr ? 'نهاري' : 'Light') : (isAr ? 'ليلي' : 'Dark')}</span>
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-primary-400 text-white text-xs font-bold transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isAr ? 'English' : 'العربية'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Main Store Sections */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
              {isAr ? 'المجموعات الرئيسية للمتجر' : 'Main Store Sections'}
            </h4>
            <ul className="space-y-2 text-xs">
              {storeCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/store/categories?section=${cat.id}`}
                    className="text-slate-400 hover:text-gold-300 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{isAr ? cat.name : cat.nameEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Shopping Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
              {isAr ? 'روابط التسوق السريعة' : 'Quick Shopping Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/store" className="text-slate-400 hover:text-white transition-colors">
                  {isAr ? 'رئيسية المتجر' : 'Store Home'}
                </Link>
              </li>
              <li>
                <Link to="/store/products" className="text-slate-400 hover:text-white transition-colors">
                  {isAr ? 'جميع المنتجات والتصنيفات' : 'All Products & Categories'}
                </Link>
              </li>
              <li>
                <Link to="/store/offers" className="text-slate-400 hover:text-gold-300 transition-colors">
                  {isAr ? 'العروض والتخفيضات' : 'Offers & Discounts'}
                </Link>
              </li>
              <li>
                <Link to="/store/prescription" className="text-slate-400 hover:text-emerald-300 transition-colors">
                  {isAr ? 'طلب دواء بصورة وصفة طبية' : 'Order by Prescription'}
                </Link>
              </li>
              <li>
                <Link to="/store/wishlist" className="text-slate-400 hover:text-rose-300 transition-colors">
                  {isAr ? 'قائمة المفضلة' : 'My Wishlist'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Service + Back to Medical Center */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
              {isAr ? 'خدمة العملاء والضمان' : 'Customer Service & Care'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'جميع المستلزمات والأجهزة الطبية مفحوصة ومعتمدة من الفريق الاستشاري لمركز نوديسك الطبي مع استشارة صيدلانية مجانية.'
                : 'All medical supplies and devices are verified by NODISC Medical Center specialists with free pharmacist guidance.'}
            </p>
            <div className="pt-2 space-y-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-800 hover:bg-primary-700 text-white font-bold text-xs transition-colors w-full justify-center"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isAr ? 'العودة لموقع المركز الطبي' : 'Back to Medical Center Website'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Payment Methods & Cash on Delivery Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'وسائل الدفع المعتمدة:' : 'Accepted Payment Methods:'}</span>
            </span>

            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-200"
              >
                <img
                  src={pm.logo}
                  alt={isAr ? pm.nameAr : pm.nameEn}
                  className="w-4 h-4 rounded object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span>{isAr ? pm.nameAr : pm.nameEn}</span>
              </div>
            ))}

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800 text-[11px] font-bold text-emerald-300">
              <Banknote className="w-3.5 h-3.5" />
              <span>{isAr ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} {isAr ? 'متجر وصيدلية نوديسك — د. محمد الجرباني' : 'NODISC Pharmacy & Store — Dr. Al-Jarbani'}</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">
                {isAr ? 'تصميم وبرمجة: م/مهند البحيري' : 'Designed & Developed by: Eng. Mohannad Al-Buhairi'}
              </span>
              <a
                href="tel:+967777319732"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-slate-700 hover:border-emerald-500 font-bold transition-all"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+967 777319732</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
