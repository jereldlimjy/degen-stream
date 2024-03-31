import {
    FrameButton,
    FrameContainer,
    FrameImage,
    NextServerPageProps,
    getPreviousFrame,
} from "frames.js/next/server";
import { DegenLogo } from "./components/DegenLogo";

type State = {};

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
    const previousFrame = getPreviousFrame<State>(searchParams);

    // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
    // example: load the users credentials & check they have an NFT
    return (
        <div className="p-4">
            Welcome to Super Stream!
            <FrameContainer
                postUrl="/frames/balance"
                pathname="/"
                state={{}}
                previousFrame={previousFrame}
            >
                <FrameImage aspectRatio="1.91:1">
                    <div tw="w-full h-full bg-white justify-center items-center flex flex-col relative">
                        <div tw="flex absolute top-25 left-130">
                            <DegenLogo height={100} width={100} />
                        </div>
                        <div tw="flex justify-center items-center w-3/4 bg-violet-500 rounded-lg">
                            <h1 tw="text-white text-center text-6xl">
                                Welcome to Degen Stream!
                            </h1>
                        </div>
                    </div>
                </FrameImage>
                <FrameButton>Get Started</FrameButton>
            </FrameContainer>
        </div>
    );
}
