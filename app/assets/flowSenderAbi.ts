export const flowSenderABI = [
    {
        inputs: [
            {
                internalType: "int96",
                name: "flowRate",
                type: "int96",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "createStream",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "deleteStream",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "gainDegenx",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract ISuperToken",
                name: "_degenx",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "int96",
                name: "flowRate",
                type: "int96",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "updateStream",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "accountList",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "degenx",
        outputs: [
            {
                internalType: "contract ISuperToken",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "readFlowRate",
        outputs: [
            {
                internalType: "int96",
                name: "flowRate",
                type: "int96",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
