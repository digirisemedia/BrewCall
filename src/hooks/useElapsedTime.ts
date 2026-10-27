import { useState, useEffect } from 'react';

export function useElapsedTime(timestamp: number): string {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - timestamp;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (hours > 0) {
        setElapsed(`${hours}h ${minutes % 60}m ago`);
      } else if (minutes > 0) {
        setElapsed(`${minutes}m ${seconds % 60}s ago`);
      } else {
        setElapsed(`${seconds}s ago`);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return elapsed;
}
