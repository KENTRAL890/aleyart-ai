import { supabase, isSupabaseConfigured } from './lib/supabase';
import type { User, SavedExam, EarlyChildhoodAssessment, ExamPaper, MarkingSchemeItem } from './types';
import { DEFAULT_USERS } from './data/constants';

const STORAGE_KEYS = {
  users: 'aleyart_users',
  currentUser: 'aleyart_current_user',
  savedExams: 'aleyart_saved_exams',
  assessments: 'aleyart_assessments',
};

// ============ USER MANAGEMENT ============

export async function getUsers(): Promise<User[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      if (error) throw error;
      return data as User[];
    } catch (e) {
      console.error('Supabase error, falling back to localStorage:', e);
    }
  }
  
  const stored = localStorage.getItem(STORAGE_KEYS.users);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS as User[];
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEYS.currentUser);
  if (stored) return JSON.parse(stored);
  return null;
}

export async function login(name: string, password: string): Promise<User | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('name', name)
        .eq('password', password)
        .single();
      
      if (error) throw error;
      if (data) {
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(data));
        return data as User;
      }
    } catch (e) {
      console.error('Supabase login error, trying localStorage:', e);
    }
  }
  
  const users = await getUsers();
  const user = users.find(u => u.name === name && u.password === password);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  }
  return user || null;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
}

// ============ EXAM MANAGEMENT ============

export async function getSavedExams(): Promise<SavedExam[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return (data || []).map(row => ({
        id: row.id,
        exam: typeof row.exam_data === 'string' ? JSON.parse(row.exam_data) : row.exam_data,
        markingScheme: typeof row.marking_scheme === 'string' ? JSON.parse(row.marking_scheme) : row.marking_scheme,
        savedAt: row.created_at,
        savedBy: row.created_by,
      }));
    } catch (e) {
      console.error('Supabase error, falling back to localStorage:', e);
    }
  }
  
  const stored = localStorage.getItem(STORAGE_KEYS.savedExams);
  if (stored) return JSON.parse(stored);
  return [];
}

export async function saveExam(exam: SavedExam): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('exams')
        .upsert({
          id: exam.id,
          exam_data: exam.exam,
          marking_scheme: exam.markingScheme,
          class_level: exam.exam.classLevel,
          subject: exam.exam.subject,
          exam_type: exam.exam.examType,
          created_by: exam.savedBy,
          created_at: exam.savedAt,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      return;
    } catch (e) {
      console.error('Supabase save error, falling back to localStorage:', e);
    }
  }
  
  const exams = await getSavedExams();
  const existing = exams.findIndex(e => e.id === exam.id);
  if (existing >= 0) {
    exams[existing] = exam;
  } else {
    exams.unshift(exam);
  }
  localStorage.setItem(STORAGE_KEYS.savedExams, JSON.stringify(exams));
}

export async function updateExam(id: string, examPaper: ExamPaper, markingScheme: MarkingSchemeItem[]): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('exams')
        .update({
          exam_data: examPaper,
          marking_scheme: markingScheme,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      
      if (error) throw error;
      return;
    } catch (e) {
      console.error('Supabase update error:', e);
    }
  }
  
  const exams = await getSavedExams();
  const idx = exams.findIndex(e => e.id === id);
  if (idx >= 0) {
    exams[idx].exam = examPaper;
    exams[idx].markingScheme = markingScheme;
    localStorage.setItem(STORAGE_KEYS.savedExams, JSON.stringify(exams));
  }
}

export async function deleteExam(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return;
    } catch (e) {
      console.error('Supabase delete error:', e);
    }
  }
  
  const exams = (await getSavedExams()).filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.savedExams, JSON.stringify(exams));
}

export async function getExamsByClass(classLevel: string): Promise<SavedExam[]> {
  const allExams = await getSavedExams();
  return allExams.filter(e => e.exam.classLevel === classLevel);
}

// ============ ASSESSMENT MANAGEMENT ============

export async function getAssessments(): Promise<EarlyChildhoodAssessment[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return (data || []).map(row => 
        typeof row.assessment_data === 'string' 
          ? JSON.parse(row.assessment_data) 
          : row.assessment_data
      );
    } catch (e) {
      console.error('Supabase error:', e);
    }
  }
  
  const stored = localStorage.getItem(STORAGE_KEYS.assessments);
  if (stored) return JSON.parse(stored);
  return [];
}

export async function saveAssessment(assessment: EarlyChildhoodAssessment): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('assessments')
        .insert({
          id: assessment.id,
          assessment_data: assessment,
          class_level: assessment.classLevel,
          child_name: assessment.childName || 'Unknown',
          assessed_by: assessment.assessedBy,
          created_at: assessment.date,
        });
      
      if (error) throw error;
      return;
    } catch (e) {
      console.error('Supabase save error:', e);
    }
  }
  
  const assessments = await getAssessments();
  assessments.unshift(assessment);
  localStorage.setItem(STORAGE_KEYS.assessments, JSON.stringify(assessments));
}

// ============ CONNECTION STATUS ============

export function getConnectionStatus(): 'supabase' | 'local' {
  return isSupabaseConfigured() ? 'supabase' : 'local';
}
