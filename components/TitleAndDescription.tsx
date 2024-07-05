import React from "react";

import SocialMediaButtons from "./SocialMediaButtons";

import { VerticalSeparator } from "./VerticalSeparator";
import { LinkAsButton } from "./LinkAsButton";

type TitleAndDescription = {
  title: string;
  description: JSX.Element;
};

export default function TitleAndDescription({
  title,
  description,
}: TitleAndDescription) {
  return (
    <>
      <div className="w-full sm:pt-12 pb-10 px-10 flex flex-col items-center align-center">
        <h1 className="text-4xl text-center">{title}</h1>
        <VerticalSeparator />
        <SocialMediaButtons />
        <div className="max-w-lg text-center py-4">{description}</div>
      </div>
    </>
  );
}
