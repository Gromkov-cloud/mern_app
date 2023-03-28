import { useState } from "react"
import "./App.css"

function App() {
    const [inputText, setInputText] = useState("")
    const [namesList, setNamesList] = useState([])

    const onInputChange = (e) => {
        setInputText(e.target.value)
    }
    const submitForm = async () => {
        // setNamesList((arr) => [...arr, inputText])

        const createReqBody = (name) => ({ name: name })

        try {
            fetch("/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createReqBody(inputText)),
            })
        } catch (error) {
            console.log(error)
        }
    }

    const NamesList = ({ names }) => {
        if (names.length > 0) {
            const list = names.map((name) => (
                <li key={Math.random()}>{name}</li>
            ))
            return <ul>{list}</ul>
        } else {
            return <h1>nothing</h1>
        }
    }

    const getNames = async () => {
        try {
            const res = await fetch("/api/list")
            const data = await res.json()
            setNamesList(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <input type="text" onChange={onInputChange} />
            <button onClick={submitForm}>SUBMIT</button>
            <div>
                <div>
                    <h1>Names list</h1>
                    <button onClick={getNames}>Get List</button>
                </div>
                <NamesList names={namesList} />
            </div>
        </div>
    )
}

export default App
