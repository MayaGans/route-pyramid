import {React, useState, useEffect } from "react";
import { make_pyramid, get_grades, get_totals, get_leftovers, STYLE, ANGLE, ROUTE_GRADES, BOULDER_GRADES } from "../../Utils/data-utils";
// import useGradeList from "../GradePicker/GradePicker"
import Pyramid from "../Pyramid/Pyramid"
import "./SideBar.css"
import Fab from "../Fab/Fab";
import DateSelect from "../DateSelect/DateSelect"
import DropDown from "../DropDown/DropDown";
import RadioInput from "../RadioInput/RadioInput";

//import difficulty_icon from "../../images/difficulty.png"
import climb_icon from "../../images/climb.png"
import style_icon from "../../images/style.png"
import angle_icon from "../../images/angle.png"
import pyramid_icon from "../../images/pyramid.png"
import date_icon from "../../images/calendar.png"

const SideBar = () => {

  const date = new Date()

  const [climb, setClimb] = useState('Route')
  const [gradeList, setGradelist] = useState(ROUTE_GRADES)
  //const [gradeList] = useGradeList(climb)
  const [selectedOption, setSelectedOption] = useState("5.13c")
  const [grade, setGrade] = useState(get_grades(selectedOption, gradeList))
  const [data, setData] = useState([])
  
  // this should be Jan 1 of current year
  const [startDate, setStartDate] = useState(date.getFullYear() + "-01-01")
  const [endDate, setEndDate] = useState(date.toISOString().substring(0, 10))

  const [angle, setAngle] = useState("All")
  const [style, setStyle] = useState("All")
  const [pyramid, setPyramid] = useState([])
  const [total, setTotal] = useState([])
  const [leftover, setLeftover] = useState([])

  const [l1, setL1] = useState(1)
  const [l2, setL2] = useState(2)
  const [l3, setL3] = useState(3)
  const [l4, setL4] = useState(6)
  const [l5, setL5] = useState(10)
  const [l6, setL6] = useState(12)

  const [expanded, setExpanded] = useState(true)

  // const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const url = `/.netlify/functions/google-data`;
      try {
        const raw_dat = await fetch(url).then((res) => res.json())
        setData(raw_dat);
      } catch (err) {
        console.log(err);
        setData([]);
      } 
    }
    fetchData();
  }, []);

  const appendData = (dat) => {
    setData(data.concat(dat))
  }

  useEffect(() => {
    setPyramid(make_pyramid(
      selectedOption, 
      data, 
      gradeList, 
      style, 
      angle,
      startDate,
      endDate,
      [l1, l2, l3, l4, l5, l6]
     ))
  }, [selectedOption, gradeList, data, style, angle, startDate, endDate, l1,l2,l3,l4,l5,l6])

  useEffect(() => {
    setTotal(get_totals(data, grade, style, angle, startDate, endDate))
  }, [data, grade, style, angle, startDate, endDate])

  useEffect(() => {
    setLeftover(get_leftovers(total, [l1,l2,l3,l4,l5,l6]))
  }, [total,l1,l2,l3,l4,l5,l6]) 

  function changePyramid(e) {
    setSelectedOption(e.target.value)
    setGrade(get_grades(e.target.value, gradeList))
  }

  function changeClimbType(e) {
    setClimb(e.target.value)
    if (e.target.value === 'Route') {
      setSelectedOption('5.13c')
      setGradelist(ROUTE_GRADES)
      setGrade(get_grades('5.13c', gradeList))
    } else {
      setSelectedOption('v9')
      setGradelist(BOULDER_GRADES)
      setGrade(get_grades('v9', gradeList))
    }
    setPyramid(make_pyramid(
      selectedOption, 
      data, 
      gradeList, 
      style, 
      angle,
      startDate,
      endDate,
      [l1, l2, l3, l4, l5, l6]
     ))
  }

  return(
    <div className="content">
     <div className={"sidebar " + expanded}>

    <div className="filter-title">Filters</div>

     <button onClick={() => setExpanded(!expanded)} className="leftBtn" >
      <div id="nav-icon4" className={expanded + ""}>
        <span></span>
        <span></span>
        <span></span>
      </div>
     </button>

     <ul className="sidebar-nav accordion-body">
     <div className="accordion">

     <div className="container active">
       <div className="label" role='button' tabIndex='0' onClick={() => setExpanded(!expanded)} onKeyDown={() => setExpanded(!expanded)}>
       Type
       <img src={climb_icon} alt="climb type icon"/>
       </div>
       <div className='sidebar-content'>
       <RadioInput
         items={[{label: "Route", value: "Route"},{label:"Boulder", value: "Boulder"}]}
         val={climb}
         checked={climb}
         lab="Style"
         clickEvt={changeClimbType}
      />
       </div>
      </div>

     <div className="container active">
       <div className="label" role='button' tabIndex='0' onClick={() => setExpanded(!expanded)} onKeyDown={() => setExpanded(!expanded)}>
       Date
       <img src={date_icon} alt="climb type icon"/>
       </div>
       <div className='sidebar-content'>
       <DateSelect
         label="start-date"
         lab_text="Start Date"
         value={startDate}
         clickEvt={(e) => setStartDate(e.target.value)}
      />
      
      <DateSelect
         label="end-date"
         lab_text="End Date"
         value={endDate}
         min={startDate}
         clickEvt={(e) => setEndDate(e.target.value)}
      />
       </div>
     </div>

     <div className="container active">
       <div className="label" role='button' tabIndex='0' onClick={() => setExpanded(!expanded)} onKeyDown={() => setExpanded(!expanded)}>
       Style
       <img src={style_icon} alt="style icon"/>
       </div>
       <div className='sidebar-content'>
       <DropDown 
         items={["All"].concat(STYLE).map(x => { return {label: x, value: x}})}
         val={style}
         lab="Style"
         clickEvt={(e) => setStyle(e.target.value)}
     />
       </div>
      </div>

     <div className="container active">
       <div className="label" role='button' tabIndex='0' onClick={() => setExpanded(!expanded)} onKeyDown={() => setExpanded(!expanded)}>
       Angle
       <img src={angle_icon} alt="angle icon"/>
       </div>
       <div className='sidebar-content'>
       <DropDown 
         items={["All"].concat(ANGLE).map(x => { return {label: x, value: x}})}
         val={angle}
         lab="Angle"
         clickEvt={(e) => setAngle(e.target.value)}
     />
       </div>
      </div>

     <div className="container active">
       <div className="label" role='button' tabIndex='0' onClick={() => setExpanded(!expanded)} onKeyDown={() => setExpanded(!expanded)}>
       Pyramid
       <img src={pyramid_icon} alt="pyramid icon"/>
       </div>
       <div className='sidebar-content'>
       <DropDown 
         items={gradeList.map(x => { return {label: x, value: x}})}
         val={selectedOption}
         lab="Top Grade"
         clickEvt={changePyramid}
      />

<div className="layer-input">
    <label htmlFor="layer-input">Block Numbers</label>
    <input className="layer-count layer-1" type="number" value={l1} onChange={(e) => setL1(+e.target.value)} min="1"/>
    <input className="layer-count layer-2" type="number" value={l2} onChange={(e) => setL2(+e.target.value)} min="1"/>
    <input className="layer-count layer-3" type="number" value={l3} onChange={(e) => setL3(+e.target.value)} min="1"/>
    <input className="layer-count layer-4" type="number" value={l4} onChange={(e) => setL4(+e.target.value)} min="1"/>
    <input className="layer-count layer-5" type="number" value={l5} onChange={(e) => setL5(+e.target.value)} min="1"/>
    <input className="layer-count layer-6" type="number" value={l6} onChange={(e) => setL6(+e.target.value)} min="1"/>
    </div>
       </div>
      </div>

      </div>
    </ul>

     <form>
      

    </form>
    </div>
  
    <Pyramid expanded={expanded} grade={grade} pyramid={pyramid} total={total} leftover={leftover} count={[l1,l2,l3,l4,l5,l6]}/>
    <Fab onClick={appendData}/>
    </div>
  );
}

export default SideBar;
