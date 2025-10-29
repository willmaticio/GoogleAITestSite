
import type { Project, Category } from './types';

export const FALLBACK_ABOUT_TEXT = "As a passionate engineer operating at the intersection of cybersecurity and artificial intelligence, I thrive on building intelligent systems that are both resilient and secure. My work involves developing advanced threat detection models, creating robust AI-driven security protocols, and contributing to open-source intelligence tools. I am dedicated to pushing the boundaries of technology to solve complex, real-world problems and am always eager to connect with fellow innovators.";

export const CATEGORIES: Category[] = ['All', 'AI/ML', 'Cybersecurity', 'Web', 'Data'];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI Agents: Autonomous Threat Hunters',
    description: 'A framework for deploying autonomous AI agents that proactively hunt for network vulnerabilities and anomalies using reinforcement learning.',
    tags: ['Python', 'TensorFlow', 'Scapy', 'Cybersecurity'],
    category: ['AI/ML', 'Cybersecurity'],
    imageUrl: 'https://picsum.photos/seed/aiagent/400/300',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Cybersecurity Lab Orchestrator',
    description: 'A web-based platform for dynamically provisioning and managing virtual cybersecurity lab environments for training and research.',
    tags: ['Docker', 'React', 'Node.js', 'Ansible'],
    category: ['Cybersecurity', 'Web'],
    imageUrl: 'https://picsum.photos/seed/cyberlab/400/300',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'OSINT Toolkit Aggregator',
    description: 'A powerful command-line tool that aggregates results from various open-source intelligence (OSINT) APIs into a unified, actionable report.',
    tags: ['Go', 'API', 'CLI', 'OSINT'],
    category: ['Cybersecurity', 'Data'],
    imageUrl: 'https://picsum.photos/seed/osint/400/300',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Sports Analytics Dashboard',
    description: 'An interactive dashboard visualizing real-time sports statistics, using machine learning to predict game outcomes and player performance.',
    tags: ['D3.js', 'Python', 'Flask', 'Scikit-learn'],
    category: ['Data', 'AI/ML'],
    imageUrl: 'https://picsum.photos/seed/sports/400/300',
    liveUrl: '#',
  },
  {
    id: 5,
    title: 'WebScanAI: Vulnerability Scanner',
    description: 'A web application that leverages a custom-trained AI model to scan websites for common security vulnerabilities like XSS and SQL injection.',
    tags: ['Vue.js', 'FastAPI', 'PyTorch', 'OWASP'],
    category: ['Web', 'AI/ML', 'Cybersecurity'],
    imageUrl: 'https://picsum.photos/seed/webscan/400/300',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 6,
    title: 'SigmaLearn: E-Learning Platform',
    description: 'A full-stack e-learning platform with course management, video streaming, and adaptive learning paths powered by a recommendation engine.',
    tags: ['React', 'TypeScript', 'GraphQL', 'Prisma'],
    category: ['Web', 'Data'],
    imageUrl: 'https://picsum.photos/seed/sigmalearn/400/300',
    githubUrl: '#',
    liveUrl: '#',
  },
];
