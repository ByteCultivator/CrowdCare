import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DisputeForm } from "../../CrowdCare/app/disputes/dispute-form"

describe("DisputeForm", () => {
  it("renders all form fields", () => {
    render(<DisputeForm />)

    expect(screen.getByLabelText(/Request ID/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Dispute Type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Evidence URL/i)).toBeInTheDocument()
  })

  it("shows validation errors for required fields", async () => {
    render(<DisputeForm />)

    const submitButton = screen.getByRole("button", { name: /submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Request ID is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Dispute type is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Title must be at least 4 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/Please provide a detailed description/i)).toBeInTheDocument()
    })
  })

  it("submits form with valid data", async () => {
    render(<DisputeForm />)

    fireEvent.change(screen.getByLabelText(/Request ID/i), {
      target: { value: "REQ-123" },
    })

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Dispute Title" },
    })

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: {
        value:
          "This is a test description that is long enough to pass validation. It provides detailed information about the dispute case.",
      },
    })

    const typeSelect = screen.getByLabelText(/Dispute Type/i)
    fireEvent.mouseDown(typeSelect)
    const fraudOption = screen.getByText("Fraudulent Request")
    fireEvent.click(fraudOption)

    const submitButton = screen.getByRole("button", { name: /submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Dispute submitted/i)).toBeInTheDocument()
    })
  })
})

