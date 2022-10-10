function CreateUrl(key, gql) {
	var gq = 'SELECT '+ gql;
	var encodedgg = encodeURIComponent(gq);
	var url = 'https://docs.google.com/spreadsheets/d/' + key + '/gviz/tq?tq=' + encodedgg;
	return url;
}

function Request(url, responseFunction) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText.substring(this.responseText.IndexOf("(")+1, this.responseText.lastIndexOf(")"));
			var responseJSON = JSON.parse(response);
			responseFunction(responseJSON);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function preview(elm, url) {
	fetch(url)
		.then(data => data.text())
		.then(function(response) {
			var responseText = response.substring(response.indexOf("(") + 1, response.lastIndexOf(")"));
			var response = JSON.parse(responseText);
            log(response);
			var value = response['table']['rows'][0]['c'][0]['v'];
			elm.innerHTML = value;
		})
}

function log(txt){
    document.getElementById('log').innerHTML = txt;
}

var gsKey = '13wEO7VEiP7YcXvaFF9ZT5BHtqhvmPDP6_WXSY5rYV_g';
var gql = "*";
var url = CreateUrl(gsKey, gql);
var previewElement = document.getElementById('preview');
preview(previewElement, url);