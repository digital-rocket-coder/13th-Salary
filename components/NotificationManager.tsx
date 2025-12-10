import React, { useState, useEffect, useCallback } from 'react';
import { Bell, BellRing, CheckCircle } from 'lucide-react';

const NotificationManager: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const sendNotification = useCallback((title: string, body: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: 'https://cdn-icons-png.flaticon.com/512/2530/2530863.png', // Space rocket icon generic
        tag: 'daily-salary-reminder' // Prevents spamming multiple notifications
      });
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Ваш браузер не поддерживает уведомления 🛸');
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      sendNotification('Связь установлена! 📡', 'Вы будете получать ежедневные отчеты о приближении 13-й зарплаты.');
    }
  };

  // Check daily logic
  useEffect(() => {
    if (permission !== 'granted') return;

    const checkAndSendDaily = () => {
      const lastSentDate = localStorage.getItem('lastNotificationDate');
      const today = new Date().toDateString();

      // If we haven't sent a notification today
      if (lastSentDate !== today) {
        const now = new Date();
        const diffTime = targetDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            sendNotification(
                '🚀 Ежедневный отчет', 
                `До 13-й зарплаты осталось ${diffDays} дн. Держим курс!`
            );
            localStorage.setItem('lastNotificationDate', today);
        } else if (diffDays === 0) {
            sendNotification(
                '💰 ПРИБЫТИЕ!', 
                `Сегодня день 13-й зарплаты! Проверьте шлюзы (счета)!`
            );
            localStorage.setItem('lastNotificationDate', today);
        }
      }
    };

    // Check immediately on load, then every minute
    checkAndSendDaily();
    const interval = setInterval(checkAndSendDaily, 60000);

    return () => clearInterval(interval);
  }, [permission, targetDate, sendNotification]);

  if (permission === 'denied') return null;

  return (
    <button
      onClick={requestPermission}
      disabled={permission === 'granted'}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
        ${permission === 'granted' 
          ? 'bg-green-500/20 text-green-300 border-green-500/50 cursor-default' 
          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 hover:bg-indigo-500/40 hover:scale-105 animate-pulse'}
      `}
      title={permission === 'granted' ? 'Уведомления активны' : 'Включить ежедневные уведомления'}
    >
      {permission === 'granted' ? (
        <>
          <CheckCircle size={16} />
          <span>Связь активна</span>
        </>
      ) : (
        <>
          {permission === 'default' ? <BellRing size={16} /> : <Bell size={16} />}
          <span>Включить радар</span>
        </>
      )}
    </button>
  );
};

export default NotificationManager;