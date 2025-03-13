export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getMonthDays = (date: Date): Date[] => {
    const days: Date[] = [];
    const totalDays = getDaysInMonth(date);
    
    for (let day = 1; day <= totalDays; day++) {
        days.push(new Date(date.getFullYear(), date.getMonth(), day));
    }
    
    return days;
};

export const getMonthName = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long' });
};

export const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

export const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
};

export const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};
