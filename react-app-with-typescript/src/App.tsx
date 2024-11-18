import { useState, useEffect } from "react";
import "./App.css";

const INITIAL_STATE = [
  {
    nick: "Dapelu",
    subMonths: 3,
    avatar: "https://i.pravatar.cc/150?u=dapelu",
    description: "Dapelu hace de moderador a veces",
  },
  {
    nick: "jamon_serrano",
    subMonths: 7,
    avatar: "https://i.pravatar.cc/150?u=sergio_serrano",
  },
];

interface Sub {
  nick: string;
  avatar: string;
  subMonths: number;
  description?: string;
}

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number
}
function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState["newSubsNumber"]>(0)

  useEffect(() => {
    setSubs([...INITIAL_STATE]);
  }, []);

  return (
    <div className="App">
      <h1>Yurii Subs</h1>
      <ul>
        {subs.map((sub) => {
          return (
            <li key={sub.nick}>
              <img src={sub.avatar} alt={`Avatar for ${sub.nick}`}></img>
              <h4>
                {sub.nick} (<small>{sub.subMonths}</small>)
              </h4>
              <p
                style={
                  !sub.description
                    ? { fontSize: "0.8em", color: "#888" }
                    : undefined
                }
              >
                {sub.description?.substring(0, 50) ||
                  'No description'}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
