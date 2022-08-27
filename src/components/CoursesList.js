import './CoursesList.css'
import {Link} from "react-router-dom";

const courses = [
    {id: 1, title: 'Deutsch Flashcards', quantity: 15, lang: 'DE'}
]

export default function CoursesList() {


    return (
        <div className={"courses-list"}>
            {courses.map(course => (
                <Link className={"link"} to={`/course/${course.lang}/${course.quantity}`}>
                    <div key={course.id} className={"course-elem"}>
                        <h2 className={"page-title"}>{course.title}</h2>
                        <p>Flashcards: {course.quantity}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}