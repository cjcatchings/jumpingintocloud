import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FeaturesLayout from '../layout'
import FantasyFootballDesc from './page'

describe('Page describing the fantasy football app ', () => {
    it('Loads the fantasy football desc page with the features layout', () => {
        render(<FeaturesLayout><FantasyFootballDesc /></FeaturesLayout>)
        const ecrSection = screen.getByTestId('ecr')
        expect(ecrSection).toBeInTheDocument()
    })
})