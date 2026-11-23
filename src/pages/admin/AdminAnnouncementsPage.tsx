import React, { useState } from 'react';
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ExternalLink,
  Eye,
  Megaphone,
  Radio,
  Save,
  Sparkles,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';

interface AnnouncementConfig {
  isEnabled: boolean;
  type: 'info' | 'promotion' | 'urgent';
  titleAr: string;
  messageAr: string;
  actionLabelAr: string;
  actionUrl: string;
  autoExpireDate: string;
}

const defaultConfig: AnnouncementConfig = {
  isEnabled: true,
  type: 'info',
  titleAr: 'تنويه هام لمرضى العيادة والزوار:',
  messageAr: 'يتواجد الدكتور محمد عبدالله الجرباني في مركز ابن سينا الطبي بصنعاء خلال الفترتين الصباحية والمسائية. يُفضل حجز الموعد مسبقاً لتقليل فترة الانتظار.',
  actionLabelAr: 'حجز موعد الآن',
  actionUrl: '/booking',
  autoExpireDate: '2026-12-31',
};

export const AdminAnnouncementsPage: React.FC = () => {
  const { lang } = useLanguage();
  const [config, setConfig] = useState<AnnouncementConfig>(defaultConfig);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast('تم حفظ إعدادات شريط الإعلانات وتحديث الموقع العام بنجاح');
  };

  return (
    <AdminLayout
      titleAr="شريط التنبيهات والإعلانات العاجلة للموقع"
      titleEn="Clinic Announcements & Emergency Top Bar"
    >
      <div className="space-y-6">
        {toast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* Live Preview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#0F4C5C]" />
              <span>معاينة حية لشريط الإعلان أعلى الموقع العام:</span>
            </div>
            <span>{config.isEnabled ? '● الشريط مفعّل حالياً' : '○ الشريط معطل ومخفي'}</span>
          </div>

          {config.isEnabled ? (
            <div
              className={`rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-medium transition-colors ${
                config.type === 'urgent'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : config.type === 'promotion'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
                  : 'bg-[#0F4C5C] text-white shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <strong>{config.titleAr}</strong>
                <span>{config.messageAr}</span>
              </div>

              {config.actionLabelAr && (
                <span className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold inline-flex items-center gap-1 backdrop-blur-xs">
                  <span>{config.actionLabelAr}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-400">
              الشريط معطل ولن يظهر للزوار في أعلى صفحات الموقع
            </div>
          )}
        </div>

        {/* Settings Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                إعدادات وتخصيص نص الإعلان
              </h3>
              <p className="text-xs text-slate-500">
                يمكنك كتابة أي تنويه طبي، موعد إجازة، أو الترويج لحملة كشف مجانية تظهر أعلى صفحات الموقع.
              </p>
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.isEnabled}
                onChange={(e) => setConfig({ ...config, isEnabled: e.target.checked })}
                className="w-4 h-4 text-[#0F4C5C] rounded border-slate-300 focus:ring-[#0F4C5C]"
              />
              <span className="text-xs font-bold text-slate-800">تفعيل الشريط في الموقع</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Type */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">نوع الإعلان ولون الشريط:</label>
              <select
                value={config.type}
                onChange={(e) =>
                  setConfig({ ...config, type: e.target.value as 'info' | 'promotion' | 'urgent' })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
              >
                <option value="info">أزرق داكن بترولي (إعلان طبي وإرشادي عام)</option>
                <option value="promotion">ذهبي / كهرماني (عروض، حملات وخصومات المتجر)</option>
                <option value="urgent">أحمر قرمزي (تنويه عاجل، إجازات، تعديل دوام طارئ)</option>
              </select>
            </div>

            {/* Expire Date */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">تاريخ الإيقاف التلقائي:</label>
              <input
                type="date"
                value={config.autoExpireDate}
                onChange={(e) => setConfig({ ...config, autoExpireDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
              />
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">عنوان التنويه المختصر:</label>
              <input
                type="text"
                value={config.titleAr}
                onChange={(e) => setConfig({ ...config, titleAr: e.target.value })}
                placeholder="مثال: تنويه هام لمرضى العيادة:"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
              />
            </div>

            {/* Action Button Label */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">نص زر الإجراء (اختياري):</label>
              <input
                type="text"
                value={config.actionLabelAr}
                onChange={(e) => setConfig({ ...config, actionLabelAr: e.target.value })}
                placeholder="مثال: حجز موعد الآن أو تصفح العروض"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
              />
            </div>

            {/* Full Message */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-700">نص الرسالة والإعلان الكامل:</label>
              <textarea
                rows={3}
                value={config.messageAr}
                onChange={(e) => setConfig({ ...config, messageAr: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] leading-relaxed"
              />
            </div>

            {/* Action Link Target */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-700">رابط التوجيه عند النقر على الزر:</label>
              <input
                type="text"
                value={config.actionUrl}
                onChange={(e) => setConfig({ ...config, actionUrl: e.target.value })}
                placeholder="/booking أو /nodisc-store أو /campaigns"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F4C5C] hover:bg-[#093542] text-white text-xs font-bold shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتحديث الشريط في الموقع</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
