import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Progress from "./components/progress/Progress";
import Traffic from "./components/traffic/Traffic";
import Otp from "./components/otp/Otp.js";
import AllInputs from "./components/Form/Form.js";
import Games from "./components/Game/Games.js";
import RatingConfig from "./components/Rating/Rating.js";
import DropDownConfig from "./components/Dropdown/Dropdown.js";
import AccordionConfig from "./components/Accordion/Accordion.js";
import TabConfig from "./components/Tab/Tab.js";
import GridConfig from "./components/Grid/Grid.js";
import Pagination from "./components/Pagination/Pagination.js";
import AutocompleteConfig from "./components/Autocomplete/Autocomplete.js";
import InfiniteScrollConfig from "./components/InfiniteScroll/InfiniteScroll.js";
import FileSystem from "./components/Dir/FileSystem.js";
import Carousel from "./components/Carousel/Carousel.js";
import JiraConfig from "./components/Jira/Jira.js";
import NestedCheckBox from "./components/NestedCheckBox/NestedCheckBox.js";
import { Link, Outlet } from "react-router-dom";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs.jsx";
// import GridConfig2 from "./components/grid-game-2/Grid.jsx";
import Spairal from "./components/Spiral/Spiral.jsx";
import CommentsConfig from "./components/Comments/Comments.jsx";

const lightConifg = {
  red: {
    time: 3000,
    next: "green"
  },
  green: {
    time: 2000,
    next: "yellow"
  },
  yellow: {
    time: 1000,
    next: "red"
  }
}

function App() {
  const [progress, setProgress] = useState([0, 0, 0]);
  const [currentId, setCurrentId] = useState(0);
  const [activeLight, setActiveLight] = useState('red')
  const [otp, setOtp] = useState('')



  // useEffect(() => {
  //   let intervalID;

  //   if (currentId < progress.length) {
  //     intervalID = setInterval(async () => {
  //       incrementProgress()
  //       // await new Promise((res,rej)=> setTimeout(()=>res(2), 3000))
  //       // console.log("11");

  //     }, 2000);
  //   }

  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, [currentId]);

  // if (progress[currentId] >= 100) {
  //   setCurrentId((prevId) => prevId + 1);
  // }


  // function incrementProgress () {
  //   console.log(progress);

  //   setProgress((prevProgress) => {
  //     const updatedProgress = [...prevProgress];
  //     updatedProgress[currentId] += 1;
  //     return updatedProgress;
  //   });
  // }

  // useEffect(()=>{

  //  const timeout = setTimeout(() => {

  //     setActiveLight(lightConifg[activeLight].next)

  //   }, lightConifg[activeLight].time);

  //   return () => clearTimeout(timeout)

  // }, [activeLight])


  return (
    <>


      <div className="layout-container">
        <aside className="sidebar">
          <h2 className="sidebar-title">Sidebar</h2>
          <nav className="nav-links">
            <Link className='nav-link' to={`profiles`}>
              Profiles
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <Breadcrumbs/>
          <Outlet />
          <CommentsConfig></CommentsConfig>
          {/* <Spairal></Spairal> */}
          {/* <GridConfig2></GridConfig2> */}
            {/* {progress.map((data, index) => (
              <Progress key={index} complete={data} />
            ))} */}
            {/* <Traffic active={activeLight}></Traffic> */}
            {/* <Otp otpLength={6} onOtpChange={setOtp}></Otp> */}
            {/* <AllInputs></AllInputs> */}
            {/* <button onClick={onButtonClik}>click me</button> */}
            {/* <Demo a={a}></Demo> */}
            {/* <Games></Games> */}
            {/* <RatingConfig ></RatingConfig> */}
            {/* <DropDownConfig></DropDownConfig> */}
            {/* <AccordionConfig></AccordionConfig> */}
            {/* <TabConfig></TabConfig> */}
            {/* <GridConfig></GridConfig> */}
            {/* <Pagination></Pagination> */}
            {/* <AutocompleteConfig></AutocompleteConfig> */}
            {/* <InfiniteScrollConfig></InfiniteScrollConfig> */}
            {/* <FileSystem></FileSystem> */}
            {/* <Carousel></Carousel> */}
            {/* <JiraConfig></JiraConfig> */}
            {/* <NestedCheckBox></NestedCheckBox> */}
        </main>
      </div>
    </>
  );
}

export default App;
