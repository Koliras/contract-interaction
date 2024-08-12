import { Injectable, InternalServerErrorException } from '@nestjs/common';
import abi from '../abi/GooseTokenAbi';
import { ethers } from 'ethers';
import 'dotenv/config';

@Injectable()
export class AppService {
  private contractAddress = '0x75D843b68ceE99e80Fd7367ad03b4760299a1c76';
  private sepoliaRpcUrl = 'https://rpc2.sepolia.org';
  private jsonRpcProvider = new ethers.providers.JsonRpcProvider(
    this.sepoliaRpcUrl,
  );
  private privateKey = process.env.PRIVATE_KEY;
  private signer = new ethers.Wallet(this.privateKey, this.jsonRpcProvider);

  async getBalance(wallet: string) {
    const contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.jsonRpcProvider,
    );
    try {
      const balance = await contract.balanceOf(wallet);
      return { balance: ethers.utils.formatUnits(balance, 18) };
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Could not get balance of wallet ${wallet}`,
        error: err,
      });
    }
  }

  async addAdmin(address: string) {
    const contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this.signer,
    );
    try {
      await contract.addAdmin(address);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
