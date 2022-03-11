import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { MasonryItem } from "../components/MasonryItem";
import TitleAndDescription from "../components/TitleAndDescription";
import { VizItemModal } from "../components/VizItemModal";
import { Luminosity, Tool, VizItem, vizList } from "../util/viz-list";
import { useRouter } from "next/router";
import { WallFilters } from "../components/WallFilters";
import { ChartId, chartTypesInfo } from "../util/sectionDescription";
import { filterVizList } from "../util/filterVizList";
import { AppHeader } from "../components/AppHeader";
import Navbar from "../components/Navbar";

export type Project = { projectId: number; imgId: number };

const Home: NextPage = () => {
  // useRouter returns an object with information on the URL
  const router = useRouter();

  //
  // State of the application
  // Initialized with default values. Those default can be overriden by URL params in the next useEffect
  //
  // specify the project (id in the viz-list.ts array) + the img id (some projects have several imgs)
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnNumber, setColumnNumber] = useState<number>(4);
  const [selectedLuminosities, setLuminosity] = useState<Luminosity[]>([
    "light",
    "dark",
  ]);
  const [selectedChartIds, setSelectedChartIds] = useState<ChartId[]>();
  const [selectedTools, setSelectedTools] = useState<Tool[]>();

  //
  // Update state from URL param if needed once 1st render happened
  // Note that I don't know how to type useRouter, so it just return string or string[] :(
  //
  useEffect(() => {
    const { chart, tool } = router.query;

    if (chart && typeof chart === "string") {
      const ids = chart.split("--") as ChartId[];
      setSelectedChartIds(ids);
    }

    if (tool && typeof tool === "string") {
      const ids = tool.split("--") as Tool[];
      setSelectedTools(ids);
    }
  }, [router]);

  //
  // Functions that changes the state AND updates URL params
  // Use only them to update state
  //
  const updateChartId = (ids: ChartId[] | undefined) => {
    // If nothing is selected ids will be empty array. In this case, i/ set state to undefined and ii/ remove the "chart" url param
    if (!ids || ids.length === 0) {
      setSelectedChartIds(undefined);
      router.replace(router.query, undefined);
    } else {
      setSelectedChartIds(ids);
      router.push(
        { query: { ...router.query, chart: ids.join("--") } },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  const updateTool = (tools: Tool[] | undefined) => {
    // If nothing is selected tools will be empty array. In this case, set undefined
    if (!tools || tools.length === 0) {
      setSelectedTools(undefined);
      router.replace(router.query, undefined);
    } else {
      setSelectedTools(tools);
      router.push(
        { query: { ...router.query, tool: tools.join("--") } },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

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
          title="Dataviz Inspiration"
          description={siteDescription}
        />

        <WallFilters
          columnNumber={columnNumber}
          updateColumnNumber={setColumnNumber}
          selectedLuminosities={selectedLuminosities}
          updateLuminosity={setLuminosity}
          selectedChartIds={selectedChartIds}
          updateChartId={updateChartId}
          selectedTools={selectedTools}
          updateTool={updateTool}
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
                        setSelectedProject({ projectId: i, imgId: j });
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

export default Home;
