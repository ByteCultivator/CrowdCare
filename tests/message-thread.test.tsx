import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MessageThread } from "../app/messages/message-thread"

describe("MessageThread", () => {
  it("renders message input", () => {
    render(<MessageThread />)

    expect(screen.getByPlaceholderText(/Type a message/i)).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("allows sending a message", () => {
    render(<MessageThread />)

    const input = screen.getByPlaceholderText(/Type a message/i)
    fireEvent.change(input, { target: { value: "Hello, world!" } })

    const sendButton = screen.getByRole("button")
    fireEvent.click(sendButton)

    expect(input).toHaveValue("")
  })

  it("displays messages in the thread", () => {
    render(<MessageThread />)

    expect(screen.getByText(/Hi, I saw your fund request/i)).toBeInTheDocument()
    expect(screen.getByText(/Thank you so much!/i)).toBeInTheDocument()
  })
})

