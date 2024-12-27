import { useQuery } from '@tanstack/react-query'
import { Spinner } from 'components/ui/spinner'
import { getChannelVideos } from 'features/videoapi/videos'
import { Play, Plus } from 'lucide-react'
import React from 'react'

function UserVideo() {
    const { isLoading, isError, error, data: getChannelVideosList  } = useQuery({
        queryKey: ['todos'],
        queryFn: getChannelVideos,
    })
    if (isLoading) return <div><Spinner size='md' variant="light" /></div>;
    if (isError) return <div>Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;
    return (
        <>
            <div id='user-video' className='w-full max-w-sm text-center text-text m-auto'>
                <p className="mb-3 flex justify-center items-center w-12 h-12 bg-gray-600 rounded-full mx-auto">
                    <Play className='text-text' />
                </p>
                <h5 className="mb-2 font-semibold">No videos uploaded</h5>
                <p>This page has yet to upload a video. Search another page in order to find more videos.</p>
                <button
                    className="block cursor-pointer rounded bg-gray-600 p-4 text-center font-semibold text-text focus:outline-none mt-5 flex justify-center g-5 w-1/2 m-auto">
                    <Plus />
                    New video</button>
            </div>
        </>
    )
}

export default UserVideo