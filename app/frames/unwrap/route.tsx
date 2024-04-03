/* eslint-disable react/jsx-key */
import { DegenLogo } from "../../components/DegenLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { ethers } from "ethers";
import { formatNumber } from "../../utils/utils";
import * as dotenv from "dotenv";

dotenv.config();

export const POST = frames(async (ctx: any) => {
    const { profileImage, username } = ctx.message.requesterUserData;
    const { degenxBalance } = ctx.state;

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
                    <span>How much DEGENx would you like to unwrap?</span>
                </div>
                <div tw="flex mt-8">
                    <span>Super Degen Balance: </span>
                    <span tw="ml-2 text-violet-600">
                        {formatNumber(
                            Number(ethers.formatEther(degenxBalance))
                        )}{" "}
                        DEGEN
                    </span>
                </div>
            </div>
        ),
        buttons: [
            <Button action="post" target="/degenx">
                Back
            </Button>,
            <Button action="tx" target="/txdata/unwrap" post_url="/balance">
                Unwrap DEGENx
            </Button>,
        ],
        state: {
            degenxBalance,
        },
        textInput: " Amount:",
    };
});
