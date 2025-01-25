import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BG from "../src/img/bg-desktop.png"; // Desktop background
import BGM from "../src/img/bg-mobile.jpg"; // Mobile background

const App = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [age, setAge] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calculateAge = () => {
    if (!birthDate) {
      toast.error("Please select a date first!");
      return;
    }

    const now = new Date();
    const birth = new Date(birthDate);

    const diffInMs = now - birth;

    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
    const days = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    setAge({ years, days, hours, minutes, seconds });
    toast.success("Age calculated successfully!");
  };

  const handleConfirmDate = () => {
    if (!birthDate) {
      toast.error("Please pick a date!");
      return;
    }
    setCalendarOpen(false);
    toast.info("Date selected successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative">
      {/* Background for mobile */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundImage: `url(${BGM})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      ></div>

      {/* Background for desktop */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <ToastContainer />
      
      {/* Glass effect container */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-20 p-6 rounded-2xl w-full max-w-lg text-gray-800 relative z-10">
        {/* Title with custom font */}
        <h1 className="text-4xl font-extrabold mb-8 text-center" style={{ fontFamily: 'Macondo, cursive' }}>
          AGE CALCULATOR
        </h1>

        {/* Age Calculation Result */}
        {age && (
          <div className="bg-teal-100 text-teal-700 rounded-lg p-6 mb-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Your Age:</h2>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-lg">
                <strong>Years:</strong> {age.years}
              </p>
              <p className="text-lg">
                <strong>Days:</strong> {age.days}
              </p>
              <p className="text-lg">
                <strong>Hours:</strong> {age.hours}
              </p>
              <p className="text-lg">
                <strong>Minutes:</strong> {age.minutes}
              </p>
              <p className="text-lg">
                <strong>Seconds:</strong> {age.seconds}
              </p>
            </div>
          </div>
        )}

        {/* Birth Date Picker Input Form */}
        <label htmlFor="birthDate" className="block text-lg font-medium mb-2">
          Enter Your Birth Date:
        </label>
        <div className="relative mb-6">
          <button
            onClick={() => setCalendarOpen(true)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition text-gray-600 flex justify-between items-center"
          >
            {birthDate ? birthDate.toLocaleDateString() : "Select Date"}
            <span className="text-teal-500">📅</span>
          </button>
          {calendarOpen && (
            <div className="absolute top-10 left-0 w-full bg-white shadow-xl rounded-lg z-10 p-4">
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                inline
                showYearDropdown
                dropdownMode="select"
              />
              <button
                onClick={handleConfirmDate}
                className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-bold shadow-md transition"
              >
                Confirm Date
              </button>
            </div>
          )}
        </div>

        {/* Calculate My Age Button */}
        <button
          onClick={calculateAge}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-bold shadow-md transition"
        >
          Calculate My Age
        </button>
      </div>
    </div>
  );
};

export default App;
