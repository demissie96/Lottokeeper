interface Props {
  userName: string;
  balance: number;
  onButtonClick: (item: any) => void;
}

function Header({ userName, balance, onButtonClick }: Props) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Lottokeeper
        </a>
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
