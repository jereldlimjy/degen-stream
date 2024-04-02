import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import degenxAbi from "../../../assets/degenxAbi.json";

const CFA_FORWARDER_CONTRACT_ADDRESS =
    "0xcfA132E353cB4E398080B9700609bb008eceB125";
const DEGENX_CONTRACT_ADDRESS = "0xdb2521910E0299Cfe40811e639bc7dd333589F28";

export async function POST(
    req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
    const json = await req.json();

    const frameMessage = await getFrameMessage(json);

    if (!frameMessage || !frameMessage.inputText) {
        throw new Error("No frame message");
    }

    const state = JSON.parse(frameMessage?.state || "");
    const flowRate = state.flowRate;

    // call setFlowrate method
    const calldata = encodeFunctionData({
        abi: degenxAbi,
        functionName: "setFlowrate",
        args: [DEGENX_CONTRACT_ADDRESS, frameMessage.inputText, flowRate],
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
