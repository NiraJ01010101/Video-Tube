import { FolderClosed, Plus } from 'lucide-react'
import React from 'react'

function ChannelPlaylist() {
    return (
        <>
            <div id='user-video' className='w-full max-w-sm text-center text-text m-auto'>
                <p className="mb-3 flex justify-center items-center w-12 h-12 bg-gray-600 rounded-full mx-auto">
                    <FolderClosed />
                </p>
                <h5 className="mb-2 font-semibold">No playlist created</h5>
                <p>There are no playlist created on this channel.</p>
                <button
                    className="block cursor-pointer rounded bg-gray-600 p-4 text-center font-semibold text-text focus:outline-none mt-5 flex justify-center g-5 w-1/2 m-auto">
                    <Plus />
                    Add New Playlist</button>
            </div>
        </>
    )
}

export default ChannelPlaylist