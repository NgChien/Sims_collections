import React, { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { simNftContract } from "../../abis/abis";

const web3 = new Web3(window.ethereum);

const Card = ({ nft }) => {
  return (
    <div className="max-w-[250px] shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3  ">
      <img src={nft.tokenPNG} alt="tokenPNG" />
      <div className="flex justify-between mt-5">
        <h4 className="text-white font-semibold">Sim #{Number(nft.id)}</h4>
        <button
          className="shadow-lg shadow-black text-white text-sm bg-[#e32970]
            hover:bg-[#bd255f] cursor-pointer rounded-full px-1.5 py-1"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const MySims = () => {
  let [nfts, setNfts] = useState([]);
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [collection, setCollection] = useState([]);

  const getCollection = () => {
    return nfts.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [nfts, end]);

  useEffect(() => {
    const getAllSim = async () => {
      try {
        const SimNftContract = await simNftContract();
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const nfts = await SimNftContract.methods.getNFTs(accounts[0]).call();
        await setNfts(nfts);
      } catch (err) {
        console.error(err.message);
      }
    };
    getAllSim();
  }, []);

  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto  ">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient  text-center">
          My Sims
        </h4>

        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3  py-2.5 justify-items-center ">
          {collection.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f]
            rounded-full cursor-pointer p-2"
          onClick={() => setEnd(end + count)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MySims;
