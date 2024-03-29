import React from "react";

const CommentList = ({ comments }) => {
  // Helper function to convert timestamp to hours:minutes:seconds format
  const formatTime = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = Math.floor(timestamp % 60);

    // Add leading zeros if needed
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="w-[100%] md:w-[35%] md:h-full flex flex-col gap-2 px-2 md:px-4 overflow-hidden">
      <h2 className="font-semibold md:text-2xl">Comments</h2>
      <ul className="overflow-y-scroll flex flex-col gap-2  overflow-x-hidden border-t-2 py-1 scrollbar-hidden h-[40vh] md:h-full">
        {comments?.length > 0
          ? comments?.map((comment, index) => (
              <li
                key={index}
                className=" flex-wrap items-center gap-2 leading-4 md:leading-5"
              >
                <strong className="whitespace-nowrap text-sm md:text-lg">
                  Anonymous :{" "}
                </strong>
                <p className=" flex-grow h-auto break-words">{comment?.text}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default CommentList;
