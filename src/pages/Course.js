import './Course.css'
import {useFetch} from "../hooks/useFetch";
import Card from "../components/Card";
// import data from "../data/debugDB";
import {useEffect, useState} from "react";

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
}




export default function Course() {

    const { data, isPending, error } = useFetch("https://porfinogeneta.github.io/diki-scraper/json/data.json")


    const [flashcards, setFlashcards] = useState(null)
    const [amount, setAmount] = useState(0)


    useEffect(() => {
        setFlashcards(data)
    }, [data])

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
        setAmount(prevState => prevState + 1) // increase amount of learnt
        console.log(flashcards, 'learned')
    }

    return(
        <div className={"course-page"}>
            {error && <p>{error}</p>}
            {isPending && <p>Loading...</p>}
            <h3>{amount} / 20</h3>
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