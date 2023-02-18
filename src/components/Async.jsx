import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Async = () => {
    const [stories, setStories] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        fetchStories()
    })

    const fetchStories = async () => {
        try {
            const result = await axios.get('someURL')

            setStories(result.data.hits)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <button onClick={fetchStories}>Fetch stories</button>
            {error && <span>Something went wrong</span>}


            <ul>{stories.map(story => <li key={story.id}>{story.title}</li>)}</ul>
        </div>
    )
}

export default Async