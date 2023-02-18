import React, { useEffect } from 'react'
import { useState } from 'react'

const getUser = () => {
    return Promise.resolve({
        id: 1,
        name: 'Robin'
    })
}

const AppSearch = () => {
    const [search, setSearch] = useState('')
    const [user, setUser] = useState()

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser()
            setUser(user)
        }

        loadUser()
    }, [])

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    const someArr = ['Hello world', 'Hello world', 'Hello world']

    return (
        <div>
            <ul>
                {someArr.map((el, index) => <li key={index}>{el}</li>)}
            </ul>

            {user ? <p>Signed in as {user.name}</p> : null}

            <Search value={search} onChange={handleChange}>
                Search:
            </Search>

            <p>Searches for {search ? search : '...'}</p>
        </div>
    )
}

export const Search = ({ value, onChange, children }) => {
    return (
        <div>
            <label htmlFor="search">{children}</label>
            <input
                type="text"
                id='search'
                value={value}
                onChange={onChange}
                placeholder='Search for something' />
        </div>)
}

export default AppSearch