import React, { useState } from 'react';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import { CheckCircle2, FileText, Send, AlertCircle, Sparkles } from 'lucide-react';

export default function Admissions() {
  const [formData, setFormData] = useState({
    applicant_name: '',
    gender: 'Male',
    dob: '',
    parent_name: '',
    phone: '',
    email: '',
    section_id: 'pre-primary',
    class_number: '1',
    stream: 'none',
    previous_school: ''
  });

  const [documentFile, setDocumentFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSectionChange = (secId) => {
    const targetSec = SECTIONS_CONFIG.find(s => s.id === secId);
    setFormData(prev => ({
      ...prev,
      section_id: secId,
      class_number: String(targetSec.classes[0]),
      stream: secId === 'high-school' ? 'science' : 'none'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSubmissionResult(null);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (documentFile) {
        data.append('documents', documentFile);
      }

      const res = await axios.post('/api/public/admissions', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setSubmissionResult(res.data);
        setFormData({
          applicant_name: '',
          gender: 'Male',
          dob: '',
          parent_name: '',
          phone: '',
          email: '',
          section_id: 'pre-primary',
          class_number: '1',
          stream: 'none',
          previous_school: ''
        });
        setDocumentFile(null);
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Submission failed. Please check fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentSection = SECTIONS_CONFIG.find(s => s.id === formData.section_id);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Online Admissions Portal 2026-27"
        titleMr="ऑनलाइन प्रवेश प्रक्रिया २०२६-२७"
        subtitle="Apply for Class 1 to 12 across Pre-Primary, Primary, and High School Junior College streams."
        badgeText="Admissions Open"
      />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Guidelines & Documents Checklist */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Admission Criteria & Guidelines</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900">
                <strong className="text-amber-800 dark:text-amber-300">Pre-Primary (Class 1-4):</strong> Minimum age 6 years as of 31st December for Class 1. RTE 25% quota reserved for eligible categories.
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900">
                <strong className="text-emerald-800 dark:text-emerald-300">Primary & Secondary (Class 5-10):</strong> Transfer Certificate (TC) from recognized school along with previous year marksheet required.
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900">
                <strong className="text-blue-800 dark:text-blue-300">High School (Class 11-12):</strong> Stream selection based on Class 10 Board exam percentage. Science (Min 60%), Commerce (Min 50%), Arts (Open).
              </div>
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg border border-slate-800 space-y-4">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Required Documents Checklist</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Original Transfer Certificate (TC) / School Leaving</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Attested copy of Birth Certificate (for Class 1)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Class 10 SSC Marksheet (for Class 11 admission)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Student Aadhar Card & Caste Certificate (if applicable)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>3 Recent Passport Size Photographs</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Online Admission Application Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md">
            
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Online Student Registration Form
              </h3>
              <p className="text-xs text-slate-500">Fill in student details accurately. Submitted applications will be reviewed by section heads.</p>
            </div>

            {submissionResult && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-2xl text-xs space-y-1">
                <div className="font-bold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{submissionResult.message}</span>
                </div>
                <p>Application Registration Number: <strong className="font-mono text-emerald-900">{submissionResult.application_no}</strong></p>
                <p>Please note this application number for future reference.</p>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 text-rose-800 border border-rose-300 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Target Section Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Select Academic Section *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SECTIONS_CONFIG.map(sec => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleSectionChange(sec.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition text-center ${
                        formData.section_id === sec.id
                          ? 'text-white border-transparent shadow'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200'
                      }`}
                      style={{
                        backgroundColor: formData.section_id === sec.id ? sec.themeColor : undefined
                      }}
                    >
                      {sec.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class & Stream Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Class *
                  </label>
                  <select
                    value={formData.class_number}
                    onChange={(e) => setFormData({ ...formData, class_number: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  >
                    {currentSection.classes.map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                {formData.section_id === 'high-school' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Stream (Class 11 & 12) *
                    </label>
                    <select
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="science">Science Stream (विज्ञान)</option>
                      <option value="commerce">Commerce Stream (वाणिज्य)</option>
                      <option value="arts">Arts Stream (कला)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Student Name & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarthak Ramesh Kulkarni"
                    value={formData.applicant_name}
                    onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh V. Kulkarni"
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="parent@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Previous School & Document Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Previous School Name & Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Z.P. Primary School, Anjangaon"
                  value={formData.previous_school}
                  onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Upload TC / Marksheet PDF or JPG (Max 10MB)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setDocumentFile(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Application...' : 'Submit Admission Application'}</span>
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
