const app_id = 'da4b3019-cfd7-430e-8153-d80dcef356e7'

export default async (url) => {
	try {
		const res = await fetch(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${app_id}`)
		const data = await res.json()

		return data
	} catch (e) {
		console.log('failed to get any metadata from link', e)
		return {}
	}
}
