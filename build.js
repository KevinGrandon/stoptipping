var fs = require('fs')

var statesWithData = [
	'ca', 'ny', 'oh', 'tx'
]

var stateMapping = require(__dirname + '/js/states.js').mapping

var content = ''

function getState() {
	var state = statesWithData.shift()
	if (!state) {
		output()
		return
	}

	var items = fs.readFileSync(__dirname + '/js/states/' + state + '.json', {encoding: 'utf-8'})
	items = JSON.parse(items)

	content += '\
		<h2>' + stateMapping[state.toUpperCase()] + '</h2>\n'

	items.forEach(function(item) {
		content += '\
		<div>\n\
			<h3>' + item.name + '</h3>\n\
			<p>\n\
				' + item.address.street + '<br>\n\
				' + item.address.city + ', ' + state + ' ' + item.address.zip + '<br>\n\
			</p>\n\
			<p class="website">\n\
				<a href="' + item.website + '" target="_blank">' + item.website + '</a>\n\
			</p>\n\
		</div>\n'
	})

	getState()
}
getState()

function output() {
	var indexTemplate = fs.readFileSync(__dirname + '/index.template', {encoding: 'utf-8'})
	content = indexTemplate.replace('<!--content-->', content)

	fs.writeFileSync(__dirname + '/index.html', content, {encoding: 'utf-8'})
	console.log('index.html written.')
}
