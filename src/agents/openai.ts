import { BaseAgent } from './base';
import type { AgentCapabilities } from './types';

export class OpenAIAgent extends BaseAgent {
  constructor(id: string, worktreePath: string) {
    const capabilities: AgentCapabilities = {
      codeGeneration: true,
      fileOperations: false,
      gitOperations: false,
      terminalAccess: false,
      webAccess: false,
    };

    super(id, 'openai', worktreePath, capabilities);
  }

  async initialize(): Promise<void> {
    // TODO: Implement OpenAI initialization
    this.status = 'running';
  }

  async sendMessage(message: string): Promise<string> {
    // TODO: Implement OpenAI message sending
    return `OpenAI response to: ${message}`;
  }

  async pause(): Promise<void> {
    // TODO: Implement pause logic
    this.status = 'paused';
  }

  async resume(): Promise<void> {
    // TODO: Implement resume logic
    this.status = 'running';
  }

  async terminate(): Promise<void> {
    // TODO: Implement termination logic
    this.status = 'idle';
  }
}