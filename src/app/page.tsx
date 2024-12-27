"use client";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DashboardLayout } from "components/layouts/dashboard-layout";
import { getAllVideos } from "features/videoapi/videos";
import { Spinner } from "components/ui/spinner";
import moment from 'moment';
import CoverImage from "components/ui/CoverImage";
import { useInView } from "react-intersection-observer";
import { convertToTimeFormat } from "utils/thumbTimeFormat";

const HomePage = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    status,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: ({ pageParam }) => getAllVideos(pageParam, 8),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      if (lastPage?.data.videos.length === 8) {
        return allPages.length + 1
      } else {
        return undefined
      }
    }
  });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  // console.log("data+-+-", data,)
  return (
    <DashboardLayout>
      {status === 'pending' ? (
        <div className="flex size-full items-center justify-center bg-background ">
          <Spinner variant="light" size="lg" />
        </div>
      ) : status === "error" ? (
        <p>Error loading videos. Please try again later.</p>
      ) : (
        <>
          <div className="max-w-full h-full py-10">
            <div className="px-4 sm:px-6 lg:px-8 bg-background">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.pages?.map((page: any) => (
                  page?.data?.videos?.map((video: any) => (
                    <div key={video._id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-stone-800 text-white cursor-pointer">
                      <div className="relative">
                        <span className="absolute text-xs font-semibold bg-black/75 py-1 px-2 rounded-md bottom-1 right-1">{convertToTimeFormat(video?.duration)}</span>
                        <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                      </div>
                      <div className="p-2">
                        <div className="flex items-center justify-center">
                          <div className="flex-shrink-0 self-start mt-2">
                            <CoverImage
                              src={video?.videoAvatar}
                              alt={video?.title}
                              userFirstName={video?.channelName}
                              size="w-10 h-10"
                              rounded="rounded-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-md font-bold text-white line-clamp-2">
                              {video.title}
                            </p>
                            <p className="text-sm text-white truncate mt-1">
                              {video.channelName.charAt(0).toUpperCase() + video.channelName.slice(1)}
                            </p>
                            <div className="flex items-center text-xs text-gray-300">
                              <span>{video.views} views</span>
                              <span className="ms-2">{moment(video.createdAt).fromNow()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ))}
              </div>
              <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
