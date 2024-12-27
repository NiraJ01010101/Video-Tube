'use client'
import { useQuery } from '@tanstack/react-query'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import ChannelPlaylist from 'components/playlist/ChannelPlaylist'
import Subscribed from 'components/subscribed/Subscribed'
import ChannelTweet from 'components/tweet/ChannelTweet'
import CoverImage from 'components/ui/CoverImage'
import { Spinner } from 'components/ui/spinner'
import UserVideo from 'components/video/UserVideo'
import { getUser, getUserChannel } from 'features/userapi/get-users'
import React, { useMemo, useState } from 'react'

function UserProfile({ params }: { params: { userName: string } }) {
    const [activeTab, setActiveTab] = useState("videos");
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['current-user'],
        queryFn: getUser,
    })

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    const { username, fullname, email } = data?.data || {}

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center text-white w-full">
                    <Spinner size='md' variant="light" />
                    <span className="">Loading user profile...</span>
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout>
                <div className="text-red-500 text-center w-full">
                    <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <>
                <div className='w-full h-full p-5' id='user-profile'>
                    <div className="flex flex-col items-center bg-background md:flex-row w-full">
                        <CoverImage
                            src=""
                            alt="Cover Image"
                            userFirstName={username}
                            size="w-32 h-32"
                            rounded="rounded-full"
                            fontSize='text-4xl'
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{fullname.charAt(0).toUpperCase() + fullname.slice(1)}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{email}</p>
                        </div>
                    </div>
                    {/* Tab navigation */}
                    <div className="mb-4 border-b border-border mt-5">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                            {["videos", "playlist", "tweets", "subscribed"].map((tab) => (
                                <li className="me-2" role="presentation" key={tab}>
                                    <button
                                        className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab
                                            ? "border-white text-white"
                                            : "border-transparent text-secondaryText hover:border-white"
                                            }`}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeTab === tab}
                                        onClick={() => handleTabClick(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="default-tab-content">
                        {activeTab === "videos" && (
                            <UserVideo />
                        )}
                        {activeTab === "playlist" && (
                            <ChannelPlaylist />
                        )}
                        {activeTab === "tweets" && (
                            <ChannelTweet />
                        )}
                        {activeTab === "subscribed" && (
                           <Subscribed/>
                        )}
                    </div>
                </div>
            </>
        </DashboardLayout>
    )
}

export default UserProfile