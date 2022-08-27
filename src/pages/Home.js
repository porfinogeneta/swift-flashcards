import './Home.css'
import CoursesList from "../components/CoursesList";

export default function Home() {
    return(
        <div className={"page-home"}>
            <h1 className={"page-title"}>Select Your Course</h1>
            <div className={"courses-list"}>
                <CoursesList/>
            </div>
        </div>
    )
}