Array.prototype.clone = function () {
	var input = this;
	var output = [];
	for (var i = 0; i < input.length; ++i) {
		output[i] = input[i];
	};
	return output;
};

Array.prototype.remove = function (str) {
	if (this.indexOf(str) !== -1) {
		this.splice(this.indexOf(str), 1);
	};
	return this;
};

Array.prototype.removeAll = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.shuffle = function() {
	var m = this.length, t, i;
	while (m) {
	    i = Math.floor(Math.random() * m--);
	    t = this[m];
	    this[m] = this[i];
	    this[i] = t;
	};
	return this;
};