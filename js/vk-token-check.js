'use strict'

let isVKtokenActive = false

if ('vk-token' in localStorage) {
	if ((Date.now() / 1000) > Number(localStorage['vk-token-expires-date'])) {
		localStorage.removeItem('vk-token')
	} else {
		isVKtokenActive = true
	}
}
