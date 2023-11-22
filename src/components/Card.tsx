import "./Card.css";

interface Props {
  heading: string;
  onClickCard: (item: any) => void;
}

function Card({ heading, onClickCard }: Props) {
  return (
    <div
      className="card"
      onClick={(item) => {
        onClickCard(item);
      }}
    >
      {heading}
    </div>
  );
}

export default Card;
