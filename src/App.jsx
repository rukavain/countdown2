import React, { useState, useEffect } from "react";
import alarmSound from "C:/Users/USER/Desktop/fein/src/assets/level-up-191997.mp3"; // Import your audio file

function CountdownTimer() {
  const [timers, setTimers] = useState([
    { id: 0, hours: 0, minutes: 0, seconds: 0, name: "", isActive: false },
  ]);

  const addTimer = () => {
    const newTimer = {
      id: timers.length,
      hours: 0,
      minutes: 0,
      seconds: 0,
      name: "",
      isActive: false,
    };
    setTimers([...timers, newTimer]);
  };

  const removeTimer = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  const handleNameChange = (id, event) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, name: event.target.value } : timer
    );
    setTimers(updatedTimers);
  };

  const toggleTimer = (id) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, isActive: !timer.isActive } : timer
    );
    setTimers(updatedTimers);
  };

  const resetTimer = (id) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === id
        ? { ...timer, hours: 0, minutes: 0, seconds: 0, isActive: false }
        : timer
    );
    setTimers(updatedTimers);
  };

  useEffect(() => {
    timers.forEach((timer) => {
      let totalSeconds =
        timer.hours * 3600 + timer.minutes * 60 + timer.seconds;
      let interval;

      if (timer.isActive && totalSeconds > 0) {
        interval = setInterval(() => {
          totalSeconds--;
          const hoursLeft = Math.floor(totalSeconds / 3600);
          const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
          const secondsLeft = totalSeconds % 60;

          const updatedTimers = timers.map((t) =>
            t.id === timer.id
              ? {
                  ...t,
                  hours: hoursLeft,
                  minutes: minutesLeft,
                  seconds: secondsLeft,
                }
              : t
          );
          setTimers(updatedTimers);

          if (totalSeconds === 0) {
            clearInterval(interval);
            const audio = new Audio(alarmSound);
            audio.play();
          }
        }, 1000);
      } else if (totalSeconds === 0) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    });
  }, [timers]);

  return (
    <div className="flex justify-center items-center flex-col ">
      <h1 className="font-bold my-12 text-3xl">
        Pixel Countdown Timer by Vain
      </h1>
      {timers.map((timer) => (
        <div className="shadow-lg py-4 px-8 rounded-lg bg-white" key={timer.id}>
          <h2 className="font-md text-xl">{timer.name}</h2>
          <div className="flex gap-4">
            <label className="font-bold text-lg py-4">Name: </label>
            <input
              className="border border-slate-500 rounded-md px-4"
              placeholder="ex. Honey"
              type="text"
              value={timer.name}
              onChange={(e) => handleNameChange(timer.id, e)}
            />
          </div>
          <div className="flex py-4 justify-center items-center gap-5">
            <label className="text-lg">Hours: </label>
            <input
              className="text-lg border border-slate-500 rounded-md py-2 px-4"
              type="number"
              value={timer.hours}
              onChange={(e) =>
                setTimers(
                  timers.map((t) =>
                    t.id === timer.id
                      ? { ...t, hours: parseInt(e.target.value) }
                      : t
                  )
                )
              }
            />
            <label className="text-lg">Minutes: </label>
            <input
              className="text-lg border border-slate-500 rounded-md py-2 px-4"
              type="number"
              value={timer.minutes}
              onChange={(e) =>
                setTimers(
                  timers.map((t) =>
                    t.id === timer.id
                      ? { ...t, minutes: parseInt(e.target.value) }
                      : t
                  )
                )
              }
            />
            <label className="text-lg ">Seconds: </label>
            <input
              className="text-lg border border-slate-500 rounded-md py-2 px-4"
              type="number"
              value={timer.seconds}
              onChange={(e) =>
                setTimers(
                  timers.map((t) =>
                    t.id === timer.id
                      ? { ...t, seconds: parseInt(e.target.value) }
                      : t
                  )
                )
              }
            />
          </div>
          <div className="flex gap-12 justify-center items-center my-5">
            <button
              className="shadow-md py-2 px-6 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition"
              onClick={() => toggleTimer(timer.id)}
            >
              {timer.isActive ? "Pause" : "Start"}
            </button>
            <button
              className="shadow-md py-2 px-6 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition"
              onClick={() => resetTimer(timer.id)}
            >
              Reset
            </button>
            <button
              className="shadow-md py-2 px-6 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition"
              onClick={() => removeTimer(timer.id)}
            >
              Remove
            </button>
            <button
              className="shadow-md my-2 py-2 px-6 font-semibold rounded-lg hover:bg-slate-800 hover:text-white transition"
              onClick={addTimer}
            >
              Add Another Timer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountdownTimer;
