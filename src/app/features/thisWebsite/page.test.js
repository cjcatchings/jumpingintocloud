import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FeaturesLayout from '../layout'
import ThisWebsite from './page'

describe('Page describing \'this website\' ', () => {
    it('Loads the \'this website\' page with the features layout', () => {
        render(<FeaturesLayout><ThisWebsite /></FeaturesLayout>)
        const acmSection = screen.getByTestId('acm')
        expect(acmSection).toBeInTheDocument()
        expect(acmSection).toHaveTextContent("Amazon Certificate Manager (ACM)")
        const cloudfrontSection = screen.getByTestId('cloudfront')
        expect(cloudfrontSection).toBeInTheDocument()
        expect(cloudfrontSection).toHaveTextContent("Amazon CloudFront")
        const route53Section = screen.getByTestId('route53')
        expect(route53Section).toBeInTheDocument()
        expect(route53Section).toHaveTextContent("Amazon Route 53")
        const s3Section = screen.getByTestId('s3')
        expect(s3Section).toBeInTheDocument()
        expect(s3Section).toHaveTextContent("Amazon S3")
    })
})