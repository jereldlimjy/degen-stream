import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { ethers } from "ethers";
import {
    DEGEN_CONTRACT_ADDRESS,
    DEGENX_CONTRACT_ADDRESS,
} from "../../../constants";
import degenxAbi from "../../../assets/degenxAbi.json";

const degenAbi = [
    {
        constant: false,
        inputs: [
            {
                name: "spender",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];

export async function POST(
    req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
    const json = await req.json();

    const frameMessage = await getFrameMessage(json);

    if (!frameMessage) {
        throw new Error("No frame message");
    }

    const state = JSON.parse(frameMessage?.state || "");
    const hasApproved = state.hasApproved;

    if (!hasApproved) {
        // approve degenx on degen contract
        const calldata = encodeFunctionData({
            abi: degenAbi,
            functionName: "approve",
            args: [
                DEGENX_CONTRACT_ADDRESS,
                ethers.parseUnits(frameMessage.inputText!!),
            ],
        });

        return NextResponse.json({
            attribution: false,
            // chainId: "eip155:11155420", // Optimism Sepolia
            chainId: "eip155:8453", // Base Mainnet
            method: "eth_sendTransaction",
            params: {
                abi: degenAbi as Abi,
                to: DEGEN_CONTRACT_ADDRESS,
                data: calldata,
                value: "0",
            },
        });
    } else {
        // call upgrade method
        const calldata = encodeFunctionData({
            abi: degenxAbi,
            functionName: "upgrade",
            args: [ethers.parseUnits(frameMessage.inputText!!)],
        });

        return NextResponse.json({
            attribution: false,
            // chainId: "eip155:11155420", // Optimism Sepolia
            chainId: "eip155:8453", // Base Mainnet
            method: "eth_sendTransaction",
            params: {
                abi: degenxAbi as Abi,
                to: DEGENX_CONTRACT_ADDRESS,
                data: calldata,
                value: "0",
            },
        });
    }
}
