# LUP Dashboard MCP Server

This directory contains the Model Context Protocol (MCP) server for the LUP Dashboard project.

## Features

- **get_i18n_messages**: Retrieve i18n messages for a specific locale.
- **list_components**: List all React components in the `src/components` directory.

## Usage

To run the server:

```bash
npm run mcp
# or
yarn mcp
```

## Integration

To integrate this server with an MCP client (like GitHub Copilot or Claude Desktop), add the following configuration:

```json
{
  "mcpServers": {
    "lup-dashboard": {
      "command": "npm",
      "args": ["run", "mcp"],
      "env": {
        "cwd": "/path/to/your/project/lup-dashboard"
      }
    }
  }
}
```
