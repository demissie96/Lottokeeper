interface Props {
  userName: string;
  onButtonClick: (item: any) => void;
}

function Header({ userName, onButtonClick }: Props) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Lottokeeper
        </a>
        <span>{userName}</span>
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
