from typing import List, Optional, Tuple
from rich.console import Console
from rich.table import Table
from rich.prompt import Prompt, Confirm
from src.models import Task, TaskStatus

class TodoUI:
    def __init__(self):
        self.console = Console()

    def display_welcome(self):
        self.console.print("[bold blue]Console Todo App[/bold blue]", justify="center")
        self.console.print("Manage your tasks efficiently.\n", justify="center")

    def display_menu(self) -> str:
        self.console.print("\n[bold]Menu:[/bold]")
        self.console.print("1. Add Task")
        self.console.print("2. List Tasks")
        self.console.print("3. Complete Task")
        self.console.print("4. Update Task")
        self.console.print("5. Delete Task")
        self.console.print("6. Exit")
        
        choice = Prompt.ask("Select an option", choices=["1", "2", "3", "4", "5", "6"])
        return choice

    def prompt_add_task(self) -> Tuple[str, str]:
        self.console.print("[bold green]Add New Task[/bold green]")
        title = Prompt.ask("Title")
        description = Prompt.ask("Description (optional)", default="")
        return title, description

    def display_tasks(self, tasks: List[Task]):
        if not tasks:
            self.console.print("[italic yellow]No tasks found.[/italic yellow]")
            return

        table = Table(title="Your Tasks")
        table.add_column("ID", style="cyan", no_wrap=True)
        table.add_column("Title", style="magenta")
        table.add_column("Description")
        table.add_column("Status", style="green")
        table.add_column("Created At", justify="right")

        for task in tasks:
            status_style = "green" if task.status == TaskStatus.COMPLETED else "yellow"
            table.add_row(
                str(task.id),
                task.title,
                task.description,
                f"[{status_style}]{task.status.value}[/{status_style}]",
                task.created_at.strftime("%Y-%m-%d %H:%M")
            )
        
        self.console.print(table)

    def prompt_task_id(self, action: str) -> int:
        return int(Prompt.ask(f"Enter Task ID to {action}"))

    def prompt_update_task(self) -> Tuple[Optional[str], Optional[str]]:
        self.console.print("[bold]Leave blank to keep current value.[/bold]")
        
        t_input = Prompt.ask("New Title (press enter to skip)")
        title = t_input if t_input.strip() else None
        
        d_input = Prompt.ask("New Description (press enter to skip)")
        description = d_input if d_input.strip() else None
        
        return title, description

    def prompt_confirm_delete(self, task_id: int) -> bool:
        return Confirm.ask(f"Are you sure you want to delete Task {task_id}?")

    def show_error(self, message: str):
        self.console.print(f"[bold red]Error:[/bold red] {message}")

    def show_success(self, message: str):
        self.console.print(f"[bold green]Success:[/bold green] {message}")

