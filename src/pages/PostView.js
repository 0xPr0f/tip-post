import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moralis from "moralis-v1";
import { Store } from "react-notifications-component";
import { Button, Form, InputGroup } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import styles from "./styles/PostView.module.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const PostView = () => {
  const { post_id } = useParams();
  const [data, setData] = useState();
  const [tipToken, setTipToken] = useState();
  const [tipTokenAmount, setTipTokenAmount] = useState();
  const [IPFSdata, setIPFSData] = useState();
  const [isSendingButton, setIsSendingButton] = useState(true);

  useEffect(() => {
    const loadMoralis = async () => {
      await Moralis.start({
        appId: process.env.REACT_APP_APPLICATION_ID,
        serverUrl: process.env.REACT_APP_SERVER_URL,
      });
    };
    loadMoralis();
    QueryData();
  }, []);

  const QueryData = async () => {
    const PostTestData = Moralis.Object.extend("PostTestData");
    console.log("checking ...");
    const postTestDataquery = new Moralis.Query(PostTestData);

    postTestDataquery.get(post_id.toString()).then(
      async (Dataquery) => {
        fetch(`${Dataquery.attributes.postIPFSdata}`)
          .then((response) => response.json())
          .then((data) => setIPFSData(data));

        setData(Dataquery);
      },
      (error) => {
        sendNotification("Invalid post ID", "Post ID was not found", "danger");
      }
    );
  };

  const sendNotification = (title, message, type) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],

      dismiss: {
        duration: 5000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
      },
    });
  };

  const TipPost = () => {};

  return (
    <div>
      <div className={styles.PostbarDivHolder}>
        <div style={{ float: "right" }}>
          <ConnectButton
            // showBalance={false}
            // chainStatus={{ smallScreen: "icon", largeScreen: "icon" }}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
        </div>
        <div style={{ padding: "2em" }}></div>
        {post_id}
        <div>
          {IPFSdata && IPFSdata.image ? (
            <img
              src={IPFSdata.image.replace(
                "ipfs://",
                "https://nftstorage.link/ipfs/"
              )}
            />
          ) : null}
        </div>
        <div style={{ padding: "3em" }}>
          <h3>Name : {IPFSdata.name} </h3>
        </div>
        <div>
          <h4>Description : {IPFSdata.description} </h4>
        </div>
        <div>
          <h3>creator : {IPFSdata.properties.authors[0].authoraddress} </h3>
        </div>
        <div className={styles.TipSection}>
          <InputGroup className="mb-3">
            <Form.Control
              spellCheck={false}
              value={tipTokenAmount}
              onChange={(e) => {
                const re = /(?:0[xX])?[0-9a-fA-F]+/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setTipTokenAmount(e.target.value);
                }
              }}
              className={styles.removeBoxShadow}
              placeholder="0x0000..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <Button
            style={{ height: "100%", width: "30%" }}
            disabled={!isSendingButton}
            onClick={isSendingButton ? TipPost : null}
            variant="outline-primary"
          >
            {isSendingButton ? "Tip" : "Tipping"}
          </Button>
        </div>
      </div>
    </div>
  );
};
