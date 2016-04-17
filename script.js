"use strict";

var id, list_out, text_list, encoded_list,
	pageurl = window.location.protocol + "//" + window.location.hostname + window.location.pathname;

$(function () {
	$("form").submit(function () {
		$(".rem").remove();
		id = $(".id").val();
		$.ajax({
			url: 'https://api.vk.com/method/friends.get?user_id=' + id + '&fields=nick',
			type: 'GET', crossDomain: true, dataType: 'jsonp',
			success: function(data) {
				if (data.error) {
					alert(data.error.error_msg);
				} else {
					text_list = "";
					$.each(data.response, function (index, value) {
						$("<tr class='rem'><td>[<a href='https://vk.com/id" + value.user_id + "'>" + value.user_id + "</a>]</td><td>" + value.first_name + " " + value.last_name + "</td></tr>").appendTo("table");
						text_list += "https://vk.com/id" + value.user_id + " | " + value.first_name + " " + value.last_name + "\r\n";
						list_out = "Сохранено на " + pageurl + "\r\n \r\n" + "Друзья пользователя " + "https://vk.com/id" + id + ":" + "\r\n \r\n" + text_list;
					})
					encoded_list = base64.encode(list_out);
					$("<a class='btn btn-primary rem' href='data:text/plain;charset=utf-8;base64," + encoded_list + "' class='rem' download='vkfriends_" + id + ".txt'>Скачать файлик</a>").prependTo("#dlusersfile");
				}
			}
		});
		return false;
	})
})		