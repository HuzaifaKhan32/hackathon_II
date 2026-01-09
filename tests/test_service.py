import pytest
from pydantic import ValidationError
from src.service import TaskService, TaskNotFoundError
from src.models import TaskStatus

@pytest.fixture
def service():
    return TaskService()

def test_add_task(service):
    task = service.add_task("Buy milk", "2% fat")
    assert task.id == 1
    assert task.title == "Buy milk"
    assert task.description == "2% fat"
    assert len(service.tasks) == 1

def test_add_task_validation_error(service):
    with pytest.raises(ValidationError):
        service.add_task("")

def test_list_tasks_empty(service):
    assert service.list_tasks() == []

def test_list_tasks_populated(service):
    service.add_task("One")
    service.add_task("Two")
    tasks = service.list_tasks()
    assert len(tasks) == 2
    assert tasks[0].title == "One"
    assert tasks[1].title == "Two"

def test_complete_task(service):
    task = service.add_task("Task")
    updated = service.complete_task(task.id)
    assert updated.status == TaskStatus.COMPLETED
    assert service.list_tasks()[0].status == TaskStatus.COMPLETED

def test_complete_task_not_found(service):
    with pytest.raises(TaskNotFoundError):
        service.complete_task(999)

def test_update_task(service):
    task = service.add_task("Original", "Desc")
    updated = service.update_task(task.id, title="New Title")
    assert updated.title == "New Title"
    assert updated.description == "Desc"
    
    updated_2 = service.update_task(task.id, description="New Desc")
    assert updated_2.title == "New Title"
    assert updated_2.description == "New Desc"

def test_update_task_validation(service):
    task = service.add_task("Valid")
    with pytest.raises(ValidationError):
        service.update_task(task.id, title="")

def test_delete_task(service):
    task = service.add_task("To delete")
    assert service.delete_task(task.id) is True
    assert len(service.tasks) == 0

def test_delete_task_not_found(service):
    assert service.delete_task(999) is False
