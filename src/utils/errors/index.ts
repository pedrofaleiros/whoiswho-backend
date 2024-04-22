class ResourceNotFoundError extends Error {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}

class UsecaseError extends Error {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}

class ValidationError extends Error {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}

class SocketError extends Error {
    message: string
    constructor(message: string) {
        super()
        this.message = message
    }
}

export {
    ResourceNotFoundError,
    UsecaseError,
    ValidationError,
    SocketError
}