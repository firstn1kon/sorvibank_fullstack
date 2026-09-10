import FirstScreen from "../components/FirstScreen/FirstScreen";
import Tiles from "../components/Tiles/Tiles";
import MapSection from "../components/MapSection/MapSection";
import Video from "../components/Video/Video";
import Steps from "../components/Steps/Steps";

export const Home = () => {
    return (
        <>
            <FirstScreen/>
            <Tiles/>
            <MapSection/>
            <Video/>
            <Steps/>
        </>
    )
}