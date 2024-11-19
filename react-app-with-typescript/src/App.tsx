import { useState, useRef, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";
import { Sub, SubsResponseFromApi } from "./types";

interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);
  const [newSubs, setNewSubs] = useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map((subFromApi) => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description,
        } = subFromApi;

        return {
          nick,
          description,
          avatar,
          subMonths,
        };
      });
    };
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
    setNewSubs((currentNewSubs) => [...currentNewSubs, newSub.nick]);
    setNewSubsNumber((n) => n + 1);
  };

  const handleRemoveSub = (nickToRemove: string): void => {
    setSubs((subs) => subs.filter((sub) => sub.nick !== nickToRemove));

    setNewSubs((currentNewSubs) => {
      if (currentNewSubs.includes(nickToRemove)) {
        setNewSubsNumber((n) => (n > 0 ? n - 1 : 0));
        return currentNewSubs.filter((nick) => nick !== nickToRemove);
      }
      return currentNewSubs;
    });
  };

  return (
    <div className="App" ref={divRef}>
      <h1>Yurii Subs</h1>
      <List subs={subs} onRemoveSub={handleRemoveSub} />
      <p>New subs: {newSubsNumber}</p>
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
