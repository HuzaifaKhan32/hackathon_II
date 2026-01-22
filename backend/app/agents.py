import os
from openai import AsyncOpenAI
from agents import Agent, Runner, set_default_openai_client, OpenAIChatCompletionsModel, MCPServerSse

# Use Gemini 3 Flash for PhD-level reasoning at Flash speeds
gemini_client = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Mandatory for AgentKit tracing and default behavior
set_default_openai_client(gemini_client, use_for_tracing=False)

gemini_model = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=gemini_client
)

async def chat_with_agent(user_message: str):
    # Connect to the local MCP server running on this FastAPI app
    async with MCPServerSse(
        name="LocalTodoServer",
        params={"url": "http://localhost:8000/mcp/sse"}
    ) as mcp_server:
        
        todo_agent_with_sse = Agent(
            name="TodoAssistant",
            instructions="""You are a smart todo assistant. 
            Use your tools to manage tasks in the database.""",
            model=gemini_model,
            mcp_servers=[mcp_server]
        )
        
        result = await Runner.run(todo_agent_with_sse, user_message)
        return result.final_output
