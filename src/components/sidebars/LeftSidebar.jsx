import React,{ useMemo } from "react"
import { getShapeInfo } from "../../lib/utils";
import "../navbar/navbar.scss";
import "./sidebar.scss";

const LeftSidebar = ({ allShapes }) => {
  // memoize the result of this function so that it doesn't change on every render but only when there are new shapes
  const memoizedShapes = useMemo(
    () => (
      <section className="sidebar-main-container">
        <h3 className="border border-primary-grey-200 px-5 py-4 text-xs uppercase">
          Layers
        </h3>
        <div className="flex flex-col">
          {allShapes?.map(shape => {
            const info = getShapeInfo(shape[1]?.type)
            return (
              <div
                key={shape[1]?.objectId}
                className="menu-btn"
                // className="group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-primary-green hover:text-primary-black"
              >
                <img
                  src={info?.icon}
                  alt="Layer"
                  width={16}
                  height={16}
                />
                <p>
                  {info.name}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    ),
    [allShapes?.length]
  )

  return memoizedShapes
}

export default LeftSidebar
