import { useState } from 'react';
import type { User, ClassLevel, Subject, ExamType, ExamPaper } from '../types';
import { CLASS_LEVELS, SUBJECTS_BY_LEVEL, EXAM_TYPES, SPECIAL_EXAM_TYPES, TOPICS_BY_SUBJECT_LEVEL, EARLY_CHILDHOOD_LEVELS } from '../data/constants';
import { generateExamPaper } from '../data/questionGenerator';
import { saveExam } from '../store';
import ExamPreview from './ExamPreview';
import MarkingSchemeView from './MarkingSchemeView';

interface Props {
  user: User;
  specialMode?: boolean;
}

interface SectionConfig {
  label: string;
  title: string;
  questionCount: number;
  marksPerQuestion: number;
  totalMarks: number;
}

export default function ExamGenerator({ user, specialMode }: Props) {
  const [step, setStep] = useState(1);
  const [classLevel, setClassLevel] = useState<ClassLevel | ''>('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [examType, setExamType] = useState<ExamType | ''>('');
  const [customExamType, setCustomExamType] = useState('');
  const [term, setTerm] = useState('Term 1');
  const [academicYear, setAcademicYear] = useState('2024/2025');
  const [duration, setDuration] = useState('1 hour 30 minutes');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [additionalTopics, setAdditionalTopics] = useState('');
  
  // Section A - Objective
  const [objectiveCount, setObjectiveCount] = useState(40);
  const [objectiveMarksPerQ, setObjectiveMarksPerQ] = useState(1);
  
  // Section B, C, D - Subjective
  const [subjectiveSections, setSubjectiveSections] = useState<SectionConfig[]>([
    { label: 'B', title: 'Theory', questionCount: 5, marksPerQuestion: 10, totalMarks: 50 }
  ]);
  const [subjectiveInstructions, setSubjectiveInstructions] = useState('');
  
  const [generatedExam, setGeneratedExam] = useState<ExamPaper | null>(null);
  const [showMarkingScheme, setShowMarkingScheme] = useState(false);
  const [saving, setSaving] = useState(false);

  const availableLevels = specialMode
    ? CLASS_LEVELS.filter(l => !EARLY_CHILDHOOD_LEVELS.includes(l))
    : CLASS_LEVELS.filter(l => !EARLY_CHILDHOOD_LEVELS.includes(l));

  const availableSubjects = classLevel ? (SUBJECTS_BY_LEVEL[classLevel] || []) : [];
  const availableTopics = (classLevel && subject) ? (TOPICS_BY_SUBJECT_LEVEL[subject as string]?.[classLevel] || []) : [];

  const objectiveTotalMarks = objectiveCount * objectiveMarksPerQ;
  const subjectiveTotalMarks = subjectiveSections.reduce((sum, s) => sum + s.totalMarks, 0);
  const grandTotal = objectiveTotalMarks + subjectiveTotalMarks;

  const getExamTypes = (): ExamType[] => {
    if (classLevel) {
      const special = SPECIAL_EXAM_TYPES[classLevel as ClassLevel] || [];
      return [...EXAM_TYPES, ...special];
    }
    return EXAM_TYPES;
  };

  const addSection = () => {
    const nextLabel = String.fromCharCode(66 + subjectiveSections.length); // B, C, D, E...
    setSubjectiveSections([...subjectiveSections, {
      label: nextLabel,
      title: `Section ${nextLabel}`,
      questionCount: 4,
      marksPerQuestion: 10,
      totalMarks: 40,
    }]);
  };

  const removeSection = (idx: number) => {
    if (subjectiveSections.length > 1) {
      const updated = subjectiveSections.filter((_, i) => i !== idx);
      // Re-label sections
      updated.forEach((s, i) => {
        s.label = String.fromCharCode(66 + i);
      });
      setSubjectiveSections(updated);
    }
  };

  const updateSection = (idx: number, field: keyof SectionConfig, value: number | string) => {
    const updated = [...subjectiveSections];
    if (field === 'questionCount' || field === 'marksPerQuestion') {
      updated[idx][field] = value as number;
      updated[idx].totalMarks = updated[idx].questionCount * updated[idx].marksPerQuestion;
    } else if (field === 'totalMarks') {
      updated[idx].totalMarks = value as number;
      // Recalculate marks per question
      if (updated[idx].questionCount > 0) {
        updated[idx].marksPerQuestion = Math.floor((value as number) / updated[idx].questionCount);
      }
    } else {
      (updated[idx] as any)[field] = value;
    }
    setSubjectiveSections(updated);
  };

  const handleGenerate = () => {
    if (!classLevel || !subject) return;
    const finalExamType = customExamType || examType || 'Class Test';
    const addTopics = additionalTopics.split(',').map(t => t.trim()).filter(Boolean);

    // Calculate total subjective questions and marks
    const totalSubjCount = subjectiveSections.reduce((sum, s) => sum + s.questionCount, 0);
    const totalSubjMarks = subjectiveSections.reduce((sum, s) => sum + s.totalMarks, 0);

    const exam = generateExamPaper({
      classLevel: classLevel as ClassLevel,
      subject: subject as Subject,
      examType: finalExamType,
      term,
      academicYear,
      duration,
      topics: selectedTopics,
      additionalTopics: addTopics,
      objectiveCount,
      objectiveMarks: objectiveTotalMarks,
      subjectiveCount: totalSubjCount,
      subjectiveMarks: totalSubjMarks,
      subjectiveSections: subjectiveSections.map(s => s.title),
      subjectiveInstructions,
      createdBy: user.name,
    });

    setGeneratedExam(exam);
    setStep(4);
  };

  const handleSaveExam = async () => {
    if (!generatedExam) return;
    setSaving(true);
    try {
      await saveExam({
        id: generatedExam.id,
        exam: generatedExam,
        markingScheme: generatedExam.markingScheme,
        savedAt: new Date().toISOString(),
        savedBy: user.name,
      });
      alert('Exam saved successfully! It can be accessed from "Saved Exams".');
    } catch (e) {
      alert('Failed to save exam. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateExam = (updated: ExamPaper) => {
    setGeneratedExam(updated);
  };

  if (generatedExam && step === 4) {
    return (
      <div className="animate-fade-in">
        {/* Toolbar */}
        <div className="bg-white rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center no-print border border-gray-100">
          <button onClick={() => { setStep(1); setGeneratedExam(null); }} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
            ← Back
          </button>
          <button onClick={handleSaveExam} disabled={saving} className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition">
            {saving ? '⏳ Saving...' : '💾 Save Exam'}
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
            🖨️ Print Exam
          </button>
          <button onClick={() => setShowMarkingScheme(!showMarkingScheme)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition">
            {showMarkingScheme ? '📝 Show Exam' : '✅ Marking Scheme'}
          </button>
        </div>

        {showMarkingScheme ? (
          <MarkingSchemeView exam={generatedExam} />
        ) : (
          <ExamPreview exam={generatedExam} onUpdate={handleUpdateExam} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['Class & Subject', 'Topics', 'Settings', 'Preview'].map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
              step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium ${step === i + 1 ? 'text-blue-600' : 'text-gray-400'}`}>{s}</span>
            {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100">
        {/* Step 1: Class & Subject */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {specialMode ? '🏆 Special Examination Setup' : '📝 Select Class & Subject'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Class Level</label>
                <select
                  value={classLevel}
                  onChange={e => { setClassLevel(e.target.value as ClassLevel); setSubject(''); setSelectedTopics([]); }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="">Select class...</option>
                  {availableLevels.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={e => { setSubject(e.target.value as Subject); setSelectedTopics([]); }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  disabled={!classLevel}
                >
                  <option value="">Select subject...</option>
                  {availableSubjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Exam Type</label>
                <select
                  value={examType}
                  onChange={e => setExamType(e.target.value as ExamType)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="">Select type...</option>
                  {getExamTypes().map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                  <option value="custom">Custom Type...</option>
                </select>
              </div>

              {examType === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Custom Exam Type</label>
                  <input
                    type="text"
                    value={customExamType}
                    onChange={e => setCustomExamType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    placeholder="Enter exam type name"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Term</label>
                <select value={term} onChange={e => setTerm(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Term 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Academic Year</label>
                <input type="text" value={academicYear} onChange={e => setAcademicYear(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Duration</label>
                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!classLevel || !subject || (!examType && !customExamType)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition"
            >
              Next: Select Topics →
            </button>
          </div>
        )}

        {/* Step 2: Topics */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Select Topics</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableTopics.map(topic => (
                <label key={topic} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition ${
                  selectedTopics.includes(topic) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic)}
                    onChange={e => {
                      if (e.target.checked) setSelectedTopics([...selectedTopics, topic]);
                      else setSelectedTopics(selectedTopics.filter(t => t !== topic));
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{topic}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTopics([...availableTopics])}
                className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedTopics([])}
                className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition"
              >
                Clear All
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Additional Topics (comma separated)</label>
              <input
                type="text"
                value={additionalTopics}
                onChange={e => setAdditionalTopics(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="e.g., Word Problems, Graphs, Environmental Pollution"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={selectedTopics.length === 0 && !additionalTopics}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition"
              >
                Next: Settings →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Settings */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">⚙️ Exam Settings</h3>

            {/* Section A - Objective */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-3">📝 Section A - Objective Questions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Number of Questions</label>
                  <input
                    type="number"
                    value={objectiveCount}
                    onChange={e => setObjectiveCount(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    min="0" max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Marks per Question</label>
                  <input
                    type="number"
                    value={objectiveMarksPerQ}
                    onChange={e => setObjectiveMarksPerQ(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    min="1" max="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Total Marks</label>
                  <div className="px-4 py-3 bg-blue-100 rounded-xl font-semibold text-blue-800">
                    {objectiveTotalMarks} marks
                  </div>
                </div>
              </div>
            </div>

            {/* Subjective Sections */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-green-800">📖 Subjective Sections (B, C, D...)</h4>
                <button
                  onClick={addSection}
                  disabled={subjectiveSections.length >= 4}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium"
                >
                  + Add Section
                </button>
              </div>

              {subject === 'English Language' && ['Basic 7', 'Basic 8', 'Basic 9'].includes(classLevel as string) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-yellow-800">
                    ✨ English Language (Basic 7-9) will automatically include: Grammar, Comprehension, Summary, and Composition sections.
                  </p>
                </div>
              )}

              {subjectiveSections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 mb-3 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-green-700">Section {section.label}</span>
                    {subjectiveSections.length > 1 && (
                      <button
                        onClick={() => removeSection(idx)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={e => updateSection(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Theory"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">No. of Questions</label>
                      <input
                        type="number"
                        value={section.questionCount}
                        onChange={e => updateSection(idx, 'questionCount', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="1" max="20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Marks/Question</label>
                      <input
                        type="number"
                        value={section.marksPerQuestion}
                        onChange={e => updateSection(idx, 'marksPerQuestion', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="1" max="25"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Total Marks</label>
                      <input
                        type="number"
                        value={section.totalMarks}
                        onChange={e => updateSection(idx, 'totalMarks', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <span className="text-sm text-green-700">Total Subjective Marks: </span>
                <span className="font-bold text-green-800">{subjectiveTotalMarks}</span>
              </div>
            </div>

            {/* Section Instructions */}
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-3">📋 Section B Instructions</h4>
              <select
                value={subjectiveInstructions}
                onChange={e => setSubjectiveInstructions(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white mb-2"
              >
                <option value="">Auto-generate based on subject</option>
                <option value="Answer Question 1 (COMPULSORY) and any other THREE questions.">Answer Q1 (Compulsory) + 3 others</option>
                <option value="Answer Question 1 (COMPULSORY) and any other TWO questions.">Answer Q1 (Compulsory) + 2 others</option>
                <option value="Answer FOUR questions in total including the compulsory question.">Answer 4 questions total (incl. compulsory)</option>
                <option value="Answer the compulsory question and ONE question from each section.">Answer compulsory + 1 from each section</option>
                <option value="Answer ALL questions in this section.">Answer ALL questions</option>
                <option value="Answer any FOUR questions from this section.">Answer any 4 questions</option>
                <option value="Answer any THREE questions from this section.">Answer any 3 questions</option>
                <option value="custom">Custom instructions...</option>
              </select>
              {subjectiveInstructions === 'custom' && (
                <input
                  type="text"
                  onChange={e => setSubjectiveInstructions(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  placeholder="Enter custom instructions..."
                />
              )}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-3">📊 Exam Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-gray-500 text-xs">Section A</p>
                  <p className="font-bold text-blue-600">{objectiveCount} Qs</p>
                  <p className="text-xs text-gray-400">{objectiveTotalMarks} marks</p>
                </div>
                {subjectiveSections.map((s, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg border">
                    <p className="text-gray-500 text-xs">Section {s.label}</p>
                    <p className="font-bold text-green-600">{s.questionCount} Qs</p>
                    <p className="text-xs text-gray-400">{s.totalMarks} marks</p>
                  </div>
                ))}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-lg text-white">
                  <p className="text-xs opacity-80">Grand Total</p>
                  <p className="font-bold text-xl">{grandTotal}</p>
                  <p className="text-xs opacity-80">marks</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition">
                ← Back
              </button>
              <button
                onClick={handleGenerate}
                className="px-6 py-3 text-white rounded-xl font-medium transition hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1a237e, #3949ab)' }}
              >
                🚀 Generate Exam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
