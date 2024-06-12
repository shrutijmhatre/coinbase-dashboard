import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useWebSocket, { ReadyState } from "react-use-websocket";

function App() {
  const [count, setCount] = useState(0);

  const socketUrl = "wss://ws-feed.exchange.coinbase.com";

  const {
    // sendMessage,
    sendJsonMessage,
    // lastMessage,
    lastJsonMessage,
    readyState,
    // getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    // shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "subscribe",
        product_ids: ["BTC-USD", "ETH-USD", "LTC-USD", "BCH-USD"],
        channels: ["ticker_batch"],
      });
    }
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage) {
      const { /* channels, */ ...payload } = lastJsonMessage;
      console.log(payload);
      /* const type = payload.product_id;

      dispatch({ type, payload });

      if (channels) {
        if (channels.length) {
          const [subscribedProducts] = channels.map(
            (channel) => channel.product_ids
          );
          setProductIds(subscribedProducts);
        } else {
          setProductIds([]);
        }
      } */
    }
  }, [lastJsonMessage]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
