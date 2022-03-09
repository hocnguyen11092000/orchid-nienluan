import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

const TrSkeleton = (props: Props) => {
  return (
    <>
      {Array.from(new Array(8)).map((_, index: number) => {
        return (
          <tr
            key={index}
            style={{ margin: "0", padding: "0", background: "#fff" }}
          >
            <td colSpan={8}>
              <Skeleton height={50} sx={{ width: "100%" }}></Skeleton>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TrSkeleton;
