function isExpired  (timeString) {
	const now = new Date()
	const then = new Date(timeString)
	const elapsed = Math.abs(now - then) / 36e5
	return isNaN(elapsed) || elapsed >= 10
}

exports.isExpired = isExpired