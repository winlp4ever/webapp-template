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

    const handleClick2 = async () => {
        var dice = 3;
        var sides = 6;
        var query = `
            query RollDice($dice: Int!, $sides: Int) {
                rollDice(numDice: $dice, numSides: $sides)
            }
        `;

        let response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { dice, sides },
            })
        })
        let data = await response.json()
        console.log(data)
    }

    return <div className='app'>
        hello world
        <button onClick={handleClick}>Click me!</button>
        <button onClick={handleClick2}>Now click me to roll dice!</button>
    </div>
}

export default App;