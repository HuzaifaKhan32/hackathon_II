---
id: 005
title: sidebar-functionality-and-modal-enhancement
stage: red
date: 2026-01-13
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 002-web-todo-auth
branch: main
user: HUZAIFA
command: enhance-sidebar-and-modal
labels: [sidebar, modal, framer-motion, sonner, toast, filtering]
links: null
file_changes:
  - frontend/package.json
  - frontend/src/app/providers.tsx
  - frontend/src/components/modals/AddTaskModal.tsx
  - frontend/src/components/dashboard/TaskList.tsx
  - frontend/src/app/(dashboard)/dashboard/today/page.tsx
  - frontend/src/app/(dashboard)/dashboard/upcoming/page.tsx
  - frontend/src/components/layout/Sidebar.tsx
tests: []
prompt_text: |
  there are more options in the sidebar so make it functional according to its name...
  center the new task modal... use framer motion... use toast...
response_text: |
  1. Installed `framer-motion` and `sonner`.
  2. Configured `Toaster` in `Providers`.
  3. Refactored `AddTaskModal` with Framer Motion animations, backdrop blur, centered layout, and API integration with toast notifications.
  4. Updated `TaskList` to support filtering ('today', 'upcoming') and added delete functionality with toasts.
  5. Created new pages `/dashboard/today` and `/dashboard/upcoming`.
  6. Updated `Sidebar` to link to new pages and handle active states.
outcome: success
evaluation: |
  Sidebar links now work. New Task modal is animated and functional. Toasts are displayed.
---

# Sidebar Functionality and Modal Enhancement

## Context
User requested to make "Today" and "Upcoming" sidebar links functional, enhance the "New Task" modal with animations (Framer Motion) and better styling (centering, blur), and add user-friendly toast notifications (Sonner).

## Changes
1. **Dependencies**: Added `framer-motion` and `sonner`.
2. **Providers**: Added `Toaster` to `frontend/src/app/providers.tsx`.
3. **Modal**: Completely refactored `frontend/src/components/modals/AddTaskModal.tsx`:
   - Added `AnimatePresence` and `motion.div` for entry/exit animations.
   - Added backdrop blur and centered positioning.
   - Implemented form submission to `api.post('/tasks/')` with validation.
   - Added success/error toasts using `sonner`.
4. **Task List**: Updated `frontend/src/components/dashboard/TaskList.tsx`:
   - Added `filter` prop to support 'all', 'today', 'upcoming'.
   - Implemented client-side filtering logic based on `created_at` (Today) and completion status (Upcoming/Pending).
   - Added `handleDelete` with API call and toasts.
   - Added `handleToggleComplete` with API call and toasts.
5. **New Pages**:
   - Created `frontend/src/app/(dashboard)/dashboard/today/page.tsx`.
   - Created `frontend/src/app/(dashboard)/dashboard/upcoming/page.tsx`.
6. **Sidebar**: Updated `frontend/src/components/layout/Sidebar.tsx` to link to the new routes.

## Verification
- Clicking "Today" shows tasks created today.
- Clicking "Upcoming" shows incomplete tasks.
- "New Task" modal animates in/out and creates tasks.
- Toasts appear for success/error actions.
