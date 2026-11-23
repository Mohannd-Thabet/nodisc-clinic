import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { doctorInfo } from '../../data/doctorInfo';
import { useLanguage } from '../../context/LanguageContext';

export default function CTASection() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const whatsappMsg = isAr
    ? doctorInfo.whatsappMessage
    : 'Hello Dr. Mohammed Al-Jarbani, I would like to book a medical consultation appointment.';
  const whatsappUrl = `https://wa.me/${doctorInfo.whatsappPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
          
          {/* Decorative background shapes */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 text-xs font-bold">
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'لا تؤجل صحتك وعافيتك' : "Don't Delay Your Health"}</span>
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              {isAr
                ? 'هل تعاني من آلام الظهر، الرقبة، أو تشخيص عصبي مقلق؟'
                : 'Suffering from Back Pain, Neck Pain, or a Worrying Neurological Diagnosis?'}
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? 'احصل على استشارة طبية متخصصة ورأي طبي استشاري موثوق مع الدكتور محمد عبدالله الجرباني في صنعاء أو الحديدة.'
                : 'Get a specialized medical consultation with Dr. Mohammed Abdullah Al-Jarbani in Sana\'a or Hodeidah.'}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold-400 hover:bg-gold-500 text-slate-950 font-extrabold text-base shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>{isAr ? 'حجز موعد عبر النموذج' : 'Book via Form'}</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isAr ? 'حجز سريع عبر واتساب' : 'Quick Book via WhatsApp'}</span>
              </a>

              <a
                href={`tel:${doctorInfo.bookingPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white font-bold text-base transition-all duration-300 hover:bg-white/10"
              >
                <Phone className="w-5 h-5 text-gold-300" />
                <span dir="ltr">{doctorInfo.bookingPhone}</span>
              </a>
            </div>

            {/* Availability notes */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>
                  {isAr
                    ? 'العيادات: صنعاء (شارع تعز / الزبيري) & الحديدة'
                    : 'Clinics: Sana\'a (Taiz St / Zubairi) & Hodeidah'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>
                  {isAr
                    ? 'الرد وتنسيق المواعيد خلال ساعات العمل'
                    : 'Replies and scheduling during working hours'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
