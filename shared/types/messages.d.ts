export interface ToastMessage {
    title: string
    description: string
    color: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral" | undefined
}