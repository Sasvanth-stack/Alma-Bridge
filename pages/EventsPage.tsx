
import React, { useState, useMemo } from 'react';
import { EVENTS } from '../constants.ts';
import { Event } from '../types.ts';
import Icon from '../components/Icon.tsx';

const EventListItem: React.FC<{ event: Event }> = ({ event }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-start gap-4">
      <div className="flex flex-col items-center justify-center p-3 bg-brand-orange-100 dark:bg-brand-orange-900/50 rounded-lg shrink-0">
        <span className="text-sm font-bold text-brand-orange-700 dark:text-brand-orange-300">{event.date.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
        <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">{event.date.getDate()}</span>
      </div>
      <div className="flex-1">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ event.type === 'Workshop' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' : event.type === 'Seminar' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' : 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200' }`}>{event.type}</span>
        <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white">{event.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{event.description}</p>
      </div>
    </div>
);

const EventsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [allEvents] = useState<Event[]>(EVENTS);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const eventsByDay = useMemo(() => {
    return allEvents.reduce((acc, event) => {
      const day = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate()).toISOString();
      if (!acc[day]) acc[day] = [];
      acc[day].push(event);
      return acc;
    }, {} as Record<string, Event[]>);
  }, [allEvents]);
  
  const selectedDayEvents = useMemo(() => {
    const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()).toISOString();
    return eventsByDay[day] || [];
  }, [selectedDate, eventsByDay]);


  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
    // If the new month doesn't have the currently selected day, reset to the 1st
    if (newDate.getMonth() !== selectedDate.getMonth() || newDate.getFullYear() !== selectedDate.getFullYear()) {
        setSelectedDate(newDate);
    }
  };
  
  const calendarDays = [];
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="w-full h-12"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    const hasEvents = !!eventsByDay[dateString];
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const isToday = new Date().toDateString() === date.toDateString();

    calendarDays.push(
      <div key={day} className="flex justify-center">
        <button
          onClick={() => setSelectedDate(date)}
          className={`w-10 h-10 flex flex-col items-center justify-center rounded-full transition-colors relative ${
            isSelected ? 'bg-brand-orange-500 text-white shadow-md' : isToday ? 'bg-brand-orange-100 dark:bg-brand-orange-900/50' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <span className={`${isToday && !isSelected ? 'font-bold text-brand-orange-600 dark:text-brand-orange-300' : ''}`}>{day}</span>
          {hasEvents && <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-brand-orange-500'}`}></div>}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md">
            <div className="flex justify-between items-center mb-4 px-2">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Icon name="chevron-left" className="w-6 h-6" /></button>
                <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Icon name="chevron-right" className="w-6 h-6" /></button>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
                {calendarDays}
            </div>
        </div>
        
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Events on {selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric' })}</h3>
            {selectedDayEvents.length > 0 ? (
                <div className="space-y-4">
                {selectedDayEvents.map(event => (
                    <EventListItem key={event.id} event={event} />
                ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <p className="text-gray-500 dark:text-gray-400">No events scheduled for this day.</p>
                </div>
            )}
        </div>

        <button className="fixed bottom-44 right-6 bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white rounded-full p-4 shadow-xl hover:scale-110 transition-transform duration-300 z-30">
            <Icon name="plus" className="w-6 h-6" />
            <span className="sr-only">Create New Event</span>
        </button>
    </div>
  );
};

export default EventsPage;