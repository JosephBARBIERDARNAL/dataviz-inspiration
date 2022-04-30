import type { NextPage } from "next";
import { useState } from "react";
import Footer from "../components/Footer";
import { MasonryItem } from "../components/MasonryItem";
import TitleAndDescription from "../components/TitleAndDescription";
import { VizItemModal } from "../components/VizItemModal";
import { vizList } from "../util/viz-list";
import { WallFilters } from "../components/WallFilters";
import { chartIds, chartTypesInfo } from "../util/sectionDescription";
import { filterVizList } from "../util/filterVizList";
import { AppHeader } from "../components/AppHeader";
import Navbar from "../components/Navbar";
import { ApplicationState } from "./_app";

export type Project = { projectId: number; imgId: number };

const SpecificChartTypePage: NextPage<ApplicationState> = ({
  columnNumber,
  setColumnNumber,
  selectedLuminosities,
  setLuminosity,
  selectedChartIds,
  selectedTools,
  updateState,
}: ApplicationState) => {
  // State of this specific page
  const [isModalOpen, setIsModalOpen] = useState(false);
  // specify the project (id in the viz-list.ts array) + the img id (some projects have several imgs)
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  //
  // Apply the filters on the viz list!
  //
  const filteredVizList = filterVizList(
    vizList,
    selectedLuminosities,
    selectedChartIds,
    selectedTools
  );

  const vizItemNumber = filteredVizList.length;

  // When 1 chart type is selected, the website description is updated to show the chart label
  const selectedChartLabel =
    selectedChartIds && selectedChartIds.length === 1
      ? chartTypesInfo.filter((chart) => chart.id === selectedChartIds[0])[0]
          .label
      : "chart";

  const siteDescription = (
    <p>
      <a href="dataviz-inspiration">Dataviz-inspiration.com</a>
      <span>
        {" is the biggest list of " +
          selectedChartLabel +
          " examples available on the web. It showcases " +
          vizItemNumber +
          " of the most beautiful and impactful dataviz projects I know. The collection is a good place to visit when you're designing a new graph, together with "}
      </span>
      <a href="https://www.data-to-viz.com">data-to-viz.com</a>
      <span>{" that shares dataviz best practices."}</span>
    </p>
  );

  return (
    <>
      <AppHeader
        vizItemNumber={vizItemNumber}
        selectedChartLabel={selectedChartLabel}
      />

      <div className="wrapper">
        <Navbar />
      </div>

      <main className="flex flex-col items-center">
        <TitleAndDescription
          title={selectedChartIds?.[0] + " inspiration"}
          description={siteDescription}
        />

        <WallFilters
          columnNumber={columnNumber}
          updateColumnNumber={setColumnNumber}
          selectedLuminosities={selectedLuminosities}
          updateLuminosity={setLuminosity}
          selectedChartIds={selectedChartIds}
          selectedTools={selectedTools}
          updateState={updateState}
        />

        <div
          style={{
            backgroundColor: "rgb(245, 245, 245)",
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <div className="wrapper">
            <div style={{ columns: columnNumber }} className={"gap-2 sm:gap-4"}>
              {/* Each project (i) can have several images associated (j) */}
              {filteredVizList.map((vizItem, i) => {
                return vizItem.img.map((img, j) => {
                  return (
                    <MasonryItem
                      key={i + " " + j}
                      vizItem={vizItem}
                      onClick={() => {
                        setSelectedProject({ projectId: vizItem.id, imgId: j });
                        setIsModalOpen(true);
                      }}
                      imgId={j}
                    />
                  );
                });
              })}
            </div>
          </div>
        </div>
      </main>

      {selectedProject && (
        <VizItemModal
          isModalOpen={isModalOpen}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      <div className="wrapper">
        <Footer />
      </div>
    </>
  );
};

export default SpecificChartTypePage;
