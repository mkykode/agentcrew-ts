export type AgentProvider = 'claude' | 'openai' | 'google';

export type AgentStatus = 'idle' | 'running' | 'paused' | 'failed' | 'completed';

export interface Agent {
  id: string;
  name: string;
  provider: AgentProvider;
  status: AgentStatus;
  worktreePath: string;
  createdAt: Date;
  lastActive: Date;
}

export interface AgentConfig {
  provider: AgentProvider;
  count: number;
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface DeploymentConfig {
  agents: AgentConfig[];
  prompt: string;
  maxConcurrency?: number;
}