import { Ellipsis, SmilePlus, Users } from 'lucide-react'
import React from 'react'

function ChannelTweet() {
    return (
        <>
            <div className="mt-2 border pb-2 rounded text-text">
                <textarea className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                    placeholder="Write a tweet"></textarea>
                <div className="flex items-center justify-end gap-x-3 px-3">
                    <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                        <SmilePlus size={20} />
                    </button>
                    <button className=" h-5 w-5 hover:text-[#ae7aff]">
                        <Ellipsis size={20} />
                    </button>
                    <button className="inline-block p-2 px-8 cursor-pointer rounded bg-gray-600 text-center font-semibold text-text focus:outline-none">Send</button>
                </div>
            </div>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-sm text-center text-text" >
                    <p className="mb-3 w-full">
                        <p className="mb-3 flex justify-center items-center w-12 h-12 bg-gray-600 rounded-full mx-auto">
                            <Users />
                        </p>
                    </p>
                    <h5 className="mb-2 font-semibold">No Tweets</h5>
                    <p>
                        This channel has yet to make a
                        <strong> Tweet </strong>
                        .
                    </p>
                </div>
            </div>
        </>
    )
}

export default ChannelTweet