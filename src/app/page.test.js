import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from './page'
import RootLayout from './layout'

describe('Home', () => {
    it('renders the home landing page', () => {
        render(<Home />)
        const main = screen.getByRole('main')
        expect(main).toBeInTheDocument()
        expect(main).toHaveTextContent('Amazon Web Services Certified Solutions Architect Professional Exam')
    })
})