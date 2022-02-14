import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailListService } from './mail-list.service';

@Processor('emails')
export class SendMailTweetsTask {
  constructor(private mailListService: MailListService) {}

  @Process()
  async handle(job: Job) {
    const mailList = await this.mailListService.findOne();
    console.log(mailList.emails);

    console.log('Conectar no kafa para enviar a mensagem');
  }
}
