export function formatCurrency(value) {
  const num = typeof value === 'number' ? value : parseFloat(value || 0);
  return `S/ ${num.toFixed(2)}`;
}

export function formatDate(timestamp) {
  if (!timestamp) return '—';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return String(timestamp);
  
  // Format to Peruvian standard: DD/MM/YYYY, HH:MM:SS
  return date.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

export function formatTimeOnly(timestamp) {
  if (!timestamp) return '—';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

export function formatDuration(minutes) {
  const mins = Math.round(minutes);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (hrs > 0) {
    return `${hrs}h ${remainingMins}m`;
  }
  return `${remainingMins}m`;
}

export function formatSecondsToTimer(totalSeconds) {
  const secs = Math.floor(totalSeconds % 60);
  const mins = Math.floor((totalSeconds / 60) % 60);
  const hrs = Math.floor(totalSeconds / 3600);
  
  const paddedHrs = String(hrs).padStart(2, '0');
  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');
  
  return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
}
