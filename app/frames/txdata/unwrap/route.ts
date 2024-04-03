import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { ethers } from "ethers";
import { DEGENX_CONTRACT_ADDRESS } from "../../../constants";
import degenxAbi from "../../../assets/degenxAbi.json";

export async function POST(
    req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
    const json = await req.json();

    const frameMessage = await getFrameMessage(json);

    if (!frameMessage) {
        throw new Error("No frame message");
    }

    // call downgrade  method
    const calldata = encodeFunctionData({
        abi: degenxAbi,
        functionName: "downgrade",
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
