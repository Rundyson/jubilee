import React from "react";
import SpinnerButton from "./spinners/SpinnerButton";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
  isSearchOrFilter = false,
}) => {
  if (result?.count > 0 && (page === result?.total_pages || !hasNextPage) && !isSearchOrFilter) {
    return (
      <>
        {isFetchingNextPage ? (
          <button
            type="button"
            disabled={isFetchingNextPage}
            className="loadmore h-full relative my-2 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed disabled:!bg-transparent"
          >
            <ButtonSpinner />
          </button>
        ) : (
          <div className="loadmore my-2 p-1.5 text-center text-xs">
            End of list.
          </div>
        )}
      </>
    );
  }
  if (hasNextPage) {
    return (
      <button
        ref={refView}
        type="button"
        disabled={isFetchingNextPage}
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage();
        }}
        className="loadmore h-full relative my-2 text-primary p-1.5 rounded-full w-36 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:!bg-transparent"
      >
        {isFetchingNextPage ? <ButtonSpinner /> : <span className="text-white">Load more</span>}
      </button>
    );
  }
  if(!hasNextPage && result?.count > 0 && !isSearchOrFilter) {
    return <div className="my-2 p-1.5 text-white">End OF List</div>
  }
};

export default Loadmore;
