import React, { useState } from "react";
import diceFace1 from './assets/images/Dice_face_1.png';
import diceFace2 from './assets/images/Dice_face_2.png';
import diceFace3 from './assets/images/Dice_face_3.png';
import diceFace4 from './assets/images/Dice_face_4.png';
import diceFace5 from './assets/images/Dice_face_5.png';
import diceFace6 from './assets/images/Dice_face_6.png';

const diceImages = [diceFace1, diceFace2, diceFace3, diceFace4, diceFace5, diceFace6];

function Rules() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleRules = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <button
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold mb-4 transition-transform transform hover:scale-105"
        onClick={toggleRules}
      >
        {isVisible ? "Hide Rules" : "Show Rules"}
      </button>
      {isVisible && (
        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white w-full md:w-[70%] lg:w-[50%] rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">How to Play</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>Select a number from 1 to 6.</li>
            <li>Click on the dice to roll it.</li>
            <li>
              If your selected number matches the dice roll, you gain points equal to the dice number.
            </li>
            <li>If your guess is wrong, 2 points are deducted.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Dice({ currentDice, rollDice }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <button
        onClick={rollDice}
        className="transition-transform transform hover:scale-105"
      >
        {currentDice}
      </button>
      <p className="font-semibold text-lg mt-2 text-purple-600">Click on the dice to roll</p>
    </div>
  );
}

function Score({ score }) {
  return (
    <div className="flex flex-col items-center font-bold">
      <p className="text-6xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-pink-600">
        {score}
      </p>
      <p className="text-xl text-gray-700">Score</p>
    </div>
  );
}

function NumberSelector({ selectedNumber, selectNumber }) {
  return (
    <div className="text-center mb-6">
      <p
        className={`text-xl ${selectedNumber ? "text-green-600" : "text-red-600"}`}
      >
        {selectedNumber ? `Selected Number: ${selectedNumber}` : "No number selected"}
      </p>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <button
            key={number}
            className={`transition-transform transform hover:scale-110 px-6 py-3 rounded-full text-white ${
              selectedNumber === number
                ? "bg-gradient-to-r from-green-400 to-blue-500"
                : "bg-gradient-to-r from-gray-300 to-gray-500"
            }`}
            onClick={() => selectNumber(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiceGame() {
  const [dice, setDice] = useState(<img className="w-32 h-32" src={diceFace1} alt="Dice face 1" />);
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    setDice(<img className="w-32 h-32" src={diceImages[diceRoll - 1]} alt={`Dice face ${diceRoll}`} />);

    if (selectedNumber === diceRoll) {
      setScore((prev) => prev + diceRoll);
    } else if (selectedNumber !== null) {
      setScore((prev) => Math.max(0, prev - 2));
    }
  };

  const resetGame = () => {
    setScore(0);
    setSelectedNumber(null);
    setDice(<img className="w-32 h-32" src={diceFace1} alt="Dice face 1" />);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-white rounded-3xl shadow-2xl space-y-8 w-full h-full">
      <div className="flex flex-col items-center gap-6">
        <Score score={score} />
        <NumberSelector selectedNumber={selectedNumber} selectNumber={setSelectedNumber} />
        <Dice currentDice={dice} rollDice={rollDice} />
        <button
          onClick={resetGame}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105"
        >
          Reset Game
        </button>
        <Rules />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen flex justify-center items-center p-4">
      <DiceGame />
    </div>
  );
}

export default App;
