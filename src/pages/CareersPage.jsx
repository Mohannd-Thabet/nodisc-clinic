import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Briefcase, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  FileText,
  Sparkles
} from 'lucide-react';

export default function CareersPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
            <Briefcase className="w-3.5 h-3.5 text-gold-500" />
            {lang === 'ar' ? "الانضمام لفريق العمل" : "Career Opportunities"}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'ar' ? "التوظيف والفرص المهنية" : "Join Our Medical & Clinical Team"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lang === 'ar'
              ? "نرحب بالكوادر الطبية والتمريضية وأخصائيي العلاج الطبيعي المتميزين للانضمام إلى منظومة رعاية د. محمد الجرباني ومركز نوديسك."
              : "We welcome qualified medical professionals, nursing staff, and licensed physiotherapists to join our practice and NODISC center."}
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-800">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? "تم استلام طلب التوظيف بنجاح!" : "Application Received Successfully!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {lang === 'ar' 
                  ? "شكراً لاهتمامك بالانضمام إلى فريقنا. سيقوم قسم الموارد البشرية بمراجعة سيرتك الذاتية والتواصل معك عند توفر شواغر مناسبة."
                  : "Thank you for your interest. Our administration will review your credentials and contact you once a matching position opens."}
              </p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? "د. / أ. ..." : "Dr. / Mr. / Ms. ..."}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="7xxxxxxxx"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "المسمى الوظيفي المطلوب *" : "Desired Role *"}
                  </label>
                  <select 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">{lang === 'ar' ? "-- اختر المسمى --" : "-- Select Position --"}</option>
                    <option value="physio">{lang === 'ar' ? "أخصائي / أخصائية علاج طبيعي (نوديسك)" : "Physical Therapist (NODISC)"}</option>
                    <option value="nurse">{lang === 'ar' ? "تمريض تخصصي وجراحة" : "Specialized Surgical Nurse"}</option>
                    <option value="reception">{lang === 'ar' ? "استقبال وتنسيق مواعيد" : "Reception & Scheduling"}</option>
                    <option value="admin">{lang === 'ar' ? "إدارة وتنسيق طبي" : "Medical Coordination & Admin"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "سنوات الخبرة *" : "Years of Experience *"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="2"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? "نبذة عن المؤهلات العلمية والسيرة *" : "Summary of Qualifications & Experience *"}
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder={lang === 'ar' ? "اكتب نبذة مختصرة عن مؤهلاتك وأماكن العمل السابقة..." : "Brief summary of qualifications and previous clinics/hospitals..."}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-600 hover:from-primary-800 hover:to-secondary-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {lang === 'ar' ? "إرسال طلب التوظيف" : "Submit Application"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
