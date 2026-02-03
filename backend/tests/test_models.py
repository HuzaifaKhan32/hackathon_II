import pytest
from pydantic import ValidationError
from src.models import Task, TaskStatus

def test_create_task_valid():
    task = Task(id=1, title="Buy milk")
    assert task.id == 1
    assert task.title == "Buy milk"
    assert task.status == TaskStatus.PENDING
    assert task.description == ""
    assert task.created_at is not None

def test_create_task_full_fields():
    task = Task(
        id=2, 
        title="Walk dog", 
        description="At the park", 
        status=TaskStatus.COMPLETED
    )
    assert task.description == "At the park"
    assert task.status == TaskStatus.COMPLETED

def test_task_title_empty():
    with pytest.raises(ValidationError):
        Task(id=1, title="")

def test_task_title_too_long():
    with pytest.raises(ValidationError):
        Task(id=1, title="x" * 201)

def test_task_description_too_long():
    with pytest.raises(ValidationError):
        Task(id=1, title="Valid", description="x" * 1001)

def test_invalid_status():
    with pytest.raises(ValidationError):
        Task(id=1, title="Valid", status="UNKNOWN")
