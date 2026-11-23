import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import ContactForm from '../components/forms/ContactForm';
import { doctorInfo } from '../data/doctorInfo';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send,
  Navigation
} from 'lucide-react';

export default function ContactPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const whatsappUrl = `https://wa.me/${doctorInfo.whatsappPhone}?text=${encodeURIComponent(doctorInfo.whatsappMessage)}`;

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-soft">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 transition-colors/10 text-gold-300 border border-white/15 text-xs font-semibold mb-4">
              <Phone className="w-3.5 h-3.5" />
              <span>{isAr ? 'تواصل مباشر وحجز مواعيد' : 'Direct Contact & Appointment Booking'}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">
              {isAr ? 'تواصل معنا وحجز موعد' : 'Contact Us & Book an Appointment'}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {isAr
                ? 'يسعدنا استقبال استفساراتكم وحجوزاتكم الطبية. يمكنكم التواصل مباشرة عبر الهاتف أو الواتساب، أو تعبئة نموذج الحجز وسيقوم فريق العيادة بالرد السريع.'
                : 'We welcome your medical inquiries and appointment bookings. You may contact us directly by phone or WhatsApp, or fill out the booking form and our clinic team will respond promptly.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Direct Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Phone Call Card */}
            <div className="bg-white dark:bg-slate-900 transition-colors rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/90 shadow-soft space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">
                    {isAr ? 'رقم الهاتف المباشر' : 'Direct Phone Number'}
                  </span>
                  <a
                    href={`tel:${doctorInfo.bookingPhone}`}
                    dir="ltr"
                    className="text-xl sm:text-2xl font-black text-primary-700 hover:text-gold-600 transition-colors inline-block"
                  >
                    {doctorInfo.bookingPhone}
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {isAr
                  ? 'متاح لاستقبال المكالمات وتنسيق المواعيد وحالات الطوارئ المحتاجة لتقييم جراحي سريع.'
                  : 'Available to receive calls, coordinate appointments, and urgent cases requiring rapid surgical evaluation.'}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${doctorInfo.bookingPhone}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isAr ? 'اتصال مباشر' : 'Call Now'}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'واتساب فوري' : 'WhatsApp Now'}</span>
                </a>
              </div>
            </div>

            {/* Locations summary card */}
            <div className="bg-white dark:bg-slate-900 transition-colors rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/90 shadow-soft space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-primary-700" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isAr ? 'فروع العيادات والمراكز' : 'Clinic & Center Branches'}
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <strong className="block text-slate-800 dark:text-slate-100 font-bold mb-0.5">
                    {isAr ? 'صنعاء - شارع تعز (جولة 45):' : "Sana'a - Taiz Street (Roundabout 45):"}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-300">
                    {isAr ? 'فوق صيدلية الفيصل، أمام مطاعم الخطيب' : 'Above Al-Faisal Pharmacy, opposite Al-Khateeb Restaurants'}
                  </p>
                </div>

                <div>
                  <strong className="block text-slate-800 dark:text-slate-100 font-bold mb-0.5">
                    {isAr ? 'صنعاء - شارع الزبيري (البيت الطبي):' : "Sana'a - Al-Zubairi Street (Medical House):"}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-300">
                    {isAr ? 'بجانب المستشفى الجمهوري، برج الأطباء، الدور الرابع' : 'Next to the Republican Hospital, Doctors Tower, 4th Floor'}
                  </p>
                </div>

                <div>
                  <strong className="block text-slate-800 dark:text-slate-100 font-bold mb-0.5">
                    {isAr ? 'صنعاء - مركز ابن سيناء:' : "Sana'a - Ibn Sina Center:"}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-300">
                    {isAr ? 'مركز ابن سيناء الطبي التشخيصي التخصصي' : 'Ibn Sina Specialized Medical Diagnostic Center'}
                  </p>
                </div>

                <div>
                  <strong className="block text-slate-800 dark:text-slate-100 font-bold mb-0.5">
                    {isAr ? 'الحديدة - شارع صنعاء:' : "Hodeidah - Sana'a Street:"}
                  </strong>
                  <p className="text-slate-600 dark:text-slate-300">
                    {isAr ? "شارع صنعاء الرئيسي (زيارات دورية معلنة)" : "Main Sana'a Street (periodic announced visits)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Mock Placeholder */}
            <div className="bg-white dark:bg-slate-900 transition-colors rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/90 shadow-soft space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary-700" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isAr ? 'موقع العيادة الجغرافي' : 'Clinic Location'}
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">Google Maps Placeholder</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800 h-44 flex flex-col items-center justify-center p-4 text-center">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg mb-2 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <strong className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {isAr ? 'صنعاء - جولة 45 - شارع تعز' : "Sana'a - Roundabout 45 - Taiz Street"}
                  </strong>
                  <span className="text-xs text-slate-500 mt-1">
                    {isAr
                      ? '(سيتم تضمين خريطة تفاعلية كاملة مع اتجاهات القيادة لاحقاً)'
                      : '(A full interactive map with driving directions will be embedded soon)'}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
