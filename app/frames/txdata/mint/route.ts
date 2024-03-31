import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { ethers } from "ethers";
import degenxAbi from "../../../assets/degenxAbi.json";

const DEGEN_CONTRACT_ADDRESS = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
const DEGENX_CONTRACT_ADDRESS = "0xdb2521910E0299Cfe40811e639bc7dd333589F28";

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
        // approve flow sender contract
        const calldata = encodeFunctionData({
            abi: degenAbi,
            functionName: "approve",
            args: [
                DEGENX_CONTRACT_ADDRESS,
                ethers.parseUnits(frameMessage.inputText!!),
            ],
        });

        return NextResponse.json({
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
        // call gainDegenx method
        const calldata = encodeFunctionData({
            abi: degenxAbi,
            functionName: "upgrade",
            args: [ethers.parseUnits(frameMessage.inputText!!)],
        });

        return NextResponse.json({
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
