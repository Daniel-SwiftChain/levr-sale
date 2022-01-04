const Web3 = require("web3");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const createCsvWriter = require("csv-writer").createArrayCsvWriter;
const { BigNumber } = require("ethers");

const testLevrAddress = "0xce0F718BD518E38A479fcB0187B67c2Eb57c5e1D";
const accountToImpersonate = "0x20BD917E2fc207AC80a15b034B4dBAa296065216";
let incline = "389564392300000000000000000000000000000000000000"; // 5% Start

describe("LevrSale", function () {
  beforeEach(async function () {
    // Reset to fork before each test
    resetChain();
  });

  // it("LS_B: Buy zero Levr", async function () {
  //   let web3 = new Web3("ws://localhost:8545");

  //   // Get LEVR test token contract that was launched on Arbitrum
  //   const LEVR = await hre.ethers.getContractFactory("LEVR");
  //   const levr = await LEVR.attach(testLevrAddress);

  //   // Get test accounts
  //   const [account0, account1, account2, account3, account4] =
  //     await ethers.getSigners();

  //   // Deploy Sale
  //   const Sale = await hre.ethers.getContractFactory("Sale");
  //   const sale = await Sale.deploy(
  //     incline,
  //     levr.address,
  //     account1.address, // gulper
  //     account4.address, // treasury
  //     account2.address, // liquidity
  //     account3.address // foundryTreasury
  //   );

  //   await sale.deployed();

  // //   console.log("Sale deployed to:", sale.address);

  //   await hre.network.provider.request({
  //     method: "hardhat_impersonateAccount",
  //     params: [accountToImpersonate],
  //   });

  //   // admin has minting rights
  //   const admin = await ethers.getSigner(accountToImpersonate);

  //   // send ether to admin account
  //   await account0.sendTransaction({
  //     to: accountToImpersonate,
  //     value: ethers.utils.parseEther("1.0"),
  //   });

  //   // Use admin address to make Sale a minter of Levr token
  //   await levr.connect(admin).addMinter(sale.address);

  //   // Buy 0 Levr
  //   let buyTx = await sale.buy(account1.address, {
  //     value: web3.utils.toWei("0"),
  //   });

  //   // STATE
  //   let totalRaised = await sale.raised();
  //   let tokensIssued = await sale.tokensIssued();
  // //   console.log("Total Raised: ", totalRaised);

  //   let account0Balance = await levr.balanceOf(account0.address);
  //   let account1Balance = await levr.balanceOf(account1.address);
  //   let account2Balance = await levr.balanceOf(account2.address);
  //   let account3Balance = await levr.balanceOf(account3.address);
  //   let account4Balance = await levr.balanceOf(account4.address);

  //   expect(account0Balance).to.equal("0");
  //   expect(account1Balance).to.equal("0");
  //   expect(account2Balance).to.equal("0");
  //   expect(account3Balance).to.equal("0");
  //   expect(account4Balance).to.equal("0");
  //   expect(tokensIssued).to.equal("0");
  //   expect(totalRaised).to.equal("1000000000000000000000");

  //   // EVENTS
  //   expect(buyTx).to.emit(sale, "Bought").withArgs(account1.address, "0");
  // });

  // it("LS_B: Buy Levr", async function () {
  //   let web3 = new Web3("ws://localhost:8545");

  //   // Get LEVR test token contract that was launched on Arbitrum
  //   const LEVR = await hre.ethers.getContractFactory("LEVR");
  //   const levr = await LEVR.attach(testLevrAddress);

  //   // Get test accounts
  //   const [account0, account1, account2, account3, account4] =
  //     await ethers.getSigners();

  //   // Deploy Sale
  //   const Sale = await hre.ethers.getContractFactory("Sale");
  //   const sale = await Sale.deploy(
  //     incline,
  //     levr.address,
  //     account1.address, // gulper
  //     account2.address, // treasury
  //     account3.address, // liquidity
  //     account4.address // foundryTreasury
  //   );

  //   await sale.deployed();

  //   // console.log("Sale deployed to:", sale.address);

  //   await hre.network.provider.request({
  //     method: "hardhat_impersonateAccount",
  //     params: [accountToImpersonate],
  //   });

  //   // admin has minting rights
  //   const admin = await ethers.getSigner(accountToImpersonate);

  //   // send ether to admin account
  //   await account0.sendTransaction({
  //     to: accountToImpersonate,
  //     value: ethers.utils.parseEther("1.0"),
  //   });

  //   // Use admin address to make Sale contract a minter of Levr token
  //   await levr.connect(admin).addMinter(sale.address);

  //   let raisedBefore = await sale.raised();
  //   // Buy 1 eth of Levr
  //   let buyTx = await sale.buy(account1.address, {
  //     value: web3.utils.toWei("1"),
  //   });

  //   // STATE
  //   let totalRaised = await sale.raised();
  //   let tokensIssued = await sale.tokensIssued();
  //   // console.log("Total Raised: ", totalRaised);

  //   let account0Balance = await levr.balanceOf(account0.address);
  //   let account1Balance = await levr.balanceOf(account1.address);
  //   let account2Balance = await levr.balanceOf(account2.address);
  //   let account3Balance = await levr.balanceOf(account3.address);
  //   let account4Balance = await levr.balanceOf(account4.address);

  //   // console.log(
  //   //   "Account 0 Tokens: ",
  //   //   web3.utils.fromWei(account1Balance.toString())
  //   // );

  //   // Calculate expected tokens received
  //   let calculatedTokenAmount = calculateTokensReceived(
  //     web3.utils.toWei("1"),
  //     raisedBefore
  //   );
  //   // console.log(
  //   //   "Calculated tokens: ",
  //   //   web3.utils.fromWei(calculatedTokenAmount.div(7).mul(4).toString())
  //   // );
  //   expect(account0Balance).to.equal("0");
  //   expect(account1Balance).to.equal(
  //     calculatedTokenAmount.div(7).mul(4).toString()
  //   );
  //   expect(account2Balance).to.equal(calculatedTokenAmount.div(7).toString());
  //   expect(account3Balance).to.equal(calculatedTokenAmount.div(7).toString());
  //   expect(account4Balance).to.equal(calculatedTokenAmount.div(7).toString());
  //   expect(tokensIssued).to.equal(calculatedTokenAmount.toString());
  //   expect(totalRaised).to.equal("1001000000000000000000");

  //   // EVENTS
  //   expect(buyTx)
  //     .to.emit(sale, "Bought")
  //     .withArgs(account1.address, calculatedTokenAmount.toString());
  // });

  it("LS_CPPT: Calculate Price; Supplied 0", async function () {
    let web3 = new Web3("ws://localhost:8545");
    // Get LEVR test token contract that was launched on Arbitrum
    const LEVR = await hre.ethers.getContractFactory("LEVR");
    const levr = await LEVR.attach(testLevrAddress);
    // Get test accounts
    const [account0, account1, account2, account3, account4] =
      await ethers.getSigners();
    // Deploy Sale
    const Sale = await hre.ethers.getContractFactory("Sale");
    const sale = await Sale.deploy(
      incline,
      levr.address,
      account1.address, // gulper
      account4.address, // treasury
      account2.address, // liquidity
      account3.address // foundryTreasury
    );
    await sale.deployed();

    let price = await sale.calculatePricePerToken(web3.utils.toWei("1"));

    console.log("Token Price: ", web3.utils.fromWei(price.toString()));
  });
  return; // Don't run graph data generation

  it("Generate graph data", async function () {
    let web3 = new Web3("ws://localhost:8545");

    const LEVR = await hre.ethers.getContractFactory("LEVR");
    const levr = await LEVR.attach(testLevrAddress);

    console.log("LEVR at address:", levr.address);

    //let incline = "389564392300000000000000000000000000000000000000"; // 5% Start
    //let incline = "305249378105604451351096324563797880934725117350"; // 1% Start
    //let incline = "465831239517769992455746636833534334196354427279"; // 10% Start

    const [account0, account1, account2, account3, account4] =
      await ethers.getSigners();
    console.log(account1.address);
    const Sale = await hre.ethers.getContractFactory("Sale");
    const sale = await Sale.deploy(
      incline,
      //startingPoint,
      levr.address,
      account1.address, // gulper
      account4.address, // treasury
      account2.address, // liquidity
      account3.address // foundryTreasury
    );

    await sale.deployed();

    console.log("Sale deployed to:", sale.address);

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [accountToImpersonate],
    });

    const admin = await ethers.getSigner(accountToImpersonate);
    console.log("Admin: ", admin);
    const adminBal = await admin.getBalance();
    await account0.sendTransaction({
      to: accountToImpersonate,
      value: ethers.utils.parseEther("1.0"),
    });
    // send enought ether to account0 to do all the buys
    await account1.sendTransaction({
      to: account0.address,
      value: ethers.utils.parseEther("9999.0"),
    });
    await account2.sendTransaction({
      to: account0.address,
      value: ethers.utils.parseEther("9999.0"),
    });
    console.log("Admin Balance: ", adminBal);
    // admin.sendTransaction(await levr.addMinter(sale.address));
    await levr.connect(admin).addMinter(sale.address);

    // console.log("isMinter: ", await levr.isMinter(admin.address));

    let tokensIssued = 0;
    let totalRaised = 0;
    let amountRaised = 0;
    let issueRecords = [];

    let numberOfBuys = 100;
    let etherToSpend = "200.0";

    for (let i = 0; i < numberOfBuys; i++) {
      amountRaised = await sale.raised();
      console.log("Amount raised: ", amountRaised.toString());

      await sale.buy(account1.address, {
        value: web3.utils.toWei(etherToSpend),
      });

      tokensIssued = await sale.tokensIssued();
      console.log(
        "Tokens Issued: ",
        web3.utils.fromWei(tokensIssued.toString())
      );

      totalRaised = await sale.raised();
      console.log("Total Raised: ", web3.utils.fromWei(totalRaised.toString()));

      issueRecords.push([
        i,
        web3.utils.fromWei(totalRaised.toString().replace(",", "")),
        web3.utils.fromWei(tokensIssued.toString().replace(",", "")),
      ]);
    }

    const csvWriter = createCsvWriter({
      header: ["Buy Count", "Raised", "Total Tokens Issued"],
      path: "levrData.csv",
      fieldDelimiter: ";",
    });

    csvWriter.writeRecords(issueRecords).then(() => {
      console.log("Written to csv");
    });

    console.log(
      "Total Supply: ",
      web3.utils.fromWei((await levr.totalSupply()).toString())
    );
  });
});

async function resetChain() {
  await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl:
            "https://arb-mainnet.g.alchemy.com/v2/3VktAs9-jOfFCrGAiD-dKd4KzggT13rf",
          blockNumber: 3843242,
        },
      },
    ],
  });
}

function calculateTokensReceived(ethAmount, raisedBefore) {
  const eth = BigNumber.from(ethAmount);
  const raised = BigNumber.from(raisedBefore);
  const inc = BigNumber.from(incline);

  // sqrt(uint(2) * _inclineWAD * _raised / WAD);
  const two = BigNumber.from(2);
  const ten = BigNumber.from(10);
  const wad = ten.pow(18);
  let tokens = two.mul(inc).mul(eth.add(raised).div(wad));
  tokens = sqrt(tokens);
  let alreadyRaised = two.mul(inc).mul(raised).div(wad);
  alreadyRaised = sqrt(alreadyRaised);
  tokens = tokens.sub(alreadyRaised);

  //console.log("Tokens: ", tokens);

  return tokens;
}

function calculatePrice(supplied, raisedBefore) {
  // _price = pureCalculateTokensRecieved(_inclineWAD, _alreadyRaised, _supplied) * WAD / _supplied;
  const wad = ten.pow(18);
  let tokensReceived = calculateTokensReceived(supplied, raisedBefore);
  return tokensReceived.mul(wad).div(supplied);
}

function sqrt(value) {
  const ONE = ethers.BigNumber.from(1);
  const TWO = ethers.BigNumber.from(2);
  x = BigNumber.from(value);
  let z = x.add(ONE).div(TWO);
  let y = x;
  while (z.sub(y).isNegative()) {
    y = z;
    z = x.div(z).add(z).div(TWO);
  }
  return y;
}
