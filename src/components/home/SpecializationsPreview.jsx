import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import ServiceCard from '../cards/ServiceCard';
import { specializations } from '../../data/specializations';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SpecializationsPreview() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  // Show 6 featured specializations
  const featured = specializations.slice(0, 6);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionTitle
            subtitle={isAr ? 'مجالات الرعاية والجراحة' : 'Care & Surgery Fields'}
            title={isAr ? 'أبرز التخصصات الطبية والجراحية' : 'Key Medical & Surgical Specializations'}
            description={isAr
              ? 'نقدم خدمات تشخيصية وعلاجية جراحية شاملة باستخدام أحدث المناظير والميكروسكوبات الطبية.'
              : 'We provide comprehensive diagnostic and surgical treatment services using the latest medical endoscopes and microscopes.'}
            align="right"
            className="mb-0 max-w-2xl"
          />

          <Link
            to="/specializations"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 transition-colors border border-slate-200 dark:border-slate-800 text-primary-700 hover:bg-primary-700 hover:text-white font-bold text-sm shadow-sm hover:shadow transition-all mt-4 md:mt-0 self-start md:self-auto group"
          >
            <span>{isAr ? 'عرض كافة التخصصات (13 تخصصاً)' : 'View All Specializations (13)'}</span>
            {isAr
              ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((spec) => (
            <ServiceCard key={spec.id} service={spec} isSpecialization={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
