import { Injectable, InternalServerErrorException } from '@nestjs/common';
import abi from '../abi/GooseTokenAbi';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  private contractAddress = '0x75D843b68ceE99e80Fd7367ad03b4760299a1c76';
  private sepoliaRpcUrl = 'https://rpc2.sepolia.org';
  private jsonRpcProvider = new ethers.providers.JsonRpcProvider(
    this.sepoliaRpcUrl,
  );

  getBalance(wallet: string) {
    const contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.jsonRpcProvider,
    );
    try {
      const balance = contract.interface.encodeFunctionData('balanceOf', [
        wallet,
      ]);
      return { balance: ethers.utils.formatUnits(balance, 18) };
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Could not get balance of wallet ${wallet}`,
        error: err,
      });
    }
  }
}
