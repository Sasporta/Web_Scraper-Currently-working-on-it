import { ReactComponent as JackieChan } from '../assets/jackieChan.svg';

const InnerContainer = ({ img, movie, director }) => {


    return (
        <div className="inner-container"> 
            <div>
            <JackieChan className="jackie"/>
                {/* <img src={jackieChan} className="picture"/> */}
            </div>
            <div>
            <p>
                {movie} <br /> {director}
            </p>
            </div>
        </div>
    );
}
 
export default InnerContainer;