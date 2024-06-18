'use client';

import { useEffect } from 'react';

export default function TitleEffect({title}: {title: string}) {
	useEffect( () => {document.title = title; }, []);
	return <></>;
}