/* eslint-disable react/jsx-key */
import { DegenLogo } from "../../components/DegenLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { ethers } from "ethers";
import { formatNumber } from "../../utils/utils";
import {
    DEGEN_CONTRACT_ADDRESS,
    DEGENX_CONTRACT_ADDRESS,
} from "../../constants";
import * as dotenv from "dotenv";

dotenv.config();

export const POST = frames(async (ctx: any) => {
    const { username } = ctx.message.requesterUserData;
    const profileImage = ctx.message.requesterUserData?.profileImage ?? "";
    const walletAddress = ctx.message.requesterVerifiedAddresses[0];
    const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL ?? "");

    const degenContract = new ethers.Contract(
        DEGEN_CONTRACT_ADDRESS,
        [
            "function transferFrom(address from, address to, uint value)",
            "function balanceOf(address owner) view returns (uint balance)",
        ],
        provider
    ) as any;
    const degenxContract = new ethers.Contract(
        DEGENX_CONTRACT_ADDRESS,
        [
            "function transferFrom(address from, address to, uint value)",
            "function balanceOf(address owner) view returns (uint balance)",
        ],
        provider
    ) as any;

    let degenBalance = 0;
    let degenxBalance = 0;

    if (walletAddress) {
        degenBalance = await degenContract.balanceOf(walletAddress);
        degenxBalance = await degenxContract.balanceOf(walletAddress);
    }

    const buttons = [
        <Button action="post" target="/balance">
            Refresh
        </Button>,
        <Button action="post" target="/">
            Back
        </Button>,
        <Button action="post" target="/degenx">
            Mint/Unwrap DEGENx
        </Button>,
    ];

    if ((degenxBalance as any) !== 0n) {
        buttons.push(
            <Button action="post" target="/stream">
                Stream DEGENx
            </Button>
        );
    }

    return {
        image: (
            <div tw="w-full h-full flex flex-col relative justify-center items-center">
                <div tw="flex absolute top-4 left-4">
                    <DegenLogo height={60} width={60} />
                </div>
                <div tw="flex flex-col items-center">
                    <img src={profileImage} height="120px" width="120px" />
                    <span tw="mt-1 text-4xl">{username}</span>
                </div>
                <div tw="flex flex-col mt-8">
                    <div tw="flex justify-between">
                        <span>Degen Balance: </span>
                        <span tw="ml-2 text-violet-600">
                            {formatNumber(
                                Number(ethers.formatEther(degenBalance))
                            )}{" "}
                            DEGEN
                        </span>
                    </div>
                    <div tw="flex mt-4 justify-between">
                        <span>Super Degen Balance: </span>
                        <span tw="ml-2 text-violet-600">
                            {formatNumber(
                                Number(ethers.formatEther(degenxBalance))
                            )}{" "}
                            DEGENx
                        </span>
                    </div>
                    <div tw="flex justify-center">
                        <span tw="text-2xl text-center text-green-800 mt-12">
                            Note: Try refreshing if your balance does not show
                            up
                        </span>
                    </div>
                </div>
            </div>
        ),
        buttons,
        state: {
            degenBalance: degenBalance.toString(),
            degenxBalance: degenxBalance.toString(),
        },
    };
});
