import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import {
    CFA_FORWARDER_CONTRACT_ADDRESS,
    DEGENX_CONTRACT_ADDRESS,
} from "../../../constants";
import degenxAbi from "../../../assets/degenxAbi.json";

export async function POST(
    req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
    const json = await req.json();

    const frameMessage = await getFrameMessage(json);

    if (!frameMessage || !frameMessage.inputText) {
        throw new Error("No frame message");
    }

    const walletAddress = frameMessage.requesterVerifiedAddresses[0];

    // call deleteFlow method
    const calldata = encodeFunctionData({
        abi: degenxAbi,
        functionName: "deleteFlow",
        args: [
            DEGENX_CONTRACT_ADDRESS,
            walletAddress,
            frameMessage.inputText,
            "0x0",
        ],
    });

    return NextResponse.json({
        attribution: false,
        // chainId: "eip155:11155420", // Optimism Sepolia
        chainId: "eip155:8453", // Base Mainnet
        method: "eth_sendTransaction",
        params: {
            abi: degenxAbi as Abi,
            to: CFA_FORWARDER_CONTRACT_ADDRESS,
            data: calldata,
            value: "0",
        },
    });
}
