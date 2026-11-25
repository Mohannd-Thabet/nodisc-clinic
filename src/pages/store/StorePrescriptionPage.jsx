import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, UploadCloud, CheckCircle2, Phone, User, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function StorePrescriptionPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/store" className="hover:text-primary-600 inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'رئيسية المتجر' : 'Store Home'}</span>
          </Link>
          <span>/</span>
          <span className="font-bold text-primary-700 dark:text-secondary-400">
            {isAr ? 'طلب بصورة وصفة طبية' : 'Order by Prescription'}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {isAr ? 'طلب دواء أو مستلزم بصورة الوصفة' : 'Upload Medical Prescription (Rx)'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isAr
                ? 'ارفع صورة الوصفة الطبية وسيتولى صيدلاني نوديسك تجهيزها والتواصل معك بالسعر وخيارات التوصيل.'
                : 'Upload your prescription image and our pharmacist will prepare it and contact you.'}
            </p>
          </div>

          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {isAr ? 'تم استلام الوصفة بنجاح!' : 'Prescription Received!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {isAr
                  ? 'سيتم مراجعة الوصفة من قبل الصيدلاني المناوب والتواصل معك على رقمك خلال دقائق.'
                  : 'Our duty pharmacist will review your prescription and reach out shortly.'}
              </p>
              <Link
                to="/store"
                className="inline-block px-6 py-2.5 rounded-xl bg-primary-700 text-white font-bold text-xs"
              >
                {isAr ? 'العودة إلى المتجر' : 'Back to Store'}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'اسم المريض الكامل' : 'Patient Full Name'}
                </label>
                <div className="relative">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-primary-500"
                    placeholder={isAr ? 'الاسم الثلاثي' : 'Full name'}
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                </label>
                <div className="relative">
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-primary-500"
                    placeholder="77xxxxxxx"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'صورة الوصفة الطبية' : 'Prescription Image'}
                </label>
                <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-primary-300 dark:border-slate-700 bg-primary-50/40 dark:bg-slate-800/40 cursor-pointer hover:border-primary-500 transition-colors">
                  <UploadCloud className="w-8 h-8 text-primary-600 mb-2" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {fileName || (isAr ? 'اضغط لاختيار صورة الوصفة (JPG, PNG, PDF)' : 'Click to choose prescription file')}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isAr ? 'ملاحظات إضافية أو عنوان التوصيل' : 'Notes / Delivery Address'}
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-primary-500"
                    placeholder={isAr ? 'أدخل أي تفاصيل إضافية...' : 'Any additional details...'}
                  />
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-black text-sm shadow-lg transition-all"
              >
                {isAr ? 'إرسال الوصفة للصيدلية' : 'Send Prescription to Pharmacy'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
