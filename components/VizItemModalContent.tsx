import Image from "next/image";
import { VizItem } from "../util/viz-list";
import { ChartIdPill } from "./ChartIdPill";
import { LinkAsButton } from "./LinkAsButton";

// VizItemModalContent manages the content
type VizItemModalContentProps = {
  vizItem: VizItem;
};

export const VizItemModalContent = (props: VizItemModalContentProps) => {
  const allChartIds = props.vizItem.chartId.map((id, i) => {
    return (
      <span key={i} className="mr-1">
        <ChartIdPill chartId={id} />
      </span>
    );
  });

  const allTools = props.vizItem?.tool?.map((tool, i) => {
    return (
      <span key={i} className="mr-1">
        <ChartIdPill chartId={tool} />
      </span>
    );
  });

  return (
    <div
      style={{ maxHeight: 700, maxWidth: 1200 }}
      className="h-full w-full flex items-center justify-around "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-full max-h-full w-2/3 p-10 mr-4 flex justify-center items-center overflow-scroll"
      >
        <Image
          placeholder="blur"
          src={require(`../public/img/${props.vizItem.img}`)}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div onClick={(e) => e.stopPropagation()} className="w-1/3 p-2">
        <p className="font-bold">{props.vizItem.title}</p>
        <p>
          <span className="text-xs font-extralight">by </span>
          <span className="text-xs italic font-extralight">
            {props.vizItem.author}
          </span>
        </p>
        <br />

        <div>
          <span className="font-light text-gray-500 text-sm">Chart type: </span>
          <span>{allChartIds}</span>
        </div>
        <br />

        {allTools && allTools.length > 0 && (
          <>
            <span className="font-light text-gray-500 text-sm">Tool: </span>
            <span>{allTools[0]}</span>
            <br />
          </>
        )}
        <br />

        <div>
          <span className="font-light text-gray-500 text-sm">Context: </span>
          <p
            dangerouslySetInnerHTML={{
              __html: props.vizItem.contextDescription,
            }}
          />
        </div>
        <br />

        <div>
          <span className="font-light text-gray-500 text-sm">
            Visualization:{" "}
          </span>
          <p
            dangerouslySetInnerHTML={{
              __html: props.vizItem.chartDescription,
            }}
          />
        </div>
        <br />

        <div className="flex">
          <LinkAsButton href={props.vizItem.url} size="sm">
            Visit project
          </LinkAsButton>
          {props.vizItem.code && (
            <div>
              <LinkAsButton href={props.vizItem.code} size="sm">
                Read code
              </LinkAsButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
