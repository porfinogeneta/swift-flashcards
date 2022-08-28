import './CoursesList.css'
import {Link} from "react-router-dom";
import {useState} from "react";

const courses = [
    {id: 1, title: 'Deutsch Flashcards', lang: 'DE'}
]

export default function CoursesList() {

    const [amount, setAmount] = useState(15)

    return (
        <div className={"courses-list"}>
            {courses.map(course => (
                <div key={course.id} className={"course-elem"}>
                    <h1 className={"page-title"}>{course.title}</h1>
                    <form className={"form"}>
                        <label>
                            Flashcards:
                        </label>
                        <input
                            type={"number"}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required={true}
                        />
                    </form>
                    {amount && (
                        <Link className={"button"} to={`/course/${course.lang}/${amount}`}>Learn</Link>
                    )}
                </div>
            ))}
        </div>
    )
}