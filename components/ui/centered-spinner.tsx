/**
 * This requires the parent component to have position relative
 */
import Spinner from "./loading-spinner";

export default function CenteredSpinner() {
    return (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
        </div>
    )
}