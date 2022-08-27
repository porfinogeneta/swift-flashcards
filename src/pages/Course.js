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

    // get list with non-repetitioning words indexes, the amount of indexes is 20
    const randomArray = () => {
        let indexesToDownload = []
        for (let i = 0; i < 20; i++) {
            const index = Math.round(Math.random() * data.length)
            indexesToDownload.push(index)
            if (!indexesToDownload.includes(index)) {
                indexesToDownload.push(index)
            }
        }
        return indexesToDownload
    }

    const random = randomArray()


    const [flashcards, setFlashcards] = useState(null)
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        if (data) {
            const newArray = data.filter(elem => random.includes(data.indexOf(elem)))
            setFlashcards(newArray)
        }
    }, [data, random])

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
            <div className={"cards-container"}>
                <h3>{amount} / 20</h3>
                { flashcards && flashcards.map((card, index) => (
                    <span>
                        <Card
                            index={index}
                            key={card.id}
                            card={card}
                            learnAgain={learnAgain}
                            wellLearned={wellLearned}
                        />
                    </span>

                )) }
            </div>
        </div>
    )
}