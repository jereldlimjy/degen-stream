import {
    FrameButton,
    FrameContainer,
    FrameImage,
    NextServerPageProps,
    getPreviousFrame,
} from "frames.js/next/server";
import { DegenLogoLight } from "./components/DegenLogoLight";

type State = {};

export default async function Home({ searchParams }: NextServerPageProps) {
    const previousFrame = getPreviousFrame<State>(searchParams);

    return (
        <div className="p-4">
            Welcome to Degen Stream!
            <FrameContainer
                postUrl="/frames/balance"
                pathname="/"
                state={{}}
                previousFrame={previousFrame}
            >
                <FrameImage aspectRatio="1.91:1">
                    <div tw="w-full h-full bg-violet-500 justify-center items-center flex flex-col relative">
                        <div tw="flex absolute top-25 left-130">
                            <DegenLogoLight height={100} width={100} />
                        </div>
                        <div tw="flex flex-col justify-center items-center bg-violet-50 w-3/4 rounded-lg">
                            <h1 tw="text-violet-800 text-center text-6xl">
                                Welcome to Degen Stream!
                            </h1>
                        </div>
                        <span tw="absolute top-110 text-violet-50">
                            created by: @jereld
                        </span>
                    </div>
                </FrameImage>
                <FrameButton>Get Started</FrameButton>
            </FrameContainer>
        </div>
    );
}
