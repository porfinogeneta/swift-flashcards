import './Course.css'
import {useFetch} from "../hooks/useFetch";
import Card from "../components/Card";
// React Dependencies
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
}


export default function Course() {

    // get amout to learn from the query
    const queryString = useLocation().pathname
    const toFetch = queryString.split('DE/')[1] // get all after '/', to receive amount

    const { data, isPending, error } = useFetch("https://porfinogeneta.github.io/diki-scraper/json/data.json", toFetch)

    const navigate = useNavigate()

    const [flashcards, setFlashcards] = useState(null)
    const [amount, setAmount] = useState(0)


    useEffect(() => {
        setFlashcards(data)
    }, [data])

    // navigate if lesson finished
    useEffect(() => {
        if (amount === parseInt(toFetch)) {
            setTimeout(() => navigate('/'), 1000)
        }
    }, [amount, toFetch, navigate])

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
            <h3>{amount} / {toFetch}</h3>
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
                { amount === parseInt(toFetch) ? (<h1 className={"page-title"}>Congratulations!</h1>): ''}
            </div>
        </div>
    )
}