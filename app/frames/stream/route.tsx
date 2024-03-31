/* eslint-disable react/jsx-key */
import { DegenLogo } from "../../components/DegenLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { ethers } from "ethers";
import { nFormat } from "../../utils/utils";
import * as dotenv from "dotenv";

dotenv.config();

export const POST = frames(async (ctx: any) => {
    const { profileImage, username } = ctx.message.requesterUserData;
    const { degenxBalance } = ctx.state;
    const flowRate = 3170979198376;

    if (ctx.message?.transactionId) {
        return {
            image: (
                <div tw="w-full h-full flex flex-col relative justify-center items-center bg-violet-50">
                    <div tw="flex absolute top-4 left-4">
                        <DegenLogo height={60} width={60} />
                    </div>
                    <div tw="flex flex-col justify-center items-center">
                        <span>Transaction submitted!</span>
                        <span tw="text-2xl mt-4">
                            {ctx.message.transactionId}
                        </span>
                    </div>
                </div>
            ),
            buttons: [
                <Button action="post" target="/">
                    Back to Home
                </Button>,
                <Button
                    action="link"
                    target={`https://www.basescan.org/tx/${ctx.message.transactionId}`}
                >
                    View on block explorer
                </Button>,
            ],
        };
    } else {
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
                    <div tw="flex mt-8">
                        <span>How much DEGENx would you like to stream?</span>
                    </div>
                    <div tw="flex mt-8">
                        <span>Super Degen Balance: </span>
                        <span tw="ml-2 text-violet-600">
                            {nFormat.format(
                                Number(ethers.formatEther(degenxBalance))
                            )}{" "}
                            DEGENx
                        </span>
                    </div>
                    <div tw="flex">
                        <span tw="text-2xl text-center text-green-800 mt-12">
                            Note: Using a default flow rate of 100 DEGENx / year
                        </span>
                    </div>
                </div>
            ),
            buttons: [
                <Button action="post" target="/balance">
                    Back
                </Button>,
                <Button
                    action="tx"
                    target="/txdata/deleteStream"
                    post_url="/stream"
                >
                    Delete DEGENx flow
                </Button>,
                <Button action="tx" target="/txdata/stream" post_url="/stream">
                    Create DEGENx flow
                </Button>,
            ],
            state: {
                flowRate,
            },
            textInput: " Receiver address:",
        };
    }
});
