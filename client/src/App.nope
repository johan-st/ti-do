/* eslint-disable @typescript-eslint/no-non-null-assertion */
import App from './App'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'


let container = document.createElement('div')

beforeEach(() => {
  // setup a DOM element as a render target
  document.body.appendChild(container)
})

afterEach((): void => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = document.createElement('div')
})

it('renders Tasks in state.list', () => {
  act(() => {
    render(<App />, container)
  })
  expect(container.textContent).toContain('Task 1')
})