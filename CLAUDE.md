# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the TypeScript version of agentcrew.

# Project Overview

agentcrew-ts is a modern TypeScript CLI tool that orchestrates multiple AI coding agents (Claude, GPT, Jules) running in parallel within separate git worktrees. This is the TypeScript implementation designed for rapid MVP development and faster iteration.

**Key Decision:** Using TypeScript with Bun runtime for speed, modern tooling, and native TypeScript support.

# Development Commands

## Bun Runtime Commands
```bash
# Install dependencies
bun install

# Run the CLI in development
bun run dev <command>

# Build for production
bun run build

# Run built CLI
bun run start <command>

# Run tests
bun test

# Run tests with watch mode
bun test --watch
```

## Code Quality
```bash
# Type checking
bun run type-check

# Lint code
bun run lint

# Format code
bun run format

# Fix linting issues
bun run lint:fix
```

# Modern TypeScript Architecture

## Technology Stack

**Core Runtime & Package Manager:**
- **Bun** - Fast runtime with native TypeScript support and package management
- **TypeScript 5.x** - Latest TypeScript with modern features
- **Node.js compatibility** - Ensuring ecosystem compatibility

**CLI Framework:**
- **Commander.js** - Modern CLI framework with TypeScript support
- **Inquirer.js** - Interactive command-line prompts
- **Chalk** - Terminal string styling
- **Ora** - Elegant terminal spinners

**Process Management:**
- **Execa** - Better child process handling
- **p-queue** - Promise-based queue for concurrent operations
- **signal-exit** - Proper cleanup on process termination

**Git Operations:**
- **simple-git** - Clean Git operations API
- **fs-extra** - Enhanced file system operations

**Terminal UI:**
- **Ink** - React-like components for CLI (modern alternative to ratatui)
- **React** - For building interactive terminal interfaces
- **Yoga Layout** - Flexbox layout for terminal

**State Management:**
- **Zustand** - Lightweight state management
- **JSON files** - Simple persistence for sessions
- **SQLite** (via bun:sqlite) - Built-in database support

**Utilities:**
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utilities
- **uuid** - Unique identifier generation
- **dotenv** - Environment variable management

## Project Structure

```
agentcrew-ts/
├── src/
│   ├── index.ts             # Entry point with Commander setup
│   ├── commands/            # Command implementations
│   │   ├── init.ts
│   │   ├── deploy.ts
│   │   ├── status.ts
│   │   ├── tui.ts
│   │   └── ...
│   ├── agents/              # Agent provider implementations
│   │   ├── types.ts         # Shared types and interfaces
│   │   ├── base.ts          # Abstract base agent class
│   │   ├── claude.ts        # Claude Code integration
│   │   ├── openai.ts        # GPT/Codex API integration
│   │   └── google.ts        # Jules/Gemini integration
│   ├── git/                 # Git worktree management
│   │   ├── worktree.ts      # Worktree operations
│   │   ├── manager.ts       # Git operations manager
│   │   └── cleanup.ts       # Cleanup utilities
│   ├── process/             # Process supervision
│   │   ├── supervisor.ts    # Agent process management
│   │   ├── queue.ts         # Job queue management
│   │   └── communication.ts # Inter-process communication
│   ├── ui/                  # Terminal UI components (Ink/React)
│   │   ├── App.tsx          # Main TUI application
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AgentList.tsx
│   │   │   ├── LogViewer.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── InteractionQueue.tsx
│   │   └── hooks/           # Custom React hooks
│   │       ├── useAgents.ts
│   │       ├── useLogs.ts
│   │       └── useKeyboard.ts
│   ├── state/               # State management
│   │   ├── store.ts         # Zustand store configuration
│   │   ├── session.ts       # Session persistence
│   │   └── config.ts        # Configuration management
│   ├── utils/               # Utility functions
│   │   ├── logger.ts        # Logging utilities
│   │   ├── validation.ts    # Zod schemas
│   │   ├── errors.ts        # Error handling
│   │   └── helpers.ts       # General helpers
│   └── types/               # Global type definitions
│       ├── agent.ts         # Agent-related types
│       ├── session.ts       # Session types
│       └── config.ts        # Configuration types
├── tests/                   # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/                 # Build and utility scripts
├── docs/                    # Additional documentation
├── package.json
├── tsconfig.json
├── biome.json              # Modern linter/formatter config
├── .env.example
└── bun.lockb
```

# Key Architecture Decisions

## Why Bun Over Node.js
- **Native TypeScript execution** - No compilation step needed for development
- **Faster package installation** - Significantly faster than npm/yarn
- **Built-in bundler** - No need for separate build tools
- **Built-in test runner** - Integrated testing without Jest
- **Modern JavaScript features** - Native support for latest JS/TS features

## Why Ink Over Traditional CLI
- **React-like components** - Familiar development model
- **Declarative UI** - Easier to build complex interfaces
- **State management** - Natural React patterns for terminal apps
- **Better testing** - Component-based testing approach

## Modern Development Practices
- **TypeScript-first** - Everything typed from the start
- **Zod validation** - Runtime type safety for external data
- **Functional programming** - Immutable state, pure functions where possible
- **Async/await** - Modern promise handling throughout
- **Error handling** - Proper error types and handling patterns

# Command Reference

The CLI maintains the same comprehensive command structure as the Rust version:

## Core Commands
- `agentcrew init` - Initialize project with TypeScript-specific config
- `agentcrew deploy --agents claude:2,gpt:1 --prompt "..."` - Deploy agents
- `agentcrew status` - Show agent status with rich terminal output
- `agentcrew tui` - Launch Ink-based interactive UI

## Agent Management
- `agentcrew list` - List available agents with capabilities
- `agentcrew pause/resume/restart/dismiss --agent <name>` - Agent lifecycle

## Communication & Control
- `agentcrew brief "message"` - Broadcast to all agents
- `agentcrew respond --agent <name> "response"` - Answer agent questions
- `agentcrew broadcast --urgent "message"` - Priority messaging

## Development Integration
- `agentcrew worktrees` - List all worktrees
- `agentcrew exec --all|--agent <name> -- <command>` - Execute commands
- `agentcrew switch <agent>` - Switch to agent directory

## Session Management
- `agentcrew save/load/history/clean` - Session lifecycle management

# Development Workflow

## Getting Started
1. **Project initialization**: `bun install` to set up dependencies
2. **Development mode**: `bun run dev` for hot-reloading TypeScript execution
3. **Testing**: `bun test` for comprehensive test suite
4. **Building**: `bun run build` for production bundle

## Code Quality Standards
- **Strict TypeScript** - Enable all strict compiler options
- **Biome** - Modern linter/formatter replacing ESLint/Prettier
- **Zod schemas** - Validate all external inputs
- **Comprehensive tests** - Unit, integration, and E2E testing
- **Error handling** - Proper error types and graceful failures

## Performance Considerations
- **Concurrent operations** - Use p-queue for managing parallel agent operations
- **Streaming logs** - Real-time log updates without blocking
- **Efficient state updates** - Optimized re-renders in terminal UI
- **Memory management** - Proper cleanup of child processes and resources

# Environment Configuration

## Required Environment Variables
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

## Configuration Files
- `.agentcrew/config.json` - Project-specific configuration
- `~/.config/agentcrew/global.json` - User global settings
- `.env` - Environment variables for development

# Migration from Rust Version

## What's Different
- **Faster development** - TypeScript allows quicker iteration
- **Rich ecosystem** - More libraries and integrations available
- **Better debugging** - Superior debugging tools and IDE support
- **Modern UI** - Ink provides better terminal interface capabilities

## What's the Same
- **Command structure** - All CLI commands remain identical
- **Core functionality** - Same agent orchestration concept
- **Git worktree approach** - Same parallel development strategy
- **Configuration** - Compatible configuration format

# Next Steps for Implementation

1. **Setup project structure** - Create directories and base files
2. **Configure tooling** - Setup Bun, TypeScript, Biome, etc.
3. **Implement core types** - Define TypeScript interfaces
4. **Build CLI framework** - Commander.js command structure
5. **Create agent abstractions** - Base classes and provider implementations
6. **Implement git operations** - Worktree management with simple-git
7. **Build terminal UI** - Ink/React components for interactive interface
8. **Add state management** - Zustand store for application state
9. **Testing setup** - Comprehensive test suite with Bun test runner
10. **Polish and optimization** - Performance tuning and UX improvements

This TypeScript version will provide the same functionality as the Rust version but with faster development cycles and a rich JavaScript ecosystem for rapid MVP development.