import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppSearch, { Search } from './AppSearch'

describe('Test AppSearch Component', () => {
    it('should render AppSearch Component', () => {
        render(<AppSearch />)

        // screen.debug()
    })

    it('should find element by text', () => {
        render(<AppSearch />)

        const label = screen.getByText('Search:')

        expect(label).toBeInTheDocument()

        // !! fail test
        // expect(screen.getByText('Search')).toBeInTheDocument()

        // !! good test
        // expect(screen.getByText(/Searche/)).toBeInTheDocument()
    })

    it('should find element by role', () => {
        render(<AppSearch />)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should get another elements', () => {
        render(<AppSearch />)

        const labelText = screen.getByLabelText('Search:')
        const placeholderText = screen.getByPlaceholderText('Search for something')

        expect(labelText).toBeInTheDocument()
        expect(placeholderText).toBeInTheDocument()
    })

    it('Should not find element', () => {
        render(<AppSearch />)

        // !! fail test
        // expect(screen.getByText('Hubabuba')).not.toBeInTheDocument()

        const someText = screen.queryByText('JavaScript is power')
        expect(someText).toBeNull()
    })

    it('Should get multiple elements', () => {
        render(<AppSearch />)

        const listItems = screen.getAllByText('Hello world')

        expect(listItems.length).toBe(3)
    })

    it('should render data Asynchronously', async () => {
        render(<AppSearch />)

        expect(screen.queryByText(/Signed in as/)).toBeNull()

        // screen.debug()

        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument()

        // screen.debug()
    })
})

describe('Fireing actions', () => {
    it('Should change input value', () => {
        render(<AppSearch />)

        expect(screen.queryByText('HTML for beginners')).toBeNull()

        const textBox = screen.getByRole('textbox')

        fireEvent.change(textBox, {
            target: {
                value: 'HTML for beginners'
            }
        })

        expect(screen.getByText(/HTML for beginners/)).toBeInTheDocument()
    })

    it('Should change input value --- UserEvent', () => {
        render(<AppSearch />)

        expect(screen.queryByText('JS is not easy')).toBeNull()

        const textBox = screen.getByRole('textbox')

        userEvent.type(textBox, 'JS is not easy')

        // screen.debug()

        expect(screen.getByText(/JS is not easy/)).toBeInTheDocument()
    })
})

describe('Unit testing', () => {
    it('Should do unit test of Search component', () => {
        const cb = jest.fn()

        render(<Search value={''} onChange={cb}>Search:</Search>)

        const textbox = screen.getByRole('textbox')

        userEvent.type(textbox, 'hello')

        expect(cb).toHaveBeenCalledTimes(5)
    })
})


