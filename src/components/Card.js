import './Card.css'

export default function Card({card, learnAgain, wellLearned, index}) {

    const handleClick = (learned) => {
        return learned ? wellLearned(card) : learnAgain(card)
    }

    const calculateVisibility = (index) => {
        if (index === 0) {
            return 'visible'
        }else {
            return "invisible"
        }
    }

    return (
        <div className={`card ${calculateVisibility(index)}`}>
            <h2 className={"page-title"}>{card.word}</h2>
            {card.sentence && <p className={"plain-text"}>{card.sentence}</p>}
            <ol>
                {card.translation.map((trans, index) => (
                    <li className={"plain-text"} key={index}>{trans}</li>
                ))}
            </ol>
            <div className={"card-buttons"}>
                <button className={"button pos"} onClick={() => handleClick(false)}>Again</button>
                <button className={"button neg"} onClick={() => handleClick(true)}>Good</button>
            </div>
        </div>
    )
}