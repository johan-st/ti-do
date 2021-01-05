/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import RootNode from './RootNode'
import { listPlaceholder } from '../../placeholders'


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
    render(<RootNode node={listPlaceholder[0]} />, container)
  })
  expect(container.textContent).toContain('Task 1')
})