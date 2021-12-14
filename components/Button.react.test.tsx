import React from "react"
import renderer from "react-test-renderer"
import Button from "./Button"

test("Test button component", () => {
    const mockCallback = jest.fn()
    const button = renderer.create((<Button onClick={mockCallback}>Click Me!</Button>))
    button.toTree()!!.props.onClick()
    expect(mockCallback.mock.calls.length).toEqual(1)
})
