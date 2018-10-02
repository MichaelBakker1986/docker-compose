export default function() {
	return {
		'formulasets'          : [
			{
				'formulasetId': 0,
				'name'        : 'notrend'
			},
			{
				'formulasetId': 1,
				'name'        : 'trend'
			},
			{
				'formulasetId': 2,
				'name'        : 'user'
			},
			{
				'formulasetId': 3,
				'name'        : 'sector'
			},
			{
				'formulasetId': 4,
				'name'        : 'aggregation'
			}
		],
		'layout'               : {
			'children'        : [
				{
					'children': [
						{
							'children': [
								{
									'children': [
										{
											'children': [],
											'name'    : 'detl',
											'size'    : 1
										}
									],
									'name'    : 'qurt',
									'size'    : 4
								}
							],
							'name'    : 'half',
							'size'    : 9
						}
					],
					'name'    : 'bkyr',
					'size'    : 19
				}
			],
			'children13period': [
				{
					'children': [
						{
							'children': [],
							'name'    : 'detl',
							'size'    : 1
						}
					],
					'name'    : 'bkyr',
					'size'    : 13
				}
			],
			'idx'             : 400,
			'name'            : 'all',
			'no'              : 0,
			'period'          : [
				{
					'formulasetId': 0,
					'hash'        : 0,
					'idx'         : 19
				},
				{
					'formulasetId': 1,
					'hash'        : 1,
					'idx'         : 400
				}
			],
			'size'            : 400
		},
		'navalue'              : 1e-10,
		'nestedTupleMultiplier': 'undefined',
		'time'                 : {
			'columnMultiplier'  : 1,
			'columnSize'        : 400,
			'columns'           : [
				{
					'index': 0,
					'name' : 'jan/p1'
				},
				{
					'index': 1,
					'name' : 'fes/p2'
				},
				{
					'index': 2,
					'name' : 'mar/p3'
				}
			],
			'periodMultiplier'  : 1,
			'periodSize'        : 2,
			'timelineMultiplier': 256,
			'timelineSize'      : 1,
			'timelines'         : [
				{
					'index': 0,
					'name' : 'ExpertOptie-level5'
				}
			]
		},
		'tupleMultiplier'      : 32768
	}
}