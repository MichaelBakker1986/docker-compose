import ls from 'local-storage'

const define_property = function(user_session, key) {
	Object.defineProperty(user_session, key, function() {
		const akey = key
		ls.set(key, ls.get(akey) || user_session[akey])
		return {
			get: () => ls.get(akey),
			set: (v) => ls.set(akey, v)
		}
	}())
}

function LocalStorage(user_session) {

	for (var key in user_session) {
		if (typeof (user_session[key]) === 'object') continue //not interested
		if (typeof (user_session[key]) === 'function') {

			if (typeof (user_session[key].then) === 'function') {
				user_session[key].then(ok => {
					const value = ok
					if (value !== '_=_') ls.set(key, value)
					define_property(user_session, key)
				})
			} else {
				const vv = user_session[key]()
				if (vv !== '_=_') ls.set(key, vv)
				define_property(user_session, key)
			}
		} else {
			const value = user_session[key]
			if (value !== '_=_') ls.set(key, value)
			define_property(user_session, key)
		}
	}
	return user_session
}

export { LocalStorage }