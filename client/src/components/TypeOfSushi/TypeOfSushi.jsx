import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSushiType } from '../../services/menuService';

import './TypeOfSushi.css';
import Menu from '../Menu/Menu';
import { SushiProductCard } from '../SushiProductCard/SushiProductCard';

const TypeOfSushi = () => {
  const { type } = useParams();
  const [sushi, setSushi] = useState([]);


  useEffect(() => {
    getSushiType(type)
      .then((res) => setSushi(res))
      .catch((error) => console.log(error.message));
  }, [type]);

  return (
    <div>
      <Menu type={type}/>
      <div className="bg-type-of-sushi">
        <div className="bg-overlay"></div>
        <div className="container-wrapper">
          <div className="container">
            {sushi.map((singleSushi) => (
              <SushiProductCard
                singleSushi={singleSushi} 
                isBestSeller={false}
                />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default TypeOfSushi;
