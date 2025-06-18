export interface ProjectConfig {
  name: string;
  version: string;
  agentcrew: {
    maxAgents: number;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    configDir: string;
    providers: {
      claude?: {
        apiKey?: string;
        model?: string;
      };
      openai?: {
        apiKey?: string;
        model?: string;
      };
      google?: {
        apiKey?: string;
        model?: string;
      };
    };
  };
}

export interface GlobalConfig {
  configDir: string;
  logLevel: string;
  maxAgents: number;
  defaultProvider: string;
}