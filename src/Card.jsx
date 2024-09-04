import "./Card.css";

export default function Card({user}) {
  return (
    <div className="card" key={user.id}>
      <img src={user.image} alt="" /> {/* Display the user's image */}
      <div className="info">
        <div className="name">{user.name}</div> {/* Display the user's name */}
        <div className="spec">
          {user.gender}, {user.status}, {user.species}{" "}
          {/* Display the user's gender, status, and species */}
        </div>
      </div>
    </div>
  );
}
