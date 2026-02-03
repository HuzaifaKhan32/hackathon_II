from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.todo import Todo, TodoCreate, TodoUpdate
from typing import List, Optional

class TodoService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_todo(self, title: str, description: str, priority: str) -> Todo:
        todo_create = TodoCreate(title=title, description=description, priority=priority)
        todo = Todo.model_validate(todo_create)
        self.session.add(todo)
        await self.session.commit()
        await self.session.refresh(todo)
        return todo

    async def list_todos(self, status: str = "all", priority: Optional[str] = None) -> List[Todo]:
        query = select(Todo)
        if status != "all":
            query = query.where(Todo.status == status)
        if priority:
            query = query.where(Todo.priority == priority)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def update_todo(self, todo_id: int, title: Optional[str], description: Optional[str], status: Optional[str], priority: Optional[str]) -> Todo:
        result = await self.session.get(Todo, todo_id)
        if not result:
            raise ValueError("Todo not found")
        
        todo = result
        if title is not None:
            todo.title = title
        if description is not None:
            todo.description = description
        if status is not None:
            todo.status = status
        if priority is not None:
            todo.priority = priority
            
        self.session.add(todo)
        await self.session.commit()
        await self.session.refresh(todo)
        return todo

    async def delete_todo(self, todo_id: int):
        result = await self.session.get(Todo, todo_id)
        if not result:
            raise ValueError("Todo not found")
        
        todo = result
        await self.session.delete(todo)
        await self.session.commit()
        return {"message": f"Todo {todo_id} deleted successfully"}

    async def mark_complete(self, todo_id: int) -> Todo:
        result = await self.session.get(Todo, todo_id)
        if not result:
            raise ValueError("Todo not found")
        
        todo = result
        todo.status = "completed"
        self.session.add(todo)
        await self.session.commit()
        await self.session.refresh(todo)
        return todo
