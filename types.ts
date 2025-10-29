
export type Category = 'All' | 'AI/ML' | 'Cybersecurity' | 'Web' | 'Data';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: Category[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}
