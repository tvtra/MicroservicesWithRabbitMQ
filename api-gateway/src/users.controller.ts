import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor() {}

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auth_service_queue',
      queueOptions: {
        durable: false
      },
    },
  })
  client: ClientProxy;

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.client.send('findUserById', id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: any
  ) {
    return this.client.send('updateUser', {
      id: id,
      updateUserDto: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeUser', id);
  }
}
