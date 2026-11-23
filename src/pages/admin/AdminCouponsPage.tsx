import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Edit3,
  Percent,
  Plus,
  QrCode,
  Search,
  Sparkles,
  Tag,
  Ticket,
  Trash2,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { useClinic } from '../../context/ClinicContext';

interface CouponItem {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValueYER: number;
  maxUsageCount: number;
  currentUsageCount: number;
  validUntil: string;
  status: 'active' | 'expired' | 'disabled';
  notes: string;
}

const sampleCoupons: CouponItem[] = [
  {
    id: 'cpn-1',
    code: 'NODISC20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValueYER: 25000,
    maxUsageCount: 200,
    currentUsageCount: 84,
    validUntil: '2026-12-31',
    status: 'active',
    notes: 'خصم 20% على جميع مشدات الظهر والوسائد الطبية بمناسبة افتتاح المتجر',
  },
  {
    id: 'cpn-2',
    code: 'SPINE5000',
    discountType: 'fixed',
    discountValue: 5000,
    minOrderValueYER: 30000,
    maxUsageCount: 100,
    currentUsageCount: 41,
    validUntil: '2026-12-15',
    status: 'active',
    notes: 'خصم 5,000 ريال يمني عند شراء أجهزة السحب الفقري والمساج المنزلي',
  },
  {
    id: 'cpn-3',
    code: 'HEALTH10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValueYER: 15000,
    maxUsageCount: 500,
    currentUsageCount: 216,
    validUntil: '2026-11-30',
    status: 'active',
    notes: 'كوبون المتابعين على منصات التواصل لحملة التوعية بآلام الانزلاق الغضروفي',
  },
  {
    id: 'cpn-4',
    code: 'RAMADAN25',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValueYER: 40000,
    maxUsageCount: 50,
    currentUsageCount: 50,
    validUntil: '2026-04-15',
    status: 'expired',
    notes: 'عرض موسمي سابق اكتمل الحد الأقصى للاستخدام',
  },
];

export const AdminCouponsPage: React.FC = () => {
  const { lang } = useLanguage();
  const { formatPrice } = useClinic();
  const [coupons, setCoupons] = useState<CouponItem[]>(sampleCoupons);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`تم نسخ كود الكوبون (${code}) إلى الحافظة`);
  };

  const toggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' }
          : c
      )
    );
    showToast('تم تحديث حالة تفعيل الكوبون بنجاح');
  };

  const filtered = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.notes.includes(search)
  );

  return (
    <AdminLayout
      titleAr="نظام كوبونات وقسائم الخصم للمتجر"
      titleEn="Store Promo Coupons & Discounts"
    >
      <div className="space-y-6">
        {toast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">الكوبونات النشطة حالياً</span>
            <p className="font-display font-extrabold text-2xl text-[#0F4C5C]">
              {coupons.filter((c) => c.status === 'active').length} كوبونات
            </p>
            <p className="text-[11px] text-teal-700">متاحة للاستخدام المباشر في سلة المتجر</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">مرات الاستخدام الإجمالية</span>
            <p className="font-display font-extrabold text-2xl text-slate-900">
              {coupons.reduce((sum, c) => sum + c.currentUsageCount, 0)} طلب
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold">توفير حقيقي للمرضى والعملاء</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">أعلى نسبة خصم مطبقة</span>
            <p className="font-display font-extrabold text-2xl text-amber-600">
              25%
            </p>
            <p className="text-[11px] text-slate-500">تساعد على زيادة معدل التحويل والمبيعات</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[280px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث برمز الكوبون أو وصف الخصم..."
              className="w-full ps-10 pe-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C]"
            />
          </div>

          <button
            type="button"
            onClick={() => showToast('تم فتح نافذة إنشاء كوبون خصم جديد')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C5C] text-white text-xs font-bold hover:bg-[#093542] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء كوبون جديد</span>
          </button>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((cpn) => (
            <div
              key={cpn.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F4C5C] flex items-center justify-center font-bold shrink-0 border border-teal-200">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-base text-slate-900 tracking-wider">
                        {cpn.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCode(cpn.code)}
                        className="text-slate-400 hover:text-slate-700"
                        title="نسخ الكود"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">
                      {cpn.discountType === 'percentage'
                        ? `خصم ${cpn.discountValue}%`
                        : `خصم ${formatPrice(cpn.discountValue)}`}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    cpn.status === 'active'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : cpn.status === 'expired'
                      ? 'bg-slate-100 text-slate-500 border border-slate-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {cpn.status === 'active'
                    ? '● ساري ومفعل'
                    : cpn.status === 'expired'
                    ? '○ منتهي الصلاحية'
                    : '○ معطل مؤقتاً'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed">
                {cpn.notes}
              </p>

              {/* Rules & Usage Progress */}
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>الحد الأدنى للطلب:</span>
                  <strong className="text-slate-800 font-mono">{formatPrice(cpn.minOrderValueYER)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>صالح حتى تاريخ:</span>
                  <strong className="text-slate-800 font-mono">{cpn.validUntil}</strong>
                </div>
                <div className="flex justify-between">
                  <span>مرات الاستخدام:</span>
                  <span className="font-mono text-slate-700">
                    <strong>{cpn.currentUsageCount}</strong> / {cpn.maxUsageCount} طلب
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#0F4C5C] h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (cpn.currentUsageCount / cpn.maxUsageCount) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => toggleStatus(cpn.id)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {cpn.status === 'active' ? 'تعطيل الكوبون' : 'تفعيل الكوبون'}
                </button>

                <button
                  type="button"
                  onClick={() => showToast('تم فتح محرر شروط الكوبون')}
                  className="inline-flex items-center gap-1 text-[#0F4C5C] font-bold hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل الشروط</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
