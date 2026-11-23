import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function FeedbackPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'ar' ? "صندوق الاقتراحات والشكاوى" : "Feedback & Concerns Box"}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'ar' ? "الشكاوى والمقترحات المباشرة" : "Patient Grievance & Feedback"}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {lang === 'ar'
              ? "نلتزم بأعلى معايير الشفافية وسلامة المرضى؛ تصل رسائلكم مباشرة إلى إدارة العيادة لضمان المتابعة الفورية والسرية."
              : "We adhere to patient rights and transparency; all inquiries reach clinic leadership directly with utmost confidentiality."}
          </p>
        </div>

        {/* Feedback Card */}
        <div className="animated-form-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? "تم إرسال رسالتكم بنجاح" : "Message Submitted Successfully"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {lang === 'ar' 
                  ? "شكراً لاهتمامكم بتطوير العيادة. سيتم التعامل مع رسالتكم بسرية تامة ومتابعتها مع الإدارة الطبية فوراً."
                  : "Thank you for helping us improve. Your message will be treated with absolute privacy and addressed promptly."}
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
                    {lang === 'ar' ? "الاسم (اختياري):" : "Name (Optional):"}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'ar' ? "يمكنك تركه فارغاً للسرية" : "Can be left blank for anonymity"}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {lang === 'ar' ? "رقم الهاتف للتواصل (اختياري):" : "Contact Phone (Optional):"}
                  </label>
                  <input
                    type="tel"
                    placeholder="7xxxxxxxx"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? "نوع الرسالة *" : "Type of Message *"}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <input type="radio" name="type" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                    <span>{lang === 'ar' ? "مقترح تطوير" : "Suggestion"}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <input type="radio" name="type" className="text-primary-600 focus:ring-primary-500" />
                    <span>{lang === 'ar' ? "شكوى أو ملاحظة" : "Complaint / Concern"}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'ar' ? "نص الرسالة أو المقترح *" : "Message Details *"}
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder={lang === 'ar' ? "اكتب تفاصيل مقترحك أو الشكوى بالتفصيل..." : "Write detailed feedback or concern here..."}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-600 hover:from-primary-800 hover:to-secondary-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {lang === 'ar' ? "إرسال إلى إدارة العيادة" : "Send to Administration"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
