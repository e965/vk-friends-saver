'use strict'

if (isVkTokenActive) {
	$make.qs('div[data-auth="yes"]').style.display = 'initial'
	$make.qs('.expires').dataset.time = ((Number($ls.get(VK_STORAGE_TOKEN_DATE_ITEM_NAME)) - (Date.now() / 1000)) / 60 / 60).toFixed(1)
} else {
	$make.qs('div[data-auth="no"]').style.display = 'initial'

	const ApiMethodEndpoint = new URL('https://oauth.vk.com/authorize')
	const ApiMethodParams = new URLSearchParams({
		client_id: VK_APP_ID,
		display: 'page',
		redirect_uri: 'https://oauth.vk.com/blank.html',
		response_type: 'token',
		scope: JSON.stringify(['friends']),
		v: VK_API_VERSION,
		state: window.APP_ID
	})

	$make.qs('button.btn-auth').addEventListener('click', event => {
		window.open(`${ApiMethodEndpoint.href}?${ApiMethodParams.toString()}`)
	})

	$make.qs('form.form-auth').addEventListener('submit', event => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const authUrl = formData.get('auth_url')

		const authUrlParams = new URLSearchParams(authUrl.split('#')[1])
		const accessToken = authUrlParams.get('access_token')
		const expiresIn = authUrlParams.get('expires_in')

		$ls.set(VK_STORAGE_TOKEN_ITEM_NAME, accessToken)
		$ls.set(VK_STORAGE_TOKEN_DATE_ITEM_NAME, (Date.now() / 1000) + Number(expiresIn))

		$make.qs('div[data-auth="no"]').style.display = 'none'
		$make.qs('div[data-auth="yes"]').style.display = 'initial'
	})
}
