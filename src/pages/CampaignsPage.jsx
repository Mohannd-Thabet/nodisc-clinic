import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { campaignsData } from '../data/campaignsData';
import Breadcrumbs from '../components/common/Breadcrumbs';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Megaphone,
  Gift,
  Sparkles,
  ChevronLeft,
  Info
} from 'lucide-react';

const statusConfig = {
  open: {
    label: 'التسجيل مفتوح الآن',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    barClass: 'bg-emerald-500',
    dotClass: 'bg-emerald-500 animate-pulse',
    icon: CheckCircle2,
  },
  full: {
    label: 'اكتملت المقاعد المخصصة',
    badgeClass: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    barClass: 'bg-amber-500',
    dotClass: 'bg-amber-500',
    icon: XCircle,
  },
  scheduled: {
    label: 'حملة مجدولة قريباً',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
    barClass: 'bg-sky-500',
    dotClass: 'bg-sky-500',
    icon: AlertCircle,
  },
  ended: {
    label: 'انتهت الحملة (أرشيف)',
    badgeClass: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
    barClass: 'bg-slate-400',
    dotClass: 'bg-slate-400',
    icon: XCircle,
  },
};

export default function CampaignsPage() {
  const { lang } = useLanguage();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCampaigns =
    filterStatus === 'all'
      ? campaignsData
      : campaignsData.filter((c) => c.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-primary-900 to-slate-900 text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-20 w-80 h-80 rounded-full bg-emerald-400 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-secondary-400 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
            <Gift className="w-4 h-4 text-gold-300" />
            <span className="text-xs font-bold text-gold-200">مبادرات المسؤولية الاجتماعية المجانية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            الحملات الطبية والأيام المجانية
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            مبادرات معاينة واستشارة مجانية دورية يقدمها د. محمد عبدالله الجرباني وفريق نوديسك بالتعاون مع مركز ابن سينا الطبي لخدمة المرضى والمجتمع
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'الحملات الطبية' }]} />

        {/* Filter Badges Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'all'
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              جميع الحملات ({campaignsData.length})
            </button>
            <button
              onClick={() => setFilterStatus('open')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'open'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              مفتوح للتسجيل ({campaignsData.filter((c) => c.status === 'open').length})
            </button>
            <button
              onClick={() => setFilterStatus('scheduled')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'scheduled'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              قادمة قريباً ({campaignsData.filter((c) => c.status === 'scheduled').length})
            </button>
            <button
              onClick={() => setFilterStatus('ended')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'ended'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              الأرشيف ({campaignsData.filter((c) => c.status === 'ended' || c.status === 'full').length})
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 px-3.5 py-2 rounded-xl">
            <Info className="w-3.5 h-3.5 text-primary-600 shrink-0" />
            <span>الأولوية لأسبقية التسجيل الإلكتروني المسبق</span>
          </div>
        </div>

        {/* Campaigns Grid */}
        <section className="pb-16 grid md:grid-cols-2 gap-6">
          {filteredCampaigns.map((camp) => {
            const sc = statusConfig[camp.status] || statusConfig.ended;
            const StatusIcon = sc.icon;
            const remaining = Math.max(0, camp.totalCapacity - camp.bookedCount);
            const percentage =
              camp.totalCapacity > 0
                ? Math.min(100, Math.round((camp.bookedCount / camp.totalCapacity) * 100))
                : 0;

            return (
              <div
                key={camp.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Top Image & Status Banner */}
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.src = '/assets/full_logo.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Status Pill */}
                    <div className="absolute top-3.5 right-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-md ${sc.badgeClass}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${sc.dotClass}`} />
                        <span>{sc.label}</span>
                      </span>
                    </div>

                    {/* Department Tag */}
                    <div className="absolute bottom-3.5 right-3.5 left-3.5 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold text-gold-300 drop-shadow">
                        {camp.departmentName}
                      </span>
                      <span className="tabular-nums font-mono bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/20">
                        السعة: {camp.totalCapacity} مقعد
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-secondary-400 transition-colors leading-snug">
                      {camp.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {camp.serviceSummary}
                    </p>

                    {/* Key Info List */}
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-primary-600 dark:text-secondary-400 shrink-0" />
                        <span className="font-medium">{camp.dayLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary-600 dark:text-secondary-400 shrink-0" />
                        <span className="font-medium">{camp.periodLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary-600 dark:text-secondary-400 shrink-0" />
                        <span className="truncate">{camp.locationLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-primary-600 dark:text-secondary-400 shrink-0" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {camp.doctorName}
                        </span>
                      </div>
                    </div>

                    {/* Capacity Indicator Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">
                          المقاعد المتبقية:{' '}
                          <strong className="text-slate-900 dark:text-white font-bold tabular-nums">
                            {camp.status === 'full' ? 0 : remaining}
                          </strong>{' '}
                          من {camp.totalCapacity}
                        </span>
                        <span className="font-bold text-slate-700 dark:text-slate-200 font-mono text-[11px]">
                          {percentage}% محجوز
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${sc.barClass} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Details & Registration Action */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400">
                    {camp.registrationWindow}
                  </span>
                  <Link
                    to={`/campaigns/${camp.slug}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                      camp.status === 'open'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-600/20 hover:scale-105 active:scale-95'
                        : 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-secondary-400 border border-primary-200 dark:border-primary-800 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <span>{camp.status === 'open' ? 'سجّل في الحملة الآن' : 'تفاصيل المبادرة'}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* Alternative Consultation CTA */}
        <section className="pb-16 text-center">
          <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-primary-700/50 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black">
              هل تبحث عن استشارة عاجلة دون انتظار موعد الحملات؟
            </h3>
            <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
              يمكنك حجز موعد استشارة سريرية مباشرة مع الدكتور محمد عبدالله الجرباني في مركز ابن سينا الطبي في أي يوم طوال الأسبوع
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 font-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>حجز موعد عيادة اعتيادي</span>
              </Link>
              <a
                href="https://wa.me/967772070207?text=مرحباً، أرغب في الاستفسار عن مواعيد العيادة والحملات الطبية المجانية"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 backdrop-blur-sm transition-all text-sm"
              >
                <span>استفسار واتساب (772070207)</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
