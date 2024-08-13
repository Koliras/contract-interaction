import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import 'dotenv/config';
import GooseTokenAbi from '../abi/GooseTokenAbi';

@Injectable()
export class AppService {
  private contractAddress = '0x75D843b68ceE99e80Fd7367ad03b4760299a1c76';
  private sepoliaRpcUrl = 'https://rpc2.sepolia.org';
  private jsonRpcProvider = new ethers.providers.JsonRpcProvider(
    this.sepoliaRpcUrl,
  );
  private privateKey = process.env.PRIVATE_KEY;
  private signer = new ethers.Wallet(this.privateKey, this.jsonRpcProvider);
  private GOOSE_TOKEN = new ethers.Contract(
    this.contractAddress,
    GooseTokenAbi,
    this.signer,
  );

  async getBalance(wallet: string) {
    try {
      const balance = await this.GOOSE_TOKEN.balanceOf(wallet);
      return { balance: ethers.utils.formatUnits(balance, 18) };
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Could not get balance of wallet ${wallet}`,
        error: err,
      });
    }
  }

  async addAdmin(address: string) {
    try {
      await this.GOOSE_TOKEN.addAdmin(address);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async removeAdmin(address: string) {
    try {
      await this.GOOSE_TOKEN.removeAdmin(address);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async addToBlacklist(address: string) {
    try {
      await this.GOOSE_TOKEN.addToBlacklist(address);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async removeFromBlacklist(address: string) {
    try {
      await this.GOOSE_TOKEN.removeFromBlacklist(address);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async mint(address: string, amount: string) {
    const a = BigNumber.from(amount);
    try {
      await this.GOOSE_TOKEN.mint(address, a);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
