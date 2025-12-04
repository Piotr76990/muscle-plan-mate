/**
 * Template storage for workout templates
 * Key: templates_v1
 */

import { storage } from './storage';

export interface TemplateExercise {
  id: string;
  name: string;
  setsText?: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  exercises: TemplateExercise[];
  createdAt: string;
}

const TEMPLATES_KEY = 'templates_v1';

export const getAllTemplates = (): Template[] => {
  const templates = storage.getItem<Template[]>(TEMPLATES_KEY);
  return templates || [];
};

export const getTemplateById = (id: string): Template | null => {
  const templates = getAllTemplates();
  return templates.find(t => t.id === id) || null;
};

export const saveTemplate = (template: Omit<Template, 'id' | 'createdAt'>): Template => {
  const templates = getAllTemplates();
  const newTemplate: Template = {
    ...template,
    id: `tpl_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  storage.setItem(TEMPLATES_KEY, [...templates, newTemplate]);
  return newTemplate;
};

export const updateTemplate = (id: string, patch: Partial<Omit<Template, 'id' | 'createdAt'>>): boolean => {
  const templates = getAllTemplates();
  const index = templates.findIndex(t => t.id === id);
  if (index === -1) return false;
  
  templates[index] = { ...templates[index], ...patch };
  storage.setItem(TEMPLATES_KEY, templates);
  return true;
};

export const deleteTemplate = (id: string): boolean => {
  const templates = getAllTemplates();
  const filtered = templates.filter(t => t.id !== id);
  if (filtered.length === templates.length) return false;
  
  storage.setItem(TEMPLATES_KEY, filtered);
  return true;
};
