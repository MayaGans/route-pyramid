const SideBarElement = ({label, expanded, setExpanded, icon}) => {
  return(
    <div className="container active">
    <div className="label" role='button' tabIndex='0' onClick={() => setExpanded(!expanded)} onKeyDown={() => setExpanded(!expanded)}>
     {label}
     <img src={icon} alt="climb type icon"/>
     </div>
     <div className='sidebar-content'>
       {}
     </div>
     </div>
  )
}

export default SideBarElement;