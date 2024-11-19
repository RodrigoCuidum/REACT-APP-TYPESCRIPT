import { Sub } from "../types";

interface Props {
  subs: Array<Sub>;
  onRemoveSub: (nick: string) => void;
}

const List = ({ subs, onRemoveSub }: Props) => {
  return (
    <ul>
      {subs.map((sub) => (
        <li key={sub.nick} style={{ position: "relative", marginBottom: "1rem" }}>
          <button
            onClick={() => onRemoveSub(sub.nick)}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            X
          </button>
          <img src={sub.avatar} alt={`Avatar of ${sub.nick}`} style={{ width: "50px", borderRadius: "50%" }} />
          <h4>{sub.nick}</h4>
          <p>{sub.description}</p>
          <p>Months subscribed: {sub.subMonths}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
