import Async from './Async'
import axios from 'axios'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('axios')

describe('Test axios', () => {
    it('should correctly make request from axios', async () => {
        const result = {
            data: {
                hits: [
                    {
                        id: 1,
                        title: 'Hello'
                    },
                    {
                        id: 2,
                        title: 'Hello'
                    }, {
                        id: 3,
                        title: 'Hello'
                    }
                ]
            }
        }

        axios.get.mockImplementationOnce(() => {
            return Promise.resolve(result)
        })

        render(<Async />)
        const btn = screen.getByRole('button')

        userEvent.click(btn)

        const items = await screen.findAllByRole('listitem')
        expect(items.length).toBe(3)
    })
})