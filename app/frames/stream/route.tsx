/* eslint-disable react/jsx-key */
import { DegenLogo } from "../../components/DegenLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { ethers } from "ethers";
import { formatNumber } from "../../utils/utils";
import * as dotenv from "dotenv";
import { DEGENX_CONTRACT_ADDRESS } from "../../constants";

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
                        <span tw="text-5xl">Transaction submitted!</span>
                        <span tw="text-2xl mt-8">
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
                <Button
                    action="link"
                    target={`https://console.superfluid.finance/base-mainnet/supertokens/${DEGENX_CONTRACT_ADDRESS}?tab=streams`}
                >
                    View Superfluid dashboard
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
                        <span>
                            Input an address to create or delete an existing
                            flow
                        </span>
                    </div>
                    <div tw="flex mt-8">
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
                            Note: Using a default flow rate of{" "}
                            <span tw="underline ml-1"> 100 DEGENx / year</span>
                        </span>
                    </div>
                </div>
            ),
            buttons: [
                <Button action="post" target="/balance">
                    Back
                </Button>,
                <Button action="tx" target="/txdata/stream" post_url="/stream">
                    Create flow
                </Button>,
                <Button
                    action="tx"
                    target="/txdata/deleteStream"
                    post_url="/stream"
                >
                    Delete flow
                </Button>,
            ],
            state: {
                flowRate,
            },
            textInput: " Receiver address:",
        };
    }
});
