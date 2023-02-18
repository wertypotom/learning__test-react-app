import { useEffect, useReducer, useState } from 'react'
import AppSearch from './components/AppSearch'
// import ax

const initialState = {
    list: [],
    error: null
}

export const dataReducer = (state, action) => {
    if (action.type === 'SET_LIST') {
        return { ...state, list: action.payload, error: null }
    }

    if (action.type === 'SET_ERROR') {
        return { ...state, error: true }
    }

    return state
}

export const App = () => {
    const [counter, setCounter] = useState(0)
    const [data, dispatch] = useReducer(dataReducer, initialState)

    // useEffect(() => {
    //     axios.get('http://hn.algolia.com/api/v1/search?query=react')
    //         .then((response) => {
    //             const data = response.data

    //             dispatch({ type: 'SET_LIST', list: data.hits })
    //         }).catch(() => {
    //             dispatch({ type: 'SET_ERROR' })
    //         })
    // }, [])

    return (
        <div>
            <h1>My counter</h1>
            <Counter counter={counter} />

            <button type='button' onClick={() => setCounter(counter + 1)}>Increment</button>
            <button type='button' onClick={() => setCounter(counter - 1)}>Decrement</button>

            <h2>Async data</h2>
            {data.error && <div className='error'>Some error happened</div>}

            {data.list.length &&
                <ul>
                    {
                        data.list.map((el) => <li key={Date.now()}>{el.title}</li>)
                    }
                </ul>
            }

            < AppSearch />
        </div>
    )
}

export const Counter = (props) => {
    return <div><p>{props.counter}</p></div>
}