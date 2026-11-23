const STORAGE_KEY = 'nodisc_appointments_v1';

const initialSeedAppointments = [
  {
    code: 'ND-849201',
    patientName: 'صالح أحمد الماوري',
    phone: '772070207',
    departmentId: 'neurosurgery',
    departmentName: 'قسم جراحة المخ والأعصاب والعمود الفقري',
    serviceId: 'srv-neuro-consult',
    serviceTitle: 'كشف واستشارة استئصال الانزلاق الغضروفي بالميكروسكوب',
    doctorName: 'د. محمد عبد الله الجرباني',
    visitType: 'new_consult',
    visitTypeLabel: 'كشف استشاري ومعاينة جديدة',
    isFreeCampaign: false,
    date: '2026-11-28',
    period: 'morning',
    periodText: 'الفترة الصباحية (09:00 ص – 02:00 م)',
    fileNumber: 'MED-1044',
    notes: 'ألم حاد في أسفل الظهر يمتد للساق اليسرى مع تنميل في أصابع القدم، توجد أشعة رنين حديثة.',
    status: 'confirmed', // 'confirmed' | 'modified' | 'cancelled'
    createdAt: '2026-11-20',
    updatedAt: null,
  },
  {
    code: 'ND-391048',
    patientName: 'منى عبد الكريم الشرجبي',
    phone: '784545908',
    departmentId: 'rehabilitation',
    departmentName: 'قسم العلاج الطبيعي والتأهيل الحركي',
    serviceId: 'srv-rehab-spine',
    serviceTitle: 'جلسات الشد الرقمي الميكانيكي لفقرات الرقبة والظهر',
    doctorName: 'طاقم نوديسك للتأهيل الحركي',
    visitType: 'nodisc_rehab',
    visitTypeLabel: 'جلسة تأهيل وعلاج طبيعي بمركز نوديسك',
    isFreeCampaign: false,
    date: '2026-11-29',
    period: 'evening',
    periodText: 'الفترة المسائية (04:00 م – 09:00 م)',
    fileNumber: '',
    notes: 'تيبس في الرقبة بعد العمل المكتبي وألم بين الكتفين.',
    status: 'confirmed',
    createdAt: '2026-11-21',
    updatedAt: null,
  }
];

export function getStoredAppointments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeedAppointments));
      return initialSeedAppointments;
    }
    return JSON.parse(raw);
  } catch {
    return initialSeedAppointments;
  }
}

export function saveOrUpdateAppointment(appointment) {
  try {
    const current = getStoredAppointments();
    const existingIndex = current.findIndex(a => a.code.toUpperCase() === appointment.code.toUpperCase());
    
    if (existingIndex > -1) {
      current[existingIndex] = {
        ...current[existingIndex],
        ...appointment,
        status: 'modified',
        updatedAt: new Date().toISOString(),
      };
    } else {
      current.unshift({
        ...appointment,
        status: appointment.status || 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: null,
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch (e) {
    console.error('Failed to save appointment', e);
    return false;
  }
}

export function findAppointmentByQuery(query) {
  if (!query || typeof query !== 'string') return null;
  const clean = query.trim().toUpperCase();
  const cleanPhone = query.replace(/\D/g, '');
  const appointments = getStoredAppointments();

  return appointments.find(a => 
    a.code.toUpperCase() === clean || 
    (cleanPhone.length >= 7 && a.phone.replace(/\D/g, '').includes(cleanPhone))
  ) || null;
}

export function cancelStoredAppointment(code) {
  try {
    const current = getStoredAppointments();
    const target = current.find(a => a.code.toUpperCase() === code.toUpperCase());
    if (target) {
      target.status = 'cancelled';
      target.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
