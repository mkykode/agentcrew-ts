import type { AgentProvider, AgentStatus } from '@/types/agent';

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
  type: 'input' | 'output' | 'error' | 'system';
}

export interface AgentCapabilities {
  codeGeneration: boolean;
  fileOperations: boolean;
  gitOperations: boolean;
  terminalAccess: boolean;
  webAccess: boolean;
}

export abstract class BaseAgent {
  public readonly id: string;
  public readonly provider: AgentProvider;
  public status: AgentStatus;
  public readonly worktreePath: string;
  public readonly capabilities: AgentCapabilities;

  constructor(
    id: string,
    provider: AgentProvider,
    worktreePath: string,
    capabilities: AgentCapabilities
  ) {
    this.id = id;
    this.provider = provider;
    this.status = 'idle';
    this.worktreePath = worktreePath;
    this.capabilities = capabilities;
  }

  abstract initialize(): Promise<void>;
  abstract sendMessage(message: string): Promise<string>;
  abstract pause(): Promise<void>;
  abstract resume(): Promise<void>;
  abstract terminate(): Promise<void>;
}