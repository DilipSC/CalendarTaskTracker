# Dynamic Event Calendar Application

## Overview

This Dynamic Event Calendar Application is a modern, interactive web application built with React and Next.js. It provides users with an intuitive interface to manage their events, offering a range of features for viewing, adding, and managing events on a monthly calendar.

## Features

### 1. Calendar View
- Display a monthly calendar grid with all days properly aligned
- Navigate between months using "Previous" and "Next" buttons
- Highlight the current day and selected day visually
- Display event indicators on days with scheduled events

### 2. Event Management
- Click on a day to open an overlay with event options
- View all events for a selected day in a side panel
- Add new events with a modal form
- Delete individual events or all events for a selected day

### 3. Event Details
Each event includes:
- Event name (title)
- Start time
- End time
- Description

### 4. Interactive User Interface
- Clean and modern UI using shadcn components
- Responsive design for various screen sizes
- Intuitive navigation and interaction

### 5. Data Persistence
- Events are stored in the browser's localStorage
- Data persists between page refreshes

### 6. Complex Logic Handling
- Automatic handling of month transitions (e.g., from Jan 31 to Feb 1)
- Prevention of overlapping events

## Technical Stack

- **Frontend Framework**: React with Next.js (App Router)
- **UI Components**: shadcn/ui
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind CSS
- **Data Storage**: Browser's localStorage
