import bankImg from '../images/bank.png';
import BrandSng from '../images/Banner.svg';
const Home = () => {
    return (
        <div className="card text-bg-secondary mb-3" style={{maxWidth: '24rem'}}>
          <img src={BrandSng} className="img-fluid rounded-4" alt="NoneResponsive"/> 
          <div className="card-body">
              <img src={bankImg} className="img-fluid rounded-4" alt="NoneResponsive"/> 
                <div id="homeStatus"></div>
            </div>
        </div>
    );
  };
  
  export default Home;