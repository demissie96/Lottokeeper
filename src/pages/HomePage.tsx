import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import AdminView from "../components/AdminView";
import PlayerView from "../components/PlayerView";
import "../types/Types";

enum UserView {
  Nobody,
  Admin,
  Player,
}

function HomePage() {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user_id")
  );
  const [user, setUser] = useState<UserDetail | null>();
  const [userView, setUserView] = useState(UserView.Nobody);

  const deleteLocalStorage = () => {
    localStorage.removeItem("user_id");
    setUser({});
  };

  const changeUser = () => {
    setUserView(UserView.Nobody);
    deleteLocalStorage();
    setUserId(null);
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
          let userType: UserDetail = {
            ID: data[0].ID,
            Name: data[0].Name,
            Balance: data[0].Balance,
          };

          setUser(userType);
        });
    }
  };

  useEffect(() => {
    if (userId === null) {
    } else if (userId === "1") {
      setUserView(UserView.Admin);
      fetchUserData();
    } else {
      setUserView(UserView.Player);
      fetchUserData();
    }
  }, [userId]);

  if (userView === UserView.Nobody) {
    return (
      <>
        <Header userName="" balance={0} onButtonClick={() => changeUser()} />
        <div className="div_for_cards">
          <Card
            heading="Üzemeltető"
            onClickCard={() => {
              localStorage.setItem("user_id", "1");
              setUserId("1");
              setUserView(UserView.Admin);
              window.location.reload();
            }}
          ></Card>
          <Card
            heading="Játékos"
            onClickCard={() => {
              setUser({});
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
          userName={user?.Name ?? ""}
          balance={user?.Balance ?? 0}
          onButtonClick={() => {
            changeUser();
          }}
        />
        <PlayerView
          userId={user?.ID ?? 0}
          balance={user?.Balance ?? 0}
          userName={user?.Name ?? ""}
          onButtonClick={(item) => {
            localStorage.setItem("user_id", `${item.ID}`);
            setUserId(`${item.ID}`);
          }}
        />
      </>
    );
  } else if (userView === UserView.Admin) {
    return (
      <>
        <Header
          userName={user?.Name ?? ""}
          balance={user?.Balance ?? 0}
          onButtonClick={() => {
            changeUser();
          }}
        />
        <AdminView
          userId={user?.ID ?? 0}
          balance={user?.Balance ?? 0}
          userName={user?.Name ?? ""}
        />
      </>
    );
  }
}

export default HomePage;
