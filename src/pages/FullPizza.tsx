import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(`https://63d9a09f2af48a60a7bd2407.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пицц!");
        navigate("/");
      }
    }

    fetchPizzas();
  }, []);

  if (!pizza) {
    return <>Загрузка ...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{`от ${pizza.price} ₽`}</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
