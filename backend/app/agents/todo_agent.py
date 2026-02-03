import os
from openai import AsyncOpenAI
from agents import Agent, Runner, set_default_openai_client, OpenAIChatCompletionsModel
from agents.mcp import MCPServerSse  # Import from agents.mcp
from app.config import settings

# Configure Gemini 3 Flash
gemini_client = AsyncOpenAI(
    api_key=settings.gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

set_default_openai_client(gemini_client, use_for_tracing=False)

async def chat_with_agent(message: str):
    # Use MCPServerSse for remote/HTTP-based servers
    async with MCPServerSse(
        name="Todo_Server",
        params={"url": f"{settings.base_url}/mcp/sse"} # Standard SSE endpoint
    ) as mcp_server:
        
        agent = Agent(
            name="TodoAssistant",
            instructions="You are a smart assistant managing tasks in the Neon DB.",
            model=OpenAIChatCompletionsModel(
                model="gemini-3-flash-preview",
                openai_client=gemini_client
            ),
            mcp_servers=[mcp_server]
        )
        
        result = await Runner.run(agent, message)
        return {"response": result.final_output, "success": True}