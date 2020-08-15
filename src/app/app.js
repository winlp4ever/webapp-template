import React, {useState} from 'react';

const App = (props) => {
    const handleClick = async () => {
        let response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: "{ hello }"})
        })
        let data = await response.json()
        console.log(data)
    }
    return <div className='app'>
        hello world
        <button onClick={handleClick}>Click me!</button>
    </div>
}

export default App;