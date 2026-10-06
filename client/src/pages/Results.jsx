import React, { useState } from 'react';
import axios from 'axios';
import PageHeader from '../components/common/PageHeader';
import { SECTIONS_CONFIG } from '@shared/sections.config';
import schoolConfig from '@shared/school.config';
import { Search, Printer, ShieldCheck, AlertCircle, Sparkles, Award } from 'lucide-react';

export default function Results() {
  const [searchParams, setSearchParams] = useState({
    section_id: 'primary',
    class_number: '8',
    roll_number: '12',
    dob: '2012-08-20'
  });

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setResultData(null);

    try {
      const res = await axios.post('/api/public/results/lookup', searchParams);
      if (res.data.success) {
        setResultData(res.data);
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Result lookup failed. Please check Roll Number and Date of Birth.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentSection = SECTIONS_CONFIG.find(s => s.id === searchParams.section_id);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Online Result & Progress Report Portal"
        titleMr="ऑनलाइन निकाल व प्रगती पुस्तक कक्ष"
        subtitle="Verifiable digital marksheet and descriptive progress report card generator."
        badgeText="Secure Verification"
      />

      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Search Box Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student Verification Desk</h3>
              <p className="text-xs text-slate-500">Provide Roll Number and Date of Birth to access student examination results.</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Section</label>
              <select
                value={searchParams.section_id}
                onChange={(e) => {
                  const sec = SECTIONS_CONFIG.find(s => s.id === e.target.value);
                  setSearchParams({
                    ...searchParams,
                    section_id: e.target.value,
                    class_number: String(sec.classes[0])
                  });
                }}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                {SECTIONS_CONFIG.map(s => (
                  <option key={s.id} value={s.id}>{s.shortName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Class</label>
              <select
                value={searchParams.class_number}
                onChange={(e) => setSearchParams({ ...searchParams, class_number: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              >
                {currentSection.classes.map(c => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Roll Number</label>
              <input
                type="number"
                required
                value={searchParams.roll_number}
                onChange={(e) => setSearchParams({ ...searchParams, roll_number: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={searchParams.dob}
                onChange={(e) => setSearchParams({ ...searchParams, dob: e.target.value })}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? 'Verifying Student Identity...' : 'View Marksheet / Progress Report'}</span>
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="mt-4 p-4 bg-rose-50 text-rose-800 border border-rose-300 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Printable Result Card */}
        {resultData && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-end">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-900 text-amber-400 font-bold rounded-xl text-xs flex items-center gap-2 shadow hover:bg-slate-800 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Document</span>
              </button>
            </div>

            <div id="printable-area" className="bg-white text-slate-900 border-4 border-slate-900 rounded-3xl p-8 shadow-2xl space-y-6">
              
              {/* Marksheet Header */}
              <div className="border-b-2 border-slate-900 pb-6 text-center space-y-1">
                <div className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                  GOVERNMENT OF MAHARASHTRA • ZILLA PARISHAD EDUCATION BOARD
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold uppercase">
                  {resultData.section?.schoolName || schoolConfig.name}
                </h2>
                <p className="text-xs text-slate-600">
                  {schoolConfig.contact.address} • UDISE: {resultData.section?.udiseCode}
                </p>
                <div className="pt-2">
                  <span className="inline-block bg-slate-900 text-amber-400 font-bold text-xs px-4 py-1 rounded-full uppercase">
                    {resultData.type === 'grade-based' ? 'PRE-PRIMARY PROGRESS REPORT CARD' : 'OFFICIAL STATEMENT OF MARKS'}
                  </span>
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div><span className="text-slate-500">Student Name:</span> <strong className="block text-sm">{resultData.student.first_name} {resultData.student.last_name}</strong></div>
                <div><span className="text-slate-500">GR Number:</span> <strong className="block text-sm font-mono">{resultData.student.gr_number}</strong></div>
                <div><span className="text-slate-500">Class & Section:</span> <strong className="block text-sm">Class {resultData.student.class_number} ({resultData.section.shortName})</strong></div>
                <div><span className="text-slate-500">Roll Number:</span> <strong className="block text-sm">{resultData.student.roll_number}</strong></div>
              </div>

              {/* Grade-based Progress Report (Pre-Primary) */}
              {resultData.type === 'grade-based' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-300">
                      <thead className="bg-slate-100 font-bold border-b border-slate-300">
                        <tr>
                          <th className="p-3">Skill & Development Domain</th>
                          <th className="p-3">Assessed Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr><td className="p-3 font-semibold">Reading & Listening Skills (वाचन कौशल्य)</td><td className="p-3 font-bold text-amber-600">{resultData.report.reading_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">Handwriting & Expression (लेखन कौशल्य)</td><td className="p-3 font-bold text-amber-600">{resultData.report.writing_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">Basic Numeracy & Counting (संख्याज्ञान)</td><td className="p-3 font-bold text-amber-600">{resultData.report.numeracy_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">Creative Art & Craft (कला व हस्तकला)</td><td className="p-3 font-bold text-amber-600">{resultData.report.art_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">Sports & Physical Health (क्रीडा व आरोग्य)</td><td className="p-3 font-bold text-amber-600">{resultData.report.sports_grade}</td></tr>
                        <tr><td className="p-3 font-semibold">Social Conduct & Discipline (शिस्त व सवयी)</td><td className="p-3 font-bold text-amber-600">{resultData.report.discipline_grade}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs">
                    <strong className="text-amber-900 block mb-1">Class Teacher Remarks:</strong>
                    <p className="italic text-slate-700">{resultData.report.teacher_remarks}</p>
                  </div>
                </div>
              )}

              {/* Marks Table (Primary & High School) */}
              {resultData.type === 'marks' && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-300">
                      <thead className="bg-slate-100 font-bold border-b border-slate-300">
                        <tr>
                          <th className="p-3">Subject Name</th>
                          <th className="p-3">Marks Obtained</th>
                          <th className="p-3">Max Marks</th>
                          <th className="p-3">Grade</th>
                          <th className="p-3">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-medium">
                        {resultData.marks.map(m => (
                          <tr key={m.id}>
                            <td className="p-3 font-bold">{m.subject_name}</td>
                            <td className="p-3 font-mono font-bold text-sm text-emerald-700">{m.marks_obtained}</td>
                            <td className="p-3 font-mono">{m.max_marks}</td>
                            <td className="p-3 font-bold">{m.grade}</td>
                            <td className="p-3 text-slate-500">{m.remarks || 'Good'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-2xl text-xs font-bold">
                    <div>Overall Result: <span className="text-emerald-400 text-sm ml-2">{resultData.summary.resultStatus}</span></div>
                    <div>Percentage: <span className="text-amber-400 text-base ml-2">{resultData.summary.percentage}</span></div>
                  </div>
                </div>
              )}

              {/* Signatures */}
              <div className="pt-12 flex justify-between items-end text-xs text-slate-600">
                <div className="text-center space-y-8">
                  <div className="border-t border-slate-400 w-40">Class Teacher Signature</div>
                </div>
                <div className="text-center space-y-8">
                  <div className="border-t border-slate-400 w-40">Principal / Headmaster Stamp</div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
