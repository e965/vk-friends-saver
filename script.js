'use strict'

let
	btnGet = document.querySelector('.btn-get'),
	btnDl = document.querySelector('.btn-dl'),
	table = document.querySelector('table tbody'),
	pageURL = window.location.protocol + "//" + window.location.hostname + window.location.pathname

btnGet.addEventListener('click', (e) => {
	e.preventDefault()
	table.innerHTML = '<tr class="table-info"><td colspan="2">Получение списка друзей...</td></tr>'

	btnDl.style.display = 'none'
	btnDl.setAttribute('href', 'javascript:void(0)')

	let userID = document.querySelector('.id').value

	if (!userID) { table.innerHTML = '<tr class="table-warning"><td colspan="2">ID пользователя не указан.</td></tr>'; return }

	btnDl.setAttribute('download', 'vkfriends_' + userID + '.txt')

	fetch('https://cors.now.sh/https://api.vk.com/method/friends.get?user_id=' + userID + '&v=5.63&fields=nick').then((response) => {
		response.json().then((data) => {
			if (data.error) { table.innerHTML = '<tr class="table-danger"><td colspan="2">Возникла какая-то ошибка: <q>' + data.error.error_msg + '</q>.</td></tr>'; return }

			let friends = data.response, friendsList = ''
			if (friends.count == 0) { table.innerHTML = '<tr class="table-warning"><td colspan="2">У пользователя нет открытых друзей.</td></tr>'; return }

			table.textContent = ''
			friendsList = 'Сохранено на ' + pageURL + '\r\n\r\nДрузья пользователя ' + 'vk.com/id' + userID + ':\r\n\r\n'

			friends.items.forEach((friend) => {
				table.innerHTML += '<tr><td>[<a href="https://vk.com/id' + friend.id + '" target="_blank" rel="nofollow noopener">' + friend.id + '</a>]</td><td>' + friend.first_name + ' ' + friend.last_name + '</td></tr>'
				friendsList += 'https://vk.com/id' + friend.id + ' | ' + friend.first_name + ' ' + friend.last_name + '\r\n'
			})

			btnDl.style.display = 'inline-block'
			btnDl.setAttribute('href', 'data:text/plain;charset=utf-8;base64,' + base64.encode(friendsList + '\n'))
			// нативный btoa() не может в символы юникода :(
		})
	}).catch((e) => {
		table.innerHTML = '<tr class="table-danger"><td colspan="2">Возникла какая-то ошибка: <q>' + e + '</q>.</td></tr>'
	})
})
