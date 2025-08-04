export const getDayArray = (sessions: Session[]) => {
    const result = new Array(24).fill(0);

    for (const { start_time, end_time} of sessions) {
        const startTime = new Date(start_time);
        const endTime = new Date(end_time);
        let current = new Date(startTime);

        while (current < endTime) {
            const hour = current.getHours();

            // End of the current hour
            const hourEnd = new Date(current);
            hourEnd.setMinutes(59, 59, 999);
            hourEnd.setHours(hour); // Just to be safe

            const actualEnd = new Date(Math.min(hourEnd.getTime(), endTime.getTime()));
            const durationMs = actualEnd.getTime() - current.getTime();
            const durationMin = durationMs / 60000;

            result[hour] += durationMin;

            // Move to next hour
            current = new Date(hour + 1, 0, 1); // rough bump
            current.setFullYear(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
            current.setHours(hour + 1, 0, 0, 0);
        }
    }
    console.log("Hourly breakdown:", result);

    return result;
}

export const dayArrayToChartConfig = (dayArray: number[]) => {
    return dayArray.map((value, index) => ({
        hour: `${index}:00`,
        value: value,
    }));
}