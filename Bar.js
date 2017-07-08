
function Bar(options) {
	this.message = options.message || '';
	this.position = options.position || 'top';
	this.closeCallback = options.close;
	this.okCallback = options.clickOk;
	
	this.bar = this._create();	
	
	document.body.appendChild(this.bar);
}

Bar.prototype._create = function() {
	var bar = document.createElement('div');
	bar.className = 'bar top';

	var text = document.createElement('span');
	text.className = 'text';
	text.innerHTML = this.message;

	var button = document.createElement('a');
	button.className = 'button';
	button.innerHTML = 'OK';
	button.addEventListener('click', () => this._buttonClick());

	var close = document.createElement('span');
	close.className = 'close';
	close.innerHTML = 'X';
	close.addEventListener('click', () => this._closeClick());


	bar.appendChild(text);
	bar.appendChild(button);
	bar.appendChild(close);

	return bar;
};

Bar.prototype._buttonClick = function() { 
	if (typeof(this.okCallback) === 'function') {
		this.okCallback();
	}

	this.closeBar();
};

Bar.prototype._closeClick = function() { 
	if (typeof(this.closeCallback) === 'function') {
		this.closeCallback();
	}

	this.closeBar();
};

Bar.prototype.changePosition = function(position) { 
	if (position === 'top') {
		this.bar.className = 'bar top';
	}

	if (position === 'bottom') {
		this.bar.className = 'bar bottom';
	}
};

Bar.prototype.closeBar = function() { 
	this.bar.parentNode.removeChild(this.bar);
};