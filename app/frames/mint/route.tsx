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
    const { degenBalance } = ctx.state;
    const hasApproved = !!ctx.message?.transactionId;

    const button = hasApproved ? (
        <Button action="tx" target="/txdata/mint" post_url="/balance">
            Mint DEGENx
        </Button>
    ) : (
        <Button action="tx" target="/txdata/mint" post_url="/mint">
            Approve DEGENx
        </Button>
    );

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
                    <span>How much DEGENx would you like to mint?</span>
                </div>
                <div tw="flex mt-8">
                    <span>Degen Balance: </span>
                    <span tw="ml-2 text-violet-600">
                        {nFormat.format(
                            Number(ethers.formatEther(degenBalance))
                        )}{" "}
                        DEGEN
                    </span>
                </div>
                {!hasApproved && (
                    <div tw="flex">
                        <span tw="text-2xl text-center text-green-800 mt-12">
                            Note: Before minting, you first need to approve the
                            DEGENx contract
                        </span>
                    </div>
                )}
            </div>
        ),
        buttons: [button],
        state: {
            hasApproved,
            degenBalance,
        },
        textInput: " Amount:",
    };
});
