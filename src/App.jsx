import './App.css'
import Homepage from "./components/homepage/Homepage.jsx"
import PhotographerPage from "./components/photographerpage/PhotographerPage.jsx"
import {Routes, Route, Navigate, useParams} from "react-router-dom";

function App() {
    const params = useParams();

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/photographerPage:user_id" element={<PhotographerPage/>}/>
            </Routes>
        </>
    )
}

export default App
