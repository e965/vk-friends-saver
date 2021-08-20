const getBtn = document.querySelector('.get')
const idField = document.querySelector('.id')

if (!isVKtokenActive) {
	document.querySelector('.no-vk-token').dataset.show = ''
}

getBtn.addEventListener('click', e => {
	idField.textContent = ''

	const link = document.querySelector('.link').value
	const name = link.replace('https:', '').replace('http:', '').replace('//', '').replace('vkontakte.ru/', '').replace('vk.com/', '')

	const ApiMethodEndpoint = new URL('https://api.vk.com/method/utils.resolveScreenName')
	const ApiMethodParams = new URLSearchParams({
		screen_name: name,
		access_token: localStorage[VK_STORAGE_TOKEN_ITEM_NAME],
		v: VK_API_VERSION
	})

	fetchJsonp(`${ApiMethodEndpoint.href}?${ApiMethodParams.toString()}`)
		.then(r => r.ok ? r.json() : {})
		.then(data => {
			let res = data.response

			if (res.length == 0) {
				idField.textContent = 'Указана неверная ссылка.'; return
			}

			switch (res.type) {
				case 'user':
					idField.textContent = 'ID пользователя: '; break
				case 'group':
					idField.textContent = 'ID сообщества: '; break
				case 'application':
					idField.textContent = 'ID приложения: '; break
				default:
					idField.textContent = 'ID: '
			}

			idField.textContent += res.object_id
		}).catch(e => {
			idField.textContent = 'Возникла какая-то ошибка: ' + e
		})
})
