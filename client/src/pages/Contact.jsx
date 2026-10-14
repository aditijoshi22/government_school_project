import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import schoolConfig from '@shared/school.config';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation(['contact', 'common']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await axios.post('/api/public/enquiry', formData);
      if (res.data.success) {
        setSuccessMsg(t('contact.successMsg'));
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={t('contact.pageTitle')}
        subtitle={t('contact.pageSubtitle')}
        badgeText={t('contact.badge')}
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Contact Cards & Map */}
        <div className="lg:col-span-5 space-y-6">

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('contact.officeInfoTitle')}</h3>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-0.5">{t('contact.addressLabel')}:</strong>
                  <span>{schoolConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-0.5">{t('contact.phoneLabel')}:</strong>
                  <span>{schoolConfig.contact.phone} / {schoolConfig.contact.altPhone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-0.5">{t('contact.emailLabel')}:</strong>
                  <span>{schoolConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white font-semibold mb-0.5">{t('contact.hoursLabel')}:</strong>
                  <span>{schoolConfig.contact.officeHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm h-64">
            <iframe
              title={t('contact.locationTitle')}
              src={schoolConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>

        {/* Right Column: Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md">

            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {t('contact.sendMsgTitle')}
              </h3>
              <p className="text-xs text-slate-500">{t('contact.sendMsgSubtitle')}</p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 text-rose-800 border border-rose-300 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('contact.senderName')} *</label>
                  <input
                    type="text"
                    required
                    placeholder={t('contact.senderNamePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('contact.senderPhone')} *</label>
                  <input
                    type="tel"
                    required
                    placeholder={t('contact.senderPhonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('contact.senderEmail')} *</label>
                  <input
                    type="email"
                    required
                    placeholder={t('contact.senderEmailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('contact.subject')}</label>
                  <input
                    type="text"
                    placeholder={t('contact.subjectPlaceholder')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('contact.message')} *</label>
                <textarea
                  rows="4"
                  required
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t('contact.sendingBtn') : t('contact.sendBtn')}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

