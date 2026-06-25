import { useState } from 'react';
import type { User, ClassLevel } from '../types';
import { KG_ASSESSMENT_AREAS, EARLY_CHILDHOOD_LEVELS } from '../data/constants';

interface Props {
  user: User;
}

type Rating = 'Excellent' | 'Good' | 'Developing' | 'Needs Support';

interface AssessmentEntry {
  skill: string;
  rating: Rating;
  comment: string;
}

interface ChildAssessment {
  id: string;
  childName: string;
  classLevel: ClassLevel;
  assessmentDate: string;
  assessedBy: string;
  areas: {
    name: string;
    entries: AssessmentEntry[];
  }[];
}

export default function EarlyChildhood({ user }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<ClassLevel | ''>('');
  const [childName, setChildName] = useState('');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [assessment, setAssessment] = useState<ChildAssessment | null>(null);
  const [savedAssessments, setSavedAssessments] = useState<ChildAssessment[]>(() => {
    const stored = localStorage.getItem('aleyart_ec_assessments');
    return stored ? JSON.parse(stored) : [];
  });
  const [viewMode, setViewMode] = useState<'create' | 'list'>('create');

  const getAssessmentAreas = (level: ClassLevel) => {
    if (level === 'Creche') {
      return [
        { name: 'Physical Development', criteria: ['Movement', 'Walking', 'Grasping', 'Crawling', 'Sitting'] },
        { name: 'Social Behaviour', criteria: ['Smiling', 'Responding to sounds', 'Eye contact', 'Interaction with others'] },
        { name: 'Basic Communication', criteria: ['Babbling', 'Responding to name', 'Making sounds', 'Facial expressions'] },
      ];
    }
    if (level === 'N1') {
      return [
        { name: 'Colour & Shape Recognition', criteria: ['Red', 'Blue', 'Yellow', 'Green', 'Circle', 'Square', 'Triangle'] },
        { name: 'Counting', criteria: ['Counting 1-5', 'Counting objects', 'Number songs'] },
        { name: 'Songs & Rhymes', criteria: ['Singing along', 'Remembering lyrics', 'Actions with songs'] },
        { name: 'Motor Skills', criteria: ['Holding pencil', 'Scribbling', 'Cutting with scissors', 'Pasting'] },
        { name: 'Social Skills', criteria: ['Sharing', 'Taking turns', 'Following simple instructions'] },
      ];
    }
    if (level === 'N2') {
      return [
        { name: 'Colour & Shape Recognition', criteria: ['All basic colours', 'Circle', 'Square', 'Triangle', 'Rectangle'] },
        { name: 'Counting', criteria: ['Counting 1-10', 'Number recognition 1-5', 'Counting objects'] },
        { name: 'Songs, Rhymes & Stories', criteria: ['Singing songs', 'Reciting rhymes', 'Listening to stories', 'Retelling simple stories'] },
        { name: 'Drawing & Colouring', criteria: ['Drawing shapes', 'Colouring within lines', 'Creative drawing'] },
        { name: 'Motor Skills', criteria: ['Pencil holding', 'Cutting', 'Pasting', 'Lacing'] },
      ];
    }
    if (level === 'KG1' || level === 'KG2') {
      return (KG_ASSESSMENT_AREAS as Record<string, { name: string; criteria: string[] }[]>)[level] || [];
    }
    return [];
  };

  const generateAssessment = () => {
    if (!selectedLevel || !childName) return;
    
    const areas = getAssessmentAreas(selectedLevel as ClassLevel);
    const newAssessment: ChildAssessment = {
      id: `eca_${Date.now()}`,
      childName,
      classLevel: selectedLevel as ClassLevel,
      assessmentDate,
      assessedBy: user.name,
      areas: areas.map(area => ({
        name: area.name,
        entries: area.criteria.map(skill => ({
          skill,
          rating: 'Developing' as Rating,
          comment: '',
        })),
      })),
    };
    setAssessment(newAssessment);
  };

  const updateRating = (areaIdx: number, entryIdx: number, rating: Rating) => {
    if (!assessment) return;
    const updated = { ...assessment };
    updated.areas[areaIdx].entries[entryIdx].rating = rating;
    setAssessment(updated);
  };

  const updateComment = (areaIdx: number, entryIdx: number, comment: string) => {
    if (!assessment) return;
    const updated = { ...assessment };
    updated.areas[areaIdx].entries[entryIdx].comment = comment;
    setAssessment(updated);
  };

  const saveAssessment = () => {
    if (!assessment) return;
    const updated = [...savedAssessments, assessment];
    setSavedAssessments(updated);
    localStorage.setItem('aleyart_ec_assessments', JSON.stringify(updated));
    alert('Assessment saved successfully!');
    setAssessment(null);
  };

  const ratingColors: Record<Rating, string> = {
    'Excellent': 'bg-green-100 text-green-700 border-green-300',
    'Good': 'bg-blue-100 text-blue-700 border-blue-300',
    'Developing': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Needs Support': 'bg-red-100 text-red-700 border-red-300',
  };

  if (assessment) {
    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center no-print border border-gray-100">
          <button onClick={() => setAssessment(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
            ← Back
          </button>
          <button onClick={saveAssessment} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition">
            💾 Save Assessment
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
            🖨️ Print
          </button>
        </div>

        <div className="exam-paper">
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-xl font-bold uppercase">ALEYART ACADEMY</h1>
            <h2 className="text-base font-semibold mt-1">EARLY CHILDHOOD ASSESSMENT REPORT</h2>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-left">
              <p><strong>Child's Name:</strong> {assessment.childName}</p>
              <p><strong>Class:</strong> {assessment.classLevel}</p>
              <p><strong>Date:</strong> {assessment.assessmentDate}</p>
              <p><strong>Assessed By:</strong> {assessment.assessedBy}</p>
            </div>
          </div>

          {['Creche', 'N1', 'N2'].includes(assessment.classLevel) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-700">
              📝 <strong>Note:</strong> This is an observation-based assessment. No formal written exams are conducted at this level. 
              Assessment is done through teacher observation, oral questions, and practical activities.
            </div>
          )}

          {assessment.areas.map((area, aIdx) => (
            <div key={aIdx} className="mb-6">
              <h3 className="font-bold text-sm bg-gray-100 px-3 py-2 border border-gray-300 mb-3 uppercase">
                {area.name}
              </h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left w-1/3">Skill/Area</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Rating</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Teacher's Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {area.entries.map((entry, eIdx) => (
                    <tr key={eIdx}>
                      <td className="border border-gray-300 px-3 py-2 font-medium">{entry.skill}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <select
                          value={entry.rating}
                          onChange={e => updateRating(aIdx, eIdx, e.target.value as Rating)}
                          className={`w-full px-2 py-1 rounded border text-xs font-medium ${ratingColors[entry.rating]} no-print`}
                        >
                          <option value="Excellent">⭐ Excellent</option>
                          <option value="Good">👍 Good</option>
                          <option value="Developing">🔄 Developing</option>
                          <option value="Needs Support">🆘 Needs Support</option>
                        </select>
                        <span className={`print-only text-xs font-medium px-2 py-1 rounded ${ratingColors[entry.rating]}`}>
                          {entry.rating}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          value={entry.comment}
                          onChange={e => updateComment(aIdx, eIdx, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-xs no-print"
                          placeholder="Add comment..."
                        />
                        <span className="print-only text-xs">{entry.comment}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className="mt-8 border-t border-gray-300 pt-4">
            <p className="text-sm"><strong>Teacher's General Observation:</strong></p>
            <div className="border border-gray-300 min-h-20 mt-2 p-2" />
            <div className="grid grid-cols-2 gap-8 mt-6 text-sm">
              <div>
                <p className="border-b border-gray-400 pb-8 mb-2" />
                <p className="text-center text-xs text-gray-500">Teacher's Signature</p>
              </div>
              <div>
                <p className="border-b border-gray-400 pb-8 mb-2" />
                <p className="text-center text-xs text-gray-500">Parent's Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setViewMode('create')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            viewMode === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          ➕ Create Assessment
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📋 Saved Assessments ({savedAssessments.length})
        </button>
      </div>

      {viewMode === 'create' ? (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🧒 Early Childhood Assessment</h3>
          
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-orange-800 text-sm mb-2">📌 NaCCA Assessment Guidelines</h4>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• <strong>Crèche:</strong> No exams. Observation-based tracking only.</li>
              <li>• <strong>N1 & N2:</strong> No formal exams. Activities, oral questions, teacher observation.</li>
              <li>• <strong>KG1 & KG2:</strong> No BECE-style exams. Oral questioning, practical activities, teacher observation.</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Class Level</label>
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value as ClassLevel)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              >
                <option value="">Select level...</option>
                {EARLY_CHILDHOOD_LEVELS.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Child's Name</label>
              <input
                value={childName}
                onChange={e => setChildName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Enter child's name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Assessment Date</label>
            <input
              type="date"
              value={assessmentDate}
              onChange={e => setAssessmentDate(e.target.value)}
              className="w-full sm:w-64 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <button
            onClick={generateAssessment}
            disabled={!selectedLevel || !childName}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-xl font-medium transition"
          >
            📋 Generate Assessment Form
          </button>
        </div>
      ) : (
        <div>
          {savedAssessments.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
              <span className="text-5xl block mb-4">📂</span>
              <h3 className="text-lg font-semibold text-gray-700">No Saved Assessments</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAssessments.map(a => (
                <div key={a.id} className="bg-white rounded-xl p-5 border border-gray-100">
                  <h4 className="font-semibold text-gray-800">{a.childName}</h4>
                  <p className="text-xs text-gray-500">{a.classLevel} • {a.assessmentDate}</p>
                  <p className="text-xs text-gray-400 mt-1">By: {a.assessedBy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
