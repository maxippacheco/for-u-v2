import Head from 'next/head';
import React, { FC } from 'react'
import { Navbar } from '../components/ui'

interface ReactFCWithChildren{
	children: JSX.Element;
	title: string;
}

export const AppLayout:FC<ReactFCWithChildren> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{ title }</title>
			</Head>
			
			<div>
				<Navbar />

				<main>{ children }</main>
			</div>
		
		</>
	)
}
