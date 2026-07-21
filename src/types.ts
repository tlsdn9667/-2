/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TheatreWork {
  id: string;
  year: string;
  title: string;
  synopsis: string;
  images: string[];
  scriptExcerpt?: string;
  programBook?: string;
  review?: string;
  credits?: string;
}

export interface ExhibitionWork {
  id: string;
  year: string;
  title: string;
  medium: string;
  images: string[];
  description?: string;
}

export interface EssayWork {
  id: string;
  year: string;
  title: string;
  publishedIn: string;
  description: string;
  excerpt: string;
}

export interface NovelWork {
  id: string;
  year: string;
  title: string;
  publishedIn: string;
  description: string;
  excerpt: string;
}

export interface ResidencyItem {
  id: string;
  year: string;
  name: string;
  period: string;
  location: string;
  outcome?: string;
}

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  category: 'Grants' | 'Awards' | 'Selections';
}

export interface CVSection {
  education: string[];
  writing: { year: string; text: string }[];
  exhibitions: { year: string; text: string }[];
  awardsSelections: { year: string; text: string }[];
}

export interface AboutData {
  bio: string;
  statement: string[];
}
