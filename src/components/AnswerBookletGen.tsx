import { useState } from 'react';
import type { ClassLevel, Subject } from '../types';
import { CLASS_LEVELS, SUBJECTS_BY_LEVEL, EARLY_CHILDHOOD_LEVELS } from '../data/constants';

export default function AnswerBookletGen() {
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [examType, setExamType] = useState('End of Term Examination');
  const [pageCount, setPageCount] = useState(8);
  const [hasMargin, setHasMargin] = useState(true);
  const [hasLines, setHasLines] = useState(true);
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
            🖨️ Print Answer Booklet
          </button>
        </div>

        {/* Answer Booklet Pages */}
        {Array.from({ length: pageCount }).map((_, pageIdx) => (
          <div key={pageIdx} className="exam-paper mb-4" style={{ fontFamily: 'serif' }}>
            {pageIdx === 0 && (
              <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-xl font-bold uppercase">ALEYART ACADEMY</h1>
                <h2 className="text-base font-semibold mt-1">ANSWER BOOKLET</h2>
                <div className="mt-3 text-sm">
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <p><strong>Subject:</strong> {subject}</p>
                    <p><strong>Class:</strong> {classLevel}</p>
                    <p><strong>Exam:</strong> {examType}</p>
                    <p><strong>Date:</strong> _______________</p>
                  </div>
                  <div className="mt-3 text-left">
                    <p><strong>Student Name:</strong> ________________________________________</p>
                    <p className="mt-1"><strong>Index No:</strong> _________________</p>
                  </div>
                </div>
                <div className="mt-3 bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs text-left">
                  <p className="font-bold">INSTRUCTIONS:</p>
                  <p>• Write your answers clearly in this booklet.</p>
                  <p>• Start each new question on a fresh line.</p>
                  <p>• Do not tear any pages from this booklet.</p>
                </div>
              </div>
            )}

            {pageIdx > 0 && (
              <div className="text-right text-xs text-gray-400 mb-4 border-b border-gray-200 pb-2">
                Page {pageIdx + 1} of {pageCount} | {subject} - {classLevel}
              </div>
            )}

            <div style={{
              marginLeft: hasMargin ? '60px' : '0',
              borderLeft: hasMargin ? '2px solid #e53e3e' : 'none',
              paddingLeft: hasMargin ? '15px' : '0',
              minHeight: pageIdx === 0 ? '350px' : '680px',
            }}>
              {hasLines && Array.from({ length: pageIdx === 0 ? 18 : 32 }).map((_, lineIdx) => (
                <div
                  key={lineIdx}
                  className="border-b border-gray-300"
                  style={{ height: '22px' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📖 Generate Answer Booklet</h3>

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
            <label className="block text-sm font-medium text-gray-600 mb-2">Exam Type</label>
            <input
              type="text"
              value={examType}
              onChange={e => setExamType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Number of Pages</label>
            <input
              type="number"
              value={pageCount}
              onChange={e => setPageCount(parseInt(e.target.value) || 4)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              min="2" max="20"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={hasMargin} onChange={e => setHasMargin(e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">Red Margin Line</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={hasLines} onChange={e => setHasLines(e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-600">Ruled Lines</span>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!classLevel || !subject}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition"
          >
            📖 Generate Booklet
          </button>
        </div>
      </div>
    </div>
  );
}
