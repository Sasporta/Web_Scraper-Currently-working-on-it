import React from 'react';
import InnerContainer from "./InnerContainer";

const OuterContainer = () => {

    const hidden = false;

    const array = [1,2,3];

    const arr = [{
        img: "img",
        movie: "matrix",
        director: "eyal ditcha"
    },
    {
        img: "img1",
        movie: "lord of the rings",
        director: "yahav shashaporta"
    },
    {img: "img1",
    movie: "lord of the rings",
    director: "yahav shashaporta"},
    {img: "img1",
    movie: "lord of the rings",
    director: "yahav shashaporta"},
    {img: "img1",
    movie: "lord of the rings",
    director: "yahav shashaporta"},
    {img: "img1",
    movie: "lord of the rings",
    director: "yahav shashaporta"}
]

    return ( 
        <div className="OuterContainer">
            {arr.map(obj => <InnerContainer img={obj.img} movie={obj.movie} director={obj.director} />)}
        </div>

    );
}
 
export default OuterContainer;


