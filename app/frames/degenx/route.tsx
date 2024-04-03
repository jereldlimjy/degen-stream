/* eslint-disable react/jsx-key */
import { DegenLogo } from "../../components/DegenLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import * as dotenv from "dotenv";

dotenv.config();

export const POST = frames(async (ctx: any) => {
    const { profileImage, username } = ctx.message.requesterUserData;
    const { degenBalance, degenxBalance } = ctx.state;

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
                        Would you like to mint or unwrap your DEGENx tokens?
                    </span>
                </div>
                <div tw="flex justify-center">
                    <span tw="text-3xl text-center text-rose-600 mt-12">
                        Sorry for the bad UX, there's a limit of 4 buttons :'(
                    </span>
                </div>
            </div>
        ),
        buttons: [
            <Button action="post" target="/balance">
                Back
            </Button>,
            <Button action="post" target="/mint">
                Mint DEGENx
            </Button>,
            <Button action="post" target="/unwrap">
                Unwrap DEGENx
            </Button>,
        ],
        state: {
            degenBalance,
            degenxBalance,
        },
    };
});
