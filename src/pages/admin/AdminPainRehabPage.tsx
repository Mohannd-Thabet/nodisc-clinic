import React, { useState } from 'react';
import {
  Activity,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Edit3,
  FileCheck2,
  FileText,
  Layers,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Stethoscope,
  Video,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';

interface RehabProgram {
  id: string;
  titleAr: string;
  durationAr: string;
  targetGroupAr: string;
  status: 'active' | 'draft';
  videoTitleAr: string;
  videoDuration: string;
  enrolledPatients: number;
  successRate: string;
}

const initialPrograms: RehabProgram[] = [
  {
    id: 'prg-1',
    titleAr: 'برنامج البالغين المكثف (3 أسابيع)',
    durationAr: '3 أسابيع (من الأحد إلى الخميس، 8 ص - 3 ع)',
    targetGroupAr: 'الآلام المزمنة الشديدة والانزلاق الغضروفي المعقد',
    status: 'active',
    videoTitleAr: 'المحاضرة التثقيفية: فسيولوجيا الألم وتدريب الجهاز العصبي المركزي',
    videoDuration: '24 دقيقة',
    enrolledPatients: 42,
    successRate: '92%',
  },
  {
    id: 'prg-2',
    titleAr: 'البرنامج المتقدم السريع (يومان)',
    durationAr: 'يومان مكثفان (تأهيل إقليمي ومرضى المحافظات)',
    targetGroupAr: 'الحالات المتوسطة ومرضى السفر الذين يحتاجون خطة ذاتية',
    status: 'active',
    videoTitleAr: 'ورشة التمارين الوظيفية والارتجاع البيولوجي المنزلي',
    videoDuration: '18 دقيقة',
    enrolledPatients: 68,
    successRate: '88%',
  },
  {
    id: 'prg-3',
    titleAr: 'برنامج اعتلال الجذور وعرق النسا الموجه',
    durationAr: 'أسبوعان علاجيان مع سحب فقري ميكانيكي',
    targetGroupAr: 'الضغط العصبي القطني، ألم الساق وعرق النسا الحاد',
    status: 'active',
    videoTitleAr: 'بروتوكول إزالة الضغط الفقري غير الجراحي والعلاج الميكانيكي',
    videoDuration: '31 دقيقة',
    enrolledPatients: 115,
    successRate: '94%',
  },
  {
    id: 'prg-4',
    titleAr: 'برنامج تأهيل ما بعد جراحات العمود الفقري',
    durationAr: '4 أسابيع تدريجية',
    targetGroupAr: 'مرضى ما بعد استئصال الغضروف وتثبيت الفقرات لاستعادة النشاط',
    status: 'active',
    videoTitleAr: 'مراحل إعادة التأهيل الحركي ومنع متلازمة الجراحة الفاشلة (FBSS)',
    videoDuration: '26 دقيقة',
    enrolledPatients: 53,
    successRate: '95%',
  },
];

export const AdminPainRehabPage: React.FC = () => {
  const { lang } = useLanguage();
  const [programs, setPrograms] = useState<RehabProgram[]>(initialPrograms);
  const [activeTab, setActiveTab] = useState<'programs' | 'videos' | 'outcomes' | 'standards'>('programs');
  const [notice, setNotice] = useState<string | null>(null);

  const showSaved = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const toggleStatus = (id: string) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'active' ? 'draft' : 'active' } : p
      )
    );
    showSaved('تم تحديث حالة البرنامج بنجاح');
  };

  return (
    <AdminLayout
      titleAr="إدارة مركز نوديسك لعلاج الألم والتأهيل (معايير مايو كلينك)"
      titleEn="Mayo Clinic PRC & Pain Rehab Management"
    >
      <div className="space-y-6">
        {/* Banner Alert */}
        {notice && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Top Header & Standards Pill */}
        <div className="bg-gradient-to-r from-[#0F4C5C] to-[#1B4965] rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-teal-950/20">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
              <Award className="w-3.5 h-3.5" />
              <span>معايير بروتوكول مايو كلينك الأمريكي (Mayo Clinic PRC Protocol)</span>
            </div>
            <h1 className="font-display font-bold text-xl sm:text-2xl">
              إدارة برامج تأهيل الألم والوسائط التعليمية
            </h1>
            <p className="text-xs text-teal-100/90 max-w-2xl">
              التحكم المباشر في البرامج التأهيلية الـ 4، مشغل الفيديوهات التدريبية والمحاضرات، وإحصائيات التجارب السريرية المنشورة في قسم نوديسك.
            </p>
          </div>

          <button
            type="button"
            onClick={() => showSaved('تم فتح نموذج إضافة برنامج تأهيلي جديد')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0F4C5C] text-xs font-bold shadow-md hover:bg-teal-50 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة برنامج تأهيلي</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-3 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'programs'
                ? 'border-[#0F4C5C] text-[#0F4C5C]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>البرامج التأهيلية الـ 4</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'videos'
                ? 'border-[#0F4C5C] text-[#0F4C5C]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>مشغل الفيديو والمحاضرات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('outcomes')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'outcomes'
                ? 'border-[#0F4C5C] text-[#0F4C5C]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>النتائج السريرية والأبحاث</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('standards')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'standards'
                ? 'border-[#0F4C5C] text-[#0F4C5C]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>أركان مايو كلينك والجدول اليومي</span>
          </button>
        </div>

        {/* Tab 1: Programs */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        prog.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {prog.status === 'active' ? '● مفعّل ومعروض للمرضى' : '○ مسودة'}
                    </span>
                    <h3 className="font-display font-bold text-base text-slate-900">{prog.titleAr}</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStatus(prog.id)}
                    className="text-xs text-slate-500 hover:text-[#0F4C5C] font-semibold px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50"
                  >
                    {prog.status === 'active' ? 'تعطيل' : 'تفعيل'}
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
                    <span>المدة: {prog.durationAr}</span>
                  </div>
                  <p><strong className="text-slate-800">الفئة المستهدفة:</strong> {prog.targetGroupAr}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
                  <div className="flex items-center gap-3">
                    <span>المرضى المسجلون: <strong className="text-slate-900">{prog.enrolledPatients}</strong></span>
                    <span>نسبة التعافي: <strong className="text-emerald-700">{prog.successRate}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showSaved('تم فتح محرر تفاصيل البرنامج')}
                    className="inline-flex items-center gap-1 text-[#0F4C5C] font-bold hover:underline"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Videos */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  فيديوهات ومحاضرات برامج التأهيل اليومية
                </h3>
                <p className="text-xs text-slate-500">
                  يتم بث هذه الفيديوهات التفاعلية للمرضى في صفحة مركز التأهيل ضمن محاكي الفيديو.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showSaved('تم حفظ مسارات الفيديوهات الجديدة')}
                className="px-4 py-2 rounded-xl bg-[#0F4C5C] text-white text-xs font-bold hover:bg-[#093542]"
              >
                حفظ التعديلات
              </button>
            </div>

            <div className="space-y-3">
              {programs.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#0F4C5C] flex items-center justify-center shrink-0 font-bold">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{p.videoTitleAr}</h4>
                      <p className="text-xs text-slate-500">البرنامج: {p.titleAr} • المدة: {p.videoDuration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                      type="text"
                      defaultValue={`https://nodisc-cdn.example/videos/rehab-${idx + 1}.mp4`}
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white w-full md:w-64 font-mono text-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => showSaved('تم تحديث رابط الفيديو')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 shrink-0"
                    >
                      تحديث
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Outcomes */}
        {activeTab === 'outcomes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <span className="text-xs font-bold text-[#0F4C5C] bg-teal-50 px-2.5 py-1 rounded-md">الدراسة السريرية الأولى</span>
              <h4 className="font-bold text-slate-900 text-sm">متابعة 500 مريض انزلاق غضروفي قطني</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                تراجع درجات مقياس الألم (VAS) من 8.4 إلى 2.1 بعد استكمال بروتوكول التأهيل متعدد التخصصات وتجنب الجراحة بنسبة 86%.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">الحالة: موثقة ومنشورة</span>
                <span className="font-bold text-emerald-600">86% تعافي</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <span className="text-xs font-bold text-[#0F4C5C] bg-teal-50 px-2.5 py-1 rounded-md">الدراسة السريرية الثانية</span>
              <h4 className="font-bold text-slate-900 text-sm">التوقف الآمن عن المسكنات الأفيونية</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                استطاع 73% من مرضى الألم المزمن التوقف التدريجي التام عن المسكنات القوية واستبدالها بالتحفيز الحيوي والتمارين الحركية.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">الحالة: موثقة ومنشورة</span>
                <span className="font-bold text-emerald-600">73% توقف تام</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <span className="text-xs font-bold text-[#0F4C5C] bg-teal-50 px-2.5 py-1 rounded-md">الدراسة السريرية الثالثة</span>
              <h4 className="font-bold text-slate-900 text-sm">استعادة القدرة على المشي والعمل</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارتفاع متوسط مسافة المشي اليومية من 250 متراً إلى أكثر من 2,400 متراً خلال 6 أسابيع من التأهيل الوظيفي المهني.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">الحالة: موثقة ومنشورة</span>
                <span className="font-bold text-emerald-600">+850% تحسن</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Standards */}
        {activeTab === 'standards' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900">
              جدول الجلسات اليومية للبرنامج المكثف
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-start font-bold">الوقت</th>
                    <th className="px-4 py-3 text-start font-bold">النشاط التأهيلي</th>
                    <th className="px-4 py-3 text-start font-bold">المشرف المسؤول</th>
                    <th className="px-4 py-3 text-start font-bold">الهدف السريري</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0F4C5C]">08:00 – 09:30 ص</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">العلاج الطبيعي الحركي والشد الميكانيكي</td>
                    <td className="px-4 py-3 text-slate-600">فريق العلاج الطبيعي</td>
                    <td className="px-4 py-3 text-emerald-700">تخفيف ضغط الجذور العصبية</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0F4C5C]">09:45 – 11:15 ص</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">العلاج الوظيفي وبيئة العمل (Ergonomics)</td>
                    <td className="px-4 py-3 text-slate-600">أخصائي العلاج الوظيفي</td>
                    <td className="px-4 py-3 text-emerald-700">تصحيح وضعيات الجلوس والرفع اليومية</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0F4C5C]">11:30 – 01:00 م</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">محاضرة فسيولوجيا الألم والتحسس المركزي</td>
                    <td className="px-4 py-3 text-slate-600">استشاري علاج الألم / د. محمد الجرباني</td>
                    <td className="px-4 py-3 text-emerald-700">إعادة تشكيل مسارات الإدراك العصبي</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0F4C5C]">01:30 – 03:00 م</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">جلسة الارتجاع البيولوجي والاسترخاء التكيفي</td>
                    <td className="px-4 py-3 text-slate-600">أخصائي التأهيل العصبي</td>
                    <td className="px-4 py-3 text-emerald-700">خفض التوتر العضلي وتثبيط إشارات الألم</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
