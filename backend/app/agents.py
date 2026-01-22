import os
from openai import AsyncOpenAI
from agents import Agent, Runner, MCPServerSse, OpenAIChatCompletionsModel, set_default_openai_client
from app.config import settings

# Configure Gemini Flash
gemini_client = AsyncOpenAI(
    api_key=settings.gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

set_default_openai_client(gemini_client, use_for_tracing=False)

async def chat_with_agent(message: str):
    # This uses the correct 'agents' import
    async with MCPServerSse(
        name="Todo_Server",
        params={"url": f"{settings.base_url}/mcp/sse"}
    ) as mcp_server:
        
        agent = Agent(
            name="TodoAssistant",
            instructions="You are a helpful assistant. Use tools to manage tasks.",
            model=OpenAIChatCompletionsModel(
                model="gemini-2.5-flash",
                openai_client=gemini_client
            ),
            mcp_servers=[mcp_server]
        )
        
        result = await Runner.run(agent, message)
        return {"response": result.final_output, "success": True}