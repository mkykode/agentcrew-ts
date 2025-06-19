# agentcrew-ts

A modern TypeScript CLI tool that orchestrates multiple AI coding agents (Claude, GPT, Jules) running in parallel within separate git worktrees for rapid MVP development and faster iteration.

## Features

- **Multi-Agent Orchestration**: Deploy and manage multiple AI agents simultaneously
- **Git Worktree Integration**: Each agent works in isolated git worktrees for parallel development
- **Interactive Terminal UI**: Rich terminal interface built with Ink and React
- **Real-time Communication**: Broadcast messages and respond to agent queries
- **Session Management**: Save, load, and manage development sessions
- **Modern TypeScript**: Built with TypeScript 5.x and Bun runtime for speed
- **Concurrent Processing**: Efficient parallel operations with proper queue management

## Quick Start

### Prerequisites

- **Bun** >= 1.0.0 (recommended) or **Node.js** >= 18.0.0
- Git configured for your repositories
- API keys for AI providers (OpenAI, Anthropic, Google)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd agentcrew-ts

# Install dependencies
bun install

# Copy environment template
cp .env.example .env
```

### Environment Setup

Configure your API keys in `.env`:


## Reference
[Similar Thoughts](https://kadekillary.work/blog/#2025-06-16-snorting-the-agi-with-claude-code)

```bash
# AI Provider API Keys
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
GOOGLE_API_KEY="your-google-key"

# agentcrew Configuration
AGENTCREW_CONFIG_DIR="$HOME/.config/agentcrew"
AGENTCREW_LOG_LEVEL="info"
AGENTCREW_MAX_AGENTS="10"
```

### First Run

```bash
# Initialize project
bun run dev init

# Deploy agents with a task
bun run dev deploy --agents claude:2,gpt:1 --prompt "Create a React Todo app with TypeScript"

# Monitor agents
bun run dev tui
```

## Commands

### Core Commands

| Command | Description |
|---------|-------------|
| `agentcrew init` | Initialize project configuration |
| `agentcrew deploy --agents <config> --prompt "<task>"` | Deploy agents with specified task |
| `agentcrew status` | Show current agent status |
| `agentcrew tui` | Launch interactive terminal UI |

### Agent Management

| Command | Description |
|---------|-------------|
| `agentcrew list` | List available agents and capabilities |
| `agentcrew pause --agent <name>` | Pause specific agent |
| `agentcrew resume --agent <name>` | Resume paused agent |
| `agentcrew restart --agent <name>` | Restart agent |
| `agentcrew dismiss --agent <name>` | Remove agent from session |

### Communication & Control

| Command | Description |
|---------|-------------|
| `agentcrew brief "<message>"` | Broadcast message to all agents |
| `agentcrew respond --agent <name> "<response>"` | Respond to agent question |
| `agentcrew broadcast --urgent "<message>"` | Send priority message |

### Development Integration

| Command | Description |
|---------|-------------|
| `agentcrew worktrees` | List all git worktrees |
| `agentcrew exec --all -- <command>` | Execute command in all worktrees |
| `agentcrew exec --agent <name> -- <command>` | Execute command in specific worktree |
| `agentcrew switch <agent>` | Switch to agent's worktree directory |

### Session Management

| Command | Description |
|---------|-------------|
| `agentcrew save [name]` | Save current session |
| `agentcrew load <name>` | Load saved session |
| `agentcrew history` | Show session history |
| `agentcrew clean` | Clean up inactive sessions |

## Development

### Prerequisites

- Bun >= 1.0.0
- TypeScript 5.x
- Git

### Setup

```bash
# Install dependencies
bun install

# Run in development mode
bun run dev <command>

# Type checking
bun run type-check

# Run tests
bun test

# Run tests with watch mode
bun test --watch
```

### Code Quality

```bash
# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format
```

### Building

```bash
# Build for production
bun run build

# Run built CLI
bun run start <command>

# Or run directly
node dist/index.js <command>
```

## Architecture

### Technology Stack

- **Runtime**: Bun (with Node.js compatibility)
- **Language**: TypeScript 5.x
- **CLI Framework**: Commander.js
- **Terminal UI**: Ink + React
- **State Management**: Zustand
- **Process Management**: Execa + p-queue
- **Git Operations**: simple-git
- **Validation**: Zod
- **Styling**: Chalk
- **Code Quality**: Biome (linting + formatting)

### Project Structure

```
src/
├── index.ts             # CLI entry point
├── commands/            # Command implementations
├── agents/              # AI agent providers
├── git/                 # Git worktree management
├── process/             # Process supervision
├── ui/                  # Terminal UI components (React)
├── state/               # State management (Zustand)
├── utils/               # Utility functions
└── types/               # TypeScript definitions
```

### Agent Providers

- **Claude**: Anthropic's Claude via Code interface
- **GPT**: OpenAI's GPT models via API
- **Jules**: Google's Gemini models via API

## Configuration

### Project Configuration

Create `.agentcrew/config.json` in your project:

```json
{
  "defaultAgents": ["claude:1", "gpt:1"],
  "maxConcurrentAgents": 5,
  "defaultBranch": "main",
  "worktreePrefix": "agent-",
  "autoCleanup": true
}
```

### Global Configuration

Located at `~/.config/agentcrew/global.json`:

```json
{
  "apiEndpoints": {
    "openai": "https://api.openai.com/v1",
    "anthropic": "https://api.anthropic.com/v1",
    "google": "https://generativelanguage.googleapis.com/v1"
  },
  "defaultModel": {
    "claude": "claude-3-sonnet-20240229",
    "gpt": "gpt-4-turbo-preview",
    "google": "gemini-pro"
  }
}
```

## Examples

### Basic Usage

```bash
# Start a simple web development task
agentcrew deploy --agents claude:1,gpt:1 --prompt "Build a modern landing page with Tailwind CSS"

# Monitor progress
agentcrew tui
```

### Advanced Workflow

```bash
# Initialize with custom config
agentcrew init --config ./custom-config.json

# Deploy multiple agents with different roles
agentcrew deploy \
  --agents claude:2,gpt:1,jules:1 \
  --prompt "Create a full-stack app: Claude handles frontend, GPT handles backend, Jules reviews code quality"

# Communicate with specific agent
agentcrew respond --agent claude-1 "Please add dark mode support"

# Execute tests across all worktrees
agentcrew exec --all -- npm test
```

## Troubleshooting

### Common Issues

**Agent not responding**: Check API keys and network connectivity
```bash
# Verify configuration
agentcrew status
```

**Git worktree conflicts**: Clean up and reinitialize
```bash
agentcrew clean
git worktree prune
```

**Performance issues**: Reduce concurrent agents
```bash
# Edit .agentcrew/config.json
{
  "maxConcurrentAgents": 3
}
```

### Debug Mode

```bash
# Enable debug logging
AGENTCREW_LOG_LEVEL=debug bun run dev <command>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `bun test`
5. Run linting: `bun run lint`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use Biome for code formatting
- Add tests for new features
- Update documentation
- Follow conventional commit messages

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Bun](https://bun.sh/) for fast TypeScript execution
- Terminal UI powered by [Ink](https://github.com/vadimdemedes/ink)
- Inspired by the need for efficient AI-assisted development workflows
