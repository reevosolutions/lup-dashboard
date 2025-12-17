import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

// Define the server
const server = new Server(
  {
    name: "lup-dashboard-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_i18n_messages",
        description: "Retrieve i18n messages for a specific locale",
        inputSchema: {
          type: "object",
          properties: {
            locale: {
              type: "string",
              description: "The locale code (e.g., 'en', 'es')",
            },
          },
          required: ["locale"],
        },
      },
      {
        name: "list_components",
        description: "List all React components in the project",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "get_i18n_messages") {
      const { locale } = z
        .object({ locale: z.string() })
        .parse(args);
      
      const messagesPath = path.join(process.cwd(), "messages", `${locale}.json`);
      
      try {
        const content = await fs.readFile(messagesPath, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading messages for locale '${locale}': ${(error as Error).message}`,
            },
          ],
          isError: true,
        };
      }
    }

    if (name === "list_components") {
      const componentsPath = path.join(process.cwd(), "src", "components");
      try {
        const files = await fs.readdir(componentsPath);
        const components = files.filter(f => f.endsWith(".tsx") || f.endsWith(".jsx"));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(components, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing components: ${(error as Error).message}`,
            },
          ],
          isError: true,
        };
      }
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${(error as Error).message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("LUP Dashboard MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
