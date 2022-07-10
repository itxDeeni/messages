import { Controller, Get, Post,Body, Param, NotFoundException } from '@nestjs/common';
import { createMessageDto } from './dtos/create-message.dto'
import { MessagesService } from './messages.service'


@Controller('messages')
export class MessagesController {
  messagesService : MessagesService

  constructor(){
    this.messagesService = new MessagesService()
  }

  @Get()
  listMessages(){
    return this.messagesService.findAll()
  }

  @Post()
  createMessage(@Body() body:createMessageDto){
    return this.messagesService.create(body.content)
  }

  @Get('/:id')
  async getMessage(@Param('id') id:string){
    const message = await this.messagesService.findOne(id)

    if(!message){
      throw new NotFoundException('message not found')
    }
    
    return message
  }
}
