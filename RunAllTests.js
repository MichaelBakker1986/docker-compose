/**
 * Run all tests in project
 * "test": "concurrently \"cd excel-connect && npm test\" \"cd lme-core && npm test\" \"cd model-tests && npm test\" \"cd lme-model-api && npm test --no-update-notifier\" \"cd log && npm test --no-update-notifier\"",
 **/

import main from 'michaelbakker196_concurrently'
/*
main([
	'cd excel-connect && npm test',
	'cd lme-core && npm test',
	/*	'cd model-tests && npm test',*/
	'cd lme-model-api && npm test --no-update-notifier',
	'cd log && npm test --no-update-notifier'])
    */
