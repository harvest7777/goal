export const getDayArray = (sessions: Session[]) => {
    // this 24 hour array is in reference to the user's time zone
    // each arr[i] is minutes float
    const result = new Array(24).fill(0);
    const day = new Date();
    const dayStart = new Date(day.setHours(0, 0, 0, 0));
    const dayEnd = new Date(day.setHours(23, 59, 59, 999));
    sessions.forEach((session) => {
      const sessionStart = new Date(session.start_time);
      const sessionEnd = new Date(session.end_time);

      // case 1 previous session rolled over into today
      if (sessionStart.getTime() < dayStart.getTime()) {
        const loopEnd = sessionEnd.getHours();
        for (let hour = 0; hour < loopEnd; hour++) {
          result[hour] += 60;
        }
        result[loopEnd] += dayEnd.getMinutes() + dayEnd.getSeconds() / 60;
        return;
      }

      // case 2 session rolled into a new day
      if (sessionEnd.getTime() > dayEnd.getTime()) {
        const loopStart = sessionStart.getHours()+1;
        console.log(loopStart)
        for (let hour = loopStart; hour < 24; hour++) {
          result[hour] += 60;
        }
        result[loopStart-1] += 60 - (sessionStart.getMinutes() + sessionStart.getSeconds() / 60);
        return;
      }
      // case 3 session start and end are on the same hour, just add to that hour slot
      if (sessionStart.getHours() === sessionEnd.getHours()) {
        const hour = sessionStart.getHours();
        const duration = (sessionEnd.getTime() - sessionStart.getTime()) / 1000 / 60; // duration in minutes
        result[hour] += duration;
        return;
      }

      // case 4 session spans multiple hours
      if (sessionStart.getHours() < sessionEnd.getHours()) {
        const startHour = sessionStart.getHours();
        const endHour = sessionEnd.getHours();
        const startMinutes = sessionStart.getMinutes() + sessionStart.getSeconds() / 60;
        const endMinutes = sessionEnd.getMinutes() + sessionEnd.getSeconds() / 60;

        // Add remaining minutes of the start hour
        result[startHour] += 60 - startMinutes;

        // Add full hours in between
        for (let hour = startHour + 1; hour < endHour; hour++) {
          result[hour] += 60;
        }

        // Add minutes of the end hour
        result[endHour] += endMinutes;
      }
      return;

    });
    console.log(dayStart, dayEnd)

    return result;
}
