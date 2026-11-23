import React, { useState } from 'react';
import {
  Banknote,
  CheckCircle2,
  Clock,
  Coins,
  CreditCard,
  Download,
  FileCheck2,
  FileText,
  Filter,
  Plus,
  Printer,
  QrCode,
  Search,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useLanguage } from '../../context/LanguageContext';
import { useClinic } from '../../context/ClinicContext';

interface FinancialVoucher {
  id: string;
  voucherNumber: string;
  patientName: string;
  serviceType: 'كشف استشاري' | 'جلسات تأهيل نوديسك' | 'جراحة عمود فقري' | 'متجر طبي';
  amountYER: number;
  paymentMethod: 'kuraimi' | 'jawali' | 'jeeb' | 'onecash' | 'flousak' | 'cash';
  methodLabelAr: string;
  txReference: string;
  date: string;
  status: 'paid' | 'pending_verification' | 'refunded';
  notes: string;
}

const sampleVouchers: FinancialVoucher[] = [
  {
    id: 'v-1',
    voucherNumber: 'REC-2026-1042',
    patientName: 'يحيى عبد الكريم المحمدي',
    serviceType: 'جلسات تأهيل نوديسك',
    amountYER: 120000,
    paymentMethod: 'kuraimi',
    methodLabelAr: 'الكريمي حاسب (784545908)',
    txReference: 'TX-KRM-994821',
    date: '2026-11-23',
    status: 'paid',
    notes: 'رسوم الاشتراك في برنامج نوديسك المكثف لأسبوعين',
  },
  {
    id: 'v-2',
    voucherNumber: 'REC-2026-1041',
    patientName: 'منى رشاد العريقي',
    serviceType: 'متجر طبي',
    amountYER: 34000,
    paymentMethod: 'onecash',
    methodLabelAr: 'محفظة ون كاش (772070207)',
    txReference: 'TX-1C-558291',
    date: '2026-11-23',
    status: 'paid',
    notes: 'شراء مشد قطني طبي داعم ووسادة رقبة طبية',
  },
  {
    id: 'v-3',
    voucherNumber: 'REC-2026-1040',
    patientName: 'صادق ناجي الوادعي',
    serviceType: 'كشف استشاري',
    amountYER: 15000,
    paymentMethod: 'jawali',
    methodLabelAr: 'محفظة جوالي (772070207)',
    txReference: 'TX-JWL-110293',
    date: '2026-11-22',
    status: 'paid',
    notes: 'معاينة استشارية وقراءة أشعة الرنين المغناطيسي',
  },
  {
    id: 'v-4',
    voucherNumber: 'REC-2026-1039',
    patientName: 'فاطمة صالح الهمداني',
    serviceType: 'جراحة عمود فقري',
    amountYER: 850000,
    paymentMethod: 'kuraimi',
    methodLabelAr: 'الكريمي حاسب (784545908)',
    txReference: 'TX-KRM-883912',
    date: '2026-11-21',
    status: 'paid',
    notes: 'دفعة تأكيد حجز موعد العملية الجراحية وتجهيز القفص الكربوني',
  },
  {
    id: 'v-5',
    voucherNumber: 'REC-2026-1038',
    patientName: 'عمار عبدالسلام القدسي',
    serviceType: 'متجر طبي',
    amountYER: 18500,
    paymentMethod: 'cash',
    methodLabelAr: 'نقدًا عند الاستلام (COD)',
    txReference: 'COD-SANAA-09',
    date: '2026-11-20',
    status: 'paid',
    notes: 'تسليم جهاز مساج فقري منزلي عبر مندوب العيادة',
  },
];

export const AdminFinanceBillingPage: React.FC = () => {
  const { lang } = useLanguage();
  const { formatPrice } = useClinic();
  const [vouchers, setVouchers] = useState<FinancialVoucher[]>(sampleVouchers);
  const [activeReceipt, setActiveReceipt] = useState<FinancialVoucher | null>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const totalCollected = vouchers
    .filter((v) => v.status === 'paid')
    .reduce((sum, v) => sum + v.amountYER, 0);

  const kuraimiTotal = vouchers
    .filter((v) => v.paymentMethod === 'kuraimi' && v.status === 'paid')
    .reduce((sum, v) => sum + v.amountYER, 0);

  const walletsTotal = vouchers
    .filter((v) => ['jawali', 'jeeb', 'onecash', 'flousak'].includes(v.paymentMethod) && v.status === 'paid')
    .reduce((sum, v) => sum + v.amountYER, 0);

  const cashTotal = vouchers
    .filter((v) => v.paymentMethod === 'cash' && v.status === 'paid')
    .reduce((sum, v) => sum + v.amountYER, 0);

  const filtered = vouchers.filter(
    (v) =>
      v.patientName.includes(search) ||
      v.voucherNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.txReference.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      titleAr="الإدارة المالية وسندات القبض والفواتير الرسمية"
      titleEn="Financial Billing & Receipts Management"
    >
      <div className="space-y-6">
        {toast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* 4 Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0F4C5C] to-[#1B4965] text-white rounded-2xl p-5 space-y-1 shadow-md">
            <span className="text-xs font-semibold text-teal-200">إجمالي التحصيل المالي المعتمد</span>
            <p className="font-display font-extrabold text-2xl tracking-tight">
              {formatPrice(totalCollected)}
            </p>
            <p className="text-[11px] text-teal-100">سندات قبض معتمدة ومحققة</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">تحصيل بنك الكريمي (حاسب)</span>
            <p className="font-display font-extrabold text-xl text-slate-900">
              {formatPrice(kuraimiTotal)}
            </p>
            <p className="text-[11px] text-[#0F4C5C] font-semibold">حساب: 784545908</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">المحافظ الإلكترونية اليمنية</span>
            <p className="font-display font-extrabold text-xl text-slate-900">
              {formatPrice(walletsTotal)}
            </p>
            <p className="text-[11px] text-teal-700">ون كاش • جوالي • جيب • فلوسك</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
            <span className="text-xs font-bold text-slate-500">التحصيل النقدي المباشر</span>
            <p className="font-display font-extrabold text-xl text-slate-900">
              {formatPrice(cashTotal)}
            </p>
            <p className="text-[11px] text-slate-500">استلام العيادة والتوصيل</p>
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
              placeholder="بحث برقم السند، اسم المريض، أو الرقم المرجعي للتحويل..."
              className="w-full ps-10 pe-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/20 focus:border-[#0F4C5C]"
            />
          </div>

          <button
            type="button"
            onClick={() => showToast('تم فتح نافذة تحرير سند قبض مالي جديد')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C5C] text-white text-xs font-bold hover:bg-[#093542] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إصدار سند قبض رسمي</span>
          </button>
        </div>

        {/* Vouchers Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-start font-bold">رقم السند</th>
                  <th className="px-4 py-3 text-start font-bold">المريض / العميل</th>
                  <th className="px-4 py-3 text-start font-bold">نوع الخدمة الطبية</th>
                  <th className="px-4 py-3 text-start font-bold">المبلغ المحصل</th>
                  <th className="px-4 py-3 text-start font-bold">طريقة الدفع والمرجع</th>
                  <th className="px-4 py-3 text-start font-bold">التاريخ</th>
                  <th className="px-4 py-3 text-start font-bold">طباعة السند</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((vouch) => (
                  <tr key={vouch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-[#0F4C5C]">
                      {vouch.voucherNumber}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      {vouch.patientName}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-[#0F4C5C] border border-teal-200">
                        {vouch.serviceType}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      {formatPrice(vouch.amountYER)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-slate-800">{vouch.methodLabelAr}</div>
                      <div className="font-mono text-[10px] text-slate-400">{vouch.txReference}</div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-mono">
                      {vouch.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => setActiveReceipt(vouch)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#0F4C5C]" />
                        <span>معاينة وطباعة</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Printable Official Receipt Modal */}
        {activeReceipt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-8 space-y-6 text-slate-900 shadow-2xl border border-slate-200">
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <h2 className="font-display font-extrabold text-lg text-[#0F4C5C]">
                    عيادة الدكتور محمد عبدالله الجرباني
                  </h2>
                  <p className="text-[11px] text-slate-600">
                    استشاري جراحة المخ والأعصاب والعمود الفقري • مركز نوديسك
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">مركز ابن سينا الطبي، صنعاء • هاتف: 772070207</p>
                </div>
                <div className="text-end font-mono text-xs">
                  <p className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    سند قبض رسمي معتمد
                  </p>
                  <p className="text-slate-500 mt-1">{activeReceipt.voucherNumber}</p>
                  <p className="text-slate-400 text-[10px]">{activeReceipt.date}</p>
                </div>
              </div>

              {/* Patient & Payment Details Grid */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">استلمنا من الأخ/الأخت:</span>
                  <strong className="text-slate-900 text-sm">{activeReceipt.patientName}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">مبلغ وقدره:</span>
                  <strong className="text-[#0F4C5C] text-base font-extrabold font-mono">
                    {formatPrice(activeReceipt.amountYER)}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">وذلك مقابل:</span>
                  <span className="font-bold text-slate-800">{activeReceipt.serviceType} ({activeReceipt.notes})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">طريقة التحصيل:</span>
                  <span className="font-mono text-slate-800 font-semibold">{activeReceipt.methodLabelAr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الرقم المرجعي للإشعار:</span>
                  <span className="font-mono text-slate-600">{activeReceipt.txReference}</span>
                </div>
              </div>

              {/* Stamp & Verification */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-300 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-slate-700" />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <p>رمز التحقق الرقمي المعتمد</p>
                    <p className="font-mono">{activeReceipt.voucherNumber}</p>
                  </div>
                </div>

                <div className="text-center space-y-0.5">
                  <p className="font-bold text-xs text-slate-800">أمين الصندوق / الإدارة المالية</p>
                  <p className="text-[10px] text-slate-400 italic">تم التحصيل والتوثيق إلكترونياً</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveReceipt(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  إغلاق
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setActiveReceipt(null);
                    showToast('تم إرسال سند القبض للطابعة بنجاح');
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0F4C5C] hover:bg-[#093542] text-white text-xs font-bold inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>تأكيد الطباعة الرسمية</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
