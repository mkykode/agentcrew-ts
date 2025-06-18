import type { Agent } from './agent';

export interface Session {
  id: string;
  name: string;
  agents: Agent[];
  createdAt: Date;
  lastModified: Date;
  projectPath: string;
  configPath: string;
}

export interface SessionState {
  currentSession: Session | null;
  sessions: Session[];
  isLoading: boolean;
}