import { ViewLinkageType } from '../store'

export const ViewLinkageData: ViewLinkageType = [
  {
    conditionList: [
      {
        condition: 'any',
        details: [
          {
            triggerId: 'linkage1',
            symbol: 'equal',
            type: 'constant',
            constants: '666'
          }
        ]
      }
    ],
    linkageList: [
      {
        targetId: 'upload',
        propKey: 'hide'
      },
      {
        targetId: 'checkbox',
        propKey: 'required'
      }
    ]
  },
  {
    conditionList: [
      {
        condition: 'any',
        details: [
          {
            triggerId: 'linkage2',
            symbol: 'in',
            type: 'constant',
            constants: ['1']
          }
        ]
      }
    ],
    linkageList: [
      {
        targetId: 'upload',
        propKey: 'required'
      }
    ]
  },
  {
    conditionList: [
      {
        condition: 'all',
        details: [
          {
            triggerId: 'linkage3',
            symbol: 'in',
            type: 'constant',
            constants: ['1']
          },
          {
            triggerId: 'linkage3',
            symbol: 'in',
            type: 'constant',
            constants: ['2']
          },
          {
            triggerId: 'linkage3',
            symbol: 'in',
            type: 'constant',
            constants: ['3']
          }
        ]
      }
    ],
    linkageList: [
      {
        targetId: 'radio',
        propKey: 'required'
      }
    ]
  }
]
