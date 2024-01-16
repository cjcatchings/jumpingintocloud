'use client'

import * as React from 'react'
import { ChevronDoubleDown, ChevronDoubleLeft } from '@/icons/chevron'
import { useSearchParams } from 'next/navigation';

export default function TextSubSection(props) {

    const { sectionInitiallyVisible, header, testId, sectionType, fragmentForAnchor, largeSection, children, ...otherProps } = props;
    const searchParams = useSearchParams()
    const openSectionOverride = searchParams.has(fragmentForAnchor)

    const [sectionVisible, isSectionVisible] = React.useState(openSectionOverride || sectionInitiallyVisible);

    const sectionRef = React.useRef();
    React.useEffect(() => {
        if(openSectionOverride){
            const {current} = sectionRef;
            if(current != null){
                current.scrollIntoView({behavior: 'smooth'})
            }
        }
    }, [openSectionOverride])

    const visibilityCss = React.useCallback(() => {
        const maxHeight = 'max-h-2000'
        return sectionVisible ? `${maxHeight} overflow-scroll ease-in` : 'max-h-0 ease-out-no-delay'
    }, [sectionVisible]);

    const toggleChevron = React.useCallback(() => {
        console.log('kleeeek!')
        isSectionVisible(secVis => !secVis);
    }, [])

    const chevronType = React.useCallback(() => {
        return sectionVisible ?
            <ChevronDoubleDown onClick={toggleChevron} /> :
            <ChevronDoubleLeft onClick={toggleChevron} />
    }, [sectionVisible, toggleChevron])

    const sectionColors = sectionType === 'h1' ? 'bg-slate-300 dark:bg-slate-600' :
        'bg-slate-100 dark:bg-slate-700'

    const sectionPadding = sectionType === 'h1' ? 'py-4 px-4 mx-4' :
        'py-2'

    const sectionChevronPadding = sectionType === 'h1' ? 'pl-16' : 'pl-12'

    const headerTextSize = sectionType === 'h2' ? 'text-base' : 'text-lg'

    const sectionHeaderTextBold = ['h1','h2'].includes(sectionType) ? 'font-bold' : ''


    return (<div ref={sectionRef} data-testid={testId} className={`${sectionPadding} flex flex-wrap justify-between overflow-hidden`}>
        <div className={`w-11/12 h-8 ${sectionColors} pt-0.5 pl-2 ${sectionHeaderTextBold} ${headerTextSize}`}>{header}</div>
        <div className={`w-1/12 h-8 ${sectionColors} pt-0.5 mr-0 ${sectionChevronPadding}`}>{chevronType()}</div>
        <div className={`w-full bg-slate-100 dark:bg-slate-700 pt-0.5 pl-2 overflow-hidden transition-max-height duration-500 ${visibilityCss()}`}>{children}</div>
    </div>)

}