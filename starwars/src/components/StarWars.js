import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const CardHodor = styled.div `
    display: flex;
    justify-content: center;
`;

const Card = styled.div `
    max-width: 80%;
    border-radius: 12px;
    background-color: rgba(201, 235, 255, 0.7);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 2rem;
`;

const CardContent = styled.div `
    display: flex;
`;

const Name = styled.h2 `
    font-size: 2rem;
`;

const Info = styled.div `
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 2rem;
`;

const Image = styled.img `
    max-width: 65%;
    max-height: 10hv;
    height: auto;
    background-size: contain;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const IconHodor = styled.div `
    display: flex;
    width: 40%;
    justify-content: space-between;
`;

export default function Character() {
    const [character, setCharacter] = useState([]);
    const [home, setHome] = useState([]);
    const [chars, setChars] = useState([]);
    let [charIndex, setCharIndex] = useState(1);

    const imgURL = ["https://unrealitymag.com/wp-content/uploads/2011/11/star-wars-art5-465x465.png",
                    "https://cdn.unifiedcommerce.com/content/product/large/79346125562.jpg",
                    "https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1409932318917-JKEQCQE4HJAJVXLC8Z59/ke17ZwdGBToddI8pDm48kDtoZzkgLGM9nmkTEBLDT4sUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc17YuqyMnp4u5amze5wetvJD_o1mTMPdBuM6PofecamhOgkCe4varIbZf2oN-xyy5/super-rad-star-wars-art-collection",
                    "https://images-na.ssl-images-amazon.com/images/I/81PD9mVciXL._AC_SY679_.jpg",
                    "https://i.pinimg.com/736x/19/85/ef/1985ef72baeb6b8f87c33b66d3f6ebde.jpg",
                    "data:image/jpeg;base64,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",
                    "https://i.pinimg.com/236x/7f/28/f5/7f28f596cf6921ef3ef048f79c727866.jpg",
                    "https://cdn1.bigcommerce.com/server600/cfe7c/products/3257/images/8519/From_the_Shadows__26800.1512160043.1280.1280.jpg?c=2",
                    "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/starwars-karlfitzgerald-paintprint1-frontpage-700x307.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/81nQez7A1yL._SY450_.jpg"];

    var item = Math.floor(Math.random() * imgURL.length);

    useEffect(() => {
        axios
          .get(`https://swapi.co/api/people`)
          .then(response => {
              console.log("amount of people", response.data.count);
              setChars(response.data.count);
          })
          .catch(error => {
            console.log("the data was not return", error);
          });
      }, []);

    useEffect(() => {
      axios
        .get(`https://swapi.co/api/people/${charIndex}`)
        .then(response => {
            console.log(response.data);
            setCharacter(response.data);
        })
        .catch(error => {
          console.log("the data was not return", error);
        });
    }, []);

    useEffect(() => {
        axios
          .get(`https://swapi.co/api/planets/${charIndex}`)
          .then(response => {
              setHome(response.data.name);
          })
          .catch(error => {
            console.log("the data was not return", error);
          });
    }, []);

    
    console.log(chars);
    console.log(charIndex);

    function LeftClik() {
        function handleClick(e) {
          e.preventDefault();
          charIndex === 0 ? charIndex = chars : charIndex--;
        }
        
        return (
          setCharIndex()
        );
    }
    function RightClik() {
        function handleClick(e) {
          e.preventDefault();
          charIndex === chars ? charIndex = 1 : charIndex++;
        }
        
        return (
          setCharIndex()
        );
    }

    return (
        <CardHodor>
            <Card>
                <CardContent>
                    <Image src={imgURL[item]} alt="random star war art"></Image>
                    <Info>
                        <Name>{character.name}</Name>
                        <p>Height: {character.height}</p>
                        <p>Mass: {character.mass}</p>
                        <p>Hair color: {character.hair_color}</p>
                        <p>Eye color: {character.eye_color}</p>
                        <p>Birth year: {character.birth_year}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Homeworld: {home}</p>
                        <IconHodor>
                            <button onClick={() => LeftClik() }><i className="fas fa-chevron-circle-left"></i></button>
                            <button onClick={() => RightClik()}><i className="fas fa-chevron-circle-right"></i></button>
                        </IconHodor>
                    </Info>
                </CardContent>
            </Card>
        </CardHodor>
    );
  }
  