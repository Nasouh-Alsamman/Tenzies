import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = React.useState(allnewdice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allheld = dice.every((die) => die.isheld);
    const firstvalue = dice[0].value;
    const allsamevalue = dice.every((die) => die.value === firstvalue);
    if (allheld && allsamevalue) {
      setTenzies(true);
      console.log("hola lalala");
    }
  }, [dice]);

  function generatenewdie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isheld: false,
      id: nanoid(),
    };
  }

  function allnewdice() {
    const newdice = [];
    for (let i = 0; i < 10; i++) {
      newdice.push(generatenewdie());
    }
    return newdice;
  }

  function rolldice() {
    if (!tenzies) {
      setDice((olddice) =>
        olddice.map((die) => {
          return die.isheld ? die : generatenewdie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allnewdice());
    }
  }

  function holddice(id) {
    setDice((olddice) =>
      olddice.map((die) => {
        return die.id === id ? { ...die, isheld: !die.isheld } : die;
      })
    );
  }

  const diceelement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isheld={die.isheld}
      holddice={() => {
        holddice(die.id);
      }}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti width="1330px" height="700px" />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">{diceelement}</div>
      <button onClick={rolldice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}
