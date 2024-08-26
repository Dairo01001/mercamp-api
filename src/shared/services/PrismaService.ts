import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {
    PrismaService.instance = new PrismaClient();
  }

  public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      new PrismaService();
    }

    return PrismaService.instance;
  }
}
