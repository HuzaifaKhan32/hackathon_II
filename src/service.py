from typing import List, Optional
from src.models import Task, TaskStatus

class TaskNotFoundError(Exception):
    pass

class TaskService:
    def __init__(self):
        self.tasks: List[Task] = []
        self._next_id = 1

    def add_task(self, title: str, description: Optional[str] = "") -> Task:
        task = Task(id=self._next_id, title=title, description=description)
        self.tasks.append(task)
        self._next_id += 1
        return task

    def list_tasks(self) -> List[Task]:
        return self.tasks

    def get_task(self, task_id: int) -> Task:
        for task in self.tasks:
            if task.id == task_id:
                return task
        raise TaskNotFoundError(f"Task with ID {task_id} not found.")

    def complete_task(self, task_id: int) -> Task:
        task = self.get_task(task_id)
        task.status = TaskStatus.COMPLETED
        return task

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Task:
        task = self.get_task(task_id)
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        return task

    def delete_task(self, task_id: int) -> bool:
        try:
            task = self.get_task(task_id)
            self.tasks.remove(task)
            return True
        except TaskNotFoundError:
            return False
