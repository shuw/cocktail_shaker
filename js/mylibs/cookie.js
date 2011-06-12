/**
 * Takes a number of days and returns a string representation of the date
 * at which a cookie should expire.
 *
 * @param {Number} [days] The number of days until the cookie expires. 7 is
 * the default.
 */
function expires(days) {
	days = $.type(days) == 'number' ? days : 365;
	days = ((new Date()).getTime() + (days * 24 * 60 * 60 * 1000));
	return (new Date(days)).toUTCString();
}

/**
 * Adds a name/value pair to the end of a cookie string.
 *
 * @param {String} name The name for the value.
 * @param {*} value The value. Can be any type which will cast itself into
 * a string using concatenation.
 * @param {String} cookie The cookie content you wish to append the
 * name/value pair to.
 */
function append(name, value, cookie) {
	cookie = $.trim(cookie || '');
	if (name && value) {
		if (cookie.length > 0 && cookie.lastIndexOf(';') != cookie.length-1) {
			cookie += ';';
		}
		cookie += name + '=' + value;
	}
	return cookie;
}

/**
 * Sets document.cookie to a cookie value.
 *
 * @param {String} cookie_value The content to set the current cookie.
 */
function set(cookie_value) {
	document.cookie = cookie_value;
}

/**
 * Returns the string value of document.cookie
 */
function get() {
	return document.cookie;
}

/**
 * Writes a cookie and sets document.cookie to the string it generates.
 *
 * @param {String} name The name for the value of this cookie 
 * @param {*} value The value for the cookie.
 * @param {String|Number} ttl Either a string representation of the date at
 * which this cookie expires or a number of days until the cookie expires.
 * If a Number is passed it is converted with raw.expires().
 * @param {String} domain Set the domain for this cookie.
 */
function write(name, value, ttl, domain) {
	var cookie = raw.append(name, value);

	if ($.type(ttl) == 'number') {
		ttl = raw.expires(ttl);
	}
	cookie = raw.append('expires', ttl, cookie);

	if ($.type(domain) == 'string') {
		cookie = raw.append('domain', domain, cookie);
	}
	cookie = raw.append('path', '/', cookie);
	raw.set(cookie);
}

/**
 * Invalidates a cookie
 *
 * @param {String} name The name of the cookie to expire.
 */
function remove(name){
	raw.write(name, '', -1); 
}

/**
 * Returns a regular expression to find the value for a particular name in
 * a cookie.
 *
 * @param {String} name The name of the value you wish to find.
 */
function extractor(name) {
	return new RegExp('(' + name + ')=([^;]*)', 'gi');
}

/**
 * Returns the value for a name stored in a cookie, or undefined if either
 * a cookie or the named value is not found.
 *
 * @param {String} name The name of the value you wish to retrieve.
 */
function read(name) {
	var raw_cookie = raw.get();
	if ( raw_cookie ) {
		var cookie = raw_cookie.match(raw.extractor(name));
		if (cookie && cookie[0]) {
			return cookie[0].slice(cookie[0].split('=', 1)[0].length + 1);
		}
	}
}

var raw = {
	expires: expires,
	append: append,
	read: read,
	write: write,
	remove: remove,
	extractor: extractor,
	set: set,
	get: get
}

/**
 * StateCookie stores information about the application's state.
 * 
 * Options:
 *
 * {Number} [expires] Number of days in which this cookie should expire
 * {String} [domain] Set the cookie's domain to this.
 * {Function} [serialize] ???
 * {Function} [deserialize] ???
 *
 * @constructor
 * 
 * @param {String} name The name for the cookie.
 * @param {Object} opts Cookie options.
 */
function StateCookie(name, opts) {
	opts = opts || {};
	this.name = name;
	this.expires = opts.expires || 7;
	if (opts.domain) {
		this.domain = opts.domain;
	}
	if ($.isFunction(opts.serialize)) {
		this.serialize = opts.serialize;
	}
	if ($.isFunction(opts.deserialize)) {
		this.deserialize = opts.deserialize;
	}
}

StateCookie.raw = raw;

	/**
 * Takes either an Object or a key/value pair.  If an object is passed the
 * same object is returned unmodified.  If a key/value pair is passed a new
 * object is created and populated using the key/value pair.
 *
 * @param {Object|String} obj_or_key Either an object or a string.
 * @param {*} [value] If obj_or_key is a String, this will be the value in
 * the returned object as long as it is not undefined.
 */
StateCookie.prototype.resolve = function(obj_or_key, value) {
	var obj;
	if ($.type(obj_or_key) == 'string') {
		obj = {};
		if (value != undefined) {
			obj[obj_or_key] = value;
		}
	} else {
		obj = obj_or_key;
	}
	return obj;
}

/**
 * Returns a merged object consisting of the current cookie values
 * overridden by any matching values in the passed object.
 *
 * @param {Object} obj The object to merge with the current values.
 */
StateCookie.prototype.merge = function(obj) {
	// shallow clone so that we don't modify the argument obj
	obj = $.extend({}, this.resolve.apply(this, arguments));
	if ( !$.isEmptyObject(obj) ) {
		$.each(this.read(), function(key) {
			if(!(key in obj)) {
				obj[key] = this;
			}
		});
	}
	return obj;
}

/**
 * Takes an Object and writes a cookie after serializing the value. If the
 * cookie already exists, any previous values will be retained.
 *
 * @param {Object} obj The object to write as the cookie
 */
StateCookie.prototype.write = function(obj, callback, context) {
	obj = this.merge.apply(this, arguments);
	raw.write(this.name, this.serialize(obj), raw.expires(this.expires), this.domain);
	if ( $.isFunction(callback) ) {
		callback.call(context || this, this);
	}
	return this;
}

/**
 * Returns either the entire deserialized cookie or a specific value if it
 * exists.
 *
 * @param {String} [key] The key to retrieve. If a key is passed and it is
 * not represented in the cookie, undefined is returned.
 */
StateCookie.prototype.read = function(key) {
	var cookie = this.deserialize(raw.read(this.name));
	if (key) {
		return cookie && key in cookie ? cookie[key] : undefined;
	}
	else {
		return cookie;
	}
}

/**
 * Removes the cookie from the browser.
 */
StateCookie.prototype.remove = function() {
	raw.remove(this.name);
}

/**
 * Serializes an object to a string for use as a cookie value.
 *
 * @param {Object} obj The object to convert to a string.
 */
StateCookie.prototype.serialize = function(obj) {
	obj = this.resolve.apply(this, arguments);
	$.each(obj, function(key, value) {
		if (value == null) {
			delete obj[key];
		}
	});
	return $.param(obj || {}, true);
}


var query_re = /[^?&]+/gi,
	entry_re = /(.*)=(.*)/i;

decode_form = function(data, label) {

	data = label ? data[label] : data;

	var entry,
		key,
		value,
		result = {},
		entries = (data || '').match( query_re ) || [];

	$.each( entries, function( index, value ) {
		entry = value.match( entry_re );
		if( entry && entry[1] ) {
			key = decodeURIComponent(entry[1]);
			value = decodeURIComponent(entry[2]);
			if (key.lastIndexOf('[]') == (key.length - 2)) {
				key = key.slice(0, -2);
				result[key] = result[key] || [];
				result[key].push(value);
			}
			else {
				if ( result[key] ) {
					if (!$.isArray(result[key])) {
						result[key] = [result[key]];
					}
					result[key].push(value);
				}
				else {
					result[key] = value;
				}
			}
		}
	});
	return result;

}


/**
 * Deserializes a string to an object.
 *
 * @param {String} value The form encoded string to convert to an object.
 */
StateCookie.prototype.deserialize = function(value) {
	return decode_form(value);
}
