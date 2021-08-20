'use strict'

const stateString = 'frinds-saver'

if (location.hash.startsWith('#access_token') && !$ls.get(VK_STORAGE_TOKEN_ITEM_NAME) && !isVKtokenActive) {
	history.pushState('', document.title, `${location.pathname}?${location.hash.replace('#', '')}`)

	if ($check.get('access_token') && $check.get('state') == stateString) {
		$ls.set(VK_STORAGE_TOKEN_ITEM_NAME, $check.get('access_token'))
		$ls.set(VK_STORAGE_TOKEN_DATE_ITEM_NAME, (Date.now() / 1000) + Number($check.get('expires_in')))

		history.pushState('', document.title, location.pathname)

		$make.qs('div[data-auth="yes"]').style.display = 'initial'
	} else {
		$make.qs('div[data-auth="error"]').style.display = 'initial'
	}
} else {
	if (isVKtokenActive) {
		$make.qs('div[data-auth="yes"]').style.display = 'initial'

		$make.qs('.expires').dataset.time = ((Number($ls.get(VK_STORAGE_TOKEN_DATE_ITEM_NAME)) - (Date.now() / 1000)) / 60 / 60).toFixed(1)
	} else {
		$make.qs('div[data-auth="no"]').style.display = 'initial'

		const ApiMethodEndpoint = new URL('https://oauth.vk.com/authorize')
		const ApiMethodParams = new URLSearchParams({
			client_id: VK_APP_ID,
			display: 'page',
			redirect_uri: location.href,
			response_type: 'token',
			v: VK_API_VERSION,
			state: stateString
		})

		$make.qs('button.btn-auth').addEventListener('click', e => {
			location.replace(`${ApiMethodEndpoint.href}?${ApiMethodParams.toString()}`)
		})
	}
}
