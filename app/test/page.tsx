import { resultSetTest } from '@/app/lib/queries_local';

export default async function Test() {
	const rs = await resultSetTest();
	return <h1>Test</h1>
}