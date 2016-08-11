<div ng-if='false' class='list card-list'>
	<!-- Accepted -->
	<div class='card blank-card'></div>
	<div class='card fire-card'></div>
	<div class='card shadow-card'></div>
	<div class='card ice-card'></div>
	<div class='card wind-card'></div>
	<div class='card life-card'></div>
	<div class='card death-card'></div>
	<div class='card soul-card'></div>
	<div class='card void-card'></div>
	<div class='card energy-card'></div>
	<div class='card force-card'></div>
	<div class='card spirit-card'></div>
	<div class='card treasure-card'></div>
	<!-- Rejected -->
	<div class='card hate-card'></div>
	<div class='card attack-card'></div>
	<div class='card defense-card'></div>
	<div class='card physical-card'></div>
	<div class='card titan-card'></div>
	<div class='card creature-card'></div>
</div>

# Force

Server and interface for Force Game

# Build Steps

> cd ~

> git init

> git clone https://github.com/harbhub/Force.git

> git branch develop

> git checkout develop

> cd Force

> npm install

> npm -g forever

> forever start app.js

> forever stop app.js

# Features

Rapid application development

Continuous integration

Distributed work environment

Secure

# To Do List

Change interface to remove buttons from cards and replace it with a system that makes the entire item clickable.  Actionable items should display a green border or something that denotes that the user can click that item.

Improve the interface so that everything fits well on the screen.

Order the shop cards so that the cards the player can buy appear at the top of the list.

Shop items should use justify-content space-between for styling.  This should put the cost on the left, the name of the card in the middle, and the stock count on the right.