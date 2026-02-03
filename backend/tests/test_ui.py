import pytest
from unittest.mock import Mock, patch
from src.ui import TodoUI
from src.models import Task, TaskStatus

@pytest.fixture
def ui():
    return TodoUI()

def test_display_welcome(ui):
    with patch.object(ui.console, 'print') as mock_print:
        ui.display_welcome()
        assert mock_print.call_count == 2
        mock_print.assert_any_call("[bold blue]Console Todo App[/bold blue]", justify="center")

def test_display_menu(ui):
    with patch.object(ui.console, 'print') as mock_print, \
         patch('rich.prompt.Prompt.ask', return_value="1") as mock_ask:
        choice = ui.display_menu()
        assert choice == "1"
        assert mock_print.call_count > 0

def test_prompt_add_task(ui):
    with patch.object(ui.console, 'print'), \
         patch('rich.prompt.Prompt.ask', side_effect=["My Task", "Desc"]):
        title, desc = ui.prompt_add_task()
        assert title == "My Task"
        assert desc == "Desc"

def test_display_tasks_empty(ui):
    with patch.object(ui.console, 'print') as mock_print:
        ui.display_tasks([])
        mock_print.assert_called_with("[italic yellow]No tasks found.[/italic yellow]")

def test_display_tasks_populated(ui):
    task = Task(id=1, title="Test", status=TaskStatus.PENDING)
    with patch.object(ui.console, 'print') as mock_print:
        ui.display_tasks([task])
        # Check that a Table was printed
        args, _ = mock_print.call_args
        assert "Table" in str(type(args[0]))

def test_prompt_task_id(ui):
    with patch('rich.prompt.Prompt.ask', return_value="10"):
        task_id = ui.prompt_task_id("delete")
        assert task_id == 10

def test_prompt_update_task(ui):
    with patch.object(ui.console, 'print'), \
         patch('rich.prompt.Prompt.ask', side_effect=["New Title", ""]):
        t, d = ui.prompt_update_task()
        assert t == "New Title"
        assert d is None

def test_prompt_confirm_delete(ui):
    with patch('rich.prompt.Confirm.ask', return_value=True):
        assert ui.prompt_confirm_delete(1) is True

def test_show_error(ui):
    with patch.object(ui.console, 'print') as mock_print:
        ui.show_error("Boom")
        mock_print.assert_called_with("[bold red]Error:[/bold red] Boom")

def test_show_success(ui):
    with patch.object(ui.console, 'print') as mock_print:
        ui.show_success("Yay")
        mock_print.assert_called_with("[bold green]Success:[/bold green] Yay")
