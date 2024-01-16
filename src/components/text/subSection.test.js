import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextSubSection from './subSection'

jest.mock('next/navigation', () => ({
    useSearchParams() {
        return ({
            has: jest.fn(() => true)
        })
    }
}))

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Text sub-section component ', () => {
    it('Loads a single TextSubSection component', async () => {
        render(<TextSubSection 
            sectionInitiallyVisible={false}
            header="Some header"
            testId="testSubSec"
            sectionType="h1"
        >Some text</TextSubSection>)
        const renderedComponent = screen.getByTestId("testSubSec")
        expect(renderedComponent).toBeInTheDocument()
        const downChevron = screen.getByTestId("downChevron")
        expect(downChevron).toBeInTheDocument()

        const user = userEvent.setup()
        await user.click(downChevron)
        expect(downChevron).not.toBeInTheDocument()
        const leftChevron = screen.getByTestId("leftChevron")
        expect(leftChevron).toBeInTheDocument()
    })
})