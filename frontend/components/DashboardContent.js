import Link from "next/link";

const DashboardContent = ({children, title, classes}) => {
    return ( 
           <div className={`card ${classes}`}>
                {title ? <div className="card-header bg-dark text-white h3">{title}</div> : ''}

                <div className="card-body">
                    {children}
                </div>
            </div>
           
     );
}
 
export default DashboardContent;