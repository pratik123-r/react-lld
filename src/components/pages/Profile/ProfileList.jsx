import { Link } from "react-router-dom";
import { profiles } from "./constant";

export default function ProfileList() {
    return (
        <div>
            {
                profiles.map((data) => (
                    <Link  key={data.id} to={`${data.id}?is_active=${data.isActive}`}> 
                        <div>
                            {data.name}
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}
