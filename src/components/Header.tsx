import { Link } from "react-router-dom";

interface Props {
  userName: string;
  balance: number;
  onButtonClick: (item: any) => void;
}

function Header({ userName, balance, onButtonClick }: Props) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Lottokeeper
        </Link>
        {userName != "" && (
          <span>
            {userName} - ({balance} akcse)
          </span>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={(item) => {
            onButtonClick(item);
          }}
        >
          Felhasználó váltás
        </button>
      </div>
    </nav>
  );
}

export default Header;
