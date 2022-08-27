import './Course.css'
// import {useFetch} from "../hooks/useFetch";
import Card from "../components/Card";
import data from "../data/debugDB";
import {useState} from "react";

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
}

export default function Course() {

    // const { data: flashcards, isPending, error } = useFetch("https://diki-api.herokuapp.com/flashcards")

    const [flashcards, setFlashcards] = useState(data)


    const learnAgain = (card) => {
        const cardsCopy = [...flashcards]
        // put element to learn card at the end of the array and mix the array
        const preparedArray = [...shuffleArray(cardsCopy).filter(elem => elem !== card), card]
        setFlashcards(preparedArray)
        console.log(flashcards, 'learn again')
    }

    const wellLearned = (card) => {
        const cardCopy = [...flashcards]
        // delete learn element
        const preparedArray = cardCopy.filter(elem => elem !== card)
        setFlashcards(preparedArray)
        console.log(flashcards, 'learned')
    }

    return(
        <div className={"course-page"}>
            {/*{error && <p>{error}</p>}*/}
            {/*{isPending && <p>Loading...</p>}*/}
            <div className={"cards-container"}>
                { flashcards && flashcards.map((card, index) => (
                    <Card
                        index={index}
                        key={card.id}
                        card={card}
                        learnAgain={learnAgain}
                        wellLearned={wellLearned}
                    />
                )) }
            </div>
        </div>
    )
}