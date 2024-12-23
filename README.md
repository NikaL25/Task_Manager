# Task Management App

## Description

The Task Management App is a mobile application developed using **React Native**. It allows users to create, manage, view, and delete tasks with various functionalities like sorting, filtering, and date selection. The app is designed to help individuals organize their daily tasks efficiently.

### Key Features:
- **Task Creation:** Users can add tasks with title, description, location, and due date.
- **Task Editing:** Modify existing tasks including status changes.
- **Task Deletion:** Users can delete tasks they no longer need.
- **Sorting & Filtering:** Tasks can be sorted by date and filtered by status.
- **Persistent Storage:** Task data is saved locally using **AsyncStorage**, ensuring tasks are preserved across app restarts.
- **User-friendly Interface:** Intuitive and easy-to-use UI with clear error handling.

---

## Technologies Used

The app is built with the following technologies:

### Frontend:
- **React Native:** A popular framework for building mobile applications for iOS and Android using JavaScript and React.
- **React Navigation:** Used for navigating between different screens in the app, like task list, task details, and task creation.
- **React Native Picker:** A component for rendering a dropdown for task status filtering.
- **DateTimePicker:** A component for selecting dates for task due dates.

### Storage:
- **AsyncStorage:** Used for storing task data locally on the user's device.

### Validation:
- **Custom Validation:** A set of JavaScript functions to validate user input, ensuring that tasks have proper fields like title, description, location, and a valid date.

---

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js** 
- **npm** (Node Package Manager) or **yarn** — Comes bundled with Node.js
- **React Native CLI** (if you wish to build the project from source) — [Install React Native CLI](https://reactnative.dev/docs/environment-setup)

### Steps to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/yourusername/task-management-app.git](https://github.com/NikaL25/Task_Manager.git)
   cd task-manager
2. Install Dependencies: Run the following command to install the necessary dependencies:
   npm install
3. ## Run the Project:

To run the app using Expo, follow these steps:

  **Start the Development Server:**
   npx expo start

How the Project Works
The Task Management App follows a simple structure for managing tasks. Here's a breakdown of the core components:

Task List Screen:
Displays a list of all tasks stored locally.
Allows tasks to be sorted by date (ascending/descending) and filtered by their status (All, Completed, In Progress, Cancelled).
Includes functionality for viewing details of each task and deleting tasks.
Task Form Screen:
Allows users to add new tasks with details like title, description, location, and date.
The date picker is integrated to allow users to select a due date.
Form validation ensures that no field is left empty and the date is valid before submission.
Task Item:
Represents a single task item within the list.
Displays basic information about the task such as its title, description, due date, and status.
Allows users to tap on a task to view more details or to delete the task.
Storage:
AsyncStorage is used to save tasks locally on the device. Tasks are loaded and saved whenever the app is opened or updated.
Validation:
Custom validation logic ensures all fields are filled correctly before submitting a task, preventing incomplete or incorrect data.
Libraries and Dependencies
React Native: Framework for building mobile apps.
React Navigation: Used for navigating between screens (Task List, Task Form, Task Detail).
@react-native-picker/picker: Provides the Picker component for filtering tasks.
@react-native-community/datetimepicker: For selecting task due dates.
AsyncStorage: Provides a simple, persistent, key-value storage solution.
React: The underlying JavaScript library for building the user interface.
