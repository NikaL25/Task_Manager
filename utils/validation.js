export const validateTask = (task) => {
  // Check required fields
  if (!task.title || task.title.trim() === '') {
    return 'Please provide a title for the task!';
  }

  if (!task.description || task.description.trim() === '') {
    return 'Please provide a description for the task!';
  }

  if (!task.location || task.location.trim() === '') {
    return 'Please provide a location for the task!';
  }

  if (task.date && isNaN(new Date(task.date).getTime())) {
    return 'Please provide a valid date!';
  }

  return null; // Return null if all checks pass successfully
};
