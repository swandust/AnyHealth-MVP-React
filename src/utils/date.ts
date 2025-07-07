export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getToday = () => {
  const today = new Date();
  return {
    date: formatDate(today),
    time: formatTime(today),
    fullDate: today
  };
};