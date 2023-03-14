export type DuckeePromptMarket = {
  version: '0.1.0';
  name: 'duckee_prompt_market';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'user';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'promptMarket';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'list';
      accounts: [
        {
          name: 'user';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'promptMarket';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'listing';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenAccount';
          isMut: false;
          isSigner: false;
          docs: ['SPL token account containing token for sale.'];
        },
        {
          name: 'programAsSigner';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'price';
          type: 'u64';
        },
        {
          name: 'royalty';
          type: 'u64';
        },
        {
          name: 'pasBump';
          type: 'u8';
        },
      ];
    },
    {
      name: 'purchase';
      accounts: [
        {
          name: 'user';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'promptMarket';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'listing';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'listerBeneficiary';
          isMut: true;
          isSigner: false;
          docs: ["lister's beneficiary token account to receive the payments."];
        },
        {
          name: 'paymentMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'programAsSigner';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: 'promptMarket';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'paymentMint';
            type: 'publicKey';
          },
        ];
      };
    },
    {
      name: 'listing';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'lister';
            type: 'publicKey';
          },
          {
            name: 'mint';
            type: 'publicKey';
          },
          {
            name: 'price';
            type: 'u64';
          },
          {
            name: 'royalty';
            type: 'u64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'PublicKeyMismatch';
      msg: 'PublicKeyMismatch';
    },
    {
      code: 6001;
      name: 'InvalidMintAuthority';
      msg: 'InvalidMintAuthority';
    },
    {
      code: 6002;
      name: 'UninitializedAccount';
      msg: 'UninitializedAccount';
    },
    {
      code: 6003;
      name: 'IncorrectOwner';
      msg: 'IncorrectOwner';
    },
    {
      code: 6004;
      name: 'NoToken';
      msg: 'NoToken';
    },
    {
      code: 6005;
      name: 'InvalidMint';
      msg: 'InvalidMint';
    },
    {
      code: 6006;
      name: 'ApprovalRequired';
      msg: 'ApprovalRequired';
    },
  ];
};

export const IDL: DuckeePromptMarket = {
  version: '0.1.0',
  name: 'duckee_prompt_market',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'promptMarket',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'list',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'promptMarket',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'listing',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenAccount',
          isMut: false,
          isSigner: false,
          docs: ['SPL token account containing token for sale.'],
        },
        {
          name: 'programAsSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'price',
          type: 'u64',
        },
        {
          name: 'royalty',
          type: 'u64',
        },
        {
          name: 'pasBump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'purchase',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'promptMarket',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'listing',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'listerBeneficiary',
          isMut: true,
          isSigner: false,
          docs: ["lister's beneficiary token account to receive the payments."],
        },
        {
          name: 'paymentMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'programAsSigner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'promptMarket',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'paymentMint',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'listing',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'lister',
            type: 'publicKey',
          },
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'royalty',
            type: 'u64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'PublicKeyMismatch',
      msg: 'PublicKeyMismatch',
    },
    {
      code: 6001,
      name: 'InvalidMintAuthority',
      msg: 'InvalidMintAuthority',
    },
    {
      code: 6002,
      name: 'UninitializedAccount',
      msg: 'UninitializedAccount',
    },
    {
      code: 6003,
      name: 'IncorrectOwner',
      msg: 'IncorrectOwner',
    },
    {
      code: 6004,
      name: 'NoToken',
      msg: 'NoToken',
    },
    {
      code: 6005,
      name: 'InvalidMint',
      msg: 'InvalidMint',
    },
    {
      code: 6006,
      name: 'ApprovalRequired',
      msg: 'ApprovalRequired',
    },
  ],
};
