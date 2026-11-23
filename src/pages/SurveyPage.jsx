import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  CheckSquare, 
  Send, 
  CheckCircle2, 
  Star, 
  Heart,
  Smile,
  ShieldCheck
} from 'lucide-react';

export default function SurveyPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-secondary-50 dark:bg-secondary-950 text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-800">
            <CheckSquare className="w-3.5 h-3.5 text-secondary-500" />
            {lang === 'ar' ? "استبيان رضا المراجعين" : "Patient Satisfaction Survey"}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'ar' ? "رأيك يهمنا لتطوير الرعاية" : "Your Feedback Matters"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lang === 'ar'
              ? "يهدف هذا الاستبيان لقياس مستوى رضاكم عن تجربة الزيارة والاستشارة وتطوير خدمات العيادة ومركز نوديسك."
              : "This survey measures your satisfaction with your clinical consultation experience to continuously refine our services."}
          </p>
        </div>

        {/* Survey Form Card */}
        <div className="animated-form-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? "شكراً جزيلاً لمشاركتكم!" : "Thank You For Your Feedback!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {lang === 'ar' 
                  ? "تم استلام تقييمكم بكل تقدير، وسيُؤخذ بعين الاعتبار في اجتماعات الجودة وتطوير رعاية المرضى."
                  : "Your responses have been recorded and will be carefully reviewed to enhance patient care quality."}
              </p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              {/* Rating stars */}
              <div className="text-center space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? "التقييم العام لتجربتكم في العيادة:" : "Overall Consultation Experience Rating:"}
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        className={`w-7 h-7 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "مدى وضوح شرح الدكتور للخطة العلاجية والخيارات البديلة:" : "Clarity of Dr. Al-Jarbani's explanation of options:"}
                  </label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500">
                    <option>{lang === 'ar' ? "ممتاز وواضح جداً" : "Excellent and very clear"}</option>
                    <option>{lang === 'ar' ? "جيد جداً" : "Very Good"}</option>
                    <option>{lang === 'ar' ? "متوسط" : "Average"}</option>
                    <option>{lang === 'ar' ? "يحتاج تفصيلاً أكثر" : "Needs more detail"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "سهولة حجز الموعد ودقة الوقت:" : "Ease of booking and appointment punctuality:"}
                  </label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500">
                    <option>{lang === 'ar' ? "سريع ومنتظم للغاية" : "Very prompt and organized"}</option>
                    <option>{lang === 'ar' ? "جيد" : "Good"}</option>
                    <option>{lang === 'ar' ? "وقت الانتظار كان طويلاً بعض الشيء" : "Waiting time was somewhat long"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "ملاحظات أو مقترحات ترغب بإضافتها:" : "Additional comments or suggestions:"}
                  </label>
                  <textarea
                    rows="3"
                    placeholder={lang === 'ar' ? "شاركنا رأيك بصراحة لمساعدتنا في تحسين خدماتنا..." : "Share your honest thoughts to help us improve..."}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-600 hover:from-primary-800 hover:to-secondary-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {lang === 'ar' ? "إرسال التقييم" : "Submit Survey"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
