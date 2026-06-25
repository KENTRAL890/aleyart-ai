import { useState } from 'react';
import type { ClassLevel, Subject } from '../types';
import { CLASS_LEVELS, SUBJECTS_BY_LEVEL, EARLY_CHILDHOOD_LEVELS } from '../data/constants';

export default function OMRGenerator() {
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [questionCount, setQuestionCount] = useState(40);
  const [optionCount] = useState(4);
  const [generated, setGenerated] = useState(false);

  const subjects = classLevel ? (SUBJECTS_BY_LEVEL[classLevel] || []) : [];

  const handleGenerate = () => {
    if (!classLevel || !subject) return;
    setGenerated(true);
  };

  if (generated) {
    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center no-print border border-gray-100">
          <button onClick={() => setGenerated(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
            ← Back
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
            🖨️ Print OMR Sheet
          </button>
        </div>

        <div className="exam-paper" style={{ fontFamily: 'Arial, sans-serif' }}>
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-xl font-bold uppercase">ALEYART ACADEMY</h1>
            <h2 className="text-base font-semibold mt-1">OMR ANSWER SHEET (OPTICAL MARK RECOGNITION)</h2>
            <div className="flex justify-between mt-2 text-sm">
              <span><strong>Subject:</strong> {subject}</span>
              <span><strong>Class:</strong> {classLevel}</span>
            </div>
            <div className="mt-3 text-sm text-left">
              <p><strong>Student Name:</strong> _________________________________________</p>
              <p className="mt-1"><strong>Student ID:</strong> _________________ <strong>Date:</strong> _______________</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 mb-4 text-xs">
            <p className="font-bold mb-1">INSTRUCTIONS:</p>
            <ul className="space-y-0.5">
              <li>• Use a dark pencil (2B recommended) to shade your answers.</li>
              <li>• Shade the circle completely for your chosen answer.</li>
              <li>• Erase completely if you want to change your answer.</li>
              <li>• Do not fold or crumple this sheet.</li>
            </ul>
          </div>

          <div className="two-column-layout">
            {Array.from({ length: questionCount }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-2 break-inside-avoid border-b border-gray-100 pb-1">
                <span className="text-xs font-bold w-8 text-right">{i + 1}.</span>
                <div className="flex gap-3">
                  {Array.from({ length: optionCount }).map((_, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-1">
                      <span className="text-xs font-medium">{String.fromCharCode(65 + oIdx)}</span>
                      <div className="omr-bubble w-5 h-5 rounded-full border-2 border-gray-800" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center border-t-2 border-black pt-4">
            <p className="text-xs text-gray-500">Do not write below this line</p>
            <div className="bg-gray-100 border border-gray-300 h-16 mt-2 rounded flex items-center justify-center text-xs text-gray-400">
              FOR OFFICIAL USE ONLY
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Generate OMR Answer Sheet</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Class Level</label>
            <select
              value={classLevel}
              onChange={e => { setClassLevel(e.target.value as ClassLevel); setSubject(''); }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="">Select class...</option>
              {CLASS_LEVELS.filter(l => !EARLY_CHILDHOOD_LEVELS.includes(l)).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Subject</label>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value as Subject)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              disabled={!classLevel}
            >
              <option value="">Select subject...</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Number of Questions</label>
            <input
              type="number"
              value={questionCount}
              onChange={e => setQuestionCount(parseInt(e.target.value) || 20)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              min="10" max="100"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!classLevel || !subject}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition"
          >
            📋 Generate OMR Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
