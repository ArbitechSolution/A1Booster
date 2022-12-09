import { ActionTypes } from "../types";
import { financeAppContractAddress, financeAppContract_Abi } from "../../utilies/Contract";
export const getRemaintime = (acc) => {
    return async (dispatch) => {
      try {
        if (acc == "No Wallet") {
            dispatch({ type: ActionTypes.REMAIN_TIME, payload: 0 });
          } else if (acc == "Wrong Network") {
            dispatch({ type: ActionTypes.REMAIN_TIME, payload: 0 });
          } else if (acc == "Connect Wallet") {
            dispatch({ type: ActionTypes.REMAIN_TIME, payload: 0 });
          }else{
        const web3 = window.web3;
              let contract = new web3.eth.Contract(
                  financeAppContract_Abi,
                  financeAppContractAddress
                  );
                  let orderlength = await contract.methods.getOrderLength(acc).call();
                  if(orderlength > 0){
                    let {unfreeze} = await contract.methods
                    .orderInfos(acc, (orderlength-1)).call()
                    let sTime = Number(unfreeze);
                     dispatch({ type: ActionTypes.REMAIN_TIME, payload: sTime != 0 ? sTime : 0 });
                  }else{
                     dispatch({ type: ActionTypes.REMAIN_TIME, payload: 0 });
                  }
             }
    } catch (e) {
      console.error(e);
    }
    }
  }