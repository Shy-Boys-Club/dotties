import { persistKey } from "@stoxy/core";
import { verifyAndSetUserdata } from "./services/auth-service";
import "./components/nav-bar";
import { init } from "./router";

init();
persistKey("userData");
verifyAndSetUserdata();
