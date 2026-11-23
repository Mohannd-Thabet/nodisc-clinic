import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Clock, 
  HelpCircle, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmartAssistant() {
  const { t, lang, isRtl } = useLanguage();
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: t('ai.welcome'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [t('ai.quick1'), t('ai.quick2'), t('ai.quick3'), t('ai.quick4')]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Knowledge base for answers
  const generateReply = (query) => {
    const q = query.toLowerCase();

    if (q.includes('دوام') || q.includes('ساعات') || q.includes('وقت') || q.includes('hours') || q.includes('time')) {
      return {
        text: lang === 'ar'
          ? "أوقات الدوام الرسمية في عيادة د. محمد الجرباني (مركز ابن سيناء بصنعاء):\n\n• الفترة الصباحية: 9:00 صباحاً – 2:00 ظهراً\n• الفترة المسائية: 4:00 عصراً – 9:00 مساءً\n\n⚠️ يرجى التأكيد المسبق للزيارة هاتفياً عبر الرقم 784545908."
          : "Official working hours at Dr. Al-Jarbani Clinic (Ibn Sina Center, Sana'a):\n\n• Morning Shift: 9:00 AM – 2:00 PM\n• Evening Shift: 4:00 PM – 9:00 PM\n\n⚠️ Please confirm your visit by phone in advance via 784545908.",
        actions: [{ label: t('nav.booking'), link: '/booking' }]
      };
    }

    if (q.includes('مكان') || q.includes('عنوان') || q.includes('موقع') || q.includes('وين') || q.includes('اين') || q.includes('location') || q.includes('address') || q.includes('where')) {
      return {
        text: lang === 'ar'
          ? "موقع العيادة الرئيسي:\n📍 صنعاء – شارع تعز – جولة 45 – فوق صيدلية الفيصل (مركز ابن سيناء الطبي التشخيصي).\n\nكما تتوفر خدمات التأهيل الحركي بمركز (نوديسك) والعيادات الاستشارية الأخرى."
          : "Clinic Main Location:\n📍 Sana'a – Taiz St. – 45 Roundabout – Above Al-Faisal Pharmacy (Ibn Sina Medical Diagnostic Center).\n\nPhysical therapy & motor rehabilitation are available at NODISC center.",
        actions: [
          { label: "Google Maps", external: "https://maps.app.goo.gl/hSCBc8ByMq4txKhR9" },
          { label: t('nav.contact'), link: '/contact' }
        ]
      };
    }

    if (q.includes('حجز') || q.includes('موعد') || q.includes('رقم') || q.includes('تواصل') || q.includes('واتساب') || q.includes('book') || q.includes('phone') || q.includes('contact') || q.includes('whatsapp')) {
      return {
        text: lang === 'ar'
          ? "يمكنك حجز موعد بعدة طرق مباشرة ومريحة:\n\n1. اتصال مباشر بهاتف العيادة: 784545908\n2. رسالة فورية عبر واتساب: 772070207\n3. تعبئة نموذج الحجز الذكي داخل الموقع لتوجيه حجزك تلقائياً."
          : "You can book an appointment in several easy ways:\n\n1. Call directly: +967 784545908\n2. WhatsApp chat: +967 772070207\n3. Fill out the smart booking form on the site to route your request automatically.",
        actions: [{ label: t('nav.booking'), link: '/booking' }]
      };
    }

    if (q.includes('انزلاق') || q.includes('ديسك') || q.includes('غضروف') || q.includes('عملية') || q.includes('جراحة') || q.includes('disc') || q.includes('surgery') || q.includes('spine')) {
      return {
        text: lang === 'ar'
          ? "يؤكد الدكتور محمد الجرباني أن أكثر من 85% من حالات الانزلاق الغضروفي وآلام العمود الفقري تُعالج بنجاح بالطرق التحفظية والعلاج الطبيعي التخصصي (عبر مركز نوديسك) والأدوية، ولا يُلجأ للتدخل الجراحي إلا عند وجود دواعٍ ملحة كضعف العضلات التدريجي أو عدم الاستجابة للعلاج التحفظي."
          : "Dr. Mohammed Al-Jarbani emphasizes that over 85% of disc herniations and spinal pain cases are successfully managed through conservative therapies, physical rehabilitation (NODISC), and medical therapy, reserving surgery strictly for specific neurological emergencies or failed conservative lines.",
        actions: [
          { label: t('nav.spine'), link: '/spine-care' },
          { label: t('nav.nodisc'), link: '/physiotherapy' }
        ]
      };
    }

    if (q.includes('نوديسك') || q.includes('طبيعي') || q.includes('تأهيل') || q.includes('nodisc') || q.includes('physio')) {
      return {
        text: lang === 'ar'
          ? "مركز (نوديسك للعلاج الطبيعي والتأهيل - NODISC) هو المركز المتخصص التابع لبرامج الدكتور لإعادة التأهيل الحركي، وتخفيف الضغط الغضروفي، وتأهيل ما بعد جراحات الدماغ والعمود الفقري والإصابات الرياضية دون تدخل جراحي."
          : "NODISC Physiotherapy & Rehabilitation Center is the specialized facility affiliated with Dr. Al-Jarbani's protocol for motor rehabilitation, non-surgical decompression, and post-operative cranial and spinal recovery.",
        actions: [{ label: t('nav.nodisc'), link: '/physiotherapy' }]
      };
    }

    if (q.includes('دكتور') || q.includes('طبيب') || q.includes('من هو') || q.includes('شهادات') || q.includes('خبرة') || q.includes('doctor') || q.includes('about') || q.includes('who')) {
      return {
        text: lang === 'ar'
          ? "الدكتور محمد عبدالله الجرباني هو استشاري جراحة المخ والأعصاب والعمود الفقري في اليمن، يمتلك خبرة جراحية واسعة في عمليات قاع الجمجمة واستئصال الأورام، جراحات الانزلاقات الغضروفية الدقيقة، وتصحيح تشوهات العمود الفقري."
          : "Dr. Mohammed Abdullah Al-Jarbani is a senior Consultant in Neurosurgery and Spine Surgery in Yemen, with extensive surgical experience in skull base surgery, tumor resections, microdiscectomies, and spinal deformity corrections.",
        actions: [
          { label: t('nav.about'), link: '/about' }
        ]
      };
    }

    return {
      text: lang === 'ar'
        ? "شكراً لتواصلك! أستطيع إرشادك في أي وقت حول:\n• تخصصات المخ والأعصاب وجراحات العمود الفقري\n• خدمات مركز نوديسك للعلاج الطبيعي\n• أوقات الدوام وعناوين العيادة بصنعاء\n• حجز موعد استشاري أو التواصل مع فريق الطبيب."
        : "Thank you for reaching out! I can assist you with:\n• Brain, neurosurgery & spine specialties\n• NODISC Physical Therapy services\n• Clinic working hours and Sana'a address\n• Booking an appointment or speaking with the medical staff.",
      actions: [
        { label: t('nav.booking'), link: '/booking' },
        { label: t('nav.contact'), link: '/contact' }
      ]
    };
  };

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateReply(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply.text,
        actions: reply.actions || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 md:bottom-8 ${isRtl ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-50 p-3.5 rounded-full shadow-2xl bg-gradient-to-r from-primary-700 via-secondary-500 to-gold-400 text-white hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2 border-2 border-white/40 dark:border-slate-800/60`}
        aria-label={t('common.aiAssistant')}
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-ping" />
        </div>
        <span className="hidden lg:inline text-xs font-bold tracking-wide pe-1">
          {t('common.aiAssistant')}
        </span>
      </button>

      {/* Chat Dialog Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-24 md:bottom-24 ${isRtl ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-50 w-[92vw] sm:w-[420px] max-h-[620px] h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-secondary-600 text-white px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                <Bot className="w-6 h-6 text-gold-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base flex items-center gap-1.5">
                  {t('common.aiAssistant')}
                  <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                </h3>
                <p className="text-[11px] text-primary-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {lang === 'ar' ? 'متصل للإرشاد الطبي للعيادة' : 'Online Clinic Guidance'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 active:scale-95 text-white/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Medical Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800/50 px-4 py-2 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300 leading-tight">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{t('common.aiDisclaimer')}</span>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 dark:bg-slate-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-primary-700 to-secondary-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {msg.text}

                  {/* Actions / Links */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap gap-2">
                      {msg.actions.map((act, idx) => (
                        act.external ? (
                          <a
                            key={idx}
                            href={act.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-[11px] font-bold hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                          >
                            {act.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            to={act.link}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-50 dark:bg-secondary-950 text-secondary-700 dark:text-secondary-300 text-[11px] font-bold hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors"
                          >
                            {act.label}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggestions Pills */}
                {msg.suggestions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="text-[11px] bg-white dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full font-medium transition-colors text-start"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('ai.inputPlaceholder')}
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs md:text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-2xl bg-primary-700 hover:bg-primary-600 disabled:opacity-40 text-white shadow-md active:scale-95 transition-all"
              aria-label={t('ai.send')}
            >
              <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
