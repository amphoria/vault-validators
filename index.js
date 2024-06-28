import { StakeWiseSDK, Network } from '@stakewise/v3-sdk'
import {ethers} from "ethers";

const sdk = new StakeWiseSDK({ network: Network.Mainnet })

const inputEl = document.getElementById("input-el")
const updateBtn = document.getElementById("update-btn")
const saveBtn = document.getElementById("save-btn")
const containerEl = document.getElementById("container")

// Contract addresses and ABIs
const genesisAddress = "0xac0f906e433d58fa868f936e8a43230473652885"

// Default wallet address
const cookie = getCookie("defaultVaultAddress")
if (cookie != "") {
    const defaultAddress = cookie.split('=')
    inputEl.value = defaultAddress[1]
} 

updateBtn.addEventListener("click", getValidators)
saveBtn.addEventListener("click", saveAddress)

async function getValidators() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    const formatter = new Intl.DateTimeFormat('en-GB', options)
    let html = `
                    <div class="heading">Created Datetime</div>   
                    <div class="heading">ETH Earned</div>   
                    <div class="heading">APY %</div>   
                    <div class="heading">Beaconcha.in</div>
                `   

    const output = await sdk.vault.getValidators({
        vaultAddress: inputEl.value,
        limit: 200,
        skip: 0
    })

    output.forEach((item) => {
        const date = new Date(item.createdAt)
        const formattedDate = formatter.format(date)
        html = html + 
            `
                <div>${formattedDate}</div>
                <div>${item.earned}</div>
                <div>${item.apy}</div>
                <div><a href="${item.link}" target="_blank">Link</a></div>
            `
    })

    containerEl.innerHTML = html
}

function saveAddress() {
    if (inputEl.value != "") {
        document.cookie = "defaultVaultAddress=" + inputEl.value
    } else {
        console.log("No vault address entered")
    }
}

function getCookie(caddr) {
    let address = caddr + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(address) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}




