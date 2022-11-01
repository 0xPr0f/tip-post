import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./styles/Home.module.scss";

export const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className={styles.Home}>
        <div className={styles.Info}>
          <h1>Mint blog posts and get tipped online</h1>
          <p>
            Create post. Share your link. Recieve tips on how good it is. It's
            easier than you think.
          </p>

          <ConnectButton
            showBalance={false}
            chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
      </div>
    </div>
  );
};