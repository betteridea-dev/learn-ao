import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  address: string;
  name: string;
};

export type CreateUserDto = {
  address: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      address: '9JcvVMpKiClKL5NFiBAyOSGsOTiGCXG4fsXCMytvFq0',
      name: 'Prathamesh',
    },
    {
      userId: 2,
      address: '8iD-Gy_sKx98oth27JhjjP2V_xUSIGqs_8-skb63YHg',
      name: 'Ankush',
    },
    {
      userId: 3,
      address: 'C60L3Aj5rzHQJMM0O5jNP_BPKt3AtQLtGDNpBXPE8zM',
      name: 'Farhat',
    },
  ];

  async create({ address }: CreateUserDto): Promise<User> {
    this.users.push({
      userId: this.users.length + 1,
      address,
      name: 'Test',
    });

    return this.users[this.users.length - 1];
  }

  async findById(userId: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.userId === userId);
    return user;
  }

  async findByAddress(address: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.address === address);
    return user;
  }
}
