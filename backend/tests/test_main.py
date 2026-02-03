import pytest
import sys
from unittest.mock import MagicMock, patch, call
from src.main import main
from src.models import Task

def test_main_exit():
    with patch('src.main.TaskService') as MockService, \
         patch('src.main.TodoUI') as MockUI:
        
        ui = MockUI.return_value
        ui.display_menu.return_value = "6" # Exit
        
        with pytest.raises(SystemExit) as e:
            main()
        
        assert e.value.code == 0
        ui.display_welcome.assert_called_once()
        ui.display_menu.assert_called_once()

def test_main_add_task():
    with patch('src.main.TaskService') as MockService, \
         patch('src.main.TodoUI') as MockUI:
        
        ui = MockUI.return_value
        service = MockService.return_value
        
        # Sequence: Add Task (1), then Exit (6)
        ui.display_menu.side_effect = ["1", "6"]
        ui.prompt_add_task.return_value = ("Buy Milk", "Desc")
        
        task = Task(id=1, title="Buy Milk")
        service.add_task.return_value = task
        
        with pytest.raises(SystemExit):
            main()
            
        service.add_task.assert_called_with("Buy Milk", "Desc")
        ui.show_success.assert_called()

def test_main_list_tasks():
    with patch('src.main.TaskService') as MockService, \
         patch('src.main.TodoUI') as MockUI:
        
        ui = MockUI.return_value
        service = MockService.return_value
        
        ui.display_menu.side_effect = ["2", "6"]
        service.list_tasks.return_value = []
        
        with pytest.raises(SystemExit):
            main()
            
        service.list_tasks.assert_called()
        ui.display_tasks.assert_called_with([])

def test_main_complete_task():
    with patch('src.main.TaskService') as MockService, \
         patch('src.main.TodoUI') as MockUI:
        
        ui = MockUI.return_value
        service = MockService.return_value
        
        ui.display_menu.side_effect = ["3", "6"]
        ui.prompt_task_id.return_value = 1
        
        with pytest.raises(SystemExit):
            main()
            
        service.complete_task.assert_called_with(1)
        ui.show_success.assert_called()

