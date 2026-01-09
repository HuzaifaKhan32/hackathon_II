import sys
from pydantic import ValidationError
from src.service import TaskService, TaskNotFoundError
from src.ui import TodoUI

def main():
    service = TaskService()
    ui = TodoUI()
    ui.display_welcome()

    while True:
        try:
            choice = ui.display_menu()

            if choice == "1": # Add
                title, description = ui.prompt_add_task()
                try:
                    task = service.add_task(title, description)
                    ui.show_success(f"Task '{task.title}' added with ID {task.id}.")
                except ValidationError as e:
                    ui.show_error(str(e))

            elif choice == "2": # List
                tasks = service.list_tasks()
                ui.display_tasks(tasks)

            elif choice == "3": # Complete
                try:
                    task_id = ui.prompt_task_id("complete")
                    service.complete_task(task_id)
                    ui.show_success(f"Task {task_id} marked as completed.")
                except ValueError:
                    ui.show_error("Invalid ID format.")
                except TaskNotFoundError as e:
                    ui.show_error(str(e))

            elif choice == "4": # Update
                try:
                    task_id = ui.prompt_task_id("update")
                    # Check existence first or handle error later
                    # Service updates return task, so we can try-catch
                    title, description = ui.prompt_update_task()
                    service.update_task(task_id, title, description)
                    ui.show_success(f"Task {task_id} updated.")
                except ValueError:
                    ui.show_error("Invalid ID format.")
                except TaskNotFoundError as e:
                    ui.show_error(str(e))
                except ValidationError as e:
                    ui.show_error(str(e))

            elif choice == "5": # Delete
                try:
                    task_id = ui.prompt_task_id("delete")
                    if ui.prompt_confirm_delete(task_id):
                        if service.delete_task(task_id):
                            ui.show_success(f"Task {task_id} deleted.")
                        else:
                            ui.show_error(f"Task {task_id} not found.")
                except ValueError:
                    ui.show_error("Invalid ID format.")

            elif choice == "6": # Exit
                ui.console.print("[bold blue]Goodbye![/bold blue]")
                sys.exit(0)

        except KeyboardInterrupt:
            ui.console.print("\n[bold blue]Goodbye![/bold blue]")
            sys.exit(0)
        except Exception as e:
            ui.show_error(f"Unexpected error: {e}")

if __name__ == "__main__":
    main()
