'use strict'

let stateString = 'frinds-saver'

if (location.hash.startsWith('#access_token') && !$ls.get('vk-token') && !isVKtokenActive) {
	history.pushState('', document.title, `${location.pathname}?${location.hash.replace('#', '')}`)

	if ($check.get('access_token') && $check.get('state') == stateString) {
		$ls.set('vk-token', $check.get('access_token'))
		$ls.set('vk-token-expires-date', (Date.now() / 1000) + Number($check.get('expires_in')))

		history.pushState('', document.title, location.pathname)

		$make.qs('div[data-auth="yes"]').style.display = 'initial'
	} else {
		$make.qs('div[data-auth="error"]').style.display = 'initial'
	}
} else {
	if (isVKtokenActive) {
		$make.qs('div[data-auth="yes"]').style.display = 'initial'

		$make.qs('.expires').dataset.time = ((Number($ls.get('vk-token-expires-date')) - (Date.now() / 1000)) / 60 / 60).toFixed(1)
	} else {
		$make.qs('div[data-auth="no"]').style.display = 'initial'

		let clientID = 4071743

		$make.qs('button.btn-auth').addEventListener('click', e => {
			location.replace(`https://oauth.vk.com/authorize?client_id=${clientID}&display=page&redirect_uri=${document.URL}&response_type=token&v=5.78&state=${stateString}`)
		})
	}
}
