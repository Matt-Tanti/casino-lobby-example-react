import logo from "../../assets/premier-gaming.png";
import { Styles } from "../../types/modelTypes";

const styles: Styles = {
  logo: {
    height: "auto",
    maxWidth: "300px",
    minWidth: "100px",
  },
};

const Logo = () => {
  return <img src={logo} alt="Premier Gaming" style={styles.logo} />;
};

export default Logo;
