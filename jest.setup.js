// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock('next/navigation', () => ({
    useSearchParams() {
        return ({
            has: jest.fn()
        })
    }
}))