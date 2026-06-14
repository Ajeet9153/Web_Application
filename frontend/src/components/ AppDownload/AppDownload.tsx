import Image from "next/image";
import "./AppDownload.css";
import {assets} from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For Better Experience Download <br />
        Tomato App
      </p>

      <div className="app-download-platforms">
        <Image
          src={assets.play_store}
          alt="Google Play Store"
          width={180}
          height={60}
        />

        <Image
          src={assets.app_store}
          alt="Apple App Store"
          width={180}
          height={60}
        />
      </div>
    </div>
  );
};

export default AppDownload;