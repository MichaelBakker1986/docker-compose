import { audit, r } from './TraderConnect'

export class HealthCare {
	constructor() {
	}

	static async raw(last_create_time) {
		return audit.between(Number(last_create_time) || 0, r.maxval, {
			leftBound: 'open',
			index    : 'create_time'
		}).orderBy('create_time')
	}
}