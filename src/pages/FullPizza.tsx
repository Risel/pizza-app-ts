import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <Loader/>;
  }

  return (
    <div className="full-pizza container">
        <div className = "full-pizza-wrapper">
            <div className="full-pizza-wrapper_left">
                <img src={pizza.imageUrl} alt = {pizza.title} />
            </div>
            <div className="full-pizza-wrapper_right">
                <h2>{pizza.title}</h2>
                <h4>{pizza.price} ₽</h4>
                <Link to="/">
                    <button className="button button--outline button--add">
                        <span>Назад</span>
                    </button>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default FullPizza;
