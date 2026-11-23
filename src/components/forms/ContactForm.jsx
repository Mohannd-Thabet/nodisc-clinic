import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { doctorInfo } from '../../data/doctorInfo';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: 'صنعاء - شارع تعز',
    consultationType: 'استشارة عامة',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('يرجى كتابة الاسم ورقم الهاتف على الأقل لمتابعة الحجز.');
      return;
    }

    // Simulate submission
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      preferredLocation: 'صنعاء - شارع تعز',
      consultationType: 'استشارة عامة',
      message: ''
    });
  };

  const whatsappMessage = encodeURIComponent(
    `مرحباً د. محمد الجرباني،\nأنا: ${formData.name}\nرقم هاتفي: ${formData.phone}\nالموقع المفضل: ${formData.preferredLocation}\nنوع الاستشارة: ${formData.consultationType}\nتفاصيل الحالة: ${formData.message}`
  );

  return (
    <div className="animated-form-card bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            تم استلام طلبك بنجاح!
          </h3>
          <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
            شكراً لتواصلك يا <strong className="text-primary-700">{formData.name}</strong>. سيقوم منسق الحجوزات في عيادة الدكتور محمد الجرباني بالتواصل معك عبر الهاتف لتأكيد الموعد بأقرب وقت.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <a
              href={`https://wa.me/${doctorInfo.whatsappPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>إرسال تفاصيل الحجز عبر واتساب فوراً</span>
            </a>
            
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors text-sm"
            >
              إرسال طلب آخر
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              طلب حجز موعد استشارة
            </h3>
            <p className="text-sm text-slate-500">
              املأ البيانات التالية وسيتواصل معك فريق العيادة لتأكيد الموعد المناسب
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                الاسم الكامل للمريض <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: أحمد عبد الله"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-800 text-sm transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                رقم الهاتف / الواتساب <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="مثال: 784545908 أو 770000000"
                required
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-800 text-sm text-right transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                البريد الإلكتروني <span className="text-xs text-slate-400 font-normal">(اختياري)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-800 text-sm text-right transition-all"
              />
            </div>

            {/* Preferred Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                العيادة أو الموقع المفضل
              </label>
              <select
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-800 text-sm bg-white transition-all"
              >
                <option value="صنعاء - شارع تعز (جولة 45)">صنعاء: شارع تعز – جولة 45 (العيادة الرئيسية)</option>
                <option value="صنعاء - البيت الطبي (شارع الزبيري)">صنعاء: البيت الطبي – شارع الزبيري</option>
                <option value="صنعاء - مركز ابن سيناء التشخيصي">صنعاء: مركز ابن سيناء الطبي التشخيصي</option>
                <option value="الحديدة - شارع صنعاء">الحديدة: عيادة شارع صنعاء</option>
              </select>
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              نوع الحالة أو الاستشارة
            </label>
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-800 text-sm bg-white transition-all"
            >
              <option value="انزلاق غضروفي (عرق النسا / الرقبة)">انزلاق غضروفي (عرق النسا / الرقبة)</option>
              <option value="جراحة وأورام الدماغ">جراحة وأورام الدماغ</option>
              <option value="جراحة وتثبيت العمود الفقري">جراحة وتثبيت العمود الفقري</option>
              <option value="أورام العمود الفقري والحبل الشوكي">أورام العمود الفقري والحبل الشوكي</option>
              <option value="تشوهات الدماغ والجمجمة والعمود الفقري">تشوهات الدماغ والجمجمة والعمود الفقري</option>
              <option value="إصابات ورضوض الرأس والعمود الفقري">إصابات ورضوض الرأس والعمود الفقري (حوادث)</option>
              <option value="علاج الصرع والشلل الدماغي">علاج الصرع والشلل الدماغي</option>
              <option value="تسليك أعصاب اليد والأعصاب الطرفية">تسليك أعصاب اليد والأعصاب الطرفية</option>
              <option value="طب جراحة المخ والأعصاب للأطفال">طب جراحة المخ والأعصاب للأطفال (استسقاء الرأس)</option>
              <option value="رأي طبي ثاني لمريض">رأي طبي استشاري ثاني</option>
              <option value="أخرى">حالة أخرى غير مذكورة</option>
            </select>
          </div>

          {/* Message / Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              تفاصيل الحالة أو الأعراض التي تعاني منها
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب نبذة مختصرة عن الأعراض، منذ متى بدأت، وهل أجريت أي أشعة أو رنين مغناطيسي سابقاً..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-800 text-sm transition-all resize-y"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>إرسال طلب الحجز الآن</span>
              <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-center text-slate-400 mt-3">
              * بياناتك الطبية والشخصية تُعامل بأعلى درجات السرية والخصوصية
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
