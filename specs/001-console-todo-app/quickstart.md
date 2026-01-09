# Quickstart: Console Todo App

## Prerequisites
- **Python 3.13+**
- **uv** package manager (`pip install uv`)

## Setup
1. Clone the repository.
2. Navigate to the project root.
3. Install dependencies:
   ```bash
   uv sync
   ```

## Running the App
Start the interactive console:
```bash
uv run src/main.py
```

## Running Tests
Execute the test suite with coverage:
```bash
uv run pytest --cov=src
```

## Usage Guide
Once inside the app, follow the on-screen menu:
1. **Add Task**: Prompts for title and description.
2. **List Tasks**: Shows a table of all tasks.
3. **Update Task**: Asks for ID, then new details (leave blank to keep current).
4. **Delete Task**: Asks for ID to remove.
5. **Toggle Status**: Asks for ID to mark complete/pending.
6. **Exit**: Closes the application (Data is lost).
