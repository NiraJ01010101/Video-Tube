import { Users } from 'lucide-react'
import React from 'react'

function Subscribed() {
    return (
        <div id='subscribed-components' className='w-full max-w-sm text-center text-text m-auto'>
            <p className="mb-3 flex justify-center items-center w-12 h-12 bg-gray-600 rounded-full mx-auto">
                <Users />
            </p>
            <h5 className="mb-2 font-semibold">No people subscribers</h5>
            <p>This channel has yet to subscribe a new channel.</p>
        </div>
    )
}

export default Subscribed