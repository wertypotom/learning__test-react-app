import { Counter, App, dataReducer } from './App'
import { create } from 'react-test-renderer'

describe('My first test Suite', () => {
    test('Should work', () => {
        expect(true).toBe(true)
    })
})

describe('Snapshot tests', () => {
    test('Create snapshot of App', () => {
        const component = create(<App />)

        expect(component.toJSON()).toMatchSnapshot()
    })

    it('Create snapshot of Counter', () => {
        const component = create(<Counter counter={1} />)

        expect(component.toJSON()).toMatchSnapshot()
    })
})

describe('Test dataReducers', () => {
    it('should set data corectly', () => {
        const state = {
            list: [],
            error: null
        }
        const action = {
            type: 'SET_LIST',
            payload: [1, 2, 3, 4, 5]
        }

        const newState = dataReducer(state, action)

        /* 
            {
                list:  [1, 2, 3, 4, 5],
                error: null
            }
        */

        expect(newState).toEqual({
            list: [1, 2, 3, 4, 5],
            error: null
        })
        expect(newState.list).toEqual([1, 2, 3, 4, 5])
        expect(newState.list.length).toBe(5)
        expect(newState.error).toBeNull()
    })

    it('should correcctly set error', () => {
        const state = {
            list: [],
            error: null
        }

        const action = {
            type: 'SET_ERROR'
        }

        const newState = dataReducer(state, action)

        expect(newState).toEqual({
            list: [],
            error: true
        })
        expect(newState.list.length).toBe(0)
        expect(newState.error).toBeTruthy()
    })

    it('should remove error', () => {
        const state = {
            list: [],
            error: true
        }

        const action = {
            type: 'SET_LIST',
            payload: [1, 2, 3, 4]
        }

        const newState = dataReducer(state, action)

        expect(newState).toEqual({
            list: [1, 2, 3, 4],
            error: null
        })
        expect(newState.error).toBeNull()
        expect(newState.list.length).not.toBe(0)
    })
})