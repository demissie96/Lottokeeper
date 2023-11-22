import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import AdminView from "./components/AdminView";
import PlayerView from "./components/PlayerView";

enum UserView {
  Nobody,
  Admin,
  Player,
}

function App() {
  let userId: string | null = localStorage.getItem("user_id");

  const [user, setUser] = useState("");
  const [userView, setUserView] = useState(UserView.Nobody);

  const deleteLocalStorage = () => {
    localStorage.removeItem("user_id");
    setUser("");
  };

  const fetchUserData = () => {
    if (userId !== null) {
      fetch("https://lottokeeperbackend.johannesdemissi.repl.co/user", {
        headers: {
          id: userId,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUser(data[0].Name);
        });
    }
  };

  useEffect(() => {
    if (userId === null) {
      console.log("No Selected User - " + userId);
    } else if (userId === "1") {
      // fetchUserData();
      setUserView(UserView.Admin);
      fetchUserData();
    } else {
      // fetchUserData();
      console.log("Player selected - " + userId);
      setUserView(UserView.Player);
      fetchUserData();
    }
  }, []);

  if (userView === UserView.Nobody) {
    return (
      <>
        <Header
          userName={user}
          onButtonClick={() => setUserView(UserView.Nobody)}
        />
        <div className="div_for_cards">
          <Card
            heading="Üzemeltető"
            onClickCard={() => {
              localStorage.setItem("user_id", "1");
              setUser("Üzemeltető");
              setUserView(UserView.Admin);
            }}
          ></Card>
          <Card
            heading="Játékos"
            onClickCard={() => {
              setUser("");
              setUserView(UserView.Player);
            }}
          ></Card>
        </div>
      </>
    );
  } else if (userView === UserView.Player) {
    return (
      <>
        <Header
          userName={user}
          onButtonClick={() => {
            setUserView(UserView.Nobody);
            deleteLocalStorage();
          }}
        />
        <PlayerView />
      </>
    );
  } else if (userView === UserView.Admin) {
    return (
      <>
        <Header
          userName={user}
          onButtonClick={() => {
            setUserView(UserView.Nobody);
            deleteLocalStorage();
          }}
        />
        <AdminView />
      </>
    );
  }
}

export default App;
