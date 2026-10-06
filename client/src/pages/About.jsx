import React from 'react';
import PageHeader from '../components/common/PageHeader';
import schoolConfig from '@shared/school.config';
import { ShieldCheck, Award, Target, Compass, Users, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="About Our Institution"
        titleMr="आमच्या शाळेविषयी माहिती"
        subtitle="Shiksha Sahayak - School Information and Management. Wadgaon, Tq. Digras, Dist. Yavatmal."
        badgeText="3 Schools • Primary • Secondary • Junior College"
      />

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* History & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              60 Years of Educational Dedication
            </h2>
            <p>
              Established in {schoolConfig.establishedYear}, {schoolConfig.name} is a premier government institution managed under the Zilla Parishad educational council of Amravati District.
            </p>
            <p>
              Over six decades, the institution has expanded from a modest primary facility into a full-fledged educational hub comprising <strong>Pre-Primary (Class 1-4)</strong>, <strong>Primary & Secondary (Class 5-10)</strong>, and <strong>Higher Secondary Junior College (Class 11-12)</strong> across Science, Commerce, and Arts streams.
            </p>
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
                <div className="font-bold text-slate-900 dark:text-white text-base">Medium of Instruction</div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{schoolConfig.medium}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800"
              alt="School Building"
              className="rounded-3xl shadow-xl border-4 border-slate-200 dark:border-slate-800 object-cover w-full h-80"
            />
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-500/10 border border-amber-300 dark:border-amber-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              To provide affordable, accessible, and high-quality modern education to students from all economic backgrounds, enabling them to excel in national competitive examinations and become responsible citizens.
            </p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-300 dark:border-emerald-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              To foster critical thinking, digital literacy, scientific aptitude, and moral values through activity-based learning in early years, rigorous state board coaching in primary years, and specialized stream guidance in higher secondary.
            </p>
          </div>
        </div>

        {/* School Management Committee (SMC) Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">School Management Committee (SMC) & Authorities</h3>
              <p className="text-xs text-slate-500">Government statutory governing body for school administration</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase">
                <tr>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Role & Qualification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Principal / Secretary</td>
                  <td className="p-3 font-bold">{schoolConfig.principal.name}</td>
                  <td className="p-3">{schoolConfig.principal.qualification}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">SMC President</td>
                  <td className="p-3 font-bold">Shri. Rameshwar V. Gawande</td>
                  <td className="p-3">Parent Representative & Community Leader</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Vice President</td>
                  <td className="p-3 font-bold">Smt. Mandakini S. Tayade</td>
                  <td className="p-3">Gram Panchayat Representative</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">Teacher Representative</td>
                  <td className="p-3 font-bold">Shri. Gajanan V. Kulkarni</td>
                  <td className="p-3">Primary Section Head (M.Sc., B.Ed.)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
