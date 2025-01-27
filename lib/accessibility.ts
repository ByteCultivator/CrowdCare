export const ARIA_LABELS = {
  navigation: "Main navigation",
  search: "Search",
  notifications: "Notifications",
  userMenu: "User menu",
  mainContent: "Main content",
  requestsList: "Fund requests list",
  donationForm: "Donation form",
  votingSection: "Voting section",
}

export const KEYBOARD_SHORTCUTS = {
  openSearch: ["Control", "k"],
  closeModal: ["Escape"],
  submitForm: ["Control", "Enter"],
  navigate: {
    home: ["g", "h"],
    requests: ["g", "r"],
    donate: ["g", "d"],
    vote: ["g", "v"],
  },
}

export function announceMessage(message: string) {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.setAttribute("class", "sr-only")
  announcement.textContent = message
  document.body.appendChild(announcement)
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export function setupKeyboardShortcuts(shortcuts: Record<string, string[]>) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const activeElement = document.activeElement
    if (activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA") {
      return
    }

    Object.entries(shortcuts).forEach(([action, keys]) => {
      const isShortcut = keys.every((key) =>
        key === "Control"
          ? event.ctrlKey
          : key === "Shift"
            ? event.shiftKey
            : key === "Alt"
              ? event.altKey
              : event.key.toLowerCase() === key.toLowerCase(),
      )

      if (isShortcut) {
        event.preventDefault()
        document.dispatchEvent(
          new CustomEvent("keyboard-shortcut", {
            detail: { action },
          }),
        )
      }
    })
  }

  document.addEventListener("keydown", handleKeyDown)
  return () => document.removeEventListener("keydown", handleKeyDown)
}

