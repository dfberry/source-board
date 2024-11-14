'use client'

import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}



const NextBreadcrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    if (pathNames.length === 0) {
        return null;
    }

    return (
        <div className="bg-green-400 text-black p-4 border-green-500">
            <ul className={containerClasses}>
                <li className={`${listClasses} no-underline hover:no-underline`}><Link legacyBehavior href={'/'} ><a className="no-underline hover:text-gray-500 hover:no-underline">{homeElement}</a></Link></li>
                {pathNames.length > 0 && separator}
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        return (
                            <React.Fragment key={index}>
                                <li className={`${itemClasses} no-underline hover:no-underline`} >
                                    {index === pathNames.length - 1 ? (
                                        <span className="no-underline hover:no-underline">{itemLink.replace(/-/g, ' ')}</span>
                                    ) : (
                                        <Link href={href} legacyBehavior ><a className="no-underline hover:text-gray-500 hover:no-underline">{itemLink.replace(/-/g, ' ')}</a></Link>
                                    )}
                                </li>
                                {pathNames.length !== index + 1 && separator}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NextBreadcrumb