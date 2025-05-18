import { useParams, useSearchParams } from "react-router-dom";
import { profiles } from "./constant";


export default function ProfileDetails() {
    const { id } = useParams()

    const [searchParams] = useSearchParams();
    const is_active = searchParams.get("is_active");   // "Pratik"

    const selectedProfile = profiles.find((profile) => profile.id == id)
    console.log(selectedProfile);

    return (
        <div>
            <div>
                name: {selectedProfile.name}
            </div>
            <div>
                email: {selectedProfile.email}
            </div>
            <div>
                age: {selectedProfile.age}
            </div>
            <div>
                is_active: {is_active}
            </div>
        </div>
    );
}
