'use strict'

let isVKtokenActive = false

if (VK_STORAGE_TOKEN_ITEM_NAME in localStorage) {
	if ((Date.now() / 1000) > Number(localStorage[VK_STORAGE_TOKEN_DATE_ITEM_NAME])) {
		localStorage.removeItem(VK_STORAGE_TOKEN_ITEM_NAME)
	} else {
		isVKtokenActive = true
	}
}
