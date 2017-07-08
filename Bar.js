
function Bar(options) {
	this.message = options.message || '';
	this.position = options.position || 'top';
	this.closeCallback = options.close;
	this.okCallback = options.clickOk;
	
	this.bar = this._create();	

	this._append();
}

Bar.prototype.closeBar = function() { 
	if (!this.bar) {
		return;
	}
	
	this.bar.parentNode.removeChild(this.bar);
	this.bar = false;
};

Bar.prototype.changePosition = function(position) { 
	if ( (position !== 'top') && (position !== 'bottom') ) {
		return;
	}
	
	this.closeBar();
	this.position = position;
	this.bar = this._create();	
	this._append();
};

Bar.prototype._create = function() {
	var bar = document.createElement('div');
	bar.className = `bar ${this.position}`;

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


Bar.prototype._append = function() { 
	document.body.appendChild(this.bar);

	if (this.position === 'top') {
		this._animate();
	}
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

Bar.prototype._animate = function() { 
	window.requestAnimationFrame(() => {
		if (!this.bar || this.position !== 'top') {
			return;
		}

		var top = parseInt(this.bar.style.top);

		if (isNaN(top)) {
			top = -50;
		}

		if (top < 0) {
			this.bar.style.top = `${top + 1}px`;
			window.requestAnimationFrame(() => this._animate());
		}
	});
};