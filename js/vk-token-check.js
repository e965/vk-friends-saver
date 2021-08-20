'use strict'

let isVKtokenActive = false

if (VK_STORAGE_TOKEN_ITEM_NAME in localStorage) {
	if ((Date.now() / 1000) > Number(localStorage['vk-token-expires-date'])) {
		localStorage.removeItem(VK_STORAGE_TOKEN_ITEM_NAME)
	} else {
		isVKtokenActive = true
	}
}
