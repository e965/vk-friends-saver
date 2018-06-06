let
	getBtn = document.querySelector('.get'),
	idField = document.querySelector('.id')

if (!isVKtokenActive) {
	document.querySelector('.no-vk-token').dataset.show = ''
}

getBtn.addEventListener('click', e => {
	idField.textContent = ''

	let
		link = document.querySelector('.link').value,
		name = link.replace('https:', '').replace('http:', '').replace('//', '').replace('vkontakte.ru/', '').replace('vk.com/', '')

	fetchJsonp(`https://api.vk.com/method/utils.resolveScreenName?screen_name=${name}&access_token=${localStorage['vk-token']}&v=5.78`)
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
