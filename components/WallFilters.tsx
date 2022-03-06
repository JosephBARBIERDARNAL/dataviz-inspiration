import { ChartId } from "../util/sectionDescription";
import { Luminosity, Tool } from "../util/viz-list";
import { ChartIdSelector } from "./Filters/ChartIdSelector";
import { ColumnNumberSelector } from "./Filters/ColumnNumberSelector";
import { FilterReset } from "./Filters/FilterReset";
import { LuminositySelector } from "./Filters/LuminositySelector";
import { ToolSelector } from "./Filters/ToolSelector";

type WallFiltersProps = {
  columnNumber: number;
  updateColumnNumber: (arg: number) => void;
  selectedLuminosities: Luminosity[];
  updateLuminosity: (arg: Luminosity[]) => void;
  selectedChartIds: ChartId[] | undefined;
  updateChartId: (arg: ChartId[] | undefined) => void;
  selectedTools: Tool[] | undefined;
  updateTool: (arg: Tool[] | undefined) => void;
};

export const WallFilters = ({
  updateColumnNumber,
  columnNumber,
  updateLuminosity,
  selectedLuminosities,
  updateChartId,
  selectedChartIds,
  updateTool,
  selectedTools,
}: WallFiltersProps) => {
  return (
    <div className="sticky bg-white top-0 w-full z-40 flex justify-center items-center">
      <FilterWrapper>
        <ColumnNumberSelector
          columnNumber={columnNumber}
          updateColumnNumber={updateColumnNumber}
        />
      </FilterWrapper>

      <FilterWrapper>
        <LuminositySelector
          updateLuminosity={updateLuminosity}
          selectedLuminosities={selectedLuminosities}
        />
      </FilterWrapper>

      <FilterWrapper>
        <ChartIdSelector
          selectedChartIds={selectedChartIds}
          updateChartId={updateChartId}
        />
      </FilterWrapper>

      <FilterWrapper>
        <ToolSelector selectedTools={selectedTools} updateTool={updateTool} />
      </FilterWrapper>

      {/* A "x" button allowing to reset all filters to default (=no filter at all) */}
      <FilterWrapper>
        <FilterReset updateTool={updateTool} updateChartId={updateChartId} />
      </FilterWrapper>
    </div>
  );
};

const FilterWrapper = (props: { children: JSX.Element }) => {
  return (
    <div className="flex h-8 px-2 mx-2 py-2 my-2 hover:outline outline-1 rounded-md outline-gray-200">
      {props.children}
    </div>
  );
};
